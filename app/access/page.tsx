"use client";

import { useState } from "react";

export default function AccessLookupPage() {
  const [id, setId] = useState("");

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-14 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
        bought already?
      </p>
      <h1 className="mt-4 text-6xl font-black leading-none tracking-[-0.06em]">
        Reopen your dump.
      </h1>
      <p className="mt-5 font-mono text-sm leading-7 text-muted">
        Paste the purchase ID from your email. No account needed.
      </p>
      <form
        action={`/access/${encodeURIComponent(id.trim())}`}
        className="mt-8 flex flex-col gap-3 border border-cream/20 bg-surface p-4 sm:flex-row"
      >
        <input
          className="min-w-0 flex-1 border border-cream/20 bg-ink px-4 py-3 font-mono text-cream outline-none placeholder:text-muted focus:border-accent"
          onChange={(event) => setId(event.target.value)}
          placeholder="ltrn_xR4kT9pN"
          value={id}
        />
        <button
          className="rounded-full bg-cream px-5 py-3 font-mono text-xs font-black uppercase tracking-[0.18em] text-ink hover:bg-accent"
          type="submit"
        >
          open -&gt;
        </button>
      </form>
    </section>
  );
}
