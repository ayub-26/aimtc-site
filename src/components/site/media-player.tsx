import { SectionHeading } from "@/components/site/ornament";
import { isYoutube, useMedia, youtubeId } from "@/lib/media";

export function MediaPlayer({ url, autoPlay = false, className = "" }: { url: string; autoPlay?: boolean; className?: string }) {
  const yt = isYoutube(url) ? youtubeId(url) : null;
  if (yt) {
    return (
      <iframe
        className={`aspect-video w-full ${className}`}
        src={`https://www.youtube-nocookie.com/embed/${yt}${autoPlay ? "?autoplay=1" : ""}`}
        title="ভিডিও"
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return <video className={`w-full bg-black ${className}`} src={url} controls playsInline preload="metadata" autoPlay={autoPlay} />;
}

// অ্যাডমিন ভিডিও দিলে তবেই দেখায়, না দিলে কিছুই দেখায় না
export function SiteVideo({ slot, title }: { slot: string; title: string }) {
  const video = useMedia().video(slot);
  if (!video) return null;
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="ভিডিও" title={title} />
        <div className="mt-10 overflow-hidden rounded-3xl border-4 border-gold/40 shadow-soft">
          <MediaPlayer url={video.url} />
        </div>
      </div>
    </section>
  );
}
