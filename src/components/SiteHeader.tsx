import Link from "next/link";

import { primaryCta } from "@/lib/cta";

/** Single-page site — header is just the wordmark and the one CTA, no nav links. */
export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-10 border-b backdrop-blur-md"
      style={{ borderColor: "var(--rule)", background: "color-mix(in srgb, var(--paper) 88%, transparent)" }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1120px] items-center gap-x-7 px-6 py-4"
      >
        <Link href="/" className="text-serif text-[22px]">
          OfferClock
        </Link>
        <a href={primaryCta.href} className="btn-pill btn-sm ml-auto">
          {primaryCta.label}
        </a>
      </nav>
    </header>
  );
}
