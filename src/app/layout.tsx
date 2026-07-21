import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

import "./globals.css";

// Self-hosted via next/font — no request to Google at runtime, no layout shift.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Headline display face. Swapped from Instrument Serif (too narrow at display
// sizes per founder review) for Fraunces — same "never bolded, size carries
// the weight" rule from brand-guidelines.md §2, but a wider, less condensed
// letterform. Fraunces ships as a variable font so a mid weight (500) reads
// confident without touching bold.
const displaySerif = Fraunces({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  // metadataBase makes every relative canonical / og:image resolve absolutely.
  // Without it Next emits relative URLs that crawlers and scrapers mishandle.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    // Explicitly permissive. max-snippet:-1 and max-image-preview:large let
    // search and answer engines quote full context rather than a clipped line.
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${displaySerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
