import { athleteKey } from "@/lib/domain/names";
import type { WatchList } from "./match";

/** Limits for lists saved to an account (checked server-side). */
export const SYNC_LIMITS = { lists: 50, athletes: 500, text: 120, bytes: 900_000 } as const;

const HEX = /^#[0-9a-f]{6}$/i;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");

/** Clean untrusted input into watch lists, or null if it isn't a list array at all. */
export function sanitizeLists(input: unknown): WatchList[] | null {
  if (!Array.isArray(input)) return null;
  const seen = new Set<string>();
  const out: WatchList[] = [];
  for (const raw of input.slice(0, SYNC_LIMITS.lists)) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const id = str(r.id, 40);
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const athletes = Array.isArray(r.athletes) ? r.athletes.map((a) => str(a, SYNC_LIMITS.text)).filter(Boolean).slice(0, SYNC_LIMITS.athletes) : [];
    out.push({
      id,
      name: str(r.name, SYNC_LIMITS.text) || "Watch list",
      color: typeof r.color === "string" && HEX.test(r.color) ? r.color : "#5856d6",
      athletes,
      enabled: r.enabled !== false,
    });
  }
  return out;
}

/**
 * Lists to keep when this device signs in, as a three-way merge against
 * `base` (what this device and the account last agreed on):
 * - nothing changed here since then: the account wins (deletions elsewhere stick);
 * - a list deleted here, or elsewhere, stays deleted unless the other side
 *   changed it meanwhile;
 * - athletes added or removed on either side are applied, matched by name
 *   regardless of word order; this device's name, colour and on/off win.
 * Without a base (never synced) the two sides are combined.
 */
export function mergeLists(local: WatchList[], remote: WatchList[], localUnchanged: boolean, base: WatchList[] | null = null): WatchList[] {
  if (localUnchanged) return remote;
  const baseBy = new Map((base ?? []).map((l) => [l.id, l]));
  const localBy = new Map(local.map((l) => [l.id, l]));
  const remoteIds = new Set(remote.map((l) => l.id));
  const same = (a?: WatchList, b?: WatchList) => !!a && !!b && JSON.stringify(a) === JSON.stringify(b);
  const out: WatchList[] = [];
  for (const r of remote) {
    const l = localBy.get(r.id);
    const b = baseBy.get(r.id);
    if (!l) {
      // Missing here: deleted here (it was in the base) unless changed elsewhere since.
      if (!b || !same(b, r)) out.push(r);
      continue;
    }
    out.push({ ...l, athletes: mergeAthletes(b?.athletes ?? null, l.athletes, r.athletes) });
  }
  for (const l of local) {
    if (remoteIds.has(l.id)) continue;
    const b = baseBy.get(l.id);
    // Only here: new here (keep), or deleted elsewhere (drop unless changed here since).
    if (!b || !same(b, l)) out.push(l);
  }
  return out;
}

/** Athlete names merged three ways; same person = same name key (word order ignored). */
function mergeAthletes(base: string[] | null, local: string[], remote: string[]): string[] {
  const key = athleteKey;
  const has = (list: string[], name: string) => list.some((x) => key(x) === key(name));
  if (!base) return [...local, ...remote.filter((r) => !has(local, r))];
  const addedThere = remote.filter((r) => !has(base, r) && !has(local, r));
  const removedThere = base.filter((b) => !has(remote, b));
  return [...local.filter((l) => !has(removedThere, l)), ...addedThere];
}

export const sameLists = (a: WatchList[], b: WatchList[]) => JSON.stringify(a) === JSON.stringify(b);

/** Firestore documents max out at 1 MiB; keep a margin. */
export const fitsInAccount = (lists: WatchList[]) => new TextEncoder().encode(JSON.stringify(lists)).length <= SYNC_LIMITS.bytes;
