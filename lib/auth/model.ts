/**
 * Account model shared by client, server and scripts (ADR-005).
 *   sessions/{uid}      { sessionId, device, updatedAt }   newest sign-in wins
 *   entitlements/{uid}  { email, events: { [slug]: Grant } }
 * Only the Admin SDK writes either collection (see firestore.rules).
 */

export interface SessionDoc {
  sessionId: string;
  device: string;
  updatedAt: number;
}

export interface Grant {
  grantedAt: number;
  grantedBy: string;
  source: "manual" | "purchase";
  expiresAt?: number;
}

export interface EntitlementsDoc {
  email?: string;
  events: Record<string, Grant>;
}

export const SESSION_HEADER = "x-session-id";
export const SESSION_STORAGE_KEY = "wt:session-id";

export function newSessionId(): string {
  return globalThis.crypto.randomUUID();
}

/** The session is current only when the stored doc carries this device's id. */
export function isSessionCurrent(doc: SessionDoc | undefined | null, sessionId: string | null | undefined): boolean {
  return !!doc && !!sessionId && doc.sessionId === sessionId;
}

export function hasEntitlement(doc: EntitlementsDoc | undefined | null, slug: string, now = Date.now()): boolean {
  const g = doc?.events?.[slug];
  if (!g) return false;
  return g.expiresAt === undefined || g.expiresAt > now;
}

export function activeGrants(doc: EntitlementsDoc | undefined | null, now = Date.now()): string[] {
  return Object.keys(doc?.events ?? {}).filter((slug) => hasEntitlement(doc, slug, now)).sort();
}

/** Short, non-identifying device label shown in "signed in on another device". */
export function deviceLabel(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  const os = /iphone|ipad/.test(ua) ? "iOS" : /android/.test(ua) ? "Android" : /mac os/.test(ua) ? "Mac" : /windows/.test(ua) ? "Windows" : /linux/.test(ua) ? "Linux" : "Unknown";
  const browser = /edg\//.test(ua) ? "Edge" : /crios|chrome/.test(ua) ? "Chrome" : /fxios|firefox/.test(ua) ? "Firefox" : /safari/.test(ua) ? "Safari" : "Browser";
  return `${browser} on ${os}`;
}

export function parseAdminUids(value: string | undefined): Set<string> {
  return new Set((value ?? "").split(",").map((s) => s.trim()).filter(Boolean));
}

/**
 * This device's session, kept in localStorage and shared by its tabs.
 * `claimedAt` is the server's time for the claim (null until /api/session
 * answers); `startedAt` is when this device began claiming.
 */
export interface LocalSession {
  id: string;
  claimedAt: number | null;
  startedAt: number;
}

/** How long a claim may stay unanswered before it counts as abandoned. */
export const CLAIM_TTL = 30_000;

export function parseLocalSession(raw: string | null): LocalSession | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<LocalSession>;
    if (typeof v.id === "string" && v.id) return { id: v.id, claimedAt: typeof v.claimedAt === "number" ? v.claimedAt : null, startedAt: Number(v.startedAt) || 0 };
  } catch {
    /* older format: the bare id */
  }
  return { id: raw, claimedAt: 0, startedAt: 0 };
}

/**
 * Single-device lock, decided from server times only, so stale or
 * out-of-order snapshots can't sign anyone out:
 * - "ok": the server holds this device's id, or an older claim than ours;
 * - "pending": our claim is still on its way to the server;
 * - "kicked": another device claimed the account after we did;
 * - "lost": this device has no (live) session, e.g. storage was cleared.
 */
export function sessionVerdict(doc: SessionDoc | undefined, local: LocalSession | null, now: number): "ok" | "pending" | "kicked" | "lost" {
  if (!local) return "lost";
  if (doc?.sessionId === local.id) return "ok";
  if (local.claimedAt === null) return now - local.startedAt < CLAIM_TTL ? "pending" : "lost";
  if (doc && doc.updatedAt > local.claimedAt) return "kicked";
  return "ok";
}
