import { ProductGrid } from "@/components/ProductGrid";
import { getLocalProducts } from "@/lib/products";

export const metadata = {
  title: "Software | Letrina Dumping Ground",
};

export default async function ProductsPage() {
  const products = await getLocalProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mb-10 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
          available software
        </p>
        <h1 className="skin-title mt-4 text-6xl font-black leading-none">
          Pick through the pile.
        </h1>
        <p className="mt-5 font-mono text-sm leading-7 text-muted">
          Each item is a one-time purchase. Prices are flexible above the floor,
          and the purchase ID gives access to five downloads.
        </p>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
