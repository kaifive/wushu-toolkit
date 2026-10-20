const TONES = {
  neutral: "bg-line/60 text-ink-muted",
  seal: "bg-seal-soft text-seal",
  jade: "bg-jade/15 text-jade",
  gold: "bg-gold/15 text-gold",
} as const;

export function Badge({ tone = "neutral", children, className = "" }: { tone?: keyof typeof TONES; children: React.ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${TONES[tone]} ${className}`}>{children}</span>;
}

const TEAM_TONE = { A: "seal", B: "gold", C: "jade" } as const;
export function TeamBadge({ team }: { team?: "A" | "B" | "C" }) {
  if (!team) return null;
  return <Badge tone={TEAM_TONE[team]}>{team} team</Badge>;
}
