import { personKey, type WatchList } from "./match";

/** Limits for lists saved to an account (checked server-side). */
export const SYNC_LIMITS = { lists: 50, athletes: 500, text: 120, bytes: 900_000 } as const;

const HEX = /^#[0-9a-f]{6}$/i;
/** Whitespace tidying the server applies to every name (the client mirrors it). */
export const tidyText = (t: string) => t.replace(/\s+/g, " ").trim();
const str = (v: unknown, max: number) => (typeof v === "string" ? tidyText(v).slice(0, max) : "");

/** Clean untrusted input into watch lists, or null if it isn't a list array at all. */
export function sanitizeLists(input: unknown): WatchList[] | null {
  return sanitizeReport(input)?.lists ?? null;
}

/**
 * sanitizeLists plus whether anything was cut to fit the limits (lists,
 * names or text), as opposed to only tidied. The device adopts the stored
 * copy only when `cut` is true, so tidying never rewrites a name being typed.
 */
export function sanitizeReport(input: unknown): { lists: WatchList[]; cut: boolean } | null {
  if (!Array.isArray(input)) return null;
  let cut = input.length > SYNC_LIMITS.lists;
  const fits = (v: unknown) => typeof v !== "string" || tidyText(v).length <= SYNC_LIMITS.text;
  const seen = new Set<string>();
  const out: WatchList[] = [];
  for (const raw of input.slice(0, SYNC_LIMITS.lists)) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const id = str(r.id, 40);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const rawAthletes = Array.isArray(r.athletes) ? r.athletes : [];
    const athletes = rawAthletes.map((a) => str(a, SYNC_LIMITS.text)).filter(Boolean).slice(0, SYNC_LIMITS.athletes);
    if (!fits(r.name) || !rawAthletes.every(fits) || rawAthletes.filter((a) => str(a, SYNC_LIMITS.text)).length > SYNC_LIMITS.athletes) cut = true;
    out.push({
      id,
      name: str(r.name, SYNC_LIMITS.text) || "Watch list",
      color: typeof r.color === "string" && HEX.test(r.color) ? r.color : "#5856d6",
      athletes,
      enabled: r.enabled !== false,
    });
  }
  return { lists: out, cut };
}

/** Compare lists independent of key order (Firestore returns map keys sorted). */
const canon = (l: WatchList) => JSON.stringify([l.id, l.name, l.color, [...l.athletes], l.enabled]);
const same = (a?: WatchList, b?: WatchList) => !!a && !!b && canon(a) === canon(b);
/** Three-way pick for one field: whichever side changed it since the base; this device wins a clash. */
const pick = <T,>(b: T | undefined, l: T, r: T) => (b !== undefined && l === b ? r : l);

/**
 * Lists to keep when this device signs in, as a three-way merge against
 * `base` (what this device and the account last agreed on):
 * - nothing changed here since then: the account wins (deletions elsewhere stick);
 * - a list deleted on one side stays deleted unless the other side changed it meanwhile;
 * - name, colour and on/off: whichever side changed them (this device on a clash);
 * - athletes added or removed on either side are applied, matched by name
 *   regardless of word order or punctuation;
 * - a reorder made only here is kept.
 * Without a base (never synced) the two sides are combined.
 */
export function mergeLists(local: WatchList[], remote: WatchList[], localUnchanged: boolean, base: WatchList[] | null = null): WatchList[] {
  if (localUnchanged) return remote;
  const baseBy = new Map((base ?? []).map((l) => [l.id, l]));
  const localBy = new Map(local.map((l) => [l.id, l]));
  const remoteIds = new Set(remote.map((l) => l.id));
  const merged = new Map<string, WatchList>();
  for (const r of remote) {
    const l = localBy.get(r.id);
    const b = baseBy.get(r.id);
    if (!l) {
      // Missing here: deleted here (it was in the base) unless changed elsewhere since.
      if (!b || !same(b, r)) merged.set(r.id, r);
      continue;
    }
    merged.set(r.id, {
      ...l,
      name: pick(b?.name, l.name, r.name),
      color: pick(b?.color, l.color, r.color),
      enabled: pick(b?.enabled, l.enabled, r.enabled),
      athletes: mergeAthletes(b?.athletes ?? null, l.athletes, r.athletes),
    });
  }
  for (const l of local) {
    if (remoteIds.has(l.id)) continue;
    const b = baseBy.get(l.id);
    // Only here: new here (keep), or deleted elsewhere (drop unless changed here since).
    if (!b || !same(b, l)) merged.set(l.id, l);
  }
  // Order: this device's, if only this device reordered; otherwise the account's.
  const ids = (lists: WatchList[]) => lists.map((l) => l.id).filter((id) => merged.has(id)).join("\n");
  const reorderedHere = !!base && ids(remote) === ids(base) && ids(local) !== ids(base);
  const first = reorderedHere ? local : remote;
  const order = [...first.map((l) => l.id), ...[...merged.keys()]].filter((id, i, a) => merged.has(id) && a.indexOf(id) === i);
  return order.map((id) => merged.get(id)!);
}

/** Athlete names merged three ways; same person = personKey. Linear: keys are built once. */
function mergeAthletes(base: string[] | null, local: string[], remote: string[]): string[] {
  const keys = (list: string[]) => new Set(list.map(personKey));
  const localKeys = keys(local);
  if (!base) return [...local, ...remote.filter((r) => !localKeys.has(personKey(r)))];
  const baseKeys = keys(base);
  const remoteKeys = keys(remote);
  const addedThere = remote.filter((r) => !baseKeys.has(personKey(r)) && !localKeys.has(personKey(r)));
  const removedThere = new Set([...baseKeys].filter((k) => !remoteKeys.has(k)));
  return [...local.filter((l) => !removedThere.has(personKey(l))), ...addedThere];
}

export const sameLists = (a: WatchList[], b: WatchList[]) => JSON.stringify(a) === JSON.stringify(b);

/** Firestore documents max out at 1 MiB; keep a margin. */
export const fitsInAccount = (lists: WatchList[]) => new TextEncoder().encode(JSON.stringify(lists)).length <= SYNC_LIMITS.bytes;
