"use client";

import { useState } from "react";

export function DownloadButton({ purchaseId }: { purchaseId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function download() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaseId }),
      });
      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Download failed.");
      }

      window.location.href = payload.url;
      setIsLoading(false);
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : "Download failed.");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        className="w-full rounded-full bg-cream px-5 py-4 font-mono text-xs font-black uppercase tracking-[0.18em] text-ink hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoading}
        onClick={download}
        type="button"
      >
        {isLoading ? "creating signed link..." : "download zip ->"}
      </button>
      {error ? <p className="mt-3 font-mono text-xs text-accent">{error}</p> : null}
    </div>
  );
}
