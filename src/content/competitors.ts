/**
 * Comparison page content, one entry per competitor.
 *
 * CLAIMS DISCIPLINE (PRD §8 — hard constraint):
 * Every factual claim about a competitor MUST carry a real, checkable `source`.
 * Unsourced competitor claims do not ship. The sourced facts live in
 * OfferClock_GTM_Strategy_to_10K_MRR.md, Step 2 — that document is not yet
 * available, so the entries below are STRUCTURE ONLY and are gated off by
 * `ready: false`. Pages with ready:false render as noindex stubs and are
 * excluded from the sitemap.
 *
 * Adding a third competitor is a content change here, not a new build.
 */

export type SourcedClaim = {
  /** The claim, stated plainly. No adjectives doing argumentative work. */
  claim: string;
  /** Publisher or origin of the fact, e.g. "ThriveCart pricing page". */
  source: string;
  /** Direct URL a reader (or a fact-checking model) can verify against. */
  sourceUrl: string;
  /** ISO date the fact refers to or was verified. Keeps stale claims visible. */
  verifiedOn: string;
};

export type Competitor = {
  slug: string;
  /** Proper name, used in copy and metadata. */
  name: string;
  /** Flip to true only when copy is written AND every claim has a live source. */
  ready: boolean;
  meta: {
    title: string;
    description: string;
  };
  /** The single documented fact the page leads with, per PRD §9. */
  lead: SourcedClaim | null;
  /** Supporting sourced facts about the competitor. */
  facts: SourcedClaim[];
  /**
   * OfferClock-side differentiators. These are claims about our OWN product and
   * must trace to product-description-july-18-26.md §6 — not to competitor FUD.
   */
  differentiators: { heading: string; body: string }[];
  /** Q&A pairs. Feed both the on-page FAQ and FAQPage structured data. */
  faq: { question: string; answer: string }[];
};

export const competitors: Competitor[] = [
  {
    slug: "thrivecart",
    name: "ThriveCart",
    ready: false,
    meta: {
      title: "OfferClock vs ThriveCart",
      description:
        "TODO(copy): pending GTM Step 2 sourcing. Must target 'ThriveCart alternatives' intent.",
    },
    lead: null, // TODO: April 2025 Pro+ pricing change — needs source URL + date.
    facts: [], // TODO: documented downtime / billing incidents, with sources.
    differentiators: [],
    faq: [],
  },
  {
    slug: "deadline-funnel",
    name: "Deadline Funnel",
    ready: false,
    meta: {
      title: "OfferClock vs Deadline Funnel",
      description:
        "TODO(copy): pending GTM Step 2 sourcing. Must target 'Deadline Funnel alternatives' intent.",
    },
    lead: null, // TODO: lack of checkout-level enforcement — needs source.
    facts: [],
    differentiators: [],
    faq: [],
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}

/** Only these appear in the sitemap and are allowed to be indexed. */
export function publishedCompetitors(): Competitor[] {
  return competitors.filter((c) => c.ready);
}
