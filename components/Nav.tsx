import Link from "next/link";
import { LetrinaLogo } from "@/components/LetrinaLogo";

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
          <span className="grid size-9 place-items-center border border-cream/45 bg-surface p-1 transition group-hover:border-accent">
            <LetrinaLogo className="size-7" />
          </span>
          <span className="skin-button border border-cream/45 px-3 py-1 text-sm font-black normal-case tracking-tight group-hover:bg-cream group-hover:text-ink">
            Letrina
          </span>
          <span className="hidden text-muted sm:inline">Dumping Ground</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-muted md:inline">skin: random</span>
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
