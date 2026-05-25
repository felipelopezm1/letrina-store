import { NextResponse } from "next/server";
import { z } from "zod";
import { normalizeAmount } from "@/lib/money";
import { getLocalProductBySlug } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  slug: z.string().min(1),
  amount: z.number(),
  email: z.string().email().optional(),
});

export async function POST(request: Request) {
  try {
    const body = checkoutSchema.parse(await request.json());
    const product = await getLocalProductBySlug(body.slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const amount = normalizeAmount(body.amount, product.min_price);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? new URL(request.url).origin;
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: body.email,
      allow_promotion_codes: false,
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            unit_amount: amount,
            product_data: {
              name: product.name,
              description: product.tagline,
              metadata: {
                slug: product.slug,
              },
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        slug: product.slug,
        amount: String(amount),
      },
      payment_intent_data: {
        metadata: {
          slug: product.slug,
        },
      },
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/products/${product.slug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create checkout.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
