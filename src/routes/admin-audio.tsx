import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminShell, adminFetch } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin-audio")({
  head: () => ({ meta: [{ title: "অডিও টুল" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AudioTool,
});

type Usage = { used: number; limit: number; remaining: number; maxChars: number };
type Clip = { id: string; title: string; lang: string; text: string; url: string; createdAt: string };

function AudioTool() {
  const [usage, setUsage] = useState<Usage | null>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  const [form, setForm] = useState({ title: "", lang: "বাংলা", text: "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    void adminFetch("/api/generate").then((r) => r.ok && setUsage(r.data["usage"]));
    fetch("/api/clips").then((r) => r.json()).then((d) => setClips(d.clips ?? [])).catch(() => setMsg("তালিকা লোড হয়নি"));
  }, []);

  const generate = async () => {
    setBusy(true);
    setMsg("");
    const r = await adminFetch("/api/generate", { method: "POST", body: JSON.stringify(form) });
    setBusy(false);
    if (r.data["usage"]) setUsage(r.data["usage"]);
    if (!r.ok) return setMsg(r.data["error"] ?? "তৈরি করা যায়নি");
    setClips((c) => [r.data["clip"], ...c]);
    setForm({ ...form, title: "", text: "" });
    setMsg("✓ অডিও তৈরি ও সংরক্ষিত হয়েছে");
  };

  const remove = async (c: Clip) => {
    if (!confirm(`"${c.title}" মুছে ফেলবেন?`)) return;
    const r = await adminFetch(`/api/generate?id=${c.id}`, { method: "DELETE" });
    if (r.ok) setClips((list) => list.filter((x) => x.id !== c.id));
    else setMsg(r.data["error"] ?? "মোছা যায়নি");
  };

  const pct = usage ? Math.min(100, (usage.used / usage.limit) * 100) : 0;
  const max = usage?.maxChars ?? 500;
  return (
    <AdminShell title="অডিও টুল">
      <div className="space-y-8">
        {usage && (
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
            <div className="flex justify-between text-sm font-bold"><span>এই মাসের ব্যবহার</span><span>{usage.used} / {usage.limit} অক্ষর</span></div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-gradient-gold" style={{ width: `${pct}%` }} /></div>
            <p className="mt-2 text-xs text-muted-foreground">বাকি আছে {usage.remaining} অক্ষর। প্রতি অডিওতে সর্বোচ্চ {usage.maxChars} অক্ষর।</p>
          </div>
        )}
        <div className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-card">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="title">শিরোনাম</Label><Input id="title" maxLength={80} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-2"><Label htmlFor="lang">ভাষা (লেবেল)</Label>
              <select id="lang" value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option>বাংলা</option><option>English</option></select></div>
          </div>
          <div className="space-y-2"><Label htmlFor="text">লেখা</Label>
            <Textarea id="text" rows={5} maxLength={max} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
            <p className="text-xs text-muted-foreground">{form.text.length} / {max}</p></div>
          <Button variant="gold" className="rounded-full px-6" disabled={busy || !form.text.trim()} onClick={generate}>
            {busy ? <Loader2 className="animate-spin" /> : null}{busy ? "তৈরি হচ্ছে..." : "অডিও তৈরি করুন"}</Button>
          {msg && <p className="text-sm font-medium">{msg}</p>}
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">সংরক্ষিত অডিও ({clips.length})</h2>
          {clips.map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between gap-3">
                <div><p className="font-bold">{c.title}</p><p className="text-xs text-muted-foreground">{c.lang} · {new Date(c.createdAt).toLocaleString("bn-BD")}</p></div>
                <Button variant="outline" size="icon" aria-label="মুছুন" onClick={() => remove(c)}><Trash2 className="size-4" /></Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              <audio className="mt-3 w-full" controls preload="none" src={c.url} />
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
