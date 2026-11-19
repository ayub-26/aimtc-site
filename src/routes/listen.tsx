import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { JoinCta } from "@/components/site/join-cta";
import { PageHero } from "@/components/site/ornament";

const TITLE = "শুনুন — অডিও পরিচিতি | আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার";

export const Route = createFileRoute("/listen")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টারের অডিও পরিচিতি শুনুন — স্বাগতম, 3D মাইন্ড ট্রেনিং ও প্রোগ্রাম।" },
      { property: "og:title", content: TITLE },
    ],
  }),
  component: ListenPage,
});

type Clip = { id: string; title: string; lang: string; text: string; url: string };
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

function AudioCard({ clip, active, onPlay }: { clip: Clip; active: boolean; onPlay: () => void }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!active) ref.current?.pause();
  }, [active]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      onPlay();
      void a.play().catch(() => setMissing(true));
    } else a.pause();
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
      <div className="flex items-start gap-4">
        <button
          onClick={toggle}
          disabled={missing}
          aria-label={playing ? "থামান" : "চালান"}
          className="grid size-14 shrink-0 cursor-pointer place-items-center rounded-full bg-gradient-gold text-deep shadow-gold transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {playing ? <Pause className="size-6" /> : <Play className="size-6 translate-x-0.5" />}
        </button>
        <div className="min-w-0">
          <p className="text-xs font-bold tracking-wider text-primary">{clip.lang}</p>
          <h3 className="text-xl font-bold">{clip.title}</h3>
        </div>
        <Volume2 className="ml-auto size-5 shrink-0 text-gold" />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{clip.text}</p>
      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-gradient-gold transition-[width]" style={{ width: duration ? `${(time / duration) * 100}%` : "0%" }} />
        </div>
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>{fmt(time)}</span>
          <span>{missing ? "অডিও এখনো তৈরি হয়নি" : duration ? fmt(duration) : ""}</span>
        </div>
      </div>
      <audio
        ref={ref}
        src={clip.url}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setTime(0); }}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setMissing(true)}
      />
    </div>
  );
}

function ListenPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [clips, setClips] = useState<Clip[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("/api/clips")
      .then((r) => r.json())
      .then((d: { clips?: Clip[] }) => setClips(d.clips ?? []))
      .catch(() => setFailed(true));
  }, []);

  return (
    <>
      <PageHero
        eyebrow="অডিও পরিচিতি"
        title="শুনুন"
        description="আমাদের পরিচিতি ও মাইন্ড ট্রেনিংয়ের মূল কথা কণ্ঠে শুনুন।"
      />
      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {(clips ?? []).map((c) => (
            <AudioCard key={c.id} clip={c} active={activeId === c.id} onPlay={() => setActiveId(c.id)} />
          ))}
        </div>
        {clips?.length === 0 && <p className="text-center text-muted-foreground">শীঘ্রই অডিও যোগ করা হবে।</p>}
        {failed && <p className="text-center text-muted-foreground">অডিও লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।</p>}
        {!clips && !failed && <p className="text-center text-muted-foreground">লোড হচ্ছে...</p>}
      </section>
      <JoinCta />
    </>
  );
}
