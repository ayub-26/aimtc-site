import about from "@/assets/class-award.jpg";
import hero from "@/assets/hero-mosque.jpg";
import quran from "@/assets/class-hifz.jpg";
import intro from "@/assets/class-quran.jpg";
import logo from "@/assets/logo.png";
import { PROGRAMS } from "@/lib/site-data";

// অ্যাডমিন যে জায়গাগুলোর ছবি বদলাতে পারবে (key = ডেটাবেসের place)
export const IMAGE_SLOTS = [
  { key: "logo", label: "লোগো (হেডার ও ফুটার)", def: logo },
  { key: "hero", label: "হোম — মূল ব্যানার ছবি", def: hero },
  { key: "home-intro", label: "হোম — পরিচিতি অংশের ছবি", def: intro },
  { key: "about", label: "আমাদের সম্পর্কে — ছবি", def: about },
  { key: "quran", label: "কোরআন পেজ — ছবি", def: quran },
  ...PROGRAMS.map((p) => ({ key: `program-${p.slug}`, label: `প্রোগ্রাম — ${p.title}`, def: p.image })),
];

// ভিডিওর জায়গা (ভিডিও দিলে তবেই ওই পেজে ভিডিও অংশ দেখা যায়)
export const VIDEO_SLOTS = [
  { key: "home-video", label: "হোম পেজের ভিডিও" },
  { key: "about-video", label: "আমাদের সম্পর্কে পেজের ভিডিও" },
  { key: "mind-video", label: "মাইন্ড ট্রেনিং পেজের ভিডিও" },
];
