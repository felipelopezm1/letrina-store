import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

export const productSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  min_price: z.number().int().min(1000),
  suggested: z.number().int().min(1000),
  cover_url: z.string(),
  gallery: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  tech_stack: z.array(z.string()).default([]),
  storage_path: z.string(),
  file_name: z.string(),
  file_size: z.number().int().optional(),
  version: z.string().default("0.1.0"),
  is_published: z.boolean().default(true),
});

export type Product = z.infer<typeof productSchema> & {
  id?: string;
};

const productsDir = path.join(process.cwd(), "content", "products");

export async function getLocalProducts() {
  const entries = await fs.readdir(productsDir);
  const products = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".json"))
      .map(async (entry) => {
        const source = await fs.readFile(path.join(productsDir, entry), "utf8");
        return productSchema.parse(JSON.parse(source));
      }),
  );

  return products
    .filter((product) => product.is_published)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getLocalProductBySlug(slug: string) {
  const products = await getLocalProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
