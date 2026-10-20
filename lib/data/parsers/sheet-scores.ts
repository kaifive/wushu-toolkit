import { athleteKey, clean, eventCodeFromName, genderFromText, toNumber } from "@/lib/domain/names";
import type { Athlete, ScoreEntry } from "@/lib/domain/types";
import { cell, type LetterRow } from "../sheets";

/** Which column letter holds what. Use `name` for a single full-name column, or `firstName` + `lastName`. */
export interface ScoreColumns {
  name?: string;
  firstName?: string;
  lastName?: string;
  /** Set true when the single name column is "Last_First" or "Last First" and should be shown as "First Last". */
  nameIsLastFirst?: boolean;
  gender?: string;
  event: string;
  score: string;
  age?: string;
  club?: string;
  ring?: string;
}

export function rowName(row: LetterRow, c: ScoreColumns): string {
  if (c.name) {
    const raw = cell(row, c.name).replace(/_/g, " ");
    if (!c.nameIsLastFirst) return raw;
    const parts = raw.split(" ").filter(Boolean);
    const last = parts.shift();
    return [...parts, last].filter(Boolean).join(" ");
  }
  return clean(`${cell(row, c.firstName ?? "")} ${cell(row, c.lastName ?? "")}`);
}

/**
 * Map sheet rows to score entries. Rows without a name are skipped. A row
 * with an empty score is kept with finalScore = null (registered, not yet scored).
 */
export function scoresFromRows(rows: LetterRow[], c: ScoreColumns, opts: { eventPrefix?: string; ring?: string } = {}): ScoreEntry[] {
  const out: ScoreEntry[] = [];
  for (const row of rows) {
    const name = rowName(row, c);
    if (!name || /^(first|name|athlete)\b/i.test(name)) continue;
    const raw = clean(`${opts.eventPrefix ?? ""} ${cell(row, c.event)}`);
    const genderCell = c.gender ? cell(row, c.gender) : "";
    out.push({
      athleteId: athleteKey(name),
      athleteName: name,
      raw,
      code: eventCodeFromName(raw),
      gender: genderFromText(genderCell) ?? genderFromText(raw),
      finalScore: toNumber(row[c.score]),
      club: c.club ? cell(row, c.club) || undefined : undefined,
      ring: opts.ring ?? (c.ring ? cell(row, c.ring) || undefined : undefined),
    });
  }
  return out;
}

export interface AthleteColumns {
  name?: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  gender?: string;
  club?: string;
  /** Column that marks an opt-in (e.g. all-around registration), compared to `flagValue`. */
  flag?: string;
  flagValue?: string;
}

/** Build an athlete lookup (age, gender, opt-in flag) from a reference sheet. */
export function athletesFromRows(rows: LetterRow[], c: AthleteColumns): Map<string, Athlete & { flagged: boolean }> {
  const map = new Map<string, Athlete & { flagged: boolean }>();
  for (const row of rows) {
    const name = rowName(row, { ...c, event: "", score: "" });
    if (!name) continue;
    const id = athleteKey(name);
    const age = c.age ? toNumber(row[c.age]) ?? undefined : undefined;
    const flagged = c.flag ? cell(row, c.flag).toLowerCase() === (c.flagValue ?? "yes").toLowerCase() : false;
    const prev = map.get(id);
    if (prev) {
      prev.age ??= age;
      prev.flagged ||= flagged;
    } else {
      map.set(id, {
        id,
        name,
        age,
        gender: c.gender ? genderFromText(cell(row, c.gender)) : undefined,
        club: c.club ? cell(row, c.club) || undefined : undefined,
        flagged,
      });
    }
  }
  return map;
}
