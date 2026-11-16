import { useEffect, useState, type FormEvent, type ReactNode } from "react";

// পাসওয়ার্ড বদলাতে: নতুন পাসওয়ার্ডের SHA-256 হ্যাশ বের করে নিচে বসান
// (টার্মিনালে: printf 'নতুন-পাসওয়ার্ড' | sha256sum)
const PASSWORD_HASH = "8a3d1c02560bc5c51effef721c09e5ca192a8eb98084dc3c5a0c1630f397c2bf";
const STORAGE_KEY = "aimtc-auth";

async function sha256(text: string) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function PasswordGate({ children }: { children: ReactNode }) {
  // null = এখনো যাচাই হচ্ছে, true = ঢুকেছে, false = পাসওয়ার্ড লাগবে
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(STORAGE_KEY) === PASSWORD_HASH);
    } catch {
      setUnlocked(false);
    }
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const hash = await sha256(value.trim());
    if (hash === PASSWORD_HASH) {
      try {
        localStorage.setItem(STORAGE_KEY, hash);
      } catch {
        /* ignore */
      }
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  if (unlocked === null) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-center shadow-sm"
      >
        <img src="/icons/icon-192.png" alt="" className="mx-auto h-20 w-20 rounded-full" />
        <h1 className="mt-4 text-lg font-bold text-foreground">
          আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">প্রবেশ করতে পাসওয়ার্ড দিন</p>
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="পাসওয়ার্ড"
          autoFocus
          className="mt-5 w-full rounded-md border border-input bg-background px-3 py-2 text-center text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {error && <p className="mt-2 text-sm text-red-600">পাসওয়ার্ড ভুল হয়েছে</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          প্রবেশ করুন
        </button>
      </form>
    </div>
  );
}
