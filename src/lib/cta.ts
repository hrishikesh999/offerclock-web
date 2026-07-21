/**
 * The site's conversion action, defined in exactly one place.
 *
 * Approved 2026-07-20: waitlist → MailerLite via a custom form + API route
 * (see /api/waitlist and components/WaitlistForm). Every CTA that isn't the
 * form itself scrolls to the founding-member section's form.
 *
 * STILL OPEN: the copy doc offers two labels ("Join the founding member
 * waitlist" in the hero, "Join the waiting list" in §6) and flags picking one
 * as a to-do — brand-guidelines.md §5 requires one CTA verb site-wide. Using
 * the hero's fuller phrasing as the default until the founder picks.
 */
export const primaryCta = {
  label: "Join the founding member waitlist",
  /** Anchor to the waitlist form in the founding-member section. */
  href: "#founding",
} as const;

export const foundingSectionId = "founding";
