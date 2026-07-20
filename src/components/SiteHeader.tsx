import Link from "next/link";

import { primaryCta } from "@/lib/cta";

/**
 * Structural only — visual design deferred until brand guidelines land (PRD §7).
 * Nav is a real <nav> with a real landmark label so crawlers and screen readers
 * both get an unambiguous site structure.
 */
const nav = [
  { href: "/vs/thrivecart", label: "vs ThriveCart" },
  { href: "/vs/deadline-funnel", label: "vs Deadline Funnel" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-black/10">
      <nav aria-label="Primary" className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4">
        <Link href="/" className="font-medium">
          OfferClock
        </Link>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="ms-auto text-sm">
          <a href={primaryCta.href}>{primaryCta.label}</a>
        </div>
      </nav>
    </header>
  );
}
