import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export function ProductCarousel({ products }: { products: Product[] }) {
  return (
    <div className="flex snap-x gap-5 overflow-x-auto pb-5">
      {products.map((product, index) => (
        <div className="w-[320px] shrink-0 snap-start md:w-[390px]" key={product.slug}>
          <ProductCard index={index} product={product} />
        </div>
      ))}
    </div>
  );
}
