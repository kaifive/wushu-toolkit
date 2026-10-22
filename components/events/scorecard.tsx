import Link from "next/link";
import { fmtScore } from "@/lib/rules/score";
import { ExportButtons } from "@/components/export/export-buttons";
import { highlightStyle, type HighlightFor, type ScorecardRow } from "@/lib/events/views";
import { deductionCodes, deductionGroupFor, findDeduction } from "@/lib/rules/iwuf-2024/deductions";
import { familyOfEvent, sheetElements, type SheetElement } from "@/lib/rules/iwuf-2024/nandu";

const f = fmtScore;

/**
 * One athlete's routine, laid out like the judges' sheet: A (deduction codes,
 * each linking to its meaning), B (marks, dropped ones struck), C (each
 * difficulty element made or missed, named from the declared nandu), then the
 * head judge's adjustment and the final score.
 */
export function ScorecardCard({ row, highlights, open }: { row: ScorecardRow; highlights?: HighlightFor; open?: boolean }) {
  const { a, b, c, adjustment } = row.scorecard;
  return (
    <details open={open} data-athlete={row.athleteName} style={highlightStyle(highlights?.(row.athleteName))} className="rounded-card border border-line bg-surface">
      <summary className="flex min-h-tap cursor-pointer list-none items-center justify-between gap-3 px-4 py-2">
        <span className="min-w-0">
          <span className="block truncate font-semibold">{row.athleteName}</span>
          <span className="block truncate text-xs text-ink-muted">{row.raw}</span>
        </span>
        <span className="shrink-0 font-semibold tabular-nums">{f(row.finalScore)}</span>
      </summary>
      <div className="divide-y divide-line border-t border-line">
        {a && (
          <Panel score={f(a.score, 2)} label="A · Quality">
            <Deductions codes={deductionCodes(a.deductions)} eventCode={row.code} />
          </Panel>
        )}
        {b && (
          <Panel score={f(b.score)} label="B · Performance">
            {b.marks.length ? (
              <ul className="flex flex-wrap gap-1.5" aria-label="Judges' marks">
                {b.marks.map((m, i) => {
                  const dropped = b.counted[i] === false;
                  return (
                    <li key={i} className={`rounded-card bg-surface-2 px-2.5 py-1 font-semibold tabular-nums ${dropped ? "text-ink-muted line-through" : ""}`}>
                      {m.toFixed(2)}
                      {dropped && <span className="sr-only"> (dropped)</span>}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-ink-muted">Judges&apos; marks weren&apos;t published.</p>
            )}
          </Panel>
        )}
        {(c || row.nandu?.length) && (
          <Panel score={c ? f(c.score, 2) : "—"} label="C · Difficulty">
            <Difficulty row={row} />
          </Panel>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3">
          {adjustment ? (
            <p className="text-sm">
              <span className="text-ink-muted">Head judge adjustment </span>
              <span className={`font-semibold tabular-nums ${adjustment < 0 ? "text-seal" : ""}`}>
                {adjustment > 0 ? "+" : ""}
                {adjustment.toFixed(2)}
              </span>
            </p>
          ) : (
            <span />
          )}
          <p className="flex items-baseline gap-3">
            <span className="text-sm font-semibold text-ink-muted">Final score</span>
            <span className="text-3xl font-bold tabular-nums text-primary">{f(row.finalScore)}</span>
          </p>
        </div>
      </div>
      <ExportButtons target={{ kind: "scorecard", athleteName: row.athleteName, raw: row.raw }} className="border-t border-line px-4 py-2" />
    </details>
  );
}

function Panel({ score, label, children }: { score: string; label: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[5.5rem_1fr] items-start gap-3 px-4 py-3 sm:grid-cols-[7rem_1fr]">
      <div>
        <p className="text-2xl font-bold leading-tight tabular-nums text-primary">{score}</p>
        <p className="text-xs font-semibold text-ink-muted">{label}</p>
      </div>
      <div className="min-w-0 pt-1">{children}</div>
    </section>
  );
}

function Deductions({ codes, eventCode }: { codes: string[]; eventCode?: string }) {
  if (!codes.length) return <p className="text-sm text-ink-muted">No deductions.</p>;
  const group = deductionGroupFor(eventCode).id;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Deduction codes">
      {codes.map((code, i) => {
        const info = findDeduction(code, eventCode);
        return (
          <li key={`${i}-${code}`}>
            <Link
              href={`/tools/deductions?group=${group}&code=${encodeURIComponent(code)}`}
              title={info ? `${info.english}${info.content.length ? `: ${info.content.join("; ")}` : ""}` : undefined}
              className="flex min-h-tap max-w-[16rem] flex-col justify-center rounded-card border border-line px-2.5 py-1 hover:border-seal"
            >
              <span className="font-mono font-semibold text-seal">{code}</span>
              {info && <span className="truncate text-xs text-ink-muted">{info.english}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Groups the sheet's numbered elements back into the declared combinations. */
function Difficulty({ row }: { row: ScorecardRow }) {
  const c = row.scorecard.c;
  const declared = row.nandu ?? [];
  const family = familyOfEvent(row.code ?? "CQ").family;
  const named = sheetElements(family, declared);
  const marks = c?.elements ?? [];
  // Names only when the declared nandu lines up with the sheet, one for one.
  const lined = marks.length > 0 && named.length === marks.length;

  if (!marks.length) {
    if (!declared.length) return <p className="text-sm text-ink-muted">No difficulty declared.</p>;
    return (
      <>
        <ul className="flex flex-wrap gap-1.5" aria-label="Declared difficulty">
          {declared.map((combo, i) => (
            <li key={i} className="rounded-card bg-surface-2 px-2.5 py-1 font-mono text-sm font-semibold">
              {combo}
            </li>
          ))}
        </ul>
        <p className="mt-1 text-xs text-ink-muted">Declared difficulty. The sheet didn&apos;t say which elements were made.</p>
      </>
    );
  }

  const status = (i: number) => c!.made[i] !== false;
  const missed = marks.map((_, i) => i).filter((i) => !status(i));
  const groups = lined ? comboRanges(declared, named) : [marks.map((_, i) => i)];

  return (
    <>
      <ul className="flex flex-wrap gap-1.5" aria-label="Difficulty elements">
        {groups.map((idxs, g) => (
          <li key={g} className="flex gap-1 rounded-card bg-surface-2 p-1">
            {idxs.map((i) => (
              <Element key={i} n={i + 1} made={status(i)} el={lined ? named[i] : undefined} />
            ))}
          </li>
        ))}
      </ul>
      {missed.length > 0 && (
        <div className="mt-2 text-sm">
          <p className="font-semibold">Missed</p>
          <ul className="mt-0.5 space-y-0.5">
            {missed.map((i) => {
              const el = lined ? named[i] : undefined;
              return (
                <li key={i}>
                  <span className="font-semibold tabular-nums text-seal">#{i + 1}</span>{" "}
                  {el ? (
                    <>
                      <span className="font-mono">{el.code}</span> {el.kind === "connection" ? `connection ${el.label}` : el.label}
                      {el.value !== undefined && <span className="text-ink-muted"> · worth {el.value.toFixed(2)}</span>}
                    </>
                  ) : (
                    <span className="text-ink-muted">element {i + 1}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {!lined && declared.length > 0 && <p className="mt-1 text-xs text-ink-muted">Declared: {declared.join(" · ")}</p>}
    </>
  );
}

function Element({ n, made, el }: { n: number; made: boolean; el?: SheetElement }) {
  const short = el ? (el.kind === "connection" ? `+${el.code.split("+").pop()}` : el.code) : "";
  const title = el ? `${n}. ${el.kind === "connection" ? `${el.code} connection ${el.label}` : `${el.code} ${el.label}`} · ${made ? "made" : "missed"}` : `${n} · ${made ? "made" : "missed"}`;
  return (
    <span title={title} className="flex w-11 flex-col items-center">
      <span
        aria-label={title}
        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${made ? "bg-jade" : "bg-seal"}`}
      >
        {n}
      </span>
      {short && <span className="mt-0.5 font-mono text-[11px] leading-none text-ink-muted">{short}</span>}
    </span>
  );
}

/** Indexes of the sheet elements that belong to each declared combination. */
function comboRanges(declared: string[], named: SheetElement[]): number[][] {
  const out: number[][] = [];
  let i = 0;
  for (const combo of declared) {
    const size = sheetElements("changquan", [combo]).length; // the count doesn't depend on the family
    out.push(named.slice(i, i + size).map((_, k) => i + k));
    i += size;
  }
  return out;
}
