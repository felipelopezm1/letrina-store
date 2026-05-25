import crypto from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export type PurchaseWithProduct = {
  id: string;
  amount_paid: number;
  currency: string;
  buyer_email: string;
  downloads_used: number;
  max_downloads: number;
  created_at: string;
  products: {
    slug: string;
    name: string;
    tagline: string | null;
    storage_path: string;
    file_name: string;
    version: string | null;
  } | null;
};

export function signPurchaseId(id: string) {
  const secret = process.env.PURCHASE_ID_SECRET;

  if (!secret) {
    return id;
  }

  const sig = crypto
    .createHmac("sha256", secret)
    .update(id)
    .digest("base64url")
    .slice(0, 12);

  return `${id}.${sig}`;
}

export function parseSignedPurchaseId(value: string) {
  const [id, sig] = value.split(".");
  const secret = process.env.PURCHASE_ID_SECRET;

  if (!id) {
    return null;
  }

  if (!secret) {
    return id;
  }

  const expected = signPurchaseId(id).split(".")[1];
  if (!sig || sig !== expected) {
    return null;
  }

  return id;
}

export async function getPurchaseWithProduct(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("purchases")
    .select(
      "id, amount_paid, currency, buyer_email, downloads_used, max_downloads, created_at, products(slug, name, tagline, storage_path, file_name, version)",
    )
    .eq("id", id)
    .single<PurchaseWithProduct>();

  if (error) {
    return null;
  }

  return data;
}
