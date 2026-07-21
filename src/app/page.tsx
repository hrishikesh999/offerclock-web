import type { Metadata } from "next";
import Link from "next/link";

import { CheckoutPanel } from "@/components/CheckoutPanel";
import { icons } from "@/components/icons";
import { WaitlistForm } from "@/components/WaitlistForm";
import { features, founding, hero, pillars, positioning, stackDiagram } from "@/content/home";
import { foundingSectionId } from "@/lib/cta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage — copy locked from offerclock-homepage-copy.md v2 (see
 * src/content/home.ts). Claims-discipline note: Teachable + Kit claims are
 * founder-verified live as of 2026-07-20 (see memory/homepage-build-decisions),
 * which supersedes product-description-july-18-26.md §7's Thinkific-only line.
 *
 * Testimonial section intentionally NOT rendered — PRD §8 requires a
 * placeholder, never an empty or fabricated one. The product has run zero
 * live campaigns; there is nothing to cite yet.
 */
export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="sec text-center">
        <div className="mx-auto max-w-[1120px] px-6">
          <h1 className="text-hero mx-auto max-w-[900px]">
            {hero.headline}
            <em className="text-serif italic" style={{ color: "var(--accent)" }}>
              {hero.headlineAccent}
            </em>
            {hero.headlineEnd}
          </h1>
          <p className="mx-auto mt-6 max-w-[680px] text-lg leading-relaxed sm:text-xl" style={{ color: "var(--slate)" }}>
            {hero.subhead}
          </p>

          <WaitlistForm
            source="hero"
            buttonLabel="Join the founding member waitlist"
            className="mx-auto mt-9 flex justify-center"
          />

          <Link href={hero.quietLinkHref} className="mt-5 inline-block text-[15px]">
            {hero.quietLinkLabel}
          </Link>
          <p className="mx-auto mt-5 max-w-[560px] text-[13px]" style={{ color: "var(--slate)" }}>
            {hero.microcopy}
          </p>

          <CheckoutPanel />
        </div>
      </section>

      {/* 2 — Positioning */}
      <section className="sec" style={{ background: "var(--card)" }} id="how">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="max-w-[720px]">
            <h2 className="text-display">{positioning.header}</h2>
            <p className="mt-6 max-w-[640px] text-lg" style={{ color: "var(--slate)" }}>
              {positioning.body}
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Three pillars */}
      <section className="sec">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-display max-w-[860px]">
            OfferClock replaces fragile Zaps and patchwork tools with one simple conversion system
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.heading}
                className="rounded-[14px] border p-7"
                style={{ background: "var(--card)", borderColor: "var(--rule)" }}
              >
                <h3 className="text-serif text-[26px] leading-tight tracking-tight">{pillar.heading}</h3>
                <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--slate)" }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Before / after diagram */}
      <section className="sec" style={{ background: "var(--card)" }}>
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-display">{stackDiagram.header}</h2>

          <StackRow
            label={stackDiagram.before.label}
            nodes={stackDiagram.before.nodes}
            annotation={stackDiagram.before.annotation}
          />
          <StackRow
            label={stackDiagram.after.label}
            nodes={stackDiagram.after.nodes}
            annotation={stackDiagram.after.annotation}
            highlightNode="OfferClock"
            good
          />
        </div>
      </section>

      {/* 5 — Feature grid */}
      <section className="sec">
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-display max-w-[800px]">The conversion system you need to grow sales, not stress</h2>
          <div className="mt-13 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const FeatureIcon = icons[feature.icon];
              return (
                <div key={feature.title} className="border-t pt-4.5" style={{ borderColor: "var(--rule)" }}>
                  <FeatureIcon />
                  <h3 className="text-[16.5px] font-semibold leading-snug">{feature.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed" style={{ color: "var(--slate)" }}>
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — Founding member CTA */}
      <section className="sec text-center" style={{ background: "var(--accent-wash)" }} id={foundingSectionId}>
        <div className="mx-auto max-w-[1120px] px-6">
          <h2 className="text-display mx-auto max-w-[760px]">{founding.header}</h2>
          <p className="mx-auto mt-5.5 max-w-[620px] text-lg" style={{ color: "var(--slate)" }}>
            {founding.body}
          </p>
          <WaitlistForm
            source="founding"
            buttonLabel={founding.buttonLabel}
            className="mx-auto mt-8 flex justify-center"
          />
          <p className="mx-auto mt-5 max-w-[520px] text-[13px]" style={{ color: "var(--slate)" }}>
            {founding.microcopy}
          </p>
        </div>
      </section>
    </>
  );
}

function StackRow({
  label,
  nodes,
  annotation,
  highlightNode,
  good,
}: {
  label: string;
  nodes: string[];
  annotation: string;
  highlightNode?: string;
  good?: boolean;
}) {
  return (
    <div className="mt-11 first:mt-11">
      <span className="eyebrow" style={good ? { color: "var(--accent)" } : undefined}>
        {label}
      </span>
      <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
        {nodes.map((node, i) => {
          const isHighlight = node === highlightNode;
          return (
            <span key={node} className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center gap-2 rounded-[10px] border px-4 py-2 text-sm font-medium whitespace-nowrap"
                style={
                  isHighlight
                    ? { background: "var(--accent-wash)", borderColor: "var(--accent)", color: "var(--accent)" }
                    : { background: "var(--paper)", borderColor: "var(--rule)" }
                }
              >
                {isHighlight ? <span className="text-serif text-base">{node}</span> : node}
              </span>
              {i < nodes.length - 1 && (
                <span className="text-sm" style={{ color: "var(--slate)" }}>
                  →
                </span>
              )}
            </span>
          );
        })}
      </div>
      <p className="text-serif mt-3 text-lg italic" style={{ color: good ? "var(--good)" : "var(--slate)" }}>
        {annotation}
      </p>
    </div>
  );
}
