export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-seal">{eyebrow}</p>}
      <h1 className="mt-1 font-display text-2xl font-semibold leading-tight sm:text-3xl">{title}</h1>
      {children && <div className="mt-2 max-w-2xl text-ink-muted">{children}</div>}
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 py-6 sm:py-8 ${className}`}>{children}</div>;
}
