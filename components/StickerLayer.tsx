const stickers = [
  { label: "ZIP", x: "8%", y: "18%", rotate: "-9deg" },
  { label: "£10+", x: "84%", y: "16%", rotate: "7deg" },
  { label: "NO LOGIN", x: "73%", y: "62%", rotate: "-4deg" },
  { label: "5 DL", x: "12%", y: "74%", rotate: "8deg" },
];

export function StickerLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-10 hidden md:block">
      {stickers.map((sticker) => (
        <div
          className="sticker absolute rounded-sm border border-cream/50 bg-cream px-3 py-1 font-mono text-xs font-black text-ink shadow-[4px_4px_0_rgba(255,90,31,0.45)]"
          key={sticker.label}
          style={{
            left: sticker.x,
            top: sticker.y,
            transform: `rotate(${sticker.rotate})`,
          }}
        >
          {sticker.label}
        </div>
      ))}
    </div>
  );
}
