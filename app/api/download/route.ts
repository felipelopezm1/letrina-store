import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const downloadSchema = z.object({
  purchaseId: z.string().min(1),
});

type ClaimedPurchase = {
  id: string;
  products: {
    storage_path: string;
    file_name: string;
  } | null;
};

export async function POST(request: Request) {
  try {
    const { purchaseId } = downloadSchema.parse(await request.json());
    const supabase = getSupabaseAdmin();

    const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
    const ua = request.headers.get("user-agent") ?? "unknown";
    const ipHash = crypto.createHash("sha256").update(forwardedFor).digest("hex");

    const { data, error } = await supabase.rpc("claim_download", {
      purchase_id_input: purchaseId,
      ip_hash_input: ipHash,
      ua_input: ua.slice(0, 500),
    });

    if (error || !data) {
      return NextResponse.json(
        { error: "Purchase not found or download limit reached." },
        { status: 403 },
      );
    }

    const purchase = Array.isArray(data) ? (data[0] as ClaimedPurchase) : (data as ClaimedPurchase);

    if (!purchase?.products?.storage_path) {
      return NextResponse.json({ error: "File not available." }, { status: 404 });
    }

    const { data: signed, error: signedError } = await supabase.storage
      .from("software")
      .createSignedUrl(purchase.products.storage_path, 300, {
        download: purchase.products.file_name,
      });

    if (signedError || !signed?.signedUrl) {
      return NextResponse.json({ error: "Could not create signed URL." }, { status: 500 });
    }

    return NextResponse.json({ url: signed.signedUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Download failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
