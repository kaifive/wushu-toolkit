import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";
import { Container, PageHeader } from "@/components/ui/page-header";
import { ScrollTable, td, th } from "@/components/ui/table";
import { CURRENT_RULESET, EVENTS, formatDuration, type TieBreak } from "@/lib/rules";
import { NANDU_SOURCE } from "@/lib/rules/iwuf-2024/nandu";

export const metadata: Metadata = {
  title: "Rules",
  description: "USAWKF 2025–26 National Junior Taolu Team Trials: age groups, events, time limits, music and team selection.",
};

const TIE_BREAK: Record<TieBreak, string> = {
  "highest-single-event": "Highest single-event score",
  "higher-barehand": "Higher barehand score",
  "higher-weapon": "Higher weapon score",
  "more-full-nandu": "More events with full difficulty (2.0)",
  "higher-performance": "Higher performance (B panel) score",
  "higher-lowest-discarded": "Higher lowest discarded B mark",
};

const fmtDate = (iso?: string) => (iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { dateStyle: "medium", timeZone: "UTC" }) : "");
const names = (codes: string[]) => codes.map((c) => EVENTS[c as keyof typeof EVENTS]?.name ?? c).join(", ");

export default function RulesPage() {
  const r = CURRENT_RULESET;
  const sel = r.selection;
  return (
    <Container className="max-w-4xl">
      <PageHeader eyebrow="Rules" title={r.name}>
        {r.source.title}
        {r.source.revision ? ` (${r.source.revision})` : ""}. Judging, deductions and difficulty follow {r.judging?.label}.
      </PageHeader>

      {!r.source.verified && (
        <div className="mb-6">
          <Notice tone="warn" title="Pending verification">
            <ul className="list-disc space-y-1 pl-5">
              {r.source.notes?.map((n) => <li key={n}>{n}</li>)}
            </ul>
            {r.source.url && (
              <p className="mt-2">
                <a href={r.source.url} className="underline" target="_blank" rel="noopener noreferrer">
                  Read the official document
                </a>
              </p>
            )}
          </Notice>
        </div>
      )}

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Age groups and events</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {r.divisions.map((d) => (
            <div key={d.id} className="rounded-2xl border border-line bg-surface p-4 text-sm">
              <h3 className="font-semibold">{d.label}</h3>
              {d.born && (
                <p className="text-ink-muted">
                  Born {d.born.from ? fmtDate(d.born.from) : "…"} {d.born.to ? `– ${fmtDate(d.born.to)}` : "or later"}
                </p>
              )}
              {d.routines && <p className="mt-2">{d.routines}</p>}
              <p className="mt-2 text-ink-muted">{names(d.events)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Time limits</h2>
        <ScrollTable caption="Time limits">
          <thead className="border-b border-line">
            <tr>
              <th className={th}>Group</th>
              <th className={th}>Events</th>
              <th className={`${th} text-right`}>Min</th>
              <th className={`${th} text-right`}>Max</th>
            </tr>
          </thead>
          <tbody>
            {r.timeLimits.map((t, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                <td className={td}>{t.division}</td>
                <td className={td}>
                  {names(t.events)}
                  {t.note && <span className="block text-xs text-ink-muted">{t.note}</span>}
                </td>
                <td className={`${td} text-right tabular-nums`}>{formatDuration(t.min)}</td>
                <td className={`${td} text-right tabular-nums`}>{formatDuration(t.max)}</td>
              </tr>
            ))}
          </tbody>
        </ScrollTable>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Music</h2>
        <ul className="space-y-2 text-sm">
          {r.music.map((m, i) => (
            <li key={i} className="rounded-xl border border-line bg-surface p-3">
              <Badge tone={m.requirement === "required" ? "seal" : "neutral"}>{m.requirement}</Badge> Group {m.division}: {names(m.events)}
              {m.note && <span className="block text-ink-muted">{m.note}</span>}
            </li>
          ))}
          <li className="text-ink-muted">All other events are performed without music.</li>
        </ul>
      </section>

      {sel && (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-xl font-semibold">Team selection</h2>
          <div className="space-y-3 rounded-2xl border border-line bg-surface p-4 text-sm">
            <p>
              {sel.scoring.method === "barehand-plus-weapon"
                ? `Selection score = best barehand + best weapon${sel.scoring.pairing === "same-discipline" ? " in the same discipline (Changquan, Nanquan or Taijiquan)" : ""}. The average is that total divided by two.`
                : "Selection score = average of the events in each category."}
            </p>
            <ScrollTable caption="Team rosters">
              <thead className="border-b border-line">
                <tr>
                  <th className={th}>Team</th>
                  <th className={th}>Spots</th>
                  <th className={`${th} text-right`}>Minimum average</th>
                </tr>
              </thead>
              <tbody>
                {sel.teams.map((t) => (
                  <tr key={t.id} className="border-b border-line last:border-0">
                    <td className={td}>{t.id}</td>
                    <td className={td}>
                      {Object.entries(t.size)
                        .map(([div, n]) => `${n} ${div === "*" ? "(other groups)" : `(Group ${div})`}`)
                        .join(", ")}
                      {t.onePerDiscipline && <span className="block text-xs text-ink-muted">At most one athlete per discipline</span>}
                    </td>
                    <td className={`${td} text-right tabular-nums`}>{t.minAverage?.toFixed(1) ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </ScrollTable>
            <div>
              <p className="font-semibold">Tie-breaks, in order</p>
              <ol className="mt-1 list-decimal pl-5 text-ink-muted">
                {sel.tieBreaks.map((t) => (
                  <li key={t}>{TIE_BREAK[t]}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Judging</h2>
        <div className="space-y-2 text-sm">
          <p>
            Deductions: <Link href="/tools/deductions" className="text-seal underline">deduction code lookup</Link>.
          </p>
          <p className="text-ink-muted">
            Difficulty (nandu) codes look like <code className="font-mono">353B+323C+1</code>: three-digit movements with a level letter, joined by
            &ldquo;+&rdquo;, then a connection code. The movement table and values are{" "}
            {NANDU_SOURCE.verified ? "from IWUF 2024" : "pending the official IWUF 2024 document"}.
          </p>
        </div>
      </section>
    </Container>
  );
}
