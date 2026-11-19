import { BlobNotFoundError, head, put } from "@vercel/blob";
import { createHmac, timingSafeEqual } from "node:crypto";

export type Clip = { id: string; title: string; lang: string; text: string; url: string; createdAt: string };
export type State = { clips: Clip[]; usage: Record<string, { chars: number; count: number }> };

export const MAX_CHARS = 500; // এক অডিওতে সর্বোচ্চ অক্ষর
export const monthlyLimit = () => Number(process.env["MONTHLY_CHAR_LIMIT"]) || 5000; // মাসে মোট অক্ষর
export const monthKey = () => new Date().toISOString().slice(0, 7);

const STATE_PATH = "state/state.json";

// Vercel-এ প্রিফিক্স দিয়ে স্টোর জোড়া হলে নাম PUBLIC_BLOB_READ_WRITE_TOKEN হয়; দুটোই চলবে
export const blobToken = process.env["BLOB_READ_WRITE_TOKEN"] || process.env["PUBLIC_BLOB_READ_WRITE_TOKEN"];

export async function readState(): Promise<State> {
  try {
    const meta = await head(STATE_PATH, { token: blobToken });
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
    token: blobToken,
    cacheControlMaxAge: 60,
  });
}

const COOKIE = "aimtc_session";
const SESSION_SECONDS = 12 * 60 * 60; // ১২ ঘণ্টা পর আবার লগইন

const sign = (exp: string) =>
  createHmac("sha256", `${process.env["SESSION_SECRET"] || process.env["ADMIN_PASSWORD"] || ""}|aimtc`).update(exp).digest("hex");

const same = (x: string, y: string) => {
  const a = Buffer.from(x);
  const b = Buffer.from(y);
  return a.length === b.length && timingSafeEqual(a, b);
};

export const passwordMatches = (given: string) => {
  const expected = process.env["ADMIN_PASSWORD"];
  return !!expected && same(given.slice(0, 200), expected);
};

export function makeSessionCookie() {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${COOKIE}=${exp}.${sign(exp)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${SESSION_SECONDS}`;
}
export const clearSessionCookie = () => `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;

// লগইন করা অ্যাডমিন কি না (cookie দেখে)
export function isAdmin(request: Request): boolean {
  if (!process.env["ADMIN_PASSWORD"]) return false;
  const raw = (request.headers.get("cookie") ?? "")
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  const [exp, sig] = (raw ?? "").split(".");
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return same(sig, sign(exp));
}

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  Response.json(data, { status, headers: { "cache-control": "no-store", ...headers } });

export function usageOf(state: State) {
  const used = state.usage[monthKey()]?.chars ?? 0;
  const limit = monthlyLimit();
  return { used, limit, remaining: Math.max(0, limit - used), maxChars: MAX_CHARS };
}
