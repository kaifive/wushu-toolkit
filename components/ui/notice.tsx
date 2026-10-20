const TONES = {
  info: "border-line bg-surface text-ink-muted",
  warn: "border-gold/40 bg-gold/10 text-ink",
  error: "border-seal/40 bg-seal-soft text-ink",
} as const;

export function Notice({ tone = "info", title, children }: { tone?: keyof typeof TONES; title?: string; children: React.ReactNode }) {
  return (
    <div role={tone === "error" ? "alert" : "note"} className={`rounded-xl border px-4 py-3 text-sm ${TONES[tone]}`}>
      {title && <p className="font-semibold text-ink">{title}</p>}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </div>
  );
}
