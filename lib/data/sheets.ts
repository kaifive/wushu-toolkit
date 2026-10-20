import { clean } from "@/lib/domain/names";
import { parseCsv } from "./csv";
import { fetchText, source, SourceError, type DataSource } from "./source";

/**
 * Google Sheets adapters. Sheets must be shared "Anyone with the link can view".
 * - gviz JSON keeps typed cells and column letters, but drops text rows in
 *   typed columns (the PWC schedule's break rows), so schedules use CSV.
 * - CSV export keeps every row verbatim.
 */

export const gvizUrl = (sheetId: string, gid: string) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;

export const csvUrl = (sheetId: string, gid: string) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

/** A row keyed by column letter: { A: "...", B: 9.1, ... }. */
export type LetterRow = Record<string, string | number | boolean | null>;

interface GvizCell {
  v?: string | number | boolean | null;
  f?: string;
}
interface GvizTable {
  cols: { id?: string; label?: string; type?: string }[];
  rows: { c?: (GvizCell | null)[] }[];
}

/** Strip the `google.visualization.Query.setResponse(...)` wrapper and return rows keyed by letter. */
export function parseGviz(text: string): LetterRow[] {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new SourceError("Unexpected gviz response (no JSON body).");
  const json = JSON.parse(text.slice(start, end + 1)) as {
    status?: string;
    errors?: { message?: string; detailed_message?: string }[];
    table?: GvizTable;
  };
  if (json.status === "error" || !json.table) {
    const msg = json.errors?.map((e) => e.detailed_message || e.message).join("; ");
    throw new SourceError(`gviz error: ${msg || "unknown"}`);
  }
  const letters = json.table.cols.map((c, i) => c.id || columnLetter(i));
  return json.table.rows.map((r) => {
    const out: LetterRow = {};
    letters.forEach((letter, i) => {
      const cell = r.c?.[i];
      out[letter] = cell == null ? "" : cell.v != null ? cell.v : (cell.f ?? "");
    });
    return out;
  });
}

/** 0 -> A, 25 -> Z, 26 -> AA. */
export function columnLetter(index: number): string {
  let n = index + 1;
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

export function letterIndex(letter: string): number {
  return letter.toUpperCase().split("").reduce((n, ch) => n * 26 + (ch.charCodeAt(0) - 64), 0) - 1;
}

export interface TabRef {
  sheetId: string;
  gid: string;
  /** Display name, e.g. "Ring 1". */
  name?: string;
}

export function gvizTab(tab: TabRef): DataSource<LetterRow[]> {
  return source(`Google Sheet${tab.name ? ` (${tab.name})` : ""}`, async (ctx) =>
    parseGviz(await fetchText(gvizUrl(tab.sheetId, tab.gid), ctx)),
  );
}

export function csvTab(tab: TabRef): DataSource<string[][]> {
  return source(`Google Sheet${tab.name ? ` (${tab.name})` : ""}`, async (ctx) =>
    parseCsv(await fetchText(csvUrl(tab.sheetId, tab.gid), ctx)),
  );
}

/** "Publish to web" CSV link (…/pub?gid=…&output=csv). */
export function publishedCsv(url: string, name = "Google Sheet"): DataSource<string[][]> {
  return source(name, async (ctx) => parseCsv(await fetchText(url, ctx)));
}

/** Turn CSV rows into letter-keyed rows, so CSV and gviz configs share column mappings. */
export function csvToLetterRows(rows: string[][], skipHeaderRows = 0): LetterRow[] {
  return rows.slice(skipHeaderRows).map((cols) => {
    const out: LetterRow = {};
    cols.forEach((v, i) => (out[columnLetter(i)] = v));
    return out;
  });
}

export const cell = (row: LetterRow, letter: string): string => clean(row[letter]);
