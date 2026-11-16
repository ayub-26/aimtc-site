import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { PageHero } from "@/components/site/ornament";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "যোগাযোগ — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "ঠিকানা: ঢাকা, বাংলাদেশ। ফোন ও WhatsApp: +8801628102071। ইমেইল: ayubmd202600@gmail.com" },
      { property: "og:title", content: "যোগাযোগ — আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { property: "og:description", content: "ভর্তি ও যেকোনো তথ্যের জন্য ফোন, WhatsApp বা ইমেইলে যোগাযোগ করুন।" },
    ],
  }),
  component: ContactPage,
});

const CARDS = [
  { icon: Phone, title: "ফোন করুন", value: SITE.phoneDisplay, href: `tel:${SITE.phone}` },
  { icon: MessageCircle, title: "WhatsApp", value: "মেসেজ পাঠান", href: SITE.whatsapp },
  { icon: Mail, title: "ইমেইল", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, title: "ঠিকানা", value: SITE.address, href: "https://www.google.com/maps/search/?api=1&query=Dhaka%2C+Bangladesh" },
];

function ContactPage() {
  return (
    <>
      <PageHero
        arabic="السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ"
        eyebrow="যোগাযোগ"
        title="আমাদের সাথে যোগাযোগ করুন"
        description="ভর্তি, ক্লাসের সময়সূচি বা যেকোনো প্রশ্নের জন্য নিচের যেকোনো মাধ্যমে যোগাযোগ করুন।"
      />
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ icon: Icon, title, value, href }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group rounded-3xl border border-border bg-card p-6 text-center shadow-card transition-colors hover:border-gold"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-gold text-gold-foreground shadow-gold">
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-4 text-lg font-bold">{title}</h2>
                <p className="mt-1 break-all text-sm text-muted-foreground group-hover:text-primary">{value}</p>
              </a>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-5">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card lg:col-span-3">
              <iframe
                title="ঢাকা, বাংলাদেশ মানচিত্র"
                src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                className="h-80 w-full lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="pattern-islamic rounded-3xl bg-gradient-deep p-8 text-gold lg:col-span-2">
              <Clock className="size-8 text-gold" />
              <h2 className="mt-4 text-2xl font-bold text-deep-foreground">অফিস সময়</h2>
              <ul className="mt-4 space-y-2 text-deep-muted">
                <li className="flex justify-between gap-4"><span>শনি – বৃহস্পতিবার</span><span>সকাল ৮টা – রাত ৮টা</span></li>
                <li className="flex justify-between gap-4"><span>শুক্রবার</span><span>বন্ধ</span></li>
              </ul>
              <p className="mt-6 text-sm text-deep-muted">অনলাইনে ভর্তির জন্য ফর্ম পূরণ করুন, আমরা দ্রুত যোগাযোগ করব ইনশাআল্লাহ।</p>
              <Button asChild variant="gold" className="mt-6 rounded-full px-6">
                <Link to="/join">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
