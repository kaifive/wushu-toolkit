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
