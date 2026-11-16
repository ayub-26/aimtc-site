import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV, SITE } from "@/lib/site-data";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-deep-foreground/10 bg-deep/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-parchment p-1 shadow-gold">
            <img src={logo} alt="" width={40} height={40} className="size-9 object-contain" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-sm font-bold text-deep-foreground sm:text-base">
              আইয়ুব ইন্টারন্যাশনাল
            </span>
            <span className="block truncate text-xs text-gold">মাইন্ড ট্রেনিং সেন্টার</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 2xl:flex" aria-label="প্রধান মেনু">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-deep-foreground/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="sm" className="rounded-full px-5">
            <Link to="/join">Join Now</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" className="rounded-full 2xl:hidden" aria-label="মেনু খুলুন">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l-gold/30 bg-deep text-deep-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-deep-foreground">{SITE.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col gap-1 px-4" aria-label="মোবাইল মেনু">
                {NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-deep-foreground/85 transition-colors hover:bg-deep-foreground/10 hover:text-gold"
                    activeProps={{ className: "bg-deep-foreground/10 text-gold" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild variant="gold" className="mt-4 rounded-full">
                  <Link to="/join" onClick={() => setOpen(false)}>
                    Join Now — ভর্তি হোন
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
