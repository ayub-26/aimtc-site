// ব্যবহার: node --env-file=.env scripts/generate-audio.mjs [clip-id]
// src/lib/audio-clips.json-এর প্রতিটি লেখা Cartesia দিয়ে অডিও করে public/audio/ ফোল্ডারে রাখে।
// API key শুধু আপনার কম্পিউটারে থাকে, ওয়েবসাইটে যায় না।
import { mkdir, readFile, writeFile } from "node:fs/promises";

const apiKey = process.env.CARTESIA_API_KEY;
if (!apiKey) {
  console.error("CARTESIA_API_KEY পাওয়া যায়নি। .env ফাইলে CARTESIA_API_KEY=... লিখুন।");
  process.exit(1);
}

const clips = JSON.parse(await readFile(new URL("../src/lib/audio-clips.json", import.meta.url), "utf8"));
const outDir = new URL("../public/audio/", import.meta.url);
await mkdir(outDir, { recursive: true });

for (const clip of clips) {
  if (process.argv[2] && process.argv[2] !== clip.id) continue;
  const res = await fetch("https://api.cartesia.ai/tts/bytes", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-API-Key": apiKey, "Cartesia-Version": "2026-08-14" },
    body: JSON.stringify({
      model_id: "sonic-3.6",
      transcript: clip.text,
      voice: "076a691d-e49f-4a5f-a177-64660542c578",
      output_format: { container: "wav", encoding: "pcm_s16le", sample_rate: 44100 },
      generation_config: { speed: 1, volume: 1 },
    }),
  });
  if (!res.ok) {
    console.error(`✗ ${clip.id}: ${res.status} ${await res.text()}`);
    process.exitCode = 1;
    continue;
  }
  await writeFile(new URL(`${clip.id}.wav`, outDir), Buffer.from(await res.arrayBuffer()));
  console.log(`✓ public/audio/${clip.id}.wav`);
}
