/**
 * Line icon set for the feature grid — brand-guidelines.md §7 forbids
 * illustrated mascots and (implicitly, via "9 icons" as an anti-pattern)
 * garish icon-soup, so these stay to a single 1.5px stroke, 24px grid, and
 * the slate token — never the accent, so twelve icons don't compete with the
 * page's two CTAs for the amber "seasoning" budget (brand §3).
 */
import type { SVGProps } from "react";

function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mb-3 h-[22px] w-[22px]"
      style={{ stroke: "var(--slate)", fill: "none", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" }}
      {...props}
    />
  );
}

export const icons = {
  mobile: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </Icon>
  ),
  domain: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3.2 2.8 14.8 0 18M12 3c-2.8 3.2-2.8 14.8 0 18" />
    </Icon>
  ),
  preview: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </Icon>
  ),
  cart: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <circle cx="9.5" cy="19.5" r="1.3" />
      <circle cx="16.5" cy="19.5" r="1.3" />
      <path d="M3 4.5h2.2L7.6 15h9.9l2.7-8H6.3" />
    </Icon>
  ),
  fulfillment: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M12 4.5 2.5 9 12 13.5 21.5 9 12 4.5z" />
      <path d="M6.5 11.5v4.2c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8v-4.2" />
    </Icon>
  ),
  recurring: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v4.3h-4.3" />
    </Icon>
  ),
  clock: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Icon>
  ),
  bump: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M12 9v6M9 12h6" />
    </Icon>
  ),
  guided: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.2 8.8-1.9 4.5-4.5 1.9 1.9-4.5 4.5-1.9z" />
    </Icon>
  ),
  dashboard: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M3.5 20.5h17M6.5 20.5v-6M12 20.5V8M17.5 20.5V11" />
    </Icon>
  ),
  analytics: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </Icon>
  ),
  shield: (p: SVGProps<SVGSVGElement>) => (
    <Icon {...p}>
      <path d="M12 3l7.5 3v5.5c0 4.8-3.2 8-7.5 9.5-4.3-1.5-7.5-4.7-7.5-9.5V6L12 3z" />
      <path d="m9 12 2.2 2.2L15 10" />
    </Icon>
  ),
} as const;

export type IconName = keyof typeof icons;
