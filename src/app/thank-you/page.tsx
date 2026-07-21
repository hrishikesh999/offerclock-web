import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're on the list",
  // Transactional, not a marketing destination — noindex, same treatment as
  // /privacy and /terms.
  robots: { index: false, follow: true },
};

const steps = [
  "We review every signup by hand — no automated approval queue.",
  "We reach out directly to schedule a short call.",
  "We get your first deadline-enforced checkout live together, on the call if you want.",
];

/**
 * Landed here right after a successful /api/waitlist submission (see
 * components/WaitlistForm). Job of this page: reassure someone who just
 * handed over their email that something real happens next — not a queue
 * they've disappeared into. Same claims-discipline rules apply here as
 * anywhere else: this describes the founder-led onboarding that's already
 * true today (product-description-july-18-26.md §7), not a promise about
 * unbuilt process.
 */
export default function ThankYouPage() {
  return (
    <div className="sec text-center">
      <div className="mx-auto max-w-[620px] px-6">
        <h1 className="text-display">You&apos;re on the list.</h1>
        <p className="mt-6 text-lg" style={{ color: "var(--slate)" }}>
          Founding access is small on purpose. Every signup gets a real look, not an autoresponder —
          the founder reaches out personally to schedule a quick call and see if OfferClock is a good
          fit for how you sell.
        </p>

        <ol className="mx-auto mt-12 max-w-[440px] space-y-5 text-left">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-4">
              <span
                className="font-mono text-sm tabular-nums"
                style={{ color: "var(--accent)" }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base" style={{ color: "var(--slate)" }}>
                {step}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-sm" style={{ color: "var(--slate)" }}>
          In the meantime, keep an eye on your inbox — that&apos;s where we&apos;ll reach you.
        </p>

        <Link href="/" className="mt-8 inline-block text-[15px]">
          Back to the homepage
        </Link>
      </div>
    </div>
  );
}
