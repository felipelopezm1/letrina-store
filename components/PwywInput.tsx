"use client";

import { useMemo, useState } from "react";
import { formatGBP } from "@/lib/money";

export function PwywInput({
  productSlug,
  minimum,
  suggested,
}: {
  productSlug: string;
  minimum: number;
  suggested: number;
}) {
  const [amount, setAmount] = useState(String(suggested / 100));
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const presets = useMemo(
    () => [minimum, suggested, Math.max(suggested + 500, minimum + 1000)],
    [minimum, suggested],
  );

  async function checkout() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: productSlug,
          amount: Number(amount),
          email: email || undefined,
        }),
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Checkout failed.");
      }

      window.location.href = payload.url;
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Checkout failed.");
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4 border border-cream/20 bg-surface p-4">
      <div>
        <label className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Pay what you want (min {formatGBP(minimum)})
        </label>
        <div className="mt-2 flex items-center border border-cream/25 bg-ink px-4 py-3">
          <span className="font-mono text-2xl text-muted">£</span>
          <input
            className="w-full bg-transparent pl-2 text-4xl font-black text-cream outline-none"
            min={minimum / 100}
            onChange={(event) => setAmount(event.target.value)}
            step="1"
            type="number"
            value={amount}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            className="rounded-full border border-cream/25 px-3 py-1 font-mono text-xs text-cream hover:border-accent hover:text-accent"
            key={preset}
            onClick={() => setAmount(String(preset / 100))}
            type="button"
          >
            {formatGBP(preset)}
          </button>
        ))}
      </div>
      <input
        className="w-full border border-cream/25 bg-ink px-4 py-3 font-mono text-sm text-cream outline-none placeholder:text-muted focus:border-accent"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="email for receipt (Stripe also asks)"
        type="email"
        value={email}
      />
      {error ? <p className="font-mono text-xs text-accent">{error}</p> : null}
      <button
        className="w-full rounded-full bg-cream px-5 py-3 font-mono text-sm font-black uppercase tracking-[0.18em] text-ink hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        onClick={checkout}
        type="button"
      >
        {isLoading ? "opening checkout..." : "add to downloads ->"}
      </button>
    </div>
  );
}
