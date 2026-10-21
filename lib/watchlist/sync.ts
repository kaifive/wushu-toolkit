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
 * Lists to keep when this device signs in. If nothing changed here since the
 * last sync, the account wins (so deletions made elsewhere stick). Otherwise
 * lists are merged by id: account lists first, this device's edits win on
 * name, colour and on/off, and athletes are combined.
 */
export function mergeLists(local: WatchList[], remote: WatchList[], localUnchanged: boolean): WatchList[] {
  if (localUnchanged || !local.length) return remote;
  if (!remote.length) return local;
  const byId = new Map(local.map((l) => [l.id, l]));
  const merged = remote.map((r) => {
    const l = byId.get(r.id);
    if (!l) return r;
    byId.delete(r.id);
    const athletes = [...l.athletes];
    for (const a of r.athletes) if (!athletes.some((x) => x.toLowerCase() === a.toLowerCase())) athletes.push(a);
    return { ...l, athletes };
  });
  return [...merged, ...byId.values()];
}

export const sameLists = (a: WatchList[], b: WatchList[]) => JSON.stringify(a) === JSON.stringify(b);

/** Firestore documents max out at 1 MiB; keep a margin. */
export const fitsInAccount = (lists: WatchList[]) => new TextEncoder().encode(JSON.stringify(lists)).length <= SYNC_LIMITS.bytes;
