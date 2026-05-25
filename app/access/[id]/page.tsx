import { notFound } from "next/navigation";
import { DownloadButton } from "@/app/access/[id]/DownloadButton";
import { formatGBP } from "@/lib/money";
import { getPurchaseWithProduct, parseSignedPurchaseId } from "@/lib/purchases";

export const metadata = {
  title: "Purchase Access | Letrina Dumping Ground",
};

export default async function PurchaseAccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = parseSignedPurchaseId(decodeURIComponent(rawId));

  if (!id) {
    notFound();
  }

  const purchase = await getPurchaseWithProduct(id);

  if (!purchase || !purchase.products) {
    notFound();
  }

  const downloadsLeft = Math.max(0, purchase.max_downloads - purchase.downloads_used);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-center px-4 py-14 sm:px-6">
      <div className="grid overflow-hidden border border-cream/20 bg-surface md:grid-cols-[1fr_0.9fr]">
        <div className="p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            purchase id
          </p>
          <h1 className="mt-3 break-all font-mono text-4xl font-black leading-none tracking-[-0.06em]">
            {purchase.id}
          </h1>
          <p className="mt-5 font-mono text-sm leading-7 text-muted">
            This page is your account. Keep the ID private and reuse it when you
            need to grab the file again.
          </p>
        </div>
        <div className="border-t border-cream/15 bg-ink p-6 sm:p-8 md:border-l md:border-t-0">
          <p className="font-mono text-sm text-muted">Product</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight">
            {purchase.products.name}
          </h2>
          <dl className="mt-6 space-y-3 font-mono text-sm text-muted">
            <div className="flex justify-between gap-6 border-b border-cream/10 pb-2">
              <dt>Paid</dt>
              <dd className="text-cream">{formatGBP(purchase.amount_paid)}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-cream/10 pb-2">
              <dt>File</dt>
              <dd className="text-right text-cream">{purchase.products.file_name}</dd>
            </div>
            <div className="flex justify-between gap-6 border-b border-cream/10 pb-2">
              <dt>Downloads left</dt>
              <dd className="text-cream">
                {downloadsLeft}/{purchase.max_downloads}
              </dd>
            </div>
          </dl>
          <div className="mt-6">
            {downloadsLeft > 0 ? (
              <DownloadButton purchaseId={purchase.id} />
            ) : (
              <p className="border border-accent/60 p-4 font-mono text-sm text-accent">
                This purchase ID has used all five downloads.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
