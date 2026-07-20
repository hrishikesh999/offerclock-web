import type { MetadataRoute } from "next";

import { absoluteUrl, site } from "@/lib/site";

/**
 * Crawler policy.
 *
 * The AI crawlers below are allowed DELIBERATELY, not by omission. For a site
 * whose job is competitive displacement, being quotable by answer engines is
 * the point — blocking them removes OfferClock from "ThriveCart alternatives"
 * style answers without reducing any real cost. Two distinct categories:
 *
 *   - Retrieval/citation crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot,
 *     Claude-User, Claude-SearchBot, Google-Extended): these surface and cite
 *     pages in answers. Allowing them is upside with no training implication.
 *   - Training crawlers (GPTBot, ClaudeBot, CCBot): these ingest for model
 *     training. Allowed here on the same reasoning, but this IS a business
 *     decision the founder can reverse by moving them to `disallow`.
 *
 * Preview/non-production deploys are blocked wholesale so staging URLs never
 * compete with production for indexing.
 */

const isProduction = site.url === "https://getofferclock.com";

const aiCrawlers = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-User",
  "Claude-SearchBot",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Bytespider",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // API routes carry no indexable content and one is a webhook receiver.
        disallow: ["/api/"],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
