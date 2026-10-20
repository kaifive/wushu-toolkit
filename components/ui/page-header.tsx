import Link from "next/link";

/** Page title with optional breadcrumb trail (replaces the old uppercase eyebrow). */
export function PageHeader({ crumbs, title, children }: { crumbs?: { href: string; label: string }[]; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-5">
      {crumbs?.length ? (
        <nav aria-label="Breadcrumb" className="mb-1 text-sm text-ink-muted">
          {crumbs.map((c, i) => (
            <span key={c.href}>
              {i > 0 && <span className="mx-1.5">/</span>}
              <Link href={c.href} className="hover:text-ink">
                {c.label}
              </Link>
            </span>
          ))}
        </nav>
      ) : null}
      <h1 className="font-display text-3xl font-bold leading-tight tracking-wide sm:text-4xl">{title}</h1>
      {children && <div className="mt-1.5 max-w-2xl text-ink-muted">{children}</div>}
    </div>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 py-5 sm:py-7 md:px-8 ${className}`}>{children}</div>;
}
