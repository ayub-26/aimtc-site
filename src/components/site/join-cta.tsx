import { Link } from "@tanstack/react-router";
import { ArrowLeft, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

export function JoinCta() {
  return (
    <section className="px-4 py-20">
      <div className="pattern-islamic relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-deep px-6 py-16 text-center text-gold shadow-soft md:px-16">
        <p className="font-arabic text-3xl text-gold">رَبِّ زِدْنِي عِلْمًا</p>
        <h2 className="mt-4 text-3xl font-bold text-deep-foreground md:text-4xl">আজই জ্ঞানের পথে যাত্রা শুরু করুন</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-deep-muted">
          আপনার বা আপনার সন্তানের জন্য উপযুক্ত প্রোগ্রামে ভর্তি হতে এখনই নিবন্ধন করুন। আমাদের টিম দ্রুত যোগাযোগ করবে ইনশাআল্লাহ।
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="gold" size="xl">
            <Link to="/join">
              এখনই যোগ দিন <ArrowLeft className="rotate-180" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href={`tel:${SITE.phone}`}>
              <Phone /> {SITE.phoneDisplay}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
