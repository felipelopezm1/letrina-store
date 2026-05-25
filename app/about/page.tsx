export const metadata = {
  title: "About | Letrina Dumping Ground",
};

export default function AboutPage() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          about the maker
        </p>
        <h1 className="mt-4 text-6xl font-black leading-none tracking-[-0.06em]">
          Felipe makes ideas that click, glitch, and ship.
        </h1>
      </div>
      <div className="space-y-6 border border-cream/20 bg-surface p-6 font-mono text-sm leading-7 text-muted sm:p-8">
        <p>
          Letrina Dumping Ground is a small software shelf by Felipe Lopez
          Mantilla: experiments, utilities, templates, components, and tools that
          are useful enough to escape the private repo swamp.
        </p>
        <p>
          The store keeps the transaction simple. Buy once, pay what feels fair
          above the minimum, get an email, and reuse the purchase ID when you
          need another copy.
        </p>
        <div className="flex flex-wrap gap-3 pt-4">
          <a
            className="rounded-full border border-cream/30 px-4 py-2 text-cream hover:border-accent hover:text-accent"
            href="https://portfolio-felipe-lopez.vercel.app/"
            rel="noreferrer"
            target="_blank"
          >
            portfolio
          </a>
          <a
            className="rounded-full border border-cream/30 px-4 py-2 text-cream hover:border-accent hover:text-accent"
            href="https://portfolio-felipe-lopez.vercel.app/#coding-projects"
            rel="noreferrer"
            target="_blank"
          >
            coding projects
          </a>
          <a
            className="rounded-full border border-cream/30 px-4 py-2 text-cream hover:border-accent hover:text-accent"
            href="https://portfolio-felipe-lopez.vercel.app/#contact"
            rel="noreferrer"
            target="_blank"
          >
            contact
          </a>
        </div>
      </div>
    </section>
  );
}
