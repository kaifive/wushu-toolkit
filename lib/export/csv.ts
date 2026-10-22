import type { Block, Sheet } from "./sheet";

/**
 * A sheet as CSV for Excel, Numbers or Google Sheets. Tables that share the
 * same columns (export all: one table per event) become one long table with
 * a leading column naming the section, so it sorts and filters as one.
 * Other blocks follow as their own sections. Starts with a BOM so Excel
 * reads accents correctly.
 */
const esc = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const line = (cells: string[]) => cells.map(esc).join(",");
/** "—" is how the sheets show "no score"; a spreadsheet wants an empty cell. */
const value = (t: string) => (t === "—" ? "" : t);

type Table = Extract<Block, { kind: "table" }>;

/** Column labels, with split columns ("Athlete · Club") expanded. */
const headersOf = (t: Table) => t.columns.flatMap((c) => c.split ?? [c.label]);
const cellsOf = (t: Table, row: Table["rows"][number]) =>
  row.flatMap((cell, i) => {
    const split = t.columns[i]?.split;
    if (!split) return [value(cell.text)];
    const parts = cell.text.split(" · ");
    return split.map((_, k) => (k === split.length - 1 ? parts.slice(k).join(" · ") : (parts[k] ?? "")));
  });

export function sheetToCsv(sheet: Sheet, sectionLabel = "Section"): string {
  const out: string[] = [line([sheet.title]), ...(sheet.subtitle ? [line([sheet.subtitle])] : []), ""];
  const tables = sheet.blocks.filter((b): b is Table => b.kind === "table");
  const sameShape = tables.length > 1 && tables.every((t) => headersOf(t).join("\u0000") === headersOf(tables[0]!).join("\u0000"));
  if (sameShape && tables.length === sheet.blocks.length) {
    out.push(line([sectionLabel, ...headersOf(tables[0]!)]));
    for (const t of tables) for (const r of t.rows) out.push(line([t.heading ?? "", ...cellsOf(t, r)]));
  } else {
    for (const b of sheet.blocks) {
      if (b.heading) out.push(line([b.heading]));
      if (b.kind === "table") {
        out.push(line(headersOf(b)));
        for (const r of b.rows) out.push(line(cellsOf(b, r)));
      } else {
        for (const it of b.items) out.push(line([it.label, ...it.value.map((v) => value(v.text))]));
      }
      out.push("");
    }
  }
  return "﻿" + out.join("\r\n") + "\r\n";
}

export const sheetToCsvBlob = (sheet: Sheet, sectionLabel?: string) => new Blob([sheetToCsv(sheet, sectionLabel)], { type: "text/csv;charset=utf-8" });
