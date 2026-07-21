"use client";

import { useEffect, useState } from "react";

/**
 * The hero's signature element (PRD §7): a real, running countdown instrument
 * rather than a screenshot or mockup. Server renders a fixed value so crawlers
 * and the initial paint see a stable number — no hydration drift, no layout
 * shift. Ticking is client-only and off entirely under prefers-reduced-motion.
 *
 * This is a demonstration panel, not a live product screenshot (no screenshot
 * assets exist yet) — labelled as such via the surrounding caption, not inside
 * this component, to keep it reusable.
 */
const START_SECONDS = 13 * 3600 + 47 * 60 + 9;

function formatClock(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function CheckoutPanel() {
  const [seconds, setSeconds] = useState(START_SECONDS);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto mt-12 max-w-xl sm:mt-16">
      <div
        className="panel-fade overflow-hidden rounded-2xl border text-left"
        style={{ background: "var(--card)", borderColor: "var(--rule)", boxShadow: "var(--shadow-panel)" }}
        aria-label="Product checkout preview"
      >
        <div
          className="flex items-center gap-2 border-b px-5 py-3.5 text-xs"
          style={{ borderColor: "var(--rule)", color: "var(--slate)" }}
        >
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
          checkout.yourbrand.com
          <span className="ml-auto">Secure checkout · Stripe</span>
        </div>

        <div
          className="mx-5 mt-4.5 flex items-center justify-between gap-4 rounded-[10px] px-4.5 py-3.5"
          style={{ background: "var(--accent-wash)" }}
        >
          <span className="eyebrow">Offer closes in</span>
          <span
            className="font-mono text-2xl leading-none tabular-nums"
            style={{ color: "var(--accent)" }}
            suppressHydrationWarning
          >
            {formatClock(seconds)}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4 px-5 pt-4.5 pb-3.5">
          <span className="text-[17px] font-semibold">The Launch Copy Masterclass</span>
          <span className="font-mono text-[17px]">$497</span>
        </div>

        <div className="border-t px-5 pt-1 pb-5" style={{ borderColor: "var(--rule)" }}>
          <div className="mt-3.5">
            <label className="mb-1.5 block text-xs" style={{ color: "var(--slate)" }}>
              Email
            </label>
            <div className="rounded-[10px] border px-3.5 py-2.5 text-[15px]" style={{ borderColor: "var(--rule)", color: "var(--slate)" }}>
              you@email.com
            </div>
          </div>
          <div className="mt-3.5">
            <label className="mb-1.5 block text-xs" style={{ color: "var(--slate)" }}>
              Card
            </label>
            <div
              className="rounded-[10px] border px-3.5 py-2.5 font-mono text-[15px]"
              style={{ borderColor: "var(--rule)", color: "var(--slate)" }}
            >
              •••• •••• •••• 4242
            </div>
          </div>
          <div
            className="mt-4.5 w-full rounded-full py-3.5 text-center text-base font-medium"
            style={{ background: "var(--accent-btn)", color: "var(--btn-fg)" }}
          >
            Pay $497
          </div>
        </div>
      </div>
      <p className="mt-4.5 text-center text-sm" style={{ color: "var(--slate)" }}>
        When time runs out, the deal is actually gone.
      </p>
    </div>
  );
}
