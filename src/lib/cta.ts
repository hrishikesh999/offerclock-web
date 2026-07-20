/**
 * The site's conversion action, defined in exactly one place.
 *
 * OPEN ITEM (raised in PRD review): the PRD specifies no conversion destination.
 * There is no signup route, no contact form, and email capture is a v1 non-goal —
 * yet §11's leading metric is "engagements that convert to a conversation".
 * Pricing is "free while in early access" and hand-held, so the action is a
 * manual conversation. Until the founder picks the destination, this points at
 * a mailto so no page ships a dead CTA.
 *
 * Replace with the real destination (booking link, contact route, or app signup)
 * and every CTA on the site follows.
 */
export const primaryCta = {
  label: "Get early access",
  href: "mailto:hello@getofferclock.com?subject=OfferClock%20early%20access",
  /** True once a real destination is wired. Gates nothing yet; used for review. */
  confirmed: false,
} as const;
