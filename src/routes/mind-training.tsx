import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { JoinCta } from "@/components/site/join-cta";
import { PageHero, SectionHeading } from "@/components/site/ornament";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BRAIN_BODY_BEHAVIOUR, CLASS_GROUPS, CORE_FLOW, D3_STEPS, DETAILS, EIGHT_PILLARS, FAQ, FINAL_FLOW,
  FOUNDATIONS, JOURNEY, MIND_PROGRAMS, PARENT_TEACHER, SKILLS, VALUES,
} from "@/lib/mind-data";
import { SITE } from "@/lib/site-data";

const TITLE = "মাইন্ড ট্রেনিং — 3D সিস্টেম ও AYUB মডেল | আইয়ুব ইন্টারন্যাশনাল";

export const Route = createFileRoute("/mind-training")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "Focus → Meaning → Action: 3D Mind Training System, ৮টি উন্নয়ন স্তম্ভ, ১২টি প্রোগ্রাম, দক্ষতা গাইড ও প্রশ্নোত্তর।" },
      { property: "og:title", content: TITLE },
    ],
  }),
  component: MindTrainingPage,
});

type Skill = (typeof SKILLS)[number];
const card = "rounded-3xl border border-border bg-card p-7 shadow-card";
const icon = "grid size-12 place-items-center rounded-2xl bg-gradient-gold text-2xl shadow-gold";
const label = "mt-4 text-xs font-bold tracking-wider text-primary";
const Bullets = ({ items, dark }: { items: string[]; dark?: boolean }) => (
  <ul className={`mt-3 space-y-2 text-sm ${dark ? "text-deep-muted" : "text-muted-foreground"}`}>
    {items.map((t) => (
      <li key={t} className="flex gap-2"><span className="mt-1.5 size-2 shrink-0 rotate-45 bg-gold" />{t}</li>
    ))}
  </ul>
);
const Flow = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
    {items.map((t, i) => (
      <span key={t} className="flex items-center gap-2">
        <span className="rounded-full bg-secondary px-4 py-2 text-secondary-foreground">{t}</span>
        {i < items.length - 1 && <span className="text-gold">→</span>}
      </span>
    ))}
  </div>
);

