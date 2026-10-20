/**
 * Mobile-first table shell: scrolls horizontally inside its own box (never the
 * page) and keeps the first column pinned, so it works at 375px.
 */
export function ScrollTable({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <div className="relative -mx-4 overflow-x-auto border-y border-line bg-surface sm:mx-0 sm:rounded-card sm:border">
      <table className="w-full min-w-max border-collapse text-[15px] tabular-nums [&_tbody_tr:nth-child(odd)]:bg-surface-2 [&_tbody_tr:nth-child(odd)_td]:bg-surface-2">
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

export const th = "px-3 py-2.5 text-left text-sm font-bold text-ink";
export const td = "px-3 py-2.5 align-top";
/** Sticky first column. Keep a background so scrolled cells don't show through. */
export const stickyCol = "sticky left-0 z-10 bg-surface shadow-[1px_0_0_var(--line)]";
