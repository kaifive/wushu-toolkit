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
  return matchPrepared(prepareName(a), prepareName(b));
}

/** A name tokenized once, for matching against many others. */
export interface PreparedName {
  tokens: string[];
  set: Set<string>;
  /** Sorted letters: a cheap test that rules out most pairs before joinings. */
  letters: string;
  joins?: Set<string>;
}

export function prepareName(name: string): PreparedName {
  const tokens = nameTokens(name);
  return { tokens, set: new Set(tokens), letters: tokens.join("").replace(/-/g, "").split("").sort().join("") };
}

function matchPrepared(a: PreparedName, b: PreparedName): boolean {
  if (!a.tokens.length || !b.tokens.length) return false;
  const { set: sa } = a;
  const { set: sb } = b;
  if (sa.size === sb.size && [...sa].every((t) => sb.has(t))) return true;
  // Distinct words: "Lee Lee" is one word for this rule, so it can't match every Lee.
  if (sa.size < 2 || sb.size < 2) return false;
  const [small, big] = sa.size <= sb.size ? [sa, sb] : [sb, sa];
  if ([...small].every((t) => big.has(t))) return true;
  // Split or joined given names, hyphen differences: same letters in the same
  // order once the words are run together (anagrams like "Kim Lee"/"Mike Le" don't count).
  if (a.letters.length < 6 || a.letters !== b.letters) return false;
  a.joins ??= joinings(a.tokens);
  b.joins ??= joinings(b.tokens);
  for (const j of b.joins) if (a.joins.has(j)) return true;
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
  return compileWatch(lists)(athleteName);
}

/**
 * findWatch for many names: list entries are tokenized once and each looked-up
 * name once (pages repeat names, and lists can hold thousands of entries).
 */
export function compileWatch(lists: WatchList[]): (athleteName: string) => WatchList | undefined {
  // Every match shares a word or (split/joined names) the same letters, so index
  // entries by both and only test those candidates.
  const byKey = new Map<string, { order: number; list: WatchList; name: PreparedName }[]>();
  let order = 0;
  for (const list of lists) {
    if (!list.enabled) continue;
    for (const athlete of list.athletes) {
      const entry = { order: order++, list, name: prepareName(athlete) };
      for (const k of [...entry.name.set, `#${entry.name.letters}`]) {
        const bucket = byKey.get(k);
        if (bucket) bucket.push(entry);
        else byKey.set(k, [entry]);
      }
    }
  }
  const memo = new Map<string, WatchList | undefined>();
  return (name) => {
    if (!memo.has(name)) {
      const p = prepareName(name);
      const candidates = [...p.set, `#${p.letters}`].flatMap((k) => byKey.get(k) ?? []).sort((a, b) => a.order - b.order);
      memo.set(name, candidates.find((c) => matchPrepared(c.name, p))?.list); // earlier lists win
    }
    return memo.get(name);
  };
}

/**
 * Parse a pasted roster: one name per line, or ";" separated, or ","
 * separated when every part is a full name. "Wu, Ashton" stays one name.
 */
/** Same person for dedupe and merging: words in any order, punctuation ignored. */
export const personKey = (name: string) => nameTokens(name).sort().join(" ");

export function parseRoster(text: string): string[] {
  const lines = text.split(/\r?\n|;/).flatMap((line) => {
    const parts = line.split(",");
    return parts.length > 1 && parts.every((p) => nameTokens(p).length >= 2) ? parts : [line];
  });
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of lines) {
    const name = raw.replace(/\s+/g, " ").trim();
    const key = personKey(name);
    if (name && key && !seen.has(key)) {
      seen.add(key);
      out.push(name);
    }
  }
  return out;
}

export const WATCH_COLORS = ["#5856d6", "#c2410c", "#1b8a5a", "#b7791f", "#0e7490", "#be185d", "#6d28d9", "#475569"];
