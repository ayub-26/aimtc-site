import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Mic2, Sparkles as Shine, Target } from "lucide-react";

import classHifz from "@/assets/class-hifz.jpg";
import { JoinCta } from "@/components/site/join-cta";
import { PageHero, SectionHeading } from "@/components/site/ornament";
import { AYAT, QURAN_FACTS } from "@/lib/site-data";

export const Route = createFileRoute("/quran")({
  head: () => ({
    meta: [
      { title: "আল-কোরআন — নির্বাচিত আয়াত ও শিক্ষা | আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "আরবি ও বাংলা অর্থসহ কোরআনের নির্বাচিত আয়াত, তাজবীদের মূল বিষয় ও কোরআন শিক্ষার পদ্ধতি।" },
      { property: "og:title", content: "আল-কোরআন — নির্বাচিত আয়াত ও শিক্ষা" },
      { property: "og:description", content: "জ্ঞান, ধৈর্য, আশা ও মনের প্রশান্তি নিয়ে কোরআনের আলোকিত বাণী।" },
    ],
  }),
  component: QuranPage,
});

const TAJWEED = [
  { icon: Mic2, title: "মাখরাজ", text: "প্রতিটি হরফ সঠিক উৎস থেকে উচ্চারণ করা — ১৭টি মাখরাজের অনুশীলন।" },
  { icon: Target, title: "সিফাত", text: "হরফের বৈশিষ্ট্য — মোটা-পাতলা, জোরে-আস্তে উচ্চারণের নিয়ম।" },
  { icon: BookOpen, title: "মাদ ও গুন্নাহ", text: "কোথায় টেনে পড়তে হবে, কোথায় নাকে সুর দিতে হবে।" },
  { icon: Shine, title: "ওয়াকফ", text: "আয়াতে কোথায় থামতে হবে ও কীভাবে আবার শুরু করতে হবে।" },
];

function QuranPage() {
  return (
    <>
      <PageHero
        arabic="ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ"
        eyebrow="আল-কোরআনুল কারীম"
        title="কোরআনের আলোয় জীবন"
        description="এটি সেই কিতাব, যাতে কোনো সন্দেহ নেই — মুত্তাকীদের জন্য পথনির্দেশ। (সূরা আল-বাকারা, ২:২)"
      />

      <section className="relative z-10 -mt-10 px-4">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/30 bg-gold/30 shadow-soft md:grid-cols-4">
          {QURAN_FACTS.map((f) => (
            <div key={f.label} className="bg-card px-4 py-6 text-center">
              <p className="font-display text-3xl font-bold text-primary">{f.value}</p>
              <p className="text-sm text-muted-foreground">{f.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="নির্বাচিত আয়াত" title="হৃদয় ছোঁয়া কিছু আয়াত" description="জ্ঞান, ধৈর্য, আশা ও মনের প্রশান্তি নিয়ে আল্লাহর বাণী।" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {AYAT.map((a) => (
              <figure key={a.ref} className="flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card">
                <span className="self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{a.theme}</span>
                <blockquote className="font-arabic mt-5 text-2xl text-primary md:text-3xl">{a.arabic}</blockquote>
                <p className="mt-4 flex-1 text-lg leading-relaxed text-foreground/85">“{a.bangla}”</p>
                <figcaption className="mt-5 border-t border-border pt-4 text-sm font-medium text-muted-foreground">{a.ref}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pattern-islamic bg-gradient-deep px-4 py-24 text-gold">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading tone="dark" align="left" eyebrow="তাজবীদ" title="শুদ্ধ তিলাওয়াতের মূল বিষয়" description="আমাদের নাজেরা ও হিফজ বিভাগে এই বিষয়গুলো হাতে-কলমে শেখানো হয়।" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {TAJWEED.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-gold/25 bg-deep-foreground/5 p-5">
                  <Icon className="size-6 text-gold" />
                  <h3 className="mt-3 font-bold text-deep-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-deep-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <img src={classHifz} alt="কোরআন তিলাওয়াত" width={1200} height={912} loading="lazy" className="arch-top w-full border-4 border-gold/40 object-cover shadow-soft" />
        </div>
      </section>

      <JoinCta />
    </>
  );
}
