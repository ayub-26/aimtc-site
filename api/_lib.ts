import { BlobNotFoundError, head, put } from "@vercel/blob";
import { timingSafeEqual } from "node:crypto";

export type Clip = { id: string; title: string; lang: string; text: string; url: string; createdAt: string };
export type State = { clips: Clip[]; usage: Record<string, { chars: number; count: number }> };

export const MAX_CHARS = 500; // এক অডিওতে সর্বোচ্চ অক্ষর
export const monthlyLimit = () => Number(process.env["MONTHLY_CHAR_LIMIT"]) || 5000; // মাসে মোট অক্ষর
export const monthKey = () => new Date().toISOString().slice(0, 7);

const STATE_PATH = "state/state.json";

export async function readState(): Promise<State> {
  try {
    const meta = await head(STATE_PATH);
    const res = await fetch(`${meta.url}?t=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`state ${res.status}`);
    const s = (await res.json()) as Partial<State>;
    return { clips: s.clips ?? [], usage: s.usage ?? {} };
  } catch (error) {
    if (error instanceof BlobNotFoundError) return { clips: [], usage: {} };
    throw error;
  }
}

export async function writeState(state: State) {
  await put(STATE_PATH, JSON.stringify(state), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

// শুধু ADMIN_PASSWORD জানা ব্যক্তি অডিও বানাতে/মুছতে পারবে
export function isAdmin(request: Request): boolean {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) return false;
  const given = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "cache-control": "no-store" } });

export function usageOf(state: State) {
  const used = state.usage[monthKey()]?.chars ?? 0;
  const limit = monthlyLimit();
  return { used, limit, remaining: Math.max(0, limit - used), maxChars: MAX_CHARS };
}
