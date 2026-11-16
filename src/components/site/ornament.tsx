import { cn } from "@/lib/utils";

/** Eight-point star mark used as a decorative divider. */
export function StarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-4", className)} fill="currentColor">
      <path d="M12 1.5l2.6 4.2 4.8-1.1-1.1 4.8L22.5 12l-4.2 2.6 1.1 4.8-4.8-1.1L12 22.5l-2.6-4.2-4.8 1.1 1.1-4.8L1.5 12l4.2-2.6-1.1-4.8 4.8 1.1z" />
    </svg>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold", className)} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
      <StarMark className="size-3" />
      <StarMark className="size-5" />
      <StarMark className="size-3" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <p className={cn("mb-3 text-sm font-semibold tracking-widest", dark ? "text-gold" : "text-primary")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-3xl font-bold leading-tight md:text-4xl", dark ? "text-deep-foreground" : "text-foreground")}>
        {title}
      </h2>
      <Ornament className={cn("mt-5", align === "left" && "justify-start")} />
      {description && (
        <p className={cn("mt-5 text-base leading-relaxed md:text-lg", dark ? "text-deep-muted" : "text-muted-foreground")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, description, arabic }: { eyebrow: string; title: string; description: string; arabic?: string }) {
  return (
    <section className="pattern-islamic bg-gradient-deep text-gold">
      <div className="mx-auto max-w-5xl px-4 pb-20 pt-32 text-center md:pb-24 md:pt-40">
        {arabic && <p className="font-arabic mb-4 text-3xl text-gold md:text-4xl">{arabic}</p>}
        <p className="text-sm font-semibold tracking-widest text-gold">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold text-deep-foreground md:text-5xl">{title}</h1>
        <Ornament className="mt-6" />
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-deep-muted">{description}</p>
      </div>
    </section>
  );
}
