import { clearSessionCookie, isAdmin, json, makeSessionCookie, passwordMatches } from "./_lib.js";

// ভুল পাসওয়ার্ড বারবার দিলে সাময়িক বন্ধ (সার্ভারলেস বলে এটা পুরো নিরাপত্তা নয়, লম্বা পাসওয়ার্ডই আসল ভরসা)
const fails = new Map<string, { n: number; until: number }>();
const ipOf = (r: Request) => r.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

export async function GET(request: Request) {
  return isAdmin(request) ? json({ ok: true }) : json({ error: "লগইন করুন" }, 401);
}

export async function POST(request: Request) {
  const ip = ipOf(request);
  let f = fails.get(ip);
  if (f && f.until && f.until <= Date.now()) { fails.delete(ip); f = undefined; }
  if (f && f.until > Date.now()) return json({ error: "অনেকবার ভুল হয়েছে। ১৫ মিনিট পরে চেষ্টা করুন।" }, 429);
  if (!process.env["ADMIN_PASSWORD"]) return json({ error: "ADMIN_PASSWORD সেট করা নেই" }, 500);

  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "অবৈধ অনুরোধ" }, 400);
  }
  if (!passwordMatches(String(body.password ?? ""))) {
    const n = (f?.n ?? 0) + 1;
    fails.set(ip, { n, until: n >= 5 ? Date.now() + 15 * 60_000 : 0 });
    await new Promise((r) => setTimeout(r, 800));
    return json({ error: "পাসওয়ার্ড ভুল" }, 401);
  }
  fails.delete(ip);
  return json({ ok: true }, 200, { "set-cookie": makeSessionCookie() });
}

export async function DELETE() {
  return json({ ok: true }, 200, { "set-cookie": clearSessionCookie() });
}
