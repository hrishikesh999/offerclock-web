import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-black/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-8 text-sm">
        <p>© {new Date().getFullYear()} OfferClock</p>
        <nav aria-label="Footer" className="ms-auto">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
