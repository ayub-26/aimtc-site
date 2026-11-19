// Supabase-এর সাথে কথা বলার ছোট সহায়ক (কোনো SDK ছাড়া)
export const SUPABASE_URL = (process.env["SUPABASE_URL"] || "https://jjmwweiyfftntjeomtng.supabase.co").replace(/\/+$/, "");
export const BUCKET = "site-media";

// নতুন sb_… চাবি শুধু apikey হেডারে যায়; পুরোনো JWT (eyJ…) চাবি Bearer-ও চায়
const keyHeaders = (key: string): Record<string, string> =>
  key.startsWith("eyJ") ? { apikey: key, Authorization: `Bearer ${key}` } : { apikey: key };

export function publishableHeaders() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!key) throw new Error("SUPABASE_PUBLISHABLE_KEY সেট করা নেই");
  return keyHeaders(key);
}

// সার্ভারের গোপন চাবি দিয়ে অনুরোধ (এটা ব্রাউজারে যায় না)
export async function sb(path: string, init: RequestInit = {}) {
  const key = process.env["SUPABASE_SECRET_KEY"];
  if (!key) throw new Error("SUPABASE_SECRET_KEY সেট করা নেই");
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...keyHeaders(key), ...(init.headers as Record<string, string> | undefined) },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res;
}

export const publicUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${path}`;

export async function removeObjects(paths: string[]) {
  const prefixes = paths.filter(Boolean);
  if (prefixes.length) await sb(`/storage/v1/object/${BUCKET}`, { method: "DELETE", body: JSON.stringify({ prefixes }) });
}
