export const MIN_PRICE_CENTS = 1000;

export function formatGBP(amountInCents: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: amountInCents % 100 === 0 ? 0 : 2,
  }).format(amountInCents / 100);
}

export function poundsToCents(value: number) {
  return Math.round(value * 100);
}

export function normalizeAmount(amount: unknown, minimum = MIN_PRICE_CENTS) {
  const parsed = Number(amount);

  if (!Number.isFinite(parsed)) {
    throw new Error("Amount must be a number.");
  }

  const cents = parsed > 999 ? Math.round(parsed) : poundsToCents(parsed);

  if (cents < minimum) {
    throw new Error(`Amount must be at least ${formatGBP(minimum)}.`);
  }

  return cents;
}
