import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/**
 * Placeholder. Noindex until real policy text is supplied — a stub privacy page
 * in the index is worse than none. Content depends on the still-open analytics
 * decision (PRD §3 implies basic pageview tracking but no requirement names a tool).
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-medium">Privacy</h1>
      <p className="mt-4">TODO: privacy policy pending.</p>
    </div>
  );
}
