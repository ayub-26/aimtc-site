import { createFileRoute } from "@tanstack/react-router";
import { Expand } from "lucide-react";
import { useState } from "react";

import { JoinCta } from "@/components/site/join-cta";
import { PageHero } from "@/components/site/ornament";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { GALLERY, type GalleryItem } from "@/lib/site-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "ক্লাসের ছবি — গ্যালারি | আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "নাজেরা, হিফজ, মাইন্ড ট্রেনিং সেমিনার, মহিলা বিভাগ ও সনদ বিতরণ অনুষ্ঠানের ছবি।" },
      { property: "og:title", content: "ক্লাসের ছবি — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { property: "og:description", content: "আমাদের শিক্ষার্থীদের প্রতিদিনের পাঠ ও আয়োজনের কিছু মুহূর্ত।" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <PageHero
        eyebrow="গ্যালারি"
        title="ক্লাসের ছবি"
        description="আমাদের ক্লাসরুম, সেমিনার ও বিশেষ অনুষ্ঠানের কিছু মুহূর্ত। ছবিতে ক্লিক করে বড় করে দেখুন।"
      />
      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((g) => (
            <button
              key={g.title}
              type="button"
              onClick={() => setActive(g)}
              className="group overflow-hidden rounded-3xl border border-border bg-card text-left shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={g.src} alt={g.caption} width={1200} height={912} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-deep/70 text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="size-4" />
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold">{g.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{g.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-gold/40 bg-card p-0">
          {active && (
            <>
              <img src={active.src} alt={active.caption} width={1200} height={912} className="max-h-[75vh] w-full object-cover" />
              <div className="px-6 pb-6">
                <DialogTitle className="text-xl">{active.title}</DialogTitle>
                <DialogDescription className="mt-1">{active.caption}</DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <JoinCta />
    </>
  );
}
