/** v1 alert bars: info (light blue), warn (amber), error (red). */
const TONES = {
  info: "bg-info text-info-ink border-info-ink/15",
  warn: "bg-warn text-warn-ink border-warn-ink/15",
  error: "bg-seal-soft text-ink border-seal/30",
} as const;

export function Notice({ tone = "info", title, children }: { tone?: keyof typeof TONES; title?: string; children: React.ReactNode }) {
  return (
    <div role={tone === "error" ? "alert" : "note"} className={`rounded-card border px-4 py-3 text-[15px] ${TONES[tone]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={`max-w-[62ch] ${title ? "mt-0.5" : ""}`}>{children}</div>
    </div>
  );
}

/** One quiet line naming where data comes from (replaces "pending verification" boxes). */
export function SourceNote({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm text-ink-muted">{children}</p>;
}
