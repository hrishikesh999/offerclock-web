import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund policy",
  alternates: { canonical: "/refund-policy" },
  robots: { index: false, follow: true },
};

/**
 * Placeholder. Noindex until real policy text is supplied. The homepage
 * copy checklist (offerclock-homepage-copy.md) gates the live waitlist on
 * Terms, Privacy, and this page all existing with real content — email
 * capture requires a privacy policy, and the footer links this page too.
 */
export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-medium">Refund policy</h1>
      <p className="mt-4">TODO: refund policy pending.</p>
    </div>
  );
}
