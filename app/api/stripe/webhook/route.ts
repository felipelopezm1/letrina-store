import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { sendReceiptEmail } from "@/lib/email";
import { createPurchaseId } from "@/lib/id";
import { signPurchaseId } from "@/lib/purchases";
import { getLocalProductBySlug } from "@/lib/products";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing webhook secret." }, { status: 500 });
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bad signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const slug = session.metadata?.slug;
  const buyerEmail = session.customer_details?.email ?? session.customer_email;

  if (!slug || !buyerEmail || !session.amount_total) {
    return NextResponse.json({ error: "Session missing required data." }, { status: 400 });
  }

  const product = await getLocalProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const supabase = getSupabaseAdmin();
  const { data: dbProduct, error: productError } = await supabase
    .from("products")
    .select("id, name")
    .eq("slug", slug)
    .single<{ id: string; name: string }>();

  if (productError || !dbProduct) {
    return NextResponse.json({ error: "Product not seeded in Supabase." }, { status: 500 });
  }

  const purchaseId = createPurchaseId();
  const { data: purchase, error: purchaseError } = await supabase
    .from("purchases")
    .upsert(
      {
        id: purchaseId,
        product_id: dbProduct.id,
        stripe_session_id: session.id,
        amount_paid: session.amount_total,
        currency: session.currency ?? "gbp",
        buyer_email: buyerEmail,
        max_downloads: 5,
      },
      { onConflict: "stripe_session_id", ignoreDuplicates: true },
    )
    .select("id")
    .single<{ id: string }>();

  if (purchaseError || !purchase) {
    return NextResponse.json({ error: "Could not create purchase." }, { status: 500 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? new URL(request.url).origin;
  const signedId = signPurchaseId(purchase.id);

  await sendReceiptEmail({
    to: buyerEmail,
    productName: dbProduct.name,
    purchaseId: purchase.id,
    accessUrl: `${baseUrl}/access/${signedId}`,
    amountPaid: session.amount_total,
    downloadsLeft: 5,
  });

  return NextResponse.json({ received: true });
}
