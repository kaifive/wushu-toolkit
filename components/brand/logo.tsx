import type { SVGProps } from "react";

/**
 * Wushu Toolkit mark: a vermilion seal holding a W whose middle peak becomes
 * a jian (straight sword). The blade tip breaks out of the seal.
 * Concept A of three; see app/brand/page.tsx.
 */
export function LogoMark({ title = "Wushu Toolkit", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label={title} {...props}>
      <rect x="6" y="10" width="52" height="48" rx="9" fill="var(--seal, #c8321e)" />
      {/* W: outer strokes and the two inner strokes that meet at the guard */}
      <path
        d="M15 22 L23.5 48 L32 30 L40.5 48 L49 22"
        fill="none"
        stroke="var(--seal-ink, #fff)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Jian blade rising from the middle peak, tip leaving the seal */}
      <path d="M30.4 29 L32 3 L33.6 29 Z" fill="var(--seal-ink, #fff)" />
      <path d="M30.4 29 L32 3 L32 29 Z" fill="var(--seal, #c8321e)" opacity="0.18" />
      {/* Guard */}
      <rect x="26.5" y="28" width="11" height="3.2" rx="1.6" fill="var(--seal-ink, #fff)" />
      {/* Blade tip outline where it leaves the seal, so it reads on light backgrounds */}
      <path d="M31.1 10 L32 3 L32.9 10 Z" fill="var(--seal, #c8321e)" />
    </svg>
  );
}

export function Logo({ className = "", showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" aria-hidden={showWordmark ? true : undefined} />
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Wushu <span className="text-seal">Toolkit</span>
        </span>
      )}
    </span>
  );
}
