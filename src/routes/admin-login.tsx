import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin-login")({
  head: () => ({ meta: [{ title: "অ্যাডমিন লগইন" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth").then((r) => r.ok && navigate({ to: "/admin" })).catch(() => {});
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) return void navigate({ to: "/admin" });
      setError(data.error ?? "লগইন করা যায়নি");
    } catch {
      setError("সার্ভারে সংযোগ হয়নি");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="pattern-islamic grid min-h-screen place-items-center bg-gradient-deep px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-3xl border border-gold/30 bg-card p-8 shadow-soft">
        <div className="text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-gradient-gold text-deep shadow-gold"><Lock className="size-6" /></span>
          <h1 className="mt-4 text-2xl font-bold">অ্যাডমিন লগইন</h1>
          <p className="text-sm text-muted-foreground">শুধু আইয়ুব স্যারের জন্য</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">পাসওয়ার্ড</Label>
          <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button type="submit" variant="gold" className="w-full rounded-full" disabled={busy || !password}>
          {busy ? <Loader2 className="animate-spin" /> : null}প্রবেশ করুন
        </Button>
      </form>
    </div>
  );
}
