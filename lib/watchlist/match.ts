import { foldAccents } from "@/lib/domain/names";

/**
 * Fuzzy athlete-name matching for watch lists. Sources print names as
 * "Last First", "First Last", "LAST FIRST", "last_first", with or without a
 * middle name, accents or a split given name ("LanHong" vs "Lan Hong").
 */

export function nameTokens(name: string): string[] {
  return foldAccents(name)
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9-]+/g, " ")
    .split(" ")
    .filter(Boolean);
}

/** Every way of writing the name's words run together, in any word order ("lan","hong","huang" -> "lanhonghuang", ...). */
function joinings(tokens: string[]): Set<string> {
  const parts = tokens.map((t) => t.replace(/-/g, ""));
  const out = new Set<string>();
  if (parts.length > 5) return out; // 120 orders at most
  const walk = (left: string[], acc: string) => {
    if (!left.length) out.add(acc);
    left.forEach((p, i) => walk([...left.slice(0, i), ...left.slice(i + 1)], acc + p));
  };
  walk(parts, "");
  return out;
}

/**
 * True when two names refer to the same person:
 * - same words in any order, ignoring case, accents, "_", "," and "."; or
 * - one name's words are all in the other (a middle name on one side), when
 *   both have at least two words; or
 * - the same letters split differently ("Huang LanHong" / "Lan Hong Huang").
 * A one-word entry only matches a one-word name, so "Ashton" never highlights
 * every Ashton.
 */
export function namesMatch(a: string, b: string): boolean {
  const ta = nameTokens(a);
  const tb = nameTokens(b);
  if (!ta.length || !tb.length) return false;
  const sa = new Set(ta);
  const sb = new Set(tb);
  if (sa.size === sb.size && [...sa].every((t) => sb.has(t))) return true;
  // Distinct words: "Lee Lee" is one word for this rule, so it can't match every Lee.
  if (sa.size < 2 || sb.size < 2) return false;
  const [small, big] = sa.size <= sb.size ? [sa, sb] : [sb, sa];
  if ([...small].every((t) => big.has(t))) return true;
  // Split or joined given names, hyphen differences: same letters in the same
  // order once the words are run together (anagrams like "Kim Lee"/"Mike Le" don't count).
  const ja = joinings(ta);
  if (([...ja][0]?.length ?? 0) < 6) return false;
  for (const j of joinings(tb)) if (ja.has(j)) return true;
  return false;
}

export interface WatchList {
  id: string;
  name: string;
  color: string;
  athletes: string[];
  enabled: boolean;
}

/** First enabled list that contains this athlete (lists earlier in the order win). */
export function findWatch(lists: WatchList[], athleteName: string): WatchList | undefined {
  return lists.find((l) => l.enabled && l.athletes.some((a) => namesMatch(a, athleteName)));
}

/**
 * Parse a pasted roster: one name per line, or ";" separated, or ","
 * separated when every part is a full name. "Wu, Ashton" stays one name.
 */
export function parseRoster(text: string): string[] {
  const lines = text.split(/\r?\n|;/).flatMap((line) => {
    const parts = line.split(",");
    return parts.length > 1 && parts.every((p) => nameTokens(p).length >= 2) ? parts : [line];
  });
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of lines) {
    const name = raw.replace(/\s+/g, " ").trim();
    const key = nameTokens(name).sort().join(" ");
    if (name && key && !seen.has(key)) {
      seen.add(key);
      out.push(name);
    }
  }
  return out;
}

export const WATCH_COLORS = ["#5856d6", "#c2410c", "#1b8a5a", "#b7791f", "#0e7490", "#be185d", "#6d28d9", "#475569"];
