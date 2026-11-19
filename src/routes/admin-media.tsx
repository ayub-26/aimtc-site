import { createFileRoute } from "@tanstack/react-router";
import { Loader2, RotateCcw, Trash2, Upload, Youtube } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { AdminShell, adminFetch } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IMAGE_SLOTS, VIDEO_SLOTS } from "@/lib/media-slots";
import { isYoutube, youtubeId, type MediaRow } from "@/lib/media";

export const Route = createFileRoute("/admin-media")({
  head: () => ({ meta: [{ title: "ছবি ও ভিডিও" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: MediaTool,
});

const MAX = 50 * 1024 * 1024;
const OK_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm", "video/quicktime"];

function putFile(url: string, headers: Record<string, string>, file: File, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open("PUT", url);
    for (const [k, v] of Object.entries({ ...headers, "x-upsert": "false" })) x.setRequestHeader(k, v);
    x.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    x.onload = () => (x.status < 300 ? resolve() : reject(new Error(`আপলোড ব্যর্থ (${x.status}): ${x.responseText.slice(0, 150)}`)));
    x.onerror = () => reject(new Error("নেটওয়ার্ক সমস্যা, আবার চেষ্টা করুন"));
    const fd = new FormData();
    fd.append("cacheControl", "3600");
    fd.append("", file);
    x.send(fd);
  });
}

async function upload(file: File, place: string, title: string, onProgress: (p: number) => void): Promise<MediaRow> {
  if (!OK_TYPES.includes(file.type)) throw new Error("ফাইলের ধরন চলবে না (JPG, PNG, WEBP, GIF, MP4, WEBM, MOV)");
  if (file.size > MAX) throw new Error(`ফাইল ${(file.size / 1048576).toFixed(1)} MB। সর্বোচ্চ ৫০ MB`);
  const s = await adminFetch("/api/media", { method: "POST", body: JSON.stringify({ action: "sign", place, contentType: file.type, size: file.size }) });
  if (!s.ok) throw new Error(s.data["error"] ?? "অনুমতি পাওয়া যায়নি");
  await putFile(s.data["uploadUrl"], s.data["headers"], file, onProgress);
  const r = await adminFetch("/api/media", { method: "POST", body: JSON.stringify({ action: "save", place, title, path: s.data["path"], kind: s.data["kind"] }) });
  if (!r.ok) throw new Error(r.data["error"] ?? "সংরক্ষণ করা যায়নি");
  return r.data["media"];
}

async function addYoutube(url: string, place: string, title: string): Promise<MediaRow> {
  const r = await adminFetch("/api/media", { method: "POST", body: JSON.stringify({ action: "youtube", place, title, url }) });
  if (!r.ok) throw new Error(r.data["error"] ?? "লিংক যোগ করা যায়নি");
  return r.data["media"];
}

function Preview({ row, def }: { row?: MediaRow | undefined; def?: string | undefined }) {
  if (row?.kind === "video") {
    const yt = isYoutube(row.url) ? youtubeId(row.url) : null;
    return yt ? <img src={`https://img.youtube.com/vi/${yt}/hqdefault.jpg`} alt="" className="h-40 w-full rounded-xl object-cover" /> : <video src={`${row.url}#t=0.5`} preload="metadata" muted className="h-40 w-full rounded-xl bg-black object-cover" />;
  }
  const src = row?.url ?? def;
  return src ? <img src={src} alt="" className="h-40 w-full rounded-xl object-cover" /> : <div className="grid h-40 place-items-center rounded-xl bg-secondary text-sm text-muted-foreground">কোনো ভিডিও নেই</div>;
}

function MediaTool() {
  const [rows, setRows] = useState<MediaRow[]>([]);
  const [busy, setBusy] = useState("");
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("");
  const [yt, setYt] = useState<Record<string, string>>({});
  const [galleryTitle, setGalleryTitle] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const target = useRef("");

  const load = useCallback(() => {
    fetch("/api/media").then((r) => r.json()).then((d) => setRows(d.media ?? [])).catch(() => setMsg("তালিকা লোড হয়নি"));
  }, []);
  useEffect(load, [load]);

  const run = async (place: string, job: () => Promise<MediaRow>) => {
    setBusy(place);
    setProgress(0);
    setMsg("");
    try {
      await job();
      setMsg("✓ সংরক্ষিত হয়েছে");
      load();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "ব্যর্থ হয়েছে");
    }
    setBusy("");
  };

  const pick = (place: string) => {
    target.current = place;
    fileRef.current?.click();
  };
  const onFiles = async (files: FileList | null) => {
    const place = target.current;
    if (!files?.length) return;
    for (const f of Array.from(files)) await run(place, () => upload(f, place, place === "gallery" ? galleryTitle : "", setProgress));
    if (fileRef.current) fileRef.current.value = "";
    if (place === "gallery") setGalleryTitle("");
  };
  const remove = async (row: MediaRow, ask = true) => {
    if (ask && !confirm("মুছে ফেলবেন?")) return;
    const r = await adminFetch(`/api/media?id=${row.id}`, { method: "DELETE" });
    if (r.ok) load();
    else setMsg(r.data["error"] ?? "মোছা যায়নি");
  };
  const current = (key: string) => rows.find((r) => r.place === key);
  const gallery = rows.filter((r) => r.place === "gallery");
  const status = (key: string) => busy === key && <span className="text-xs text-muted-foreground"><Loader2 className="mr-1 inline size-3 animate-spin" />{progress ? `${progress}%` : "অপেক্ষা করুন..."}</span>;

  return (
    <AdminShell title="ছবি ও ভিডিও">
      <input ref={fileRef} type="file" hidden multiple accept="image/*,video/mp4,video/webm,video/quicktime" onChange={(e) => onFiles(e.target.files)} />
      <p className="-mt-4 mb-6 text-sm text-muted-foreground">ফাইল সর্বোচ্চ ৫০ MB। বদলালে সাইটে এক-দুই মিনিটের মধ্যে নতুন ছবি দেখা যায়।</p>
      {msg && <p className="mb-6 rounded-xl bg-card p-4 text-sm font-medium shadow-card">{msg}</p>}

      <h2 className="mb-4 text-xl font-bold">সাইটের ছবি</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGE_SLOTS.map((s) => {
          const row = current(s.key);
          return (
            <div key={s.key} className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-card">
              <Preview row={row} def={s.def} />
              <div className="flex items-center justify-between gap-2"><p className="text-sm font-bold">{s.label}</p><span className="shrink-0 text-xs text-muted-foreground">{row ? "আপনার ছবি" : "ডিফল্ট"}</span></div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="gold" className="rounded-full" disabled={!!busy} onClick={() => pick(s.key)}><Upload className="size-4" /> বদলান</Button>
                {row && <Button size="sm" variant="outline" className="rounded-full" onClick={() => remove(row)}><RotateCcw className="size-4" /> ডিফল্টে ফেরান</Button>}
                {status(s.key)}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mb-4 mt-12 text-xl font-bold">পেজের ভিডিও</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEO_SLOTS.map((s) => {
          const row = current(s.key);
          return (
            <div key={s.key} className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-card">
              <Preview row={row} />
              <p className="text-sm font-bold">{s.label}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="gold" className="rounded-full" disabled={!!busy} onClick={() => pick(s.key)}><Upload className="size-4" /> ভিডিও আপলোড</Button>
                {row && <Button size="sm" variant="outline" className="rounded-full" onClick={() => remove(row)}><Trash2 className="size-4" /> সরান</Button>}
                {status(s.key)}
              </div>
              <div className="flex gap-2">
                <Input placeholder="YouTube লিংক" value={yt[s.key] ?? ""} onChange={(e) => setYt({ ...yt, [s.key]: e.target.value })} />
                <Button size="icon" variant="outline" aria-label="YouTube লিংক যোগ" disabled={!!busy || !yt[s.key]} onClick={() => run(s.key, async () => { const r = await addYoutube(yt[s.key]!, s.key, ""); setYt({ ...yt, [s.key]: "" }); return r; })}><Youtube className="size-4" /></Button>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mb-4 mt-12 text-xl font-bold">গ্যালারি ({gallery.length}টি আপনার যোগ করা)</h2>
      <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-card">
        <Input placeholder="শিরোনাম (ঐচ্ছিক, পরের আপলোডে বসবে)" maxLength={120} value={galleryTitle} onChange={(e) => setGalleryTitle(e.target.value)} />
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="gold" className="rounded-full" disabled={!!busy} onClick={() => pick("gallery")}><Upload className="size-4" /> ছবি / ভিডিও যোগ করুন (একসাথে অনেক বাছা যায়)</Button>
          {status("gallery")}
        </div>
        <div className="flex gap-2">
          <Input placeholder="অথবা YouTube লিংক" value={yt["gallery"] ?? ""} onChange={(e) => setYt({ ...yt, gallery: e.target.value })} />
          <Button variant="outline" disabled={!!busy || !yt["gallery"]} onClick={() => run("gallery", async () => { const r = await addYoutube(yt["gallery"]!, "gallery", galleryTitle); setYt({ ...yt, gallery: "" }); setGalleryTitle(""); return r; })}><Youtube className="size-4" /> যোগ</Button>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((g) => (
          <div key={g.id} className="space-y-2 rounded-2xl border border-border bg-card p-3 shadow-card">
            <Preview row={g} />
            <div className="flex items-center justify-between gap-2"><p className="truncate text-sm font-medium">{g.title || (g.kind === "video" ? "ভিডিও" : "ছবি")}</p>
              <Button size="icon" variant="outline" aria-label="মুছুন" onClick={() => remove(g)}><Trash2 className="size-4" /></Button></div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">সাইটের আগের ৬টি ডিফল্ট গ্যালারি ছবি কোডে আছে, সেগুলো এখান থেকে মোছা যায় না। নতুনগুলো সবার আগে দেখায়।</p>
    </AdminShell>
  );
}
