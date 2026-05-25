import Link from "next/link";

export const metadata = {
  title: "Payment received | Letrina Dumping Ground",
};

export default function SuccessPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-14 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
        payment received
      </p>
      <h1 className="mt-4 text-6xl font-black leading-none tracking-[-0.06em]">
        Check your email.
      </h1>
      <p className="mt-5 font-mono text-sm leading-7 text-muted">
        Stripe is processing the purchase. When the webhook lands, you&apos;ll get
        a receipt with your purchase ID and download page. If it takes a minute,
        that&apos;s just the pipes clanking.
      </p>
      <Link
        className="mt-8 w-fit rounded-full bg-cream px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.18em] text-ink hover:bg-accent"
        href="/products"
      >
        back to software -&gt;
      </Link>
    </section>
  );
}
