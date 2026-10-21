/** Page title. No eyebrow, breadcrumb or subtitle (DESIGN_AUDIT). */
export function PageHeader({ title }: { title: string }) {
  return <h1 className="mb-5 font-display text-3xl font-bold leading-tight tracking-wide sm:text-4xl">{title}</h1>;
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  // A max-w-* in className replaces the default width (two max-w classes would fight).
  const width = /(^|\s)max-w-/.test(className) ? "" : "max-w-6xl";
  return <div className={`mx-auto ${width} px-4 py-5 sm:py-7 md:px-8 ${className}`}>{children}</div>;
}
