import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Clock3, UserRound } from "lucide-react";

import { JoinCta } from "@/components/site/join-cta";
import { useMedia } from "@/lib/media";
import { PageHero } from "@/components/site/ornament";
import { SiteIcon } from "@/components/site/program-icon";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/lib/site-data";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "প্রোগ্রাম সমূহ — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "নাজেরা, হিফজ, ইসলামিক মাইন্ড ট্রেনিং, হাদিস শিক্ষা, মহিলা বিভাগ ও আরবি ভাষা কোর্সের বিস্তারিত।" },
      { property: "og:title", content: "প্রোগ্রাম সমূহ — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { property: "og:description", content: "আপনার জন্য উপযুক্ত প্রোগ্রাম বেছে নিন এবং আজই ভর্তি হোন।" },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const m = useMedia();
  return (
    <>
      <PageHero
        arabic="خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
        eyebrow="আমাদের প্রোগ্রাম"
        title="প্রোগ্রাম সমূহ"
        description="প্রতিটি প্রোগ্রাম অভিজ্ঞ শিক্ষকদের দ্বারা পরিচালিত। ফি ও ভর্তির বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।"
      />
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl space-y-12">
          {PROGRAMS.map((p, i) => (
            <article key={p.slug} id={p.slug} className="grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:grid-cols-2">
              <div className={`h-72 lg:h-full ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <img src={m.image(`program-${p.slug}`, p.image)} alt={p.title} width={1200} height={912} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground shadow-gold">
                  <SiteIcon name={p.icon} className="size-6" />
                </span>
                <h2 className="mt-5 text-3xl font-bold">{p.title}</h2>
                <p className="mt-1 font-medium text-primary">{p.subtitle}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{p.description}</p>
                <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-secondary p-3">
                    <dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="size-3.5" /> মেয়াদ</dt>
                    <dd className="mt-1 font-semibold text-secondary-foreground">{p.duration}</dd>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><UserRound className="size-3.5" /> বয়স</dt>
                    <dd className="mt-1 font-semibold text-secondary-foreground">{p.age}</dd>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <dt className="flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="size-3.5" /> ক্লাস</dt>
                    <dd className="mt-1 font-semibold text-secondary-foreground">{p.schedule}</dd>
                  </div>
                </dl>
                <ul className="mt-6 space-y-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-foreground/85">
                      <CheckCircle2 className="size-4 text-primary" /> {h}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="gold" className="mt-8 rounded-full px-6">
                  <Link to="/join" search={{ program: p.title }}>
                    এই প্রোগ্রামে ভর্তি হোন
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <JoinCta />
    </>
  );
}
