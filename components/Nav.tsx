import Link from "next/link";

const links = [
  ["Software", "/products"],
  ["Access ID", "/access"],
  ["About", "/about"],
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-cream/15 bg-ink/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-cream sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="rounded-full border border-cream/45 px-3 py-1 text-sm font-black normal-case tracking-tight group-hover:bg-cream group-hover:text-ink">
            Letrina
          </span>
          <span className="hidden text-muted sm:inline">Dumping Ground</span>
        </Link>
        <div className="flex items-center gap-4">
          {links.map(([label, href]) => (
            <Link className="hover:text-accent" href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
