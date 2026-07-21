import type { Metadata } from "next";

import { WaitlistForm } from "@/components/WaitlistForm";
import { founding } from "@/content/home";

export const metadata: Metadata = {
  title: "Pricing",
  description: founding.header,
  alternates: { canonical: "/pricing" },
};

/**
 * Approved 2026-07-20: rewritten to the founding-member framing to match the
 * homepage (see memory/homepage-build-decisions.md). Supersedes the PRD's
 * "free while in early access" requirement — that framing directly undercut
 * the founder-pricing scarcity story once the v2 copy shipped.
 *
 * Still no specific seat count or price point per the claims-discipline
 * checklist — "founding cohort," never a number.
 */
export default function PricingPage() {
  return (
    <div className="sec text-center">
      <div className="mx-auto max-w-[720px] px-6">
        <h1 className="text-display">{founding.header}</h1>
        <p className="mt-6 text-lg" style={{ color: "var(--slate)" }}>
          {founding.body}
        </p>
        <WaitlistForm source="pricing" buttonLabel={founding.buttonLabel} className="mt-9 flex justify-center" />
        <p className="mx-auto mt-5 max-w-[480px] text-[13px]" style={{ color: "var(--slate)" }}>
          {founding.microcopy}
        </p>
      </div>
    </div>
  );
}
