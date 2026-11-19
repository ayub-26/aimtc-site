import { del, put } from "@vercel/blob";

import { isAdmin, json, MAX_CHARS, monthKey, monthlyLimit, readState, usageOf, writeState } from "./_lib.js";

export const maxDuration = 60;

// যেকোনো ভেতরের ত্রুটি যেন পেজে আসল কারণসহ দেখা যায়
const safe = (fn: (request: Request) => Promise<Response>) => async (request: Request) => {
  try {
    return await fn(request);
  } catch (error) {
    console.error(error);
    return json({ error: `সার্ভার ত্রুটি: ${error instanceof Error ? error.message : String(error)}` }, 500);
  }
};

async function denied(request: Request) {
  if (isAdmin(request)) return null;
  await new Promise((r) => setTimeout(r, 800)); // ভুল পাসওয়ার্ডে একটু দেরি
  return json({ error: "অনুমতি নেই" }, 401);
}

async function handleGET(request: Request) {
  return (await denied(request)) ?? json({ usage: usageOf(await readState()) });
}

async function handlePOST(request: Request) {
  const no = await denied(request);
  if (no) return no;
  const apiKey = process.env["CARTESIA_API_KEY"];
  if (!apiKey) return json({ error: "CARTESIA_API_KEY সেট করা নেই" }, 500);

  let body: { text?: unknown; title?: unknown; lang?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "অবৈধ অনুরোধ" }, 400);
  }
  const text = String(body.text ?? "").trim();
  const title = String(body.title ?? "").trim().slice(0, 80) || "অডিও";
  const lang = String(body.lang ?? "").trim().slice(0, 20) || "বাংলা";
  if (!text || text.length > MAX_CHARS) return json({ error: `লেখা ১–${MAX_CHARS} অক্ষরের মধ্যে হতে হবে` }, 400);

  const state = await readState();
  const used = state.usage[monthKey()] ?? { chars: 0, count: 0 };
  if (used.chars + text.length > monthlyLimit()) {
    return json({ error: "এই মাসের সীমা শেষ। পরের মাসে আবার চেষ্টা করুন।", usage: usageOf(state) }, 429);
  }

  const res = await fetch("https://api.cartesia.ai/tts/bytes", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey, "Cartesia-Version": "2026-08-14" },
    body: JSON.stringify({
      model_id: "sonic-3.6",
      transcript: text,
      voice: "076a691d-e49f-4a5f-a177-64660542c578",
      output_format: { container: "wav", encoding: "pcm_s16le", sample_rate: 44100 },
      generation_config: { speed: 1, volume: 1 },
    }),
  });
  if (!res.ok) return json({ error: `Cartesia ${res.status}: ${(await res.text()).slice(0, 200)}` }, 502);

  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  const blob = await put(`audio/${id}.wav`, Buffer.from(await res.arrayBuffer()), {
    access: "public",
    contentType: "audio/wav",
    addRandomSuffix: false,
  });
  const clip = { id, title, lang, text, url: blob.url, createdAt: new Date().toISOString() };
  state.clips.unshift(clip);
  state.usage[monthKey()] = { chars: used.chars + text.length, count: used.count + 1 };
  await writeState(state);
  return json({ clip, usage: usageOf(state) });
}

async function handleDELETE(request: Request) {
  const no = await denied(request);
  if (no) return no;
  const id = new URL(request.url).searchParams.get("id");
  const state = await readState();
  const clip = state.clips.find((c) => c.id === id);
  if (!clip) return json({ error: "পাওয়া যায়নি" }, 404);
  await del(clip.url);
  state.clips = state.clips.filter((c) => c.id !== id);
  await writeState(state); // মুছলেও এই মাসের ব্যবহার ফেরত আসে না (খরচ হয়ে গেছে)
  return json({ ok: true, usage: usageOf(state) });
}

export const GET = safe(handleGET);
export const POST = safe(handlePOST);
export const DELETE = safe(handleDELETE);
