import { useQuery } from "@tanstack/react-query";

export type MediaRow = { id: string; kind: "image" | "video"; place: string; title: string | null; url: string; created_at: string };

export const isYoutube = (url: string) => /youtube\.com|youtu\.be/.test(url);
export const youtubeId = (url: string) =>
  url.match(/[?&]v=([\w-]{11})/)?.[1] ?? url.match(/youtu\.be\/([\w-]{11})/)?.[1] ?? null;

// অ্যাডমিন থেকে আপলোড করা ছবি/ভিডিও পড়ে। না পেলে বা সার্ভার না থাকলে আগের ডিফল্ট ছবিই দেখায়।
export function useMedia() {
  const { data } = useQuery({
    queryKey: ["media"],
    queryFn: async () => ((await (await fetch("/api/media")).json()) as { media: MediaRow[] }).media,
    staleTime: 60_000,
    retry: 0,
  });
  const rows = data ?? [];
  const slot = (key: string) => rows.find((r) => r.place === key);
  return {
    rows,
    image: (key: string, fallback: string) => {
      const r = slot(key);
      return r && r.kind === "image" ? r.url : fallback;
    },
    video: (key: string) => {
      const r = slot(key);
      return r && r.kind === "video" ? r : null;
    },
    gallery: () => rows.filter((r) => r.place === "gallery"),
  };
}
