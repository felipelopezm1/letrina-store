import Link from "next/link";
import { ProductCarousel } from "@/components/ProductCarousel";
import { getLocalProducts } from "@/lib/products";

export default async function Home() {
  const products = await getLocalProducts();

  return (
    <div>
      <section className="mx-auto grid min-h-[76vh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            software debris / pay once / keep the id
          </p>
          <h1 className="skin-title mt-5 max-w-4xl text-6xl font-black leading-[0.86] text-cream sm:text-8xl lg:text-[9.5rem]">
            Letrina Dumping Ground
          </h1>
          <p className="mt-6 max-w-xl font-mono text-sm leading-7 text-muted sm:text-base">
            A dark little shop for Felipe&apos;s software drops. No accounts,
            no dashboards, no growth funnel slime. Buy once, get a purchase ID,
            download up to five times.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.16em]">
            <Link
              className="skin-button bg-cream px-5 py-3 font-black text-ink hover:bg-accent"
              href="/products"
            >
              Browse software
            </Link>
            <Link
              className="skin-button border border-cream/30 px-5 py-3 text-cream hover:border-accent hover:text-accent"
              href="/access"
            >
              Reuse purchase id
            </Link>
          </div>
        </div>
        <div className="skin-panel relative min-h-[420px] border border-cream/20 bg-surface p-4">
          <div className="absolute inset-4 border border-cream/10" />
          <div className="relative flex h-full min-h-[390px] items-center justify-center overflow-hidden bg-ink">
            <div className="absolute h-72 w-72 rounded-full border border-cream/20" />
            <pre className="select-none text-left font-mono text-[10px] leading-[10px] text-cream/80 sm:text-xs sm:leading-3">
{`+------------------------------------------------+
| LETRINA DUMPING GROUND // SOFTWARE SHELF       |
|------------------------------------------------|
| 001  PAY WHAT YOU WANT  >= GBP 10              |
| 010  NO ACCOUNT         PURCHASE_ID ONLY       |
| 011  DOWNLOAD LIMIT     5 PER PURCHASE         |
| 100  PREVIEW MODE       TRY BEFORE REPO DROP   |
+------------------------------------------------+
        ____        ____        ____
       / __/___ ___/ / /__ ____/ / /
      / _// -_) _  / / _ '/ _  /_/ 
     /_/  \\__/\\_,_/_/\\_,_/\\_,_(_)  `}
            </pre>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-6 flex items-end justify-between border-b border-cream/15 pb-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              latest dumps
            </p>
            <h2 className="mt-2 text-4xl font-black tracking-tight">Fresh out the pipe</h2>
          </div>
          <Link className="font-mono text-sm text-accent hover:underline" href="/products">
            view all -&gt;
          </Link>
        </div>
        <ProductCarousel products={products} />
      </section>

      <section className="border-y border-cream/15 bg-surface/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 font-mono text-sm text-muted sm:px-6 md:grid-cols-3">
          <p>
            <span className="block text-cream">Pay what you want</span>
            Every software drop has a minimum price, then you can add extra if
            it saved you time.
          </p>
          <p>
            <span className="block text-cream">No account rot</span>
            Stripe handles the payment. You keep a purchase ID and email receipt.
          </p>
          <p>
            <span className="block text-cream">Private files</span>
            Downloads come from Supabase Storage through short-lived signed URLs.
          </p>
        </div>
      </section>
    </div>
  );
}
