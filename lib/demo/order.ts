import { athleteKey } from "@/lib/domain/names";

/**
 * Demo show running order. Acts are groups or solos with a level from 1
 * (beginner) to 5 (showstopper). The generator keeps performers from going
 * back to back, mixes levels, opens strong and closes with the strongest, and
 * honours pins (first, last, a fixed spot) and links (act B directly after A).
 * Everything here is pure and seeded so it is easy to test.
 */

export type Level = 1 | 2 | 3 | 4 | 5;
export const LEVELS: Level[] = [1, 2, 3, 4, 5];

export interface Act {
  id: string;
  kind: "group" | "solo";
  /** Group name, or the solo's routine (may be empty for a solo). */
  name: string;
  level: Level;
  performers: string[];
  /** "first", "last", or a 1-based spot that must not change. */
  pin?: "first" | "last" | number;
  /** Id of the act this one must directly follow. */
  follows?: string;
}

export interface Demo {
  acts: Act[];
  /** Act ids in running order. */
  order: string[];
}

export function actTitle(a: Act): string {
  if (a.kind === "group") return a.name || "Untitled group";
  const who = a.performers[0] ?? "Solo";
  return a.name ? `${who}: ${a.name}` : who;
}

// ---------------------------------------------------------------- blocks

/** Links joined into runs that always perform together, e.g. [A, B, C] for B follows A, C follows B. */
export function blocks(acts: Act[]): string[][] {
  const ids = new Set(acts.map((a) => a.id));
  const next = new Map<string, string>();
  const hasPrev = new Set<string>();
  for (const a of acts) {
    if (!a.follows || !ids.has(a.follows) || a.follows === a.id) continue;
    // Two acts can't both follow the same act: the later one wins nothing, it stays free.
    if (next.has(a.follows)) continue;
    next.set(a.follows, a.id);
    hasPrev.add(a.id);
  }
  const out: string[][] = [];
  const seen = new Set<string>();
  const walk = (start: string) => {
    const run: string[] = [];
    for (let id: string | undefined = start; id && !seen.has(id); id = next.get(id)) {
      seen.add(id);
      run.push(id);
    }
    out.push(run);
  };
  for (const a of acts) if (!hasPrev.has(a.id)) walk(a.id);
  // Whatever is left is a cycle; break it at its first act.
  for (const a of acts) if (!seen.has(a.id)) walk(a.id);
  return out;
}

/** Act ids whose `follows` would close a loop, so the UI can refuse it. */
export function wouldCycle(acts: Act[], id: string, follows: string): boolean {
  const byId = new Map(acts.map((a) => [a.id, a]));
  for (let cur: string | undefined = follows, n = 0; cur && n <= acts.length; cur = byId.get(cur)?.follows, n++) if (cur === id) return true;
  return false;
}

// ---------------------------------------------------------------- scoring

export interface Problem {
  kind: "back-to-back" | "pin" | "link";
  message: string;
  /** 0-based positions involved. */
  at: number[];
}

const keysOf = (a: Act) => new Set(a.performers.map(athleteKey).filter(Boolean));

function shared(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const k of a) if (b.has(k)) n++;
  return n;
}

const W = { backToBack: 1000, oneBetween: 4, pin: 5000, sameLevel: 3, nearLevel: 1, lowRun: 6, highRun: 3, opener: 5, closer: 8 };

/** Lower is better. `keys` are performer keys per act in the same order. */
function cost(order: Act[], keys: Set<string>[], maxLevel: number): number {
  let c = 0;
  const n = order.length;
  for (let i = 0; i < n; i++) {
    const a = order[i]!;
    if (typeof a.pin === "number") c += W.pin * Math.abs(a.pin - 1 - i);
    if (i + 1 < n) {
      c += W.backToBack * shared(keys[i]!, keys[i + 1]!);
      const d = Math.abs(a.level - order[i + 1]!.level);
      if (d === 0) c += W.sameLevel;
      else if (d === 1) c += W.nearLevel;
    }
    if (i + 2 < n) {
      c += W.oneBetween * shared(keys[i]!, keys[i + 2]!);
      const run = [a.level, order[i + 1]!.level, order[i + 2]!.level];
      if (run.every((l) => l <= 2)) c += W.lowRun;
      if (run.every((l) => l >= 4)) c += W.highRun;
    }
  }
  if (n > 1) {
    c += W.opener * Math.max(0, maxLevel - 1 - order[0]!.level);
    c += W.closer * (maxLevel - order[n - 1]!.level);
  }
  return c;
}

