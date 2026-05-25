import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatGBP } from "@/lib/money";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link
      className="skin-panel group block overflow-hidden border border-cream/20 bg-surface transition duration-200 hover:-rotate-1 hover:border-accent hover:shadow-[8px_8px_0_rgba(255,90,31,0.35)]"
      href={`/products/${product.slug}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-cream/20 bg-ink">
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.cover_url})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,17,13,0.24)_50%,transparent_50%)] bg-[length:5px_100%] mix-blend-multiply" />
        <span className="absolute left-3 top-3 bg-cream px-2 py-1 font-mono text-xs font-black text-ink">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="space-y-4 p-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {product.tags.slice(0, 2).join(" / ")}
          </p>
          <h3 className="skin-title mt-2 text-2xl font-black leading-none text-cream">
            {product.name}
          </h3>
          <p className="mt-2 min-h-10 text-sm text-muted">{product.tagline}</p>
        </div>
        <div className="flex items-center justify-between border-t border-cream/15 pt-3 font-mono text-sm">
          <span>from {formatGBP(product.min_price)}</span>
          <span className="text-accent">{product.preview_url ? "test ->" : "open ->"}</span>
        </div>
      </div>
    </Link>
  );
}
