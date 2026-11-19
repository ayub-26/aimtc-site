import { createFileRoute } from "@tanstack/react-router";
import { Expand, Play } from "lucide-react";
import { useState } from "react";

import { JoinCta } from "@/components/site/join-cta";
import { MediaPlayer } from "@/components/site/media-player";
import { PageHero } from "@/components/site/ornament";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { isYoutube, useMedia, youtubeId } from "@/lib/media";
import { GALLERY } from "@/lib/site-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "ক্লাসের ছবি — গ্যালারি | আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "নাজেরা, হিফজ, মাইন্ড ট্রেনিং সেমিনার, মহিলা বিভাগ ও সনদ বিতরণ অনুষ্ঠানের ছবি ও ভিডিও।" },
      { property: "og:title", content: "ক্লাসের ছবি — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { property: "og:description", content: "আমাদের শিক্ষার্থীদের প্রতিদিনের পাঠ ও আয়োজনের কিছু মুহূর্ত।" },
    ],
  }),
  component: GalleryPage,
});

type Item = { key: string; kind: "image" | "video"; src: string; title: string; caption: string };

function Thumb({ item }: { item: Item }) {
  if (item.kind === "image") {
    return <img src={item.src} alt={item.caption || item.title} width={1200} height={912} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />;
  }
  const yt = isYoutube(item.src) ? youtubeId(item.src) : null;
  return (
    <>
      {yt ? <img src={`https://img.youtube.com/vi/${yt}/hqdefault.jpg`} alt={item.title} loading="lazy" className="h-full w-full object-cover" /> : <video src={`${item.src}#t=0.5`} preload="metadata" muted playsInline className="h-full w-full object-cover" />}
      <span className="absolute inset-0 grid place-items-center"><span className="grid size-14 place-items-center rounded-full bg-deep/70 text-gold"><Play className="size-6" /></span></span>
    </>
  );
}

function GalleryPage() {
  const m = useMedia();
  const [active, setActive] = useState<Item | null>(null);
  const items: Item[] = [
    ...m.gallery().map((r) => ({ key: r.id, kind: r.kind, src: r.url, title: r.title || (r.kind === "video" ? "ভিডিও" : "ছবি"), caption: "" })),
    ...GALLERY.map((g) => ({ key: g.title, kind: "image" as const, src: g.src, title: g.title, caption: g.caption })),
  ];

  return (
    <>
      <PageHero eyebrow="গ্যালারি" title="ক্লাসের ছবি ও ভিডিও" description="আমাদের ক্লাসরুম, সেমিনার ও বিশেষ অনুষ্ঠানের কিছু মুহূর্ত। ক্লিক করে বড় করে দেখুন।" />
      <section className="px-4 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <button key={g.key} type="button" onClick={() => setActive(g)} className="group overflow-hidden rounded-3xl border border-border bg-card text-left shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Thumb item={g} />
                {g.kind === "image" && (
                  <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-deep/70 text-gold opacity-0 transition-opacity group-hover:opacity-100"><Expand className="size-4" /></span>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-lg font-bold">{g.title}</h2>
                {g.caption && <p className="mt-1 text-sm text-muted-foreground">{g.caption}</p>}
              </div>
            </button>
          ))}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl overflow-hidden border-gold/40 bg-card p-0">
          {active && (
            <>
              {active.kind === "video" ? <MediaPlayer url={active.src} autoPlay className="max-h-[75vh]" /> : <img src={active.src} alt={active.caption || active.title} width={1200} height={912} className="max-h-[75vh] w-full object-cover" />}
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