/** Rule breaks in an order: shared performers in consecutive acts and pins not kept. */
export function problems(acts: Act[], order: string[]): Problem[] {
  const byId = new Map(acts.map((a) => [a.id, a]));
  const list = order.map((id) => byId.get(id)).filter((a): a is Act => !!a);
  const out: Problem[] = [];
  for (let i = 0; i + 1 < list.length; i++) {
    const a = list[i]!;
    const b = list[i + 1]!;
    const bKeys = keysOf(b);
    const both = a.performers.filter((p) => bKeys.has(athleteKey(p)));
    if (both.length) out.push({ kind: "back-to-back", at: [i, i + 1], message: `${both.join(", ")} ${both.length > 1 ? "are" : "is"} in #${i + 1} and #${i + 2} back to back.` });
  }
  list.forEach((a, i) => {
    const want = a.pin === "first" ? 0 : a.pin === "last" ? list.length - 1 : typeof a.pin === "number" ? a.pin - 1 : i;
    if (want !== i) out.push({ kind: "pin", at: [i], message: `${actTitle(a)} is pinned to #${want + 1} but sits at #${i + 1}.` });
    const lead = a.follows ? byId.get(a.follows) : undefined;
    if (lead && list[i - 1]?.id !== lead.id) out.push({ kind: "link", at: [i], message: `${actTitle(a)} is linked to ${actTitle(lead)} but doesn't follow it.` });
  });
  return out;
}

// ---------------------------------------------------------------- generator

/** Small seeded PRNG (mulberry32) so a seed always gives the same order. */
export function rng(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a running order. Blocks pinned first/last stay at the ends; the
 * rest are arranged by simulated annealing over block order.
 */
export function generateOrder(acts: Act[], seed: number, iterations = 6000): string[] {
  if (acts.length < 2) return acts.map((a) => a.id);
  const rand = rng(seed);
  const byId = new Map(acts.map((a) => [a.id, a]));
  const all = blocks(acts);
  const has = (b: string[], pin: "first" | "last") => b.some((id) => byId.get(id)?.pin === pin);
  const head = all.filter((b) => has(b, "first")).slice(0, 1);
  const tail = all.filter((b) => has(b, "last") && !head.includes(b)).slice(0, 1);
  const free = all.filter((b) => !head.includes(b) && !tail.includes(b));
  const maxLevel = Math.max(...acts.map((a) => a.level));

  const flatten = (mid: string[][]) => [...head, ...mid, ...tail].flat().map((id) => byId.get(id)!);
  const keyCache = new Map(acts.map((a) => [a.id, keysOf(a)]));
  const score = (mid: string[][]) => {
    const list = flatten(mid);
    return cost(list, list.map((a) => keyCache.get(a.id)!), maxLevel);
  };

  // Start from a shuffle.
  let cur = [...free];
  for (let i = cur.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cur[i], cur[j]] = [cur[j]!, cur[i]!];
  }
  let curCost = score(cur);
  let best = cur;
  let bestCost = curCost;
  if (cur.length < 2) return flatten(cur).map((a) => a.id);

  let temp = 20;
  const cool = Math.pow(0.01 / temp, 1 / iterations);
  for (let it = 0; it < iterations && bestCost > 0; it++, temp *= cool) {
    const cand = [...cur];
    const i = Math.floor(rand() * cand.length);
    let j = Math.floor(rand() * (cand.length - 1));
    if (j >= i) j++;
    if (rand() < 0.5) {
      [cand[i], cand[j]] = [cand[j]!, cand[i]!];
    } else {
      const [b] = cand.splice(i, 1);
      cand.splice(j, 0, b!);
    }
    const c = score(cand);
    if (c <= curCost || rand() < Math.exp((curCost - c) / temp)) {
      cur = cand;
      curCost = c;
      if (c < bestCost) {
        best = cand;
        bestCost = c;
      }
    }
  }
  return flatten(best).map((a) => a.id);
}

