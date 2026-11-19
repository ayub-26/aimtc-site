import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Target } from "lucide-react";

import classAward from "@/assets/class-award.jpg";
import { JoinCta } from "@/components/site/join-cta";
import { SiteVideo } from "@/components/site/media-player";
import { useMedia } from "@/lib/media";
import { PageHero, SectionHeading } from "@/components/site/ornament";
import { STATS } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "আমাদের সম্পর্কে — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "আমাদের লক্ষ্য, উদ্দেশ্য, মূল্যবোধ ও শিক্ষা পদ্ধতি সম্পর্কে জানুন।" },
      { property: "og:title", content: "আমাদের সম্পর্কে — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { property: "og:description", content: "কোরআন-সুন্নাহভিত্তিক শিক্ষা ও মাইন্ড ট্রেনিংয়ের মাধ্যমে আদর্শ মানুষ গড়ার প্রত্যয়।" },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  { icon: Target, title: "আমাদের লক্ষ্য", text: "কোরআন ও সুন্নাহর বিশুদ্ধ জ্ঞান প্রতিটি ঘরে পৌঁছে দেওয়া এবং জ্ঞানের সাথে আমলের সমন্বয় ঘটানো।" },
  { icon: Eye, title: "আমাদের স্বপ্ন", text: "এমন এক প্রজন্ম গড়া, যারা ঈমানে দৃঢ়, চিন্তায় স্বচ্ছ, চরিত্রে সুন্দর এবং সমাজের জন্য কল্যাণকর।" },
  { icon: Compass, title: "আমাদের পদ্ধতি", text: "ঐতিহ্যবাহী ইসলামিক শিক্ষার সাথে আধুনিক মাইন্ড ট্রেনিং, মেমোরি টেকনিক ও ব্যক্তিগত মেন্টরিংয়ের সমন্বয়।" },
];

const VALUES = ["ইখলাস (একনিষ্ঠতা)", "আমানতদারিতা", "আদব ও শিষ্টাচার", "ইহসান (উৎকর্ষ)", "ধৈর্য ও সহনশীলতা", "দলগত সহযোগিতা"];

function AboutPage() {
  const m = useMedia();
  return (
    <>
      <PageHero
        arabic="وَقُل رَّبِّ زِدْنِى عِلْمًا"
        eyebrow="আমাদের সম্পর্কে"
        title="আলোকিত মন, সুন্দর চরিত্র"
        description="আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার একটি ইসলামিক শিক্ষা ও প্রশিক্ষণ প্রতিষ্ঠান, যেখানে কোরআন-হাদিসের জ্ঞানের পাশাপাশি মন ও চরিত্র গঠনের বিশেষ প্রশিক্ষণ দেওয়া হয়।"
      />

      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground shadow-gold">
                <Icon className="size-7" />
              </span>
              <h2 className="mt-6 text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pattern-islamic bg-parchment px-4 py-24 text-primary">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <img src={m.image("about", classAward)} alt="সনদ বিতরণ অনুষ্ঠান" width={1200} height={912} loading="lazy" className="w-full rounded-3xl border-4 border-gold/40 object-cover shadow-soft" />
          <div>
            <SectionHeading align="left" eyebrow="আমাদের মূল্যবোধ" title="যে নীতিতে আমরা চলি" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {VALUES.map((v) => (
                <li key={v} className="flex items-center gap-3 rounded-xl bg-card px-4 py-3 font-medium text-foreground shadow-card">
                  <span className="size-2.5 rotate-45 bg-gold" /> {v}
                </li>
              ))}
            </ul>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteVideo slot="about-video" title="আমাদের সম্পর্কে" />
      <JoinCta />
    </>
  );
}
