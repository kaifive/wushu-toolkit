import { fmtScore } from "@/lib/rules/score";
import { slugify } from "@/lib/domain/names";
import { GENDER_LABEL, type AthleteProfile, type EventResult, type ScopeModel, type ScorecardRow, type ScorecardStats } from "@/lib/events/views";
import { deductionCodes, findDeduction } from "@/lib/rules/iwuf-2024/deductions";
import { familyOfEvent, sheetElements } from "@/lib/rules/iwuf-2024/nandu";

/**
 * A printable sheet: what an exported PNG or PDF shows. Builders here are
 * pure so the server can pass them to the client as plain data.
 */

export interface Cell {
  text: string;
  bold?: boolean;
  muted?: boolean;
  strike?: boolean;
  /** Strike in vermilion (missed nandu). */
  miss?: boolean;
}

export interface Column {
  label: string;
  align?: "left" | "right";
  /** Columns size to their content; a weight above 1 also takes a share of spare width. */
  weight?: number;
}

export type Block =
  | { kind: "table"; heading?: string; columns: Column[]; rows: Cell[][] }
  | { kind: "fields"; heading?: string; items: { label: string; value: Cell[] }[] };

export interface Sheet {
  title: string;
  subtitle?: string;
  blocks: Block[];
}

const c = (text: string, extra: Omit<Cell, "text"> = {}): Cell => ({ text, ...extra });
const f = fmtScore;

/** Safe file name: "2025 Adults – Ashton Wu – CQ" -> "2025-adults-ashton-wu-cq". */
export function fileName(...parts: string[]): string {
  return slugify(parts.join(" ")).slice(0, 80).replace(/-$/, "") || "wushu-toolkit";
}

export function scorecardSheet(eventName: string, row: ScorecardRow): Sheet {
  const { a, b, c: cp, adjustment } = row.scorecard;
  const items: { label: string; value: Cell[] }[] = [];
  const codes = a ? deductionCodes(a.deductions) : [];
  if (a) items.push({ label: `A · Quality ${f(a.score, 2)}`, value: codes.length ? codes.map((d) => c(d)) : [c("No deductions", { muted: true })] });
  if (b) items.push({ label: `B · Performance ${f(b.score)}`, value: b.marks.length ? b.marks.map((m, i) => c(m.toFixed(2), { strike: b.counted[i] === false, muted: b.counted[i] === false })) : [c("—")] });
  if (cp) {
    // Name each element from the declared nandu when it lines up with the sheet (as on screen).
    const named = sheetElements(familyOfEvent(row.code ?? "CQ").family, row.nandu ?? []);
    const lined = named.length === cp.elements.length;
    items.push({
      label: `C · Difficulty ${f(cp.score, 2)}`,
      value: cp.elements.length ? cp.elements.map((el, i) => c(lined ? `${i + 1} ${named[i]!.code}` : el, { miss: cp.made[i] === false })) : [c("—")],
    });
  }
  if (adjustment) items.push({ label: "Head judge adjustment", value: [c(adjustment.toFixed(3))] });
  if (row.nandu?.length) items.push({ label: "Declared nandu", value: row.nandu.map((n) => c(n)) });
  return {
    title: row.athleteName,
    subtitle: [eventName, row.raw, row.club].filter(Boolean).join(" · "),
    blocks: [
      { kind: "fields", heading: `Final score ${f(row.finalScore)}`, items },
    ],
  };
}

export function resultSheet(eventName: string, r: EventResult): Sheet {
  return {
    title: r.raw,
    subtitle: eventName,
    blocks: [
      {
        kind: "table",
        columns: [{ label: "#" }, { label: "Athlete", weight: 3.6 }, { label: "Score", align: "right" }],
        rows: r.rows.map((x) => [
          c(x.finalScore == null ? "" : String(x.place), { muted: true }),
          c(x.club ? `${x.athleteName} · ${x.club}` : x.athleteName, { bold: true }),
          c(f(x.finalScore), { bold: true }),
        ]),
      },
    ],
  };
}


