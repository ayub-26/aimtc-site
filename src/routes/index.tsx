import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpenCheck, Brain, Clock3, HeartHandshake, Quote, ShieldCheck, UserRound, Users } from "lucide-react";

import hero from "@/assets/hero-mosque.jpg";
import { JoinCta } from "@/components/site/join-cta";
import { SiteVideo } from "@/components/site/media-player";
import { useMedia } from "@/lib/media";
import { Ornament, SectionHeading } from "@/components/site/ornament";
import { SiteIcon } from "@/components/site/program-icon";
import { Button } from "@/components/ui/button";
import { AYAT, GALLERY, HADITHS, PROGRAMS, SITE, STATS, TESTIMONIALS } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার (Ayub International Mind Training Center) — ঢাকা" },
      {
        name: "description",
        content: "ঢাকার ইসলামিক শিক্ষা প্রতিষ্ঠান: নাজেরা, হিফজ, হাদিস, আরবি ভাষা, মহিলা বিভাগ ও ইসলামিক মাইন্ড ট্রেনিং প্রোগ্রাম।",
      },
      { property: "og:title", content: "আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { property: "og:description", content: "কোরআন-সুন্নাহর আলোয় আলোকিত মন, সুন্দর চরিত্র। আজই ভর্তি হোন।" },
    ],
  }),
  component: HomePage,
});

const WHY = [
  { icon: BookOpenCheck, title: "বিশুদ্ধ পাঠ্যক্রম", desc: "কোরআন ও সহীহ হাদিসভিত্তিক সিলেবাস, অভিজ্ঞ আলেমদের তত্ত্বাবধানে।" },
  { icon: Brain, title: "আধুনিক মাইন্ড ট্রেনিং", desc: "মনোযোগ, স্মৃতিশক্তি ও আত্মবিশ্বাস বাড়ানোর প্রমাণিত কৌশল।" },
  { icon: ShieldCheck, title: "নিরাপদ পরিবেশ", desc: "পর্দা ও আদবের পরিবেশ, ছেলে-মেয়েদের জন্য আলাদা ব্যবস্থা।" },
  { icon: HeartHandshake, title: "ব্যক্তিগত যত্ন", desc: "প্রত্যেক শিক্ষার্থীর অগ্রগতি নিয়মিত অভিভাবকদের জানানো হয়।" },
];

