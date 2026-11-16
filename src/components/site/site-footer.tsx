import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import logo from "@/assets/logo.png";
import { NAV, PROGRAMS, SITE } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="pattern-islamic bg-gradient-deep text-gold">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-14 place-items-center rounded-full bg-parchment p-1.5">
              <img src={logo} alt="" width={48} height={48} loading="lazy" className="size-11 object-contain" />
            </span>
            <div className="leading-tight">
              <p className="font-display font-bold text-deep-foreground">আইয়ুব ইন্টারন্যাশনাল</p>
              <p className="text-sm text-gold">মাইন্ড ট্রেনিং সেন্টার</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-deep-muted">{SITE.tagline}। কোরআন, হাদিস ও আধুনিক মাইন্ড ট্রেনিংয়ের সমন্বয়ে আদর্শ মানুষ গড়ার প্রতিষ্ঠান।</p>
          <p className="font-arabic mt-4 text-xl text-gold">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-deep-foreground">দ্রুত লিংক</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-deep-muted transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-deep-foreground">প্রোগ্রাম সমূহ</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {PROGRAMS.map((p) => (
              <li key={p.slug}>
                <Link to="/programs" className="text-deep-muted transition-colors hover:text-gold">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold text-deep-foreground">যোগাযোগ</h3>
          <ul className="mt-4 space-y-3 text-sm text-deep-muted">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {SITE.address}
            </li>
            <li>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-3 hover:text-gold">
                <Phone className="size-4 shrink-0 text-gold" /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 break-all hover:text-gold">
                <Mail className="size-4 shrink-0 text-gold" /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-gold">
                <MessageCircle className="size-4 shrink-0 text-gold" /> WhatsApp-এ মেসেজ দিন
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-deep-foreground/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-deep-muted">
          © {new Date().getFullYear()} {SITE.nameEn}। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
