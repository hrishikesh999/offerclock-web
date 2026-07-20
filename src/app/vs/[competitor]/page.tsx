import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { competitors, getCompetitor } from "@/content/competitors";
import { primaryCta } from "@/lib/cta";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

/**
 * The single parameterized comparison template (PRD §10). A third competitor is
 * a new entry in content/competitors.ts — not a new route, not a new build.
 */

type Params = { competitor: string };

export function generateStaticParams(): Params[] {
  return competitors.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) return {};

  return {
    title: competitor.meta.title,
    description: competitor.meta.description,
    alternates: { canonical: `/vs/${competitor.slug}` },
    // Unfinished pages must never reach the index — a thin, sourceless
    // comparison page is worse for the domain than no page at all.
    robots: competitor.ready ? undefined : { index: false, follow: false },
    openGraph: {
      type: "article",
      title: competitor.meta.title,
      description: competitor.meta.description,
      url: `/vs/${competitor.slug}`,
    },
  };
}

export default async function ComparisonPage({ params }: { params: Promise<Params> }) {
  const { competitor: slug } = await params;
  const competitor = getCompetitor(slug);
  if (!competitor) notFound();

  const structuredData = graph(
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: competitor.meta.title, path: `/vs/${competitor.slug}` },
    ]),
    faqSchema(competitor.faq),
  );

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-medium">{competitor.meta.title}</h1>

      {!competitor.ready && (
        <p className="mt-6 rounded border border-black/20 p-4 text-sm">
          Content pending. This page is noindex and excluded from the sitemap until the sourced
          competitor facts from GTM Step 2 are supplied.
        </p>
      )}

      {/* Lead with the single documented fact, per PRD §9. */}
      {competitor.lead && (
        <section className="mt-10">
          <p>{competitor.lead.claim}</p>
          <p className="mt-2 text-sm">
            Source:{" "}
            <a href={competitor.lead.sourceUrl} rel="nofollow noopener">
              {competitor.lead.source}
            </a>{" "}
            (verified {competitor.lead.verifiedOn})
          </p>
        </section>
      )}

      {competitor.facts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-medium">What the record shows</h2>
          <ul className="mt-4 space-y-4">
            {competitor.facts.map((fact) => (
              <li key={fact.claim}>
                <p>{fact.claim}</p>
                <p className="mt-1 text-sm">
                  Source:{" "}
                  <a href={fact.sourceUrl} rel="nofollow noopener">
                    {fact.source}
                  </a>{" "}
                  (verified {fact.verifiedOn})
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {competitor.differentiators.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-medium">How OfferClock differs</h2>
          {competitor.differentiators.map((item) => (
            <div key={item.heading} className="mt-6">
              <h3 className="font-medium">{item.heading}</h3>
              <p className="mt-1">{item.body}</p>
            </div>
          ))}
        </section>
      )}

      {competitor.faq.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-medium">Questions</h2>
          <dl className="mt-4 space-y-4">
            {competitor.faq.map((entry) => (
              <div key={entry.question}>
                <dt className="font-medium">{entry.question}</dt>
                <dd className="mt-1">{entry.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <p className="mt-12">
        <a href={primaryCta.href}>{primaryCta.label}</a>
      </p>

      <JsonLd data={structuredData} />
    </div>
  );
}
