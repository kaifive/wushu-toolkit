import type { RuleSource } from "../types";

/**
 * Nandu (degree of difficulty) codes as they appear on Sportdata entries and
 * scorecards, e.g. "312A+335A" (two movements in combination) or
 * "353B+323C+1" (combination plus a connection code).
 *
 * Only the code STRUCTURE is implemented. Movement names and point values
 * must come from the IWUF 2024 Taolu Competition Rules, which could not be
 * downloaded (OPEN_QUESTIONS #2). Until then NANDU_MOVEMENTS and
 * NANDU_LEVEL_VALUES stay empty and the UI says so instead of guessing.
 */

export const NANDU_SOURCE: RuleSource = {
  title: "IWUF Wushu Taolu Competition Rules and Judging Methods (2024): degree of difficulty",
  revision: "2024",
  url: "https://www.iwuf.org/",
  verified: false,
  notes: ["Movement table and values pending the official document."],
};

export interface NanduMovement {
  /** Full code, e.g. "323C". */
  code: string;
  /** Movement number, e.g. "323". */
  number: string;
  /** Difficulty level letter, e.g. "C". */
  level: string;
}

export interface NanduElement {
  /** As written, e.g. "353B+323C+1". */
  raw: string;
  movements: NanduMovement[];
  /** Connection codes after the movements, e.g. ["1"] or ["4"]. */
  connections: string[];
}

/** Movement number -> name. Empty until sourced from IWUF 2024. */
export const NANDU_MOVEMENTS: Record<string, { name: string; english?: string }> = {};

/** Level letter -> value. Empty until sourced from IWUF 2024. */
export const NANDU_LEVEL_VALUES: Record<string, number> = {};

const MOVEMENT = /^(\d{3})([A-Z])$/i;

export function parseNandu(raw: string): NanduElement | null {
  const parts = raw.replace(/\s+/g, "").split("+").filter(Boolean);
  if (!parts.length) return null;
  const movements: NanduMovement[] = [];
  const connections: string[] = [];
  for (const p of parts) {
    const m = p.match(MOVEMENT);
    if (m) movements.push({ code: `${m[1]}${m[2]!.toUpperCase()}`, number: m[1]!, level: m[2]!.toUpperCase() });
    else if (/^\d{1,2}[A-Z]?$/i.test(p)) connections.push(p.toUpperCase());
    else return null;
  }
  return movements.length ? { raw, movements, connections } : null;
}

/** Parse every element of a declared nandu list; unparseable entries are returned separately. */
export function parseNanduList(list: string[]): { elements: NanduElement[]; unknown: string[] } {
  const elements: NanduElement[] = [];
  const unknown: string[] = [];
  for (const raw of list) {
    const el = parseNandu(raw);
    if (el) elements.push(el);
    else unknown.push(raw);
  }
  return { elements, unknown };
}

/** Sum of declared values, or null while the value table is not sourced. */
export function declaredValue(elements: NanduElement[]): number | null {
  if (!Object.keys(NANDU_LEVEL_VALUES).length) return null;
  let total = 0;
  for (const el of elements) for (const m of el.movements) total += NANDU_LEVEL_VALUES[m.level] ?? 0;
  return Math.round(total * 1000) / 1000;
}
