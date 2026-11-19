import { isAdmin, json } from "./_lib.js";
import { BUCKET, publicUrl, publishableHeaders, removeObjects, sb, SUPABASE_URL } from "./_supabase.js";

export const maxDuration = 30;

const MAX_BYTES = 50 * 1024 * 1024; // Supabase Free প্ল্যানে প্রতি ফাইল ৫০ MB
const TYPES: Record<string, { kind: "image" | "video"; ext: string }> = {
  "image/jpeg": { kind: "image", ext: "jpg" },
  "image/png": { kind: "image", ext: "png" },
  "image/webp": { kind: "image", ext: "webp" },
  "image/gif": { kind: "image", ext: "gif" },
  "video/mp4": { kind: "video", ext: "mp4" },
  "video/webm": { kind: "video", ext: "webm" },
  "video/quicktime": { kind: "video", ext: "mov" },
};
const PLACE = /^[a-z0-9-]{1,40}$/;
const UUID = /^[0-9a-f-]{36}$/;

const safe = (fn: (r: Request) => Promise<Response>) => async (request: Request) => {
  try {
    return await fn(request);
  } catch (error) {
    console.error(error);
    return json({ error: `সার্ভার ত্রুটি: ${error instanceof Error ? error.message : String(error)}` }, 500);
  }
};

function youtubeId(raw: string) {
  try {
    const u = new URL(raw);
    const host = u.hostname.replace(/^(www|m)\./, "");
    let id: string | null = null;
    if (host === "youtu.be") id = u.pathname.slice(1);
    else if (host === "youtube.com" || host === "youtube-nocookie.com")
      id = u.searchParams.get("v") ?? u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{11})/)?.[1] ?? null;
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

// গ্যালারি ছাড়া বাকি জায়গায় একটাই ছবি/ভিডিও থাকে: নতুনটি বসলে পুরোনোটি মুছে যায়
async function dropOthers(place: string, keepId: string) {
  if (place === "gallery") return;
  const old = (await (await sb(`/rest/v1/media?place=eq.${place}&id=neq.${keepId}&select=id,path`)).json()) as { path: string }[];
  if (!old.length) return;
  await sb(`/rest/v1/media?place=eq.${place}&id=neq.${keepId}`, { method: "DELETE" });
  await removeObjects(old.map((o) => o.path));
}

async function insertRow(row: { kind: string; place: string; title: string; path: string; url: string }) {
  const res = await sb("/rest/v1/media", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(row) });
  const [media] = (await res.json()) as { id: string }[];
  await dropOthers(row.place, media!.id);
  return media;
}

// সবার জন্য খোলা: শুধু তালিকা পড়া যায়
async function list() {
  const res = await sb("/rest/v1/media?select=id,kind,place,title,url,created_at&order=created_at.desc");
  return Response.json({ media: await res.json() }, { headers: { "cache-control": "public, s-maxage=20, stale-while-revalidate=60" } });
}

async function create(request: Request) {
  if (!isAdmin(request)) return json({ error: "অনুমতি নেই" }, 401);
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const place = String(body["place"] ?? "");
  const title = String(body["title"] ?? "").trim().slice(0, 120);
  if (!PLACE.test(place)) return json({ error: "জায়গার নাম ঠিক নয়" }, 400);

  if (body["action"] === "sign") {
    const type = TYPES[String(body["contentType"] ?? "")];
    const size = Number(body["size"]);
    if (!type) return json({ error: "ফাইলের ধরন চলবে না (JPG, PNG, WEBP, GIF, MP4, WEBM, MOV)" }, 400);
    if (!(size > 0) || size > MAX_BYTES) return json({ error: "ফাইল ৫০ MB-এর বেশি হতে পারবে না" }, 400);
    const path = `${place}/${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${type.ext}`;
    const res = await sb(`/storage/v1/object/upload/sign/${BUCKET}/${path}`, { method: "POST", body: "{}" });
    const { url } = (await res.json()) as { url: string };
    return json({ path, kind: type.kind, uploadUrl: `${SUPABASE_URL}/storage/v1${url}`, headers: publishableHeaders() });
  }

  if (body["action"] === "save") {
    const path = String(body["path"] ?? "");
    const kind = body["kind"] === "video" ? "video" : "image";
    if (!path.startsWith(`${place}/`) || !/^[a-z0-9-]+\/[a-z0-9.-]+$/.test(path)) return json({ error: "ফাইলের ঠিকানা ঠিক নয়" }, 400);
    const url = publicUrl(path);
    const head = await fetch(url, { method: "HEAD" });
    if (!head.ok) return json({ error: "ফাইল আপলোড সম্পূর্ণ হয়নি" }, 400);
    return json({ media: await insertRow({ kind, place, title, path, url }) });
  }

  if (body["action"] === "youtube") {
    const id = youtubeId(String(body["url"] ?? ""));
    if (!id) return json({ error: "YouTube লিংক ঠিক নয়" }, 400);
    return json({ media: await insertRow({ kind: "video", place, title, path: "", url: `https://www.youtube.com/watch?v=${id}` }) });
  }
  return json({ error: "অবৈধ অনুরোধ" }, 400);
}

async function remove(request: Request) {
  if (!isAdmin(request)) return json({ error: "অনুমতি নেই" }, 401);
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!UUID.test(id)) return json({ error: "অবৈধ আইডি" }, 400);
  const rows = (await (await sb(`/rest/v1/media?id=eq.${id}&select=path`)).json()) as { path: string }[];
  if (!rows.length) return json({ error: "পাওয়া যায়নি" }, 404);
  await sb(`/rest/v1/media?id=eq.${id}`, { method: "DELETE" });
  await removeObjects([rows[0]!.path]);
  return json({ ok: true });
}

export const GET = safe(() => list());
export const POST = safe(create);
export const DELETE = safe(remove);
