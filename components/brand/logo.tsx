import type { SVGProps } from "react";
import { markInner } from "@/lib/brand/mark";

/**
 * Wushu Toolkit mark: a spear with its tassel driving through a gear, on the
 * vermilion seal (lib/brand/mark.ts). The seal follows --seal so dark mode
 * can lighten it.
 */
export function LogoMark({ title = "Wushu Toolkit", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      {...props}
      // Static, trusted markup from lib/brand/mark.ts.
      dangerouslySetInnerHTML={{ __html: markInner("var(--seal, #d4371f)", "var(--seal-ink, #fff)") }}
    />
  );
}
export function Logo({ className = "", showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" aria-hidden={showWordmark ? true : undefined} />
      {showWordmark && (
        <span className="font-display text-lg font-semibold text-ink">
          Wushu <span className="text-seal">Toolkit</span>
        </span>
      )}
    </span>
  );
}