/** Order with every act present once: keeps known ids in place, appends new acts, drops removed ones. */
export function reconcile(demo: Demo): string[] {
  const ids = new Set(demo.acts.map((a) => a.id));
  const kept = demo.order.filter((id, i, arr) => ids.has(id) && arr.indexOf(id) === i);
  const inOrder = new Set(kept);
  return [...kept, ...demo.acts.filter((a) => !inOrder.has(a.id)).map((a) => a.id)];
}

// ---------------------------------------------------------------- text format

/**
 * One line per act, the same format for copy and import:
 *   1. Beginner Fan (L2) — Amy Lee, Bob Tran
 *   2. Solo: Jianshu (L4) — Amy Lee [first]
 *   3. Solo (L3) — Bob Tran [with previous]
 * Flags: first, last, pinned (stays at this number), with previous (linked).
 */
export function toText(demo: Demo): string {
  const byId = new Map(demo.acts.map((a) => [a.id, a]));
  const list = reconcile(demo).map((id) => byId.get(id)!);
  return list
    .map((a, i) => {
      const flags: string[] = [];
      if (a.pin === "first" || a.pin === "last") flags.push(a.pin);
      else if (typeof a.pin === "number") flags.push("pinned");
      if (a.follows && list[i - 1]?.id === a.follows) flags.push("with previous");
      const title = a.kind === "solo" ? `Solo${a.name ? `: ${a.name}` : ""}` : a.name || "Untitled group";
      const who = a.performers.length ? ` — ${a.performers.join(", ")}` : "";
      return `${i + 1}. ${title} (L${a.level})${who}${flags.length ? ` [${flags.join(", ")}]` : ""}`;
    })
    .join("\n");
}

const LINE = /^\s*(?:\d+[.)]\s*)?(.+?)\s*\(L([1-5])\)\s*(?:[—–-]+\s*(.*?))?\s*(?:\[([^\]]*)\])?\s*$/i;

/** Parse text from toText (or typed by hand). Unreadable lines are returned so the UI can show them. */
export function fromText(text: string, newId: () => string): { demo: Demo; skipped: string[] } {
  const acts: Act[] = [];
  const skipped: string[] = [];
  for (const raw of text.split(/\r?\n/)) {
    if (!raw.trim() || /^\s*#/.test(raw)) continue;
    const m = raw.match(LINE);
    if (!m) {
      skipped.push(raw.trim());
      continue;
    }
    const [, title = "", level, who = "", flagText = ""] = m;
    const flags = flagText.split(",").map((f) => f.trim().toLowerCase()).filter(Boolean);
    // "Solo" or "Solo: Jianshu" is a solo; a group may be called "Solo Stars".
    const solo = /^solo\s*(:|$)/i.exec(title.trim());
    const act: Act = {
      id: newId(),
      kind: solo ? "solo" : "group",
      name: solo ? title.replace(/^solo\s*:?\s*/i, "").trim() : title.trim(),
      level: Number(level) as Level,
      performers: who.split(",").map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean),
    };
    if (flags.includes("first")) act.pin = "first";
    else if (flags.includes("last")) act.pin = "last";
    else if (flags.includes("pinned")) act.pin = acts.length + 1;
    const prev = acts[acts.length - 1];
    if (prev && flags.includes("with previous")) act.follows = prev.id;
    acts.push(act);
  }
  return { demo: { acts, order: acts.map((a) => a.id) }, skipped };
}

// ---------------------------------------------------------------- people

export interface Person {
  name: string;
  acts: Act[];
}

/** Everyone in the demo with their acts, merged by name key. */
export function people(acts: Act[]): Person[] {
  const map = new Map<string, Person>();
  for (const a of acts)
    for (const p of a.performers) {
      const k = athleteKey(p);
      if (!k) continue;
      const cur = map.get(k) ?? { name: p, acts: [] };
      if (!cur.acts.includes(a)) cur.acts.push(a);
      map.set(k, cur);
    }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}
