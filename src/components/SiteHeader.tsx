import Link from "next/link";

import { primaryCta } from "@/lib/cta";

const nav = [
  { href: "/#how", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-10 border-b backdrop-blur-md"
      style={{ borderColor: "var(--rule)", background: "color-mix(in srgb, var(--paper) 88%, transparent)" }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-7 gap-y-2 px-6 py-4"
      >
        <Link href="/" className="text-serif text-[22px]">
          OfferClock
        </Link>
        <ul className="ml-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]" style={{ color: "var(--slate)" }}>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <a href={primaryCta.href} className="btn-pill btn-sm ml-auto">
          {primaryCta.label}
        </a>
      </nav>
    </header>
  );
}
