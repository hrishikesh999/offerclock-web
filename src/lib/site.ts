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
  /** Hero headline doubles as the brand tagline (copy doc §1, locked v2). */
  tagline: "Turn more of your traffic into students",
  /**
   * Claims discipline: copy source of truth is offerclock-homepage-copy.md (v2).
   * Teachable + Kit claims founder-verified live 2026-07-20. Still forbidden:
   * customer results/testimonials, payment plans, Apple Pay by name ("wallets"
   * is the approved wording), specific seat counts.
   */
  description:
    "OfferClock is the only checkout that enforces every lead's deadline at the payment page itself — when time runs out, the deal is actually gone.",
  locale: "en_US",
} as const;

/** Absolute URL builder. Always use this rather than string-concatenating site.url. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}
