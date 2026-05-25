import { notFound } from "next/navigation";
import { PwywInput } from "@/components/PwywInput";
import { formatGBP } from "@/lib/money";
import { getLocalProductBySlug, getLocalProducts } from "@/lib/products";

export async function generateStaticParams() {
  const products = await getLocalProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getLocalProductBySlug(slug);

  return {
    title: product ? `${product.name} | Letrina Dumping Ground` : "Product",
    description: product?.tagline,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getLocalProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="skin-panel overflow-hidden border border-cream/20 bg-surface">
        <div className="relative aspect-square bg-ink">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${product.cover_url})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,17,13,0.22)_50%,transparent_50%)] bg-[length:4px_100%]" />
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            {product.tags.join(" / ")}
          </p>
          <h1 className="skin-title mt-3 text-6xl font-black leading-[0.9] sm:text-7xl">
            {product.name}
          </h1>
          <p className="mt-4 font-mono text-sm text-muted">{product.tagline}</p>
        </div>

        <div className="grid gap-3 border-y border-cream/15 py-4 font-mono text-sm text-muted sm:grid-cols-3">
          <p>
            <span className="block text-cream">Min price</span>
            {formatGBP(product.min_price)}
          </p>
          <p>
            <span className="block text-cream">Version</span>
            {product.version}
          </p>
          <p>
            <span className="block text-cream">Downloads</span>5 per purchase ID
          </p>
        </div>

        <PwywInput
          minimum={product.min_price}
          productSlug={product.slug}
          suggested={product.suggested}
        />

        {product.preview_url ? (
          <a
            className="skin-button block border border-accent bg-accent px-5 py-3 text-center font-mono text-xs font-black uppercase tracking-[0.18em] text-ink hover:bg-cream"
            href={product.preview_url}
            rel="noreferrer"
            target="_blank"
          >
            test the live previz -&gt;
          </a>
        ) : null}

        <article className="prose-dump font-mono text-sm leading-7 text-muted">
          {product.description.split("\n\n").map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <div className="flex flex-wrap gap-2">
          {product.tech_stack.map((tech) => (
            <span
              className="border border-cream/20 px-2 py-1 font-mono text-xs text-cream"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
