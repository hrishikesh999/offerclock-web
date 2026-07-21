/**
 * Homepage copy — verbatim from offerclock-homepage-copy.md (v2, locked
 * 2026-07-20). Any change to wording here should be a change to that source
 * document too, not a drive-by edit in the component.
 */
import type { IconName } from "@/components/icons";

export const hero = {
  headline: "Turn more of your traffic into ",
  headlineAccent: "students",
  headlineEnd: ".",
  subhead:
    "OfferClock is the only checkout that enforces every lead's deadline at the payment page itself — when time runs out, the deal is actually gone. No Zaps, no patchwork, no bluffs.",
  microcopy: "Founder pricing locked for life · Limited seats · Works with Thinkific, Teachable, ActiveCampaign + Kit",
};

export const positioning = {
  header: "Stop losing sales to unreliable checkouts and fake deadlines.",
  body: "Most funnels bolt a countdown onto a checkout that ignores it. OfferClock builds the deadline into the checkout itself — one conversion system instead of three tools and a Zap, so more of your browsers become buyers.",
};

export const pillars = [
  {
    heading: "Conversion-built checkout",
    body: "Designed on proven persuasion psychology and checkout mechanics — built to turn warm traffic into buyers.",
  },
  {
    heading: "Enforced deadlines",
    body: "Per-lead countdowns that actually expire at the payment page. No more stitching three tools into a half-working funnel.",
  },
  {
    heading: "Abandoned-cart recovery",
    body: "Every abandoner is tagged in your email platform automatically — your recovery sequence fires without you lifting a finger.",
  },
];

export const stackDiagram = {
  header: "Your funnel stack, before and after",
  before: {
    label: "Before OfferClock",
    nodes: ["LMS", "Checkout platform", "Deadline funnel", "Zapier", "ESP"],
    annotation: "(Zapier breaks at 2am. Everything falls apart. You find out from a customer.)",
  },
  after: {
    label: "After OfferClock",
    nodes: ["LMS", "OfferClock", "ESP"],
    annotation: "(More sales when you wake up.)",
  },
};

export const features: { icon: IconName; title: string; body: string }[] = [
  { icon: "mobile", title: "Mobile-optimized checkout", body: "built for the phone your buyers are actually holding" },
  { icon: "domain", title: "Custom domains", body: "sell from checkout.yourbrand.com, SSL automatic" },
  { icon: "preview", title: "Live-preview editor", body: "see every change as you type, publish when ready" },
  { icon: "cart", title: "Abandoned-cart recovery", body: "abandoners tagged, your recovery emails fire automatically" },
  {
    icon: "fulfillment",
    title: "Automatic fulfillment",
    body: "students enrolled in Thinkific or Teachable the moment payment clears, bundles included",
  },
  { icon: "recurring", title: "One-time or recurring", body: "courses, memberships, monthly or annual billing" },
  { icon: "clock", title: "Enforced deadline timers", body: "countdowns that actually expire at checkout" },
  { icon: "bump", title: "Order bumps", body: "one-checkbox add-ons that lift order value" },
  { icon: "guided", title: "Guided setup", body: "we get your first funnel live with you" },
  { icon: "dashboard", title: "Performance dashboard", body: "revenue and conversions per funnel, exact" },
  {
    icon: "analytics",
    title: "Analytics & remarketing pixels",
    body: "Google Analytics, Microsoft Clarity, Meta and Google Ads remarketing",
  },
  { icon: "shield", title: "Stripe-secured payments", body: "cards and wallets; card data never touches our servers" },
];

// Button label lives in lib/cta.ts (primaryCta.label) — one CTA string site-wide.
export const founding = {
  header: "Become a founding member — special pricing, locked for life",
  body: "Join the waiting list to qualify for founder pricing and fully done-for-you setup. Seats are limited — when the founding cohort is full, that pricing never comes back.",
  microcopy: "Founder pricing locks at signup and never rises — enforced by the same engine that locks your buyers' deadlines.",
};
