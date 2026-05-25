import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-20 border-t border-cream/15 bg-ink px-4 py-10 font-mono text-xs text-muted sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_2fr_1fr]">
        <div>
          <p className="text-cream">Letrina Dumping Ground</p>
          <p className="mt-2">One-time software drops, no accounts, no ceremony.</p>
        </div>
        <p className="max-w-xl">
          Built by Felipe Lopez Mantilla as a small dark archive for useful,
          crunchy, fun software developments. Pay what feels right above the
          floor, keep your purchase ID, download up to five times.
        </p>
        <div className="flex flex-col gap-2 md:items-end">
          <Link className="text-cream underline-offset-4 hover:underline" href="/products">
            Browse dumps
          </Link>
          <a
            className="text-cream underline-offset-4 hover:underline"
            href="https://portfolio-felipe-lopez.vercel.app/"
            rel="noreferrer"
            target="_blank"
          >
            Felipe portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}
