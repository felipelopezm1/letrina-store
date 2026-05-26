export function LetrinaLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="Pixel art latrine"
      className={className}
      fill="none"
      role="img"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="fill-cream" height="6" width="38" x="12" y="8" />
      <rect className="fill-cream" height="6" width="46" x="8" y="14" />
      <rect className="fill-cream" height="34" width="8" x="8" y="20" />
      <rect className="fill-cream" height="34" width="8" x="46" y="20" />
      <rect className="fill-cream" height="8" width="38" x="12" y="46" />
      <rect className="fill-cream" height="12" width="8" x="16" y="34" />
      <rect className="fill-cream" height="6" width="22" x="24" y="20" />
      <rect className="fill-cream" height="6" width="14" x="32" y="26" />
      <rect className="fill-accent" height="6" width="14" x="24" y="54" />
      <rect className="fill-muted" height="6" width="8" x="40" y="54" />
      <rect className="fill-ink" height="18" width="16" x="24" y="28" />
      <rect className="fill-surface" height="8" width="8" x="28" y="34" />
      <rect className="fill-cream" height="4" width="4" x="40" y="34" />
      <rect className="fill-muted" height="4" width="6" x="50" y="50" />
      <rect className="fill-muted" height="4" width="6" x="6" y="50" />
    </svg>
  );
}