export function overallSheet(eventName: string, m: ScopeModel): Sheet {
  // Athletes listed once per discipline get the discipline after their name.
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const r of m.rows) (seen.has(r.athleteId) ? dup : seen).add(r.athleteId);
  return {
    title: `Overall · ${GENDER_LABEL[m.gender]} · ${m.division.label}`,
    subtitle: `${eventName} · ${m.scored}/${m.total} routines scored`,
    blocks: [
      {
        kind: "table",
        columns: [
          { label: "#" },
          { label: "Athlete", weight: 3 },
          ...m.eventCodes.map((code) => ({ label: code, align: "right" as const })),
          { label: "Total", align: "right" },
          { label: "Avg", align: "right" },
        ],
        rows: m.rows.map((r) => [
          c(r.tied ? "=" : String(r.rank), { muted: true }),
          c(`${r.athleteName}${r.team ? ` (${r.team})` : ""}${dup.has(r.athleteId) ? ` · ${r.discipline}` : ""}`, { bold: true }),
          ...m.eventCodes.map((code) => c(code in r.events ? f(r.events[code]) : "", { muted: !r.counted.includes(code), bold: r.counted.includes(code) })),
          c(r.score.toFixed(3), { bold: true }),
          c(r.average.toFixed(3), { muted: true }),
        ]),
      },
    ],
  };
}

const genderTag = (raw: string, gender?: string) => (gender && !/\b(fe)?male\b|\b(wo)?men/i.test(raw) ? ` · ${gender === "male" ? "Men" : "Women"}` : "");

export function statsSheet(eventName: string, st: ScorecardStats): Sheet {
  const panels = st.byEvent.some((e) => e.a != null || e.b != null || e.c != null);
  const blocks: Block[] = [];
  if (panels && st.deductions.length)
    blocks.push({
      kind: "table",
      heading: "Top 10 Deductions",
      columns: [{ label: "Code" }, { label: "Deduction", weight: 3 }, { label: "Count", align: "right" }],
      rows: st.deductions.slice(0, 10).map((d) => [c(d.code, { bold: true }), c(findDeduction(d.code, d.eventCode)?.english ?? "", { muted: true }), c(String(d.count), { bold: true })]),
    });
  blocks.push({
    kind: "table",
    heading: "Average Scores by Event",
    columns: [
      { label: "Event", weight: 3 },
      ...(panels ? (["A", "B", "C"] as const).map((l) => ({ label: l, align: "right" as const })) : []),
      { label: "Final", align: "right" },
    ],
    rows: st.byEvent.map((e) => [
      c(`${e.raw}${genderTag(e.raw, e.gender)} (${e.routines})`, { bold: true }),
      ...(panels ? [c(f(e.a)), c(f(e.b)), c(f(e.c))] : []),
      c(f(e.final), { bold: true }),
    ]),
  });
  return { title: "Stats", subtitle: eventName, blocks };
}

export function athleteSheet(eventName: string, a: AthleteProfile): Sheet {
  const items = [
    ...a.overall.map((o) => ({ label: `${o.scope} · ${o.discipline}`, value: [c(`#${o.rank} of ${o.of}`, { bold: true }), ...(o.team ? [c(`${o.team} Team`)] : [])] })),
    ...(a.allAround ? [{ label: "All-around", value: [c(`#${a.allAround.place} of ${a.allAround.of}`, { bold: true }), c(f(a.allAround.total))] }] : []),
  ];
  return {
    title: a.name,
    subtitle: [eventName, a.club].filter(Boolean).join(" · "),
    blocks: [
      ...(items.length ? [{ kind: "fields" as const, items }] : []),
      {
        kind: "table",
        columns: [{ label: "Event", weight: 3 }, { label: "Score", align: "right" }, { label: "Place", align: "right" }, { label: "Avg", align: "right" }],
        rows: a.routines.map((r) => [c(r.raw, { bold: true }), c(f(r.score), { bold: true }), c(r.place ? `${r.place}/${r.of}` : "—"), c(f(r.average), { muted: true })]),
      },
    ],
  };
}
