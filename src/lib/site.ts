/**
 * Single source of truth for site-wide constants.
 * Anything that appears in metadata, structured data, or sitemaps reads from here.
 */

export const site = {
  name: "OfferClock",
  /**
   * Canonical origin, no trailing slash. Every absolute URL in metadata,
   * JSON-LD, and the sitemap is derived from this.
   * Override per-environment so preview deploys never emit production canonicals.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://getofferclock.com").replace(/\/$/, ""),
  /** Used as the default og:title suffix and in Organization structured data. */
  tagline: "The deadline layer for Thinkific creators",
  /**
   * TODO(copy): pending founder-supplied content. Must comply with
   * product-description-july-18-26.md §7 — no results, no case studies,
   * no landing-page-builder claim, no platform claims beyond Thinkific +
   * ActiveCampaign, no payment plans, no Apple Pay until domain association ships.
   */
  description:
    "OfferClock enforces sales deadlines at checkout, not just on the page. Built for Thinkific creators.",
  locale: "en_US",
} as const;

/** Absolute URL builder. Always use this rather than string-concatenating site.url. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}
