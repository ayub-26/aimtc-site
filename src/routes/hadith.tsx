import { createFileRoute } from "@tanstack/react-router";
import { Library } from "lucide-react";

import { JoinCta } from "@/components/site/join-cta";
import { PageHero, SectionHeading } from "@/components/site/ornament";
import { HADITH_BOOKS, HADITHS } from "@/lib/site-data";

export const Route = createFileRoute("/hadith")({
  head: () => ({
    meta: [
      { title: "আল-হাদিস — নির্বাচিত হাদিস ও গ্রন্থ | আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "সূত্রসহ নির্বাচিত সহীহ হাদিস এবং সিহাহ সিত্তাহ — ছয়টি প্রসিদ্ধ হাদিস গ্রন্থের পরিচিতি।" },
      { property: "og:title", content: "আল-হাদিস — নির্বাচিত হাদিস ও গ্রন্থ" },
      { property: "og:description", content: "রাসূলুল্লাহ ﷺ-এর বাণী থেকে জ্ঞান, চরিত্র ও মন নিয়ন্ত্রণের শিক্ষা।" },
    ],
  }),
  component: HadithPage,
});

function HadithPage() {
  return (
    <>
      <PageHero
        arabic="صَلَّى ٱللَّٰهُ عَلَيْهِ وَسَلَّمَ"
        eyebrow="সুন্নাহর আলো"
        title="রাসূল ﷺ-এর বাণী"
        description="নির্ভরযোগ্য সূত্রসহ নির্বাচিত হাদিস — জ্ঞান অর্জন, উত্তম চরিত্র ও আত্মনিয়ন্ত্রণের শিক্ষা।"
      />

      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="নির্বাচিত হাদিস" title="প্রতিদিনের জীবনের জন্য" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {HADITHS.map((h) => (
              <figure key={h.ref} className="relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-card">
                <span className="absolute inset-y-0 right-0 w-1.5 bg-gradient-gold" aria-hidden="true" />
                <span className="self-start rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{h.theme}</span>
                <blockquote className="font-arabic mt-5 text-2xl text-primary md:text-3xl">{h.arabic}</blockquote>
                <p className="mt-4 flex-1 text-lg leading-relaxed text-foreground/85">“{h.bangla}”</p>
                <figcaption className="mt-5 flex flex-wrap justify-between gap-2 border-t border-border pt-4 text-sm">
                  <span className="text-muted-foreground">বর্ণনায়: {h.narrator}</span>
                  <span className="font-semibold text-primary">{h.ref}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="pattern-islamic bg-parchment px-4 py-24 text-primary">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="সিহাহ সিত্তাহ" title="ছয়টি প্রসিদ্ধ হাদিস গ্রন্থ" description="হাদিস শিক্ষা কোর্সে এই গ্রন্থগুলো থেকে নির্বাচিত অধ্যায় পড়ানো হয়।" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HADITH_BOOKS.map((b) => (
              <div key={b.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <Library className="size-7 text-gold" />
                <h3 className="mt-4 text-xl font-bold text-foreground">{b.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.author}</p>
                <p className="mt-4 text-sm font-semibold text-primary">প্রায় {b.count} হাদিস</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground">* হাদিস সংখ্যা সংকলন ও গণনা পদ্ধতিভেদে ভিন্ন হতে পারে।</p>
        </div>
      </section>

      <JoinCta />
    </>
  );
}
