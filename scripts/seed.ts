import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { createClient } from "@supabase/supabase-js";
import { productSchema } from "@/lib/products";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const productsDir = path.join(root, "content", "products");
const seedFilesDir = path.join(root, "seed-files");
const outDir = path.join(root, ".seed-zips");

async function zipFolder(folder: string, outputPath: string) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await execFileAsync("zip", ["-r", outputPath, "."], { cwd: folder });
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.some((bucket) => bucket.name === "software")) {
    const { error } = await supabase.storage.createBucket("software", {
      public: false,
      fileSizeLimit: 1024 * 1024 * 1024,
    });
    if (error) throw error;
  }

  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(outDir, { recursive: true });

  const entries = await fs.readdir(productsDir);
  for (const entry of entries.filter((item) => item.endsWith(".json"))) {
    const source = await fs.readFile(path.join(productsDir, entry), "utf8");
    const product = productSchema.parse(JSON.parse(source));
    const folder = path.join(seedFilesDir, product.slug);
    const zipPath = path.join(outDir, product.file_name);

    await zipFolder(folder, zipPath);
    const file = await fs.readFile(zipPath);

    const { error: uploadError } = await supabase.storage
      .from("software")
      .upload(product.storage_path, file, {
        cacheControl: "3600",
        contentType: "application/zip",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { error: upsertError } = await supabase.from("products").upsert(
      {
        ...product,
        file_size: file.byteLength,
      },
      { onConflict: "slug" },
    );

    if (upsertError) throw upsertError;

    console.log(`Seeded ${product.slug} (${file.byteLength} bytes)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
