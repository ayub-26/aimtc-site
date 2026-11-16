import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Phone } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { PageHero } from "@/components/site/ornament";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { joinSchema } from "@/lib/join-schema";
import { PROGRAMS, SITE } from "@/lib/site-data";

export const Route = createFileRoute("/join")({
  validateSearch: (search: Record<string, unknown>): { program?: string | undefined } => {
    const program = search["program"];
    return typeof program === "string" ? { program: program.slice(0, 100) } : {};
  },
  head: () => ({
    meta: [
      { title: "Join Now — ভর্তি ফর্ম | আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "অনলাইনে ভর্তি ফর্ম পূরণ করুন। নাজেরা, হিফজ, মাইন্ড ট্রেনিং, হাদিস, আরবি ও মহিলা বিভাগে ভর্তি চলছে।" },
      { property: "og:title", content: "Join Now — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { property: "og:description", content: "আজই নিবন্ধন করুন, আমাদের টিম দ্রুত যোগাযোগ করবে ইনশাআল্লাহ।" },
    ],
  }),
  component: JoinPage,
});

type Errors = Partial<Record<"fullName" | "phone" | "email" | "age" | "program" | "message", string>>;

function JoinPage() {
  const { program: preselected } = Route.useSearch();
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const validPreselect = PROGRAMS.some((p) => p.title === preselected) ? preselected : "";

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const parsed = joinSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setPending(true);
    const d = parsed.data;
    const text = [
      "আসসালামু আলাইকুম, আমি ভর্তি হতে চাই।",
      `নাম: ${d.fullName}`,
      `ফোন: ${d.phone}`,
      d.email ? `ইমেইল: ${d.email}` : "",
      d.age !== undefined && d.age !== "" ? `বয়স: ${d.age}` : "",
      `প্রোগ্রাম: ${d.program}`,
      d.message ? `বার্তা: ${d.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setPending(false);
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageHero
        arabic="مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا"
        eyebrow="Join Now"
        title="ভর্তি ফর্ম"
        description="নিচের ফর্মটি পূরণ করুন। আমাদের টিম আপনার সাথে ফোনে যোগাযোগ করে বিস্তারিত জানাবে ইনশাআল্লাহ।"
      />

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          {done ? (
            <div className="rounded-3xl border border-gold/40 bg-card p-10 text-center shadow-soft">
              <CheckCircle2 className="mx-auto size-16 text-primary" />
              <h2 className="mt-5 text-3xl font-bold">জাযাকাল্লাহু খাইরান!</h2>
              <p className="mt-3 text-lg text-muted-foreground">WhatsApp-এ বার্তাটি পাঠিয়ে দিন (না খুললে নিচের ফোন নম্বরে কল করুন)। আমরা শীঘ্রই যোগাযোগ করব ইনশাআল্লাহ।</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild variant="deep" className="rounded-full px-6">
                  <Link to="/">হোমে ফিরে যান</Link>
                </Button>
                <Button variant="outline" className="rounded-full px-6" onClick={() => setDone(false)}>
                  আরেকজনের নিবন্ধন করুন
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <Field label="পূর্ণ নাম *" htmlFor="fullName" error={errors.fullName}>
                  <Input id="fullName" name="fullName" maxLength={100} placeholder="যেমন: মুহাম্মাদ আব্দুল্লাহ" aria-invalid={!!errors.fullName} />
                </Field>
                <Field label="ফোন নম্বর *" htmlFor="phone" error={errors.phone}>
                  <Input id="phone" name="phone" type="tel" maxLength={20} placeholder="01XXXXXXXXX" aria-invalid={!!errors.phone} />
                </Field>
                <Field label="ইমেইল (ঐচ্ছিক)" htmlFor="email" error={errors.email}>
                  <Input id="email" name="email" type="email" maxLength={255} placeholder="you@example.com" aria-invalid={!!errors.email} />
                </Field>
                <Field label="শিক্ষার্থীর বয়স (ঐচ্ছিক)" htmlFor="age" error={errors.age}>
                  <Input id="age" name="age" type="number" min={4} max={100} placeholder="যেমন: ১০" aria-invalid={!!errors.age} />
                </Field>
              </div>

              <Field label="প্রোগ্রাম নির্বাচন করুন *" htmlFor="program" error={errors.program}>
                <select
                  id="program"
                  name="program"
                  defaultValue={validPreselect}
                  aria-invalid={!!errors.program}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="" disabled>
                    — একটি প্রোগ্রাম বেছে নিন —
                  </option>
                  {PROGRAMS.map((p) => (
                    <option key={p.slug} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="আপনার বার্তা (ঐচ্ছিক)" htmlFor="message" error={errors.message}>
                <Textarea id="message" name="message" rows={4} maxLength={1000} placeholder="কোনো প্রশ্ন বা বিশেষ তথ্য থাকলে লিখুন" />
              </Field>

              <Button type="submit" variant="gold" size="xl" className="w-full" disabled={pending}>
                {pending ? <Loader2 className="animate-spin" /> : null}
                {pending ? "খুলছে..." : "WhatsApp-এ পাঠান"}
              </Button>

              <p className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                <Phone className="size-4" /> সরাসরি কথা বলতে কল করুন:{" "}
                <a href={`tel:${SITE.phone}`} className="font-semibold text-primary">
                  {SITE.phoneDisplay}
                </a>
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({ label, htmlFor, error, children }: { label: string; htmlFor: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold">{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
