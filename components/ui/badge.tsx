const TONES = {
  neutral: "bg-line text-ink",
  seal: "bg-seal text-white",
  primary: "bg-primary-soft text-primary",
  jade: "bg-jade/15 text-jade",
  gold: "bg-gold/15 text-gold",
} as const;

export function Badge({ tone = "neutral", children, className = "" }: { tone?: keyof typeof TONES; children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-card px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${TONES[tone]} ${className}`}>{children}</span>;
}

const TEAM_STYLE = {
  A: "bg-primary text-primary-ink border-primary",
  B: "bg-ink-muted text-surface border-ink-muted",
  C: "bg-transparent text-ink border-ink-muted",
} as const;

/** Square team tag, after v1's bold "A Team" column. */
export function TeamBadge({ team }: { team?: "A" | "B" | "C" }) {
  if (!team) return null;
  return <span className={`inline-flex items-center rounded-card border px-1.5 text-[11px] font-bold uppercase leading-5 tracking-wide ${TEAM_STYLE[team]}`}>{team} team</span>;
}