function MindTrainingPage() {
  const [skill, setSkill] = useState<Skill | null>(null);
  const [w, setW] = useState({ w1: "", w2: "", w3: "", w4: "", w5: "" });
  const sendWork = () => {
    const g = (k: keyof typeof w) => w[k].trim() || "—";
    const text = `🧠 *AYUB INTERNATIONAL — Daily 5-Minute Mind Training*\n📌 Situation: ${g("w1")}\n🎯 My Focus: ${g("w2")}\n💡 My Meaning: ${g("w3")}\n🚀 My Action: ${g("w4")}\n📖 What I Learned: ${g("w5")}`;
    window.open(`${SITE.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };
  const fields: [keyof typeof w, string][] = [
    ["w1", "Situation — ঘটনা"], ["w2", "My Focus — আমার মনোযোগ"], ["w3", "My Meaning — আমার অর্থ"],
    ["w4", "My Action — আমার পদক্ষেপ"], ["w5", "What I Learned — যা শিখলাম"],
  ];

  return (
    <>
      <PageHero
        eyebrow="3D Mind Training System"
        title="Train Your Mind, Change Your Life"
        description="মনোযোগ, অর্থ ও পদক্ষেপের 3D সিস্টেম এবং চরিত্র গঠনের ধাপে ধাপে প্রশিক্ষণ। প্রশিক্ষক ও প্রতিষ্ঠাতা: আবু আইয়ুব আনসারী, ঢাকা।"
      />

      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="আমাদের চার ভিত্তি" title="প্রতিটি ক্লাস এই চারটি ভিত্তির ওপর দাঁড়িয়ে" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FOUNDATIONS.map((f) => (
              <div key={f.title} className={card}><span className={icon}>{f.icon}</span>
                <h3 className="mt-5 text-xl font-bold">{f.title}</h3><p className="mt-2 text-sm text-muted-foreground">{f.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="d3" className="pattern-islamic bg-gradient-deep px-4 py-24 text-gold">
        <div className="mx-auto max-w-6xl">
          <SectionHeading tone="dark" eyebrow="3D Mind Training System" title="Three Questions That Can Transform Your Thinking"
            description="জীবনের যেকোনো ঘটনার পর এই তিনটি সিদ্ধান্তই আপনার পরবর্তী পথ ঠিক করে: কীসে মনোযোগ দিচ্ছেন, কী অর্থ দিচ্ছেন এবং কী পদক্ষেপ নিচ্ছেন।" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {D3_STEPS.map((s) => (
              <div key={s.title} className="rounded-3xl border border-gold/30 bg-deep-foreground/10 p-7">
                <div className="flex items-center justify-between"><span className="text-4xl">{s.icon}</span><span className="font-display text-5xl font-bold text-gold/40">{s.no}</span></div>
                <h3 className="mt-3 text-2xl font-bold text-deep-foreground">{s.title}</h3>
                <p className="mt-2 font-semibold text-deep-foreground">{s.question}</p>
                <p className="mt-2 text-sm text-deep-muted">{s.description}</p>
                <p className="mt-4 text-xs font-bold tracking-wider">TRAINING QUESTION</p>
                <p className="mt-1 rounded-xl bg-deep-foreground/10 p-3 text-deep-foreground">{s.trainingQuestion}</p>
                <p className={label + " text-gold"}>নিজেকে জিজ্ঞেস করো</p>
                <Bullets dark items={s.selfAsk} />
                <p className="mt-4 text-sm font-semibold text-gold">Mind Training Principle: {s.principle}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center text-deep-muted">আপনি সবসময় ঘটনা নিয়ন্ত্রণ করতে পারবেন না, কিন্তু নিজের Focus, Meaning ও Action নিয়ন্ত্রণ করতে নিজেকে প্রশিক্ষিত করতে পারবেন।</p>
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="⏱️ Daily 5-Minute Mind Training" title="প্রতিদিন ৫ মিনিটের অনুশীলন"
            description="দিনের একটি ঘটনা বেছে নিয়ে এই ৩টি প্রশ্নের উত্তর লিখুন। তারপর প্রশিক্ষককে WhatsApp-এ পাঠান।" />
          <div className="mt-10 space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
            {fields.map(([k, l]) => (
              <div key={k} className="space-y-2"><Label htmlFor={k} className="font-semibold">{l}</Label>
                <Textarea id={k} rows={2} maxLength={500} value={w[k]} onChange={(e) => setW({ ...w, [k]: e.target.value })} /></div>
            ))}
            <div className="flex flex-wrap gap-3">
              <Button variant="gold" className="rounded-full px-6" onClick={sendWork}>প্রশিক্ষককে পাঠান</Button>
              <Button variant="outline" className="rounded-full px-6" onClick={() => window.print()}>প্রিন্ট করুন</Button>
            </div>
          </div>
        </div>
      </section>

      <section id="ayub" className="bg-parchment px-4 py-24 text-primary">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="AYUB INTERNATIONAL CORE MESSAGE" title="Mind–Character–Life Development System"
            description="Train the Mind • Build the Character • Shape the Future — মন, চরিত্র ও জীবন গড়ার আমাদের নিজস্ব সমন্বিত সিস্টেম।" />
          <p className="mt-10 text-center text-sm font-bold text-foreground">মূল ফর্মুলা</p>
          <div className="mt-3"><Flow items={CORE_FLOW} /></div>
          <h3 className="mt-14 text-center text-2xl font-bold text-foreground">৮টি উন্নয়ন স্তম্ভ</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {EIGHT_PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl bg-card p-5 text-center shadow-card"><div className="text-3xl">{p.icon}</div>
                <p className="mt-2 font-bold text-foreground">{p.title}</p><p className="text-xs text-muted-foreground">{p.text}</p></div>
            ))}
          </div>
          <h3 className="mt-14 text-center text-2xl font-bold text-foreground">প্রশিক্ষণের বিস্তারিত</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DETAILS.map((d) => (
              <div key={d.title} className={card}><span className={icon}>{d.icon}</span>
                <h4 className="mt-4 text-lg font-bold text-foreground">{d.title}</h4>
                <p className="mt-1 text-sm font-semibold text-primary">{d.formula}</p><Bullets items={d.points} />
                <p className="mt-4 rounded-xl bg-secondary p-3 text-sm font-medium text-secondary-foreground">{d.note}</p></div>
            ))}
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className={card}><h3 className="text-xl font-bold text-foreground">☪️ Islamic Character Development</h3>
              <p className="mt-2 font-semibold text-primary">Iman → Akhlaq → Discipline → Responsibility → Service</p>
              <p className="mt-2 text-sm text-muted-foreground">আমাদের লক্ষ্য শুধু “Successful Child” নয়, বরং Successful + Responsible + Ethical + Mentally Strong Human Being.</p>
              <div className="mt-4 grid grid-cols-2 gap-3">{VALUES.map((v) => (
                <div key={v.title} className="rounded-xl bg-secondary p-3 text-sm"><span className="text-xl">{v.icon}</span> <b>{v.title}</b><br /><span className="text-muted-foreground">{v.text}</span></div>))}</div></div>
            <div className={card}><h3 className="text-xl font-bold text-foreground">👨‍👩‍👧 Parent &amp; Teacher System</h3>
              <p className="mt-2 text-sm text-muted-foreground">Child + Parent + Teacher = Development Environment — শিশুকে একা প্রশিক্ষণ দিলে হয় না।</p>
              <div className="mt-4 space-y-3">{PARENT_TEACHER.map((p) => (
                <div key={p.title} className="text-sm"><span className="text-xl">{p.icon}</span> <b>{p.title}</b> — <span className="text-muted-foreground">{p.text}</span></div>))}</div></div>
          </div>
          <h3 className="mt-14 text-center text-2xl font-bold text-foreground">🧩 Brain + Body + Behaviour</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">{BRAIN_BODY_BEHAVIOUR.map((b) => (
            <div key={b.title} className="rounded-2xl bg-card p-5 text-center shadow-card"><div className="text-3xl">{b.icon}</div><p className="font-bold text-foreground">{b.title}</p><p className="text-sm text-muted-foreground">{b.text}</p></div>))}</div>
          <p className="mt-8 text-center text-sm font-bold text-foreground">Mind → Emotion → Behaviour → Character → Life</p>
          <p className="mt-10 text-center text-sm font-bold text-foreground">AYUB Formula</p>
          <div className="mt-3"><Flow items={FINAL_FLOW} /></div>
        </div>
      </section>

      <section id="programs" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="আমাদের প্রোগ্রাম" title="মাইন্ড ট্রেনিং প্রোগ্রাম সমূহ" description="প্রতিটি প্রোগ্রামে কার জন্য, কী শিখবেন, কীভাবে শেখানো হয় এবং কী ফল পাবেন — সব স্পষ্ট।" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MIND_PROGRAMS.map((p) => (
              <div key={p.title} className={card + " flex flex-col"}><span className={icon}>{p.icon}</span>
                <h3 className="mt-4 text-xl font-bold">{p.title}</h3><p className="text-sm text-muted-foreground">{p.subtitle}</p>
                <p className={label}>👥 কার জন্য</p><p className="text-sm">{p.who}</p>
                <p className={label}>📖 কী শিখবেন</p><Bullets items={p.learn} />
                <p className={label}>🛠️ পদ্ধতি</p><p className="text-sm">{p.method}</p>
                <p className={label}>🎁 ফলাফল</p><p className="text-sm">{p.result}</p>
                <Button asChild variant="gold" size="sm" className="mt-6 self-start rounded-full px-5">
                  <Link to="/join" search={{ program: p.title }}>এই প্রোগ্রামে জয়েন করুন</Link></Button></div>
            ))}
          </div>
        </div>
      </section>

      <section id="classes" className="bg-secondary/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="ক্লাস" title="সব শ্রেণির, সব বয়সের ক্লাস" description="বয়স ও প্রয়োজন অনুযায়ী আলাদা গ্রুপ, আলাদা অনুশীলন।" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{CLASS_GROUPS.map((c) => (
            <div key={c.title} className={card}><span className={icon}>{c.icon}</span><h3 className="mt-4 text-lg font-bold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.text}</p><Bullets items={c.points} /></div>))}</div>
          <h3 className="mt-16 text-center text-2xl font-bold">আপনার প্রশিক্ষণ যাত্রা</h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{JOURNEY.map((j) => (
            <div key={j.title} className="rounded-2xl bg-card p-6 text-center shadow-card"><div className="text-3xl">{j.icon}</div>
              <p className="mt-2 font-bold">{j.title}</p><p className="mt-1 text-sm text-muted-foreground">{j.text}</p></div>))}</div>
        </div>
      </section>

      <section id="skills" className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="দক্ষতা ও বিকাশ গাইড" title="যেকোনো কার্ডে ক্লিক করুন" description="কেন জরুরি, কী করবেন এবং রোজকার অভ্যাস জানুন।" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">{SKILLS.map((s) => (
            <button key={s.key} onClick={() => setSkill(s)} className="cursor-pointer rounded-2xl border border-border bg-card p-5 text-center shadow-card transition hover:-translate-y-1 hover:border-gold">
              <span className="text-3xl">{s.icon}</span><p className="mt-2 font-bold">{s.title}</p><p className="mt-1 text-xs text-muted-foreground">{s.subtitle}</p></button>))}</div>
        </div>
      </section>

      <section id="faq" className="bg-parchment px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="প্রশ্নোত্তর" title="সাধারণ প্রশ্নোত্তর" />
          <Accordion type="single" collapsible className="mt-10 rounded-3xl bg-card px-6 shadow-card">{FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q}><AccordionTrigger className="text-base">{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.a}</AccordionContent></AccordionItem>))}</Accordion>
        </div>
      </section>

      <JoinCta />

      <Dialog open={!!skill} onOpenChange={(o) => !o && setSkill(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          {skill && (<>
            <DialogHeader><DialogTitle>{skill.icon} {skill.title} ({skill.subtitle})</DialogTitle><DialogDescription>{skill.intro}</DialogDescription></DialogHeader>
            <p className="text-sm font-bold text-primary">কী করবেন</p><Bullets items={skill.dos} />
            <p className="text-sm font-bold text-primary">জীবনযাপন ও অভ্যাস</p><p className="text-sm text-muted-foreground">{skill.habit}</p>
            <p className="rounded-xl bg-secondary p-3 text-sm font-medium">🔥 আজকের ছোট চ্যালেঞ্জ: {skill.challenge}</p>
          </>)}
        </DialogContent>
      </Dialog>
    </>
  );
}
