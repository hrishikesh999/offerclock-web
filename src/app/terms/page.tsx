import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

/** Placeholder. Noindex until real terms are supplied. */
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-medium">Terms</h1>
      <p className="mt-4">TODO: terms of service pending.</p>
    </div>
  );
}
