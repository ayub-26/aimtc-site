import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Toaster } from "@/components/ui/sonner";

const SITE_URL = "https://aimtc-site.vercel.app"; // নিজের ডোমেইন নিলে এখানে বদলান
const NAME_BN = "আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার";
const NAME_EN = "Ayub International Mind Training Center";
const ALT_NAMES = ["AIMTC", "Ayub International", "Ayub International Mind Training", "আইয়ুব ইন্টারন্যাশনাল", "আইয়ুব মাইন্ড ট্রেনিং", "আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং"];

// Google-কে সাইটের নাম ও প্রতিষ্ঠানের পরিচয় জানায়
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: NAME_EN, alternateName: [NAME_BN, ...ALT_NAMES], inLanguage: "bn" },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#org`,
      name: NAME_BN,
      alternateName: [NAME_EN, ...ALT_NAMES],
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/favicon.png`,
      email: "ayubmd202600@gmail.com",
      telephone: "+8801628102071",
      address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
      founder: { "@type": "Person", name: "আবু আইয়ুব আনসারী" },
      sameAs: [] as string[], // Facebook / YouTube পেজের লিংক এখানে যোগ করুন
    },
  ],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Each content route sets its own head().
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "আইয়ুব ইন্টারন্যাশনাল মাইন্ড ট্রেনিং সেন্টার" },
      { name: "description", content: "কোরআন, হাদিস ও ইসলামিক মাইন্ড ট্রেনিংয়ের প্রতিষ্ঠান — ঢাকা, বাংলাদেশ।" },
      { name: "author", content: "Ayub International Mind Training Center" },
      { name: "theme-color", content: "#123a2c" },
      { property: "og:site_name", content: "Ayub International Mind Training Center" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Serif+Bengali:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(STRUCTURED_DATA) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
