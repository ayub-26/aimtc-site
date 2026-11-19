import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Mic } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";

// নতুন টুল যোগ করতে: এখানে একটি লাইন + একটি নতুন `admin-<নাম>.tsx` পেজ
export const ADMIN_TOOLS = [
  { to: "/admin-audio", title: "অডিও টুল", desc: "লেখা থেকে কণ্ঠে অডিও বানান, সংরক্ষণ ও মুছুন, মাসিক সীমা দেখুন।", Icon: Mic },
] as const;

export async function adminFetch(path: string, init: RequestInit = {}) {
  const res = await fetch(path, { ...init, headers: { "Content-Type": "application/json" } });
  if (res.status === 401) window.location.assign("/admin-login");
  const data = (await res.json().catch(() => ({}))) as Record<string, any>;
  return { ok: res.ok, status: res.status, data };
}

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => (r.ok ? setReady(true) : navigate({ to: "/admin-login" })))
      .catch(() => navigate({ to: "/admin-login" }));
  }, [navigate]);

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    navigate({ to: "/admin-login" });
  };

  if (!ready) return <p className="grid min-h-screen place-items-center text-muted-foreground">যাচাই হচ্ছে...</p>;
  return (
    <div className="min-h-screen bg-parchment">
      <header className="bg-gradient-deep text-gold">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link to="/admin" className="font-display text-lg font-bold">Ayub International · অ্যাডমিন</Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/admin" className="rounded-full px-3 py-1.5 hover:bg-deep-foreground/10">ড্যাশবোর্ড</Link>
            <Link to="/" className="rounded-full px-3 py-1.5 hover:bg-deep-foreground/10">সাইট দেখুন</Link>
            <Button size="sm" variant="outline" className="rounded-full" onClick={logout}><LogOut className="size-4" /> লগআউট</Button>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-8 font-display text-3xl font-bold text-foreground">{title}</h1>
        {children}
      </div>
    </div>
  );
}
