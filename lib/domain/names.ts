import type { EventCode, Gender } from "./types";

/** Strip accents and tone marks: "Gōng Bù" -> "Gong Bu". */
export const foldAccents = (s: string): string => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/** URL- and file-safe slug: "Gōng Bù (Bow Stance)" -> "gong-bu-bow-stance". */
export const slugify = (s: string): string =>
  foldAccents(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Collapse whitespace and trim. */
export const clean = (value: unknown): string => String(value ?? "").replace(/\s+/g, " ").trim();

/**
 * Order-insensitive athlete key. Sportdata prints "Last First", sheets often
 * print "First Last", and some sources use underscores, so the key is the
 * sorted lowercase name parts.
 */
export function athleteKey(name: string): string {
  return foldAccents(clean(name).toLowerCase())
    .replace(/[_.,]/g, " ")
    .split(" ")
    .filter(Boolean)
    .sort()
    .join(" ");
}

/** "MENG STANLEY" -> "Meng Stanley". Leaves mixed-case names alone. */
export function titleCaseName(name: string): string {
  const c = clean(name);
  if (c !== c.toUpperCase()) return c;
  return c.toLowerCase().replace(/(^|[\s'-])\p{L}/gu, (m) => m.toUpperCase());
}

export function toNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const s = clean(value);
  if (!s) return null;
  // Exactly one number in the cell: "9.266", "9.266*", "$9.27". Cells with more
  // ("8.95 (2)", "1:30") are ambiguous, so they read as no value rather than a wrong one.
  const nums = s.match(/-?\d+(?:\.\d+)?/g);
  if (nums?.length !== 1) return null;
  const n = Number.parseFloat(nums[0]!);
  return Number.isFinite(n) ? n : null;
}

const EVENT_WORDS: [RegExp, EventCode][] = [
  [/taiji\s*jian|taijijian|(taiji|tai\s*chi)\s*(straight\s*)?sword/i, "TJ"],
  [/taiji\s*shan|taijishan|(taiji|tai\s*chi)\s*fan/i, "TS"],
  [/taiji|tai\s*chi/i, "TQ"],
  [/nan\s*dao|nandao|southern\s*broad\s*sword/i, "ND"],
  [/nan\s*gun|nangun|southern\s*staff/i, "NG"],
  [/nan\s*quan|nanquan|southern\s*fist/i, "NQ"],
  [/dao\s*shu|daoshu|broad\s*sword/i, "DS"],
  [/jian\s*shu|jianshu|straight\s*sword/i, "JS"],
  [/gun\s*shu|gunshu|cudgel|staff/i, "GS"],
  [/qiang\s*shu|qiangshu|spear/i, "QS"],
  [/chang\s*quan|changquan|long\s*fist/i, "CQ"],
];

/** Find the event code in a free-text event name. Order matters: Taijijian before Taijiquan, Nandao before Daoshu. */
export function eventCodeFromName(name: string): EventCode | undefined {
  for (const [re, code] of EVENT_WORDS) if (re.test(name)) return code;
  return undefined;
}

/** Gender from an event name or a gender cell. "Women's" is checked before "Men's". */
export function genderFromText(text: string): Gender | undefined {
  const t = clean(text).toLowerCase();
  if (!t) return undefined;
  // "F"/"M" only as a whole cell: inside an event name a letter is often an age group ("Group F").
  if (t === "f" || /\b(female|women|woman|girls?)\b|women´s|women's/.test(t)) return "female";
  if (t === "m" || /\b(male|men|man|boys?)\b|men´s|men's/.test(t)) return "male";
  return undefined;
}