function HomePage() {
  const ayah = AYAT[2]!;
  const hadith = HADITHS[1]!;
  const cover = GALLERY[0]!;
  const m = useMedia();
  const homeGallery = [
    ...m.gallery().filter((r) => r.kind === "image").map((r) => ({ title: r.title || "ছবি", src: r.url, caption: r.title || "" })),
    ...GALLERY,
  ].slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img src={m.image("hero", hero)} alt="কোরআন শরীফ ও ইসলামিক স্থাপত্যের শিক্ষাকক্ষ" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-36 md:pb-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="font-arabic text-3xl text-gold md:text-4xl">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-deep/40 px-4 py-1.5 text-sm text-gold backdrop-blur">
              <Users className="size-4" /> ঢাকা, বাংলাদেশ • সকল বয়সের জন্য
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-deep-foreground md:text-6xl md:leading-tight">
              আইয়ুব ইন্টারন্যাশনাল <span className="text-gradient-gold">মাইন্ড ট্রেনিং</span> সেন্টার
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-deep-foreground/85 md:text-xl">
              {SITE.tagline}। কোরআন, হাদিস ও আধুনিক মাইন্ড ট্রেনিংয়ের সমন্বয়ে আমরা গড়ে তুলি জ্ঞানী, আত্মবিশ্বাসী ও উত্তম চরিত্রের মানুষ।
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/join">
                  Join Now — ভর্তি হোন <ArrowLeft className="rotate-180" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link to="/programs">প্রোগ্রাম সমূহ দেখুন</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-10 px-4">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/30 bg-gold/30 shadow-soft md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card px-4 py-7 text-center">
              <p className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About intro */}
      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md">
            <div className="arch-top overflow-hidden border-4 border-gold/50 shadow-soft">
              <img src={m.image("home-intro", cover.src)} alt={cover.caption} width={1200} height={912} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 rounded-2xl bg-gradient-deep px-6 py-4 text-center shadow-soft md:-left-10">
              <p className="font-arabic text-2xl text-gold">اقْرَأْ</p>
              <p className="text-xs text-deep-muted">পড়ো — প্রথম ওহী</p>
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="আমাদের সম্পর্কে"
              title="জ্ঞান, আমল ও চরিত্র — একসাথে"
              description="আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার একটি আদর্শ ইসলামিক শিক্ষা প্রতিষ্ঠান। এখানে শুদ্ধ কোরআন তিলাওয়াত, হিফজ, হাদিস ও আরবির পাশাপাশি শিক্ষার্থীদের মনোযোগ, স্মৃতিশক্তি ও আত্মিক উন্নতির বিশেষ প্রশিক্ষণ দেওয়া হয়।"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {WHY.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="link" className="mt-6 px-0 text-base">
              <Link to="/about">আরও জানুন →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="pattern-islamic bg-parchment px-4 py-24 text-primary">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="আমাদের প্রোগ্রাম" title="প্রোগ্রাম সমূহ" description="শিশু থেকে প্রাপ্তবয়স্ক — সবার জন্য সাজানো বিশেষ কোর্স।" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <article key={p.slug} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-transform hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={m.image(`program-${p.slug}`, p.image)} alt={p.title} width={1200} height={912} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 grid size-12 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground shadow-gold">
                    <SiteIcon name={p.icon} className="size-6" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{p.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-secondary-foreground"><Clock3 className="size-3.5" /> {p.duration}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-accent-foreground"><UserRound className="size-3.5" /> {p.age}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="deep" size="xl">
              <Link to="/programs">সব প্রোগ্রামের বিস্তারিত</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quran & Hadith */}
      <section className="pattern-islamic bg-gradient-deep px-4 py-24 text-gold">
        <div className="mx-auto max-w-6xl">
          <SectionHeading tone="dark" eyebrow="আলোর বাণী" title="কোরআন ও হাদিস থেকে" />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <figure className="rounded-3xl border border-gold/30 bg-deep-foreground/5 p-8 backdrop-blur">
              <p className="text-sm font-semibold text-gold">আল-কোরআন</p>
              <blockquote className="font-arabic mt-4 text-3xl text-deep-foreground md:text-4xl">{ayah.arabic}</blockquote>
              <p className="mt-4 text-lg text-deep-foreground/85">“{ayah.bangla}”</p>
              <figcaption className="mt-4 text-sm text-gold">— {ayah.ref}</figcaption>
              <Button asChild variant="glass" className="mt-6 rounded-full">
                <Link to="/quran">আরও আয়াত পড়ুন</Link>
              </Button>
            </figure>
            <figure className="rounded-3xl border border-gold/30 bg-deep-foreground/5 p-8 backdrop-blur">
              <p className="text-sm font-semibold text-gold">আল-হাদিস</p>
              <blockquote className="font-arabic mt-4 text-3xl text-deep-foreground md:text-4xl">{hadith.arabic}</blockquote>
              <p className="mt-4 text-lg text-deep-foreground/85">“{hadith.bangla}”</p>
              <figcaption className="mt-4 text-sm text-gold">— {hadith.ref} (বর্ণনায়: {hadith.narrator})</figcaption>
              <Button asChild variant="glass" className="mt-6 rounded-full">
                <Link to="/hadith">আরও হাদিস পড়ুন</Link>
              </Button>
            </figure>
          </div>
        </div>
      </section>

      <SiteVideo slot="home-video" title="আমাদের পরিচিতি" />

      {/* Gallery preview */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="ক্লাসের ছবি" title="আমাদের ক্লাস ও আয়োজন" description="শিক্ষার্থীদের প্রতিদিনের পাঠ, সেমিনার ও অনুষ্ঠানের কিছু মুহূর্ত।" />
          <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
            {homeGallery.map((g, i) => (
              <Link
                key={g.title}
                to="/gallery"
                className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""} ${i === 3 ? "md:col-span-2" : ""}`}
              >
                <img src={g.src} alt={g.caption} width={1200} height={912} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/10 to-transparent" />
                <p className="absolute bottom-3 left-4 right-4 font-display font-bold text-deep-foreground">{g.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="মতামত" title="অভিভাবক ও শিক্ষার্থীরা যা বলেন" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="rounded-3xl bg-card p-7 shadow-card">
                <Quote className="size-8 text-gold" />
                <blockquote className="mt-4 leading-relaxed text-foreground/85">{t.text}</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <Ornament className="mt-14" />
        </div>
      </section>

      <JoinCta />
    </>
  );
}
