/** v1-style card: gray header strip with a bold title and muted context, then the body. */
export function Card({
  title,
  context,
  action,
  children,
  className = "",
  bodyClassName = "p-4",
}: {
  title?: React.ReactNode;
  context?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={`overflow-hidden rounded-card border border-line bg-surface ${className}`}>
      {title && (
        <header className="flex min-h-12 items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2">
          <h2 className="min-w-0 truncate text-[15px]">
            <span className="font-semibold">{title}</span>
            {context && <span className="text-ink-muted"> · {context}</span>}
          </h2>
          {action}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

/** v1 "widget" stat tile: big number, label, progress bar. */
export function StatTile({ value, label, progress }: { value: React.ReactNode; label: string; progress?: number }) {
  return (
    <div className="rounded-card border border-line bg-surface p-3 sm:p-4">
      <p className="truncate font-display text-xl font-bold tnum sm:text-3xl">{value}</p>
      <p className="text-sm text-ink-muted">{label}</p>
      {progress !== undefined && (
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <div className="h-full bg-primary" style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }} />
        </div>
      )}
    </div>
  );
}
