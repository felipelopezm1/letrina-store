export function GrungeBg() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,90,31,0.14),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(232,220,196,0.08),transparent_24%)]" />
      <div className="noise absolute inset-0 opacity-[0.19]" />
      <div className="scanlines absolute inset-0 opacity-[0.13]" />
    </div>
  );
}
