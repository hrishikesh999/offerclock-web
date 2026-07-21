/**
 * The site's conversion action, defined in exactly one place.
 *
 * Waitlist → MailerLite via a custom form + API route (see /api/waitlist and
 * components/WaitlistForm). Every CTA on the site uses this same label —
 * approved 2026-07-21: "Join the waitlist", no "founding member" wording in
 * the button itself (the founding-member framing still lives in the section
 * header/body copy, just not the button text).
 */
export const primaryCta = {
  label: "Join the waitlist",
  /** Anchor to the waitlist form in the founding-member section. */
  href: "#founding",
} as const;

export const foundingSectionId = "founding";
