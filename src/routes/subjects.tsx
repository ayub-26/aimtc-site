import { createFileRoute } from "@tanstack/react-router";

import { JoinCta } from "@/components/site/join-cta";
import { PageHero, SectionHeading } from "@/components/site/ornament";
import { SiteIcon } from "@/components/site/program-icon";
import { SUBJECTS } from "@/lib/site-data";

export const Route = createFileRoute("/subjects")({
  head: () => ({
    meta: [
      { title: "বিষয়সমূহ — আকিদা, ফিকহ, সীরাত ও মাইন্ড ট্রেনিং | আইয়ুব ইন্টারন্যাশনাল" },
      { name: "description", content: "আকিদা, ফিকহ, সীরাত, আখলাক, দোয়া, ইসলামের ইতিহাস, মেমোরি টেকনিক ও আত্মশুদ্ধিসহ সকল বিষয়।" },
      { property: "og:title", content: "বিষয়সমূহ — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { property: "og:description", content: "দ্বীন ও দুনিয়ার প্রয়োজনীয় সকল বিষয়ের সমন্বিত পাঠ্যক্রম।" },
    ],
  }),
  component: SubjectsPage,
});

const DAY = [
  { time: "ফজরের পর", task: "কোরআন তিলাওয়াত ও সকালের যিকির" },
  { time: "সকাল", task: "হিফজ / নাজেরা ক্লাস" },
  { time: "যোহরের পর", task: "হাদিস, ফিকহ ও আরবি পাঠ" },
  { time: "আসরের পর", task: "মাইন্ড ট্রেনিং ও খেলাধুলা" },
  { time: "মাগরিবের পর", task: "মুরাজাআ ও সন্ধ্যার যিকির" },
];

function SubjectsPage() {
  return (
    <>
      <PageHero
        arabic="طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ"
        eyebrow="সকল বিষয়"
        title="দ্বীন ও জীবনের শিক্ষা"
        description="কোরআন-হাদিসের পাশাপাশি জীবন গঠনের প্রয়োজনীয় সকল বিষয় আমাদের পাঠ্যক্রমে অন্তর্ভুক্ত।"
      />

      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="পাঠ্যক্রম" title="যা যা শেখানো হয়" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SUBJECTS.map((s) => (
              <div key={s.title} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-colors hover:border-gold">
                <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-gradient-gold group-hover:text-gold-foreground">
                  <SiteIcon name={s.icon} className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pattern-islamic bg-gradient-deep px-4 py-24 text-gold">
        <div className="mx-auto max-w-3xl">
          <SectionHeading tone="dark" eyebrow="সালাতকেন্দ্রিক রুটিন" title="একজন শিক্ষার্থীর দিন" />
          <ol className="mt-12 space-y-4">
            {DAY.map((d, i) => (
              <li key={d.time} className="flex items-center gap-5 rounded-2xl border border-gold/25 bg-deep-foreground/5 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-gold font-bold text-gold-foreground">{"১২৩৪৫৬৭৮৯"[i]}</span>
                <div>
                  <p className="text-sm font-semibold text-gold">{d.time}</p>
                  <p className="text-deep-foreground">{d.task}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <JoinCta />
    </>
  );
}
