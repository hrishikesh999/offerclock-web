import type { Metadata } from "next";

import { primaryCta } from "@/lib/cta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage — STRUCTURE ONLY. Copy pending founder hand-off; every line below is
 * a placeholder and must be replaced from product-description-july-18-26.md
 * §1–§5, then checked against §7 before merge.
 *
 * Claims-discipline reminders for whoever fills this in:
 *  - no results, case studies, testimonials, logo walls, or "trusted by"
 *  - no landing-page-builder claim
 *  - no platform support beyond Thinkific + ActiveCampaign
 *  - no payment plans / installments; subscriptions only
 *  - no Apple Pay until domain association is confirmed
 */
export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <section>
        <h1 className="text-3xl font-medium">TODO(copy): one-liner from product description §1</h1>
        <p className="mt-4 max-w-2xl">
          TODO(copy): positioning paragraph from product description §2.
        </p>
        <p className="mt-8">
          <a href={primaryCta.href}>{primaryCta.label}</a>
        </p>
      </section>

      {/*
        SIGNATURE ELEMENT — deferred pending founder decision.
        PRD §7 asks for "a real, running countdown instrument" here, but §7's own
        constraints and §8 forbid fake scarcity. A live countdown to nothing real
        is exactly that. Resolve before building: either a clearly-labelled
        product demonstration, or a countdown to a genuine date.
        Whatever ships must use tabular numerals, reserve its own width to avoid
        layout shift, respect prefers-reduced-motion, and render a static
        server-side fallback so crawlers see a stable value (no hydration drift).
      */}

      <section className="mt-16">
        <h2 className="text-xl font-medium">
          TODO(copy): feature overview from product description §5
        </h2>
      </section>

      {/*
        Future testimonial section goes here — intentionally NOT rendered.
        PRD §8 requires a commented placeholder, never an empty or fabricated one.
        The product has run zero live campaigns; there is nothing to cite.
      */}
    </div>
  );
}
