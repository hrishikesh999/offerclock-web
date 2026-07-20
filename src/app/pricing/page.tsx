import type { Metadata } from "next";

import { primaryCta } from "@/lib/cta";

export const metadata: Metadata = {
  title: "Pricing",
  description: "OfferClock is free while in early access.",
  alternates: { canonical: "/pricing" },
};

/**
 * Pricing — STRUCTURE ONLY, copy pending.
 * Hard constraint (product description §7): "free while in early access" is the
 * only honest framing. There is no billing system in the product. Do not invent
 * price points, tiers, or trial lengths, and do not imply billing exists.
 */
export default function PricingPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-medium">Pricing</h1>
      <p className="mt-4">Free while in early access.</p>
      <p className="mt-4">TODO(copy): early-access framing, pending founder hand-off.</p>
      <p className="mt-8">
        <a href={primaryCta.href}>{primaryCta.label}</a>
      </p>
    </div>
  );
}
