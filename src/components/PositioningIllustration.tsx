/**
 * Illustration for the "Stop losing sales..." section. Depicts the section's
 * own argument: three faint, scattered, mislabelled timers (the patchwork of
 * tools) converging into one precise, enforced instrument (OfferClock) — the
 * same "instrument, not alarm" thesis as the checkout design brief §5.
 *
 * Deliberately static — brand-guidelines.md §6 reserves motion for countdowns
 * only ("everything else is still"), and this isn't one. No mascot, no
 * hand-drawn arrows, no stock photography — plain geometric SVG primitives,
 * consistent with the feature-grid icon set.
 */
export function PositioningIllustration() {
  return (
    <div
      className="mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center rounded-2xl border"
      style={{ background: "var(--paper)", borderColor: "var(--rule)", boxShadow: "var(--shadow-panel)" }}
      role="img"
      aria-label="Three scattered, disconnected countdown tools converging into one enforced OfferClock instrument"
    >
      <svg viewBox="0 0 320 320" className="h-4/5 w-4/5" aria-hidden="true">
        {/* Converging guide lines, drawn first so nodes sit on top */}
        <g stroke="var(--rule)" strokeWidth="1.25" strokeDasharray="3 4" fill="none">
          <path d="M62 78 L160 160" />
          <path d="M258 74 L160 160" />
          <path d="M52 240 L160 160" />
        </g>

        {/* Scattered node 1 — undersized, tilted, faint */}
        <g transform="translate(62 78) rotate(-8)" opacity="0.55">
          <circle r="26" fill="none" stroke="var(--slate)" strokeWidth="1.5" strokeDasharray="2 4" />
          <path d="M0 -14 V0 L9 6" stroke="var(--slate)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text y="42" textAnchor="middle" fontSize="10" letterSpacing="0.5" fill="var(--slate)" fontFamily="ui-monospace, monospace">
            ZAP
          </text>
        </g>

        {/* Scattered node 2 */}
        <g transform="translate(258 74) rotate(11)" opacity="0.55">
          <circle r="22" fill="none" stroke="var(--slate)" strokeWidth="1.5" strokeDasharray="2 4" />
          <path d="M0 -12 V0 L-8 5" stroke="var(--slate)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text y="38" textAnchor="middle" fontSize="10" letterSpacing="0.5" fill="var(--slate)" fontFamily="ui-monospace, monospace">
            COUNTDOWN
          </text>
        </g>

        {/* Scattered node 3 */}
        <g transform="translate(52 240) rotate(-4)" opacity="0.55">
          <circle r="20" fill="none" stroke="var(--slate)" strokeWidth="1.5" strokeDasharray="2 4" />
          <path d="M0 -11 V0 L7 -6" stroke="var(--slate)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text y="36" textAnchor="middle" fontSize="10" letterSpacing="0.5" fill="var(--slate)" fontFamily="ui-monospace, monospace">
            CHECKOUT
          </text>
        </g>

        {/* The enforced instrument — solid, centered, precise */}
        <g transform="translate(160 160)">
          <circle r="52" fill="var(--accent-wash)" stroke="var(--accent)" strokeWidth="2" />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const inner = 40;
            const outer = 46;
            return (
              <line
                key={i}
                x1={inner * Math.sin(angle)}
                y1={-inner * Math.cos(angle)}
                x2={outer * Math.sin(angle)}
                y2={-outer * Math.cos(angle)}
                stroke="var(--accent)"
                strokeWidth={i % 3 === 0 ? 2 : 1}
              />
            );
          })}
          <path d="M0 -26 V2 L18 14" stroke="var(--accent)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle r="3.5" fill="var(--accent)" />
        </g>
      </svg>
    </div>
  );
}
