/**
 * schema.org structured data builders.
 *
 * These matter for two distinct audiences:
 *  - search engines, for rich results and entity resolution
 *  - answer engines / LLM crawlers, which lean on explicit machine-readable
 *    claims far more heavily than on inferred page semantics
 *
 * Emit via <JsonLd /> so every page ships exactly one <script type="application/ld+json">.
 */

import { absoluteUrl, site } from "@/lib/site";

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    description: site.description,
    // TODO(founder): add logo URL and sameAs profiles (X, LinkedIn) once assets exist.
    // An empty sameAs is worse than none — omit rather than ship a stub.
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: site.name,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqSchema(faq: { question: string; answer: string }[]) {
  if (faq.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string | null;
  path: string;
  publishedAt: string;
  updatedAt: string | null;
  authorName: string | null;
  imageUrl: string | null;
}) {
  return {
    "@type": "BlogPosting",
    "@id": absoluteUrl(input.path) + "#article",
    headline: input.title,
    description: input.description ?? undefined,
    url: absoluteUrl(input.path),
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: input.authorName
      ? { "@type": "Person", name: input.authorName }
      : { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
    image: input.imageUrl ?? undefined,
    isPartOf: { "@id": absoluteUrl("/#website") },
    inLanguage: "en",
  };
}

/** Wraps one or more node objects into a single @graph document. */
export function graph(...nodes: (object | null)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean),
  };
}
