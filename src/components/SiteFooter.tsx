import Link from "next/link";

import { foundingSectionId } from "@/lib/cta";

export function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--rule)" }}>
      <div className="mx-auto max-w-[1120px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.2fr_1fr]">
          <div>
            <span className="text-serif text-xl">OfferClock</span>
            <p className="mt-2 text-[15px]" style={{ color: "var(--slate)" }}>
              Turn more of your traffic into students.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3.5">Product</p>
            <ul className="space-y-2.5 text-[15px]" style={{ color: "var(--slate)" }}>
              <li>
                <Link href="/#how">How it works</Link>
              </li>
              <li>
                <a href={`#${foundingSectionId}`}>Founding member waitlist</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3.5">Your stack</p>
            <p className="text-[15px]" style={{ color: "var(--slate)" }}>
              Works with Thinkific, Teachable, ActiveCampaign + Kit.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3.5">Support &amp; legal</p>
            <ul className="space-y-2.5 text-[15px]" style={{ color: "var(--slate)" }}>
              <li>
                <a href="mailto:support@getofferclock.com">support@getofferclock.com</a> — email us, a human
                answers
              </li>
              <li>
                <Link href="/terms">Terms</Link> · <Link href="/privacy">Privacy</Link> ·{" "}
                <Link href="/refund-policy">Refund policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t pt-6 text-[13px]" style={{ borderColor: "var(--rule)", color: "var(--slate)" }}>
          © {new Date().getFullYear()} OfferClock · Payments secured by Stripe · Your money goes to your Stripe
          account, never through ours.
        </p>
      </div>
    </footer>
  );
}
