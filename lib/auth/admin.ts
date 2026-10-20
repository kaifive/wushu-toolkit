import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { hasEntitlement, isSessionCurrent, parseAdminUids, SESSION_HEADER, type EntitlementsDoc, type SessionDoc } from "./model";

/**
 * Firebase Admin, configured from FIREBASE_SERVICE_ACCOUNT (base64 of the
 * service-account JSON). Returns null when not configured so the rest of the
 * site still builds and runs without accounts.
 */
function app(): App | null {
  if (getApps()[0]) return getApps()[0]!;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;
  const json = JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as { project_id: string; client_email: string; private_key: string };
  return initializeApp({ credential: cert({ projectId: json.project_id, clientEmail: json.client_email, privateKey: json.private_key }) });
}

export const adminConfigured = () => !!process.env.FIREBASE_SERVICE_ACCOUNT;

export class AuthError extends Error {
  constructor(
    message: string,
    readonly status: 401 | 403 | 503,
    readonly code: "not-configured" | "no-token" | "bad-token" | "other-device" | "no-pass" | "not-admin",
  ) {
    super(message);
  }
}

function services() {
  const a = app();
  if (!a) throw new AuthError("Accounts aren't set up on this server.", 503, "not-configured");
  return { auth: getAuth(a), db: getFirestore(a) };
}

/** Verify the bearer ID token. Returns the user's uid and email. */
export async function verifyUser(req: Request) {
  const { auth } = services();
  const token = req.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
  if (!token) throw new AuthError("Sign in first.", 401, "no-token");
  try {
    const decoded = await auth.verifyIdToken(token);
    return { uid: decoded.uid, email: decoded.email };
  } catch {
    throw new AuthError("Your sign-in expired. Sign in again.", 401, "bad-token");
  }
}

/** Verify token AND that this request comes from the account's current device. */
export async function verifySession(req: Request) {
  const user = await verifyUser(req);
  const { db } = services();
  const snap = await db.collection("sessions").doc(user.uid).get();
  if (!isSessionCurrent(snap.data() as SessionDoc | undefined, req.headers.get(SESSION_HEADER))) {
    throw new AuthError("Your account was signed in on another device.", 401, "other-device");
  }
  return user;
}

export async function startSession(uid: string, sessionId: string, device: string) {
  const { db } = services();
  const doc: SessionDoc = { sessionId, device, updatedAt: Date.now() };
  await db.collection("sessions").doc(uid).set(doc);
}

export async function getEntitlements(uid: string): Promise<EntitlementsDoc> {
  const { db } = services();
  const snap = await db.collection("entitlements").doc(uid).get();
  return (snap.data() as EntitlementsDoc | undefined) ?? { events: {} };
}

export async function requireEntitlement(uid: string, slug: string) {
  if (!hasEntitlement(await getEntitlements(uid), slug)) throw new AuthError("This account doesn't have a pass for this event.", 403, "no-pass");
}

export function requireAdmin(uid: string) {
  if (!parseAdminUids(process.env.ADMIN_UIDS).has(uid)) throw new AuthError("Admins only.", 403, "not-admin");
}

/** Grant (or revoke) an event pass by email. Used by the admin route and scripts/grant-access.ts. */
export async function setGrant(email: string, slug: string, grantedBy: string, opts: { revoke?: boolean; expiresAt?: number } = {}) {
  const { auth, db } = services();
  const user = await auth.getUserByEmail(email);
  const ref = db.collection("entitlements").doc(user.uid);
  if (opts.revoke) {
    await ref.set({ events: { [slug]: FieldValue.delete() } }, { merge: true });
  } else {
    const grant = { grantedAt: Date.now(), grantedBy, source: "manual" as const, ...(opts.expiresAt ? { expiresAt: opts.expiresAt } : {}) };
    await ref.set({ email: user.email, events: { [slug]: grant } }, { merge: true });
  }
  return { uid: user.uid, email: user.email };
}

export function authErrorResponse(err: unknown): Response {
  if (err instanceof AuthError) return Response.json({ error: err.message, code: err.code }, { status: err.status });
  console.error(err);
  return Response.json({ error: "Something went wrong." }, { status: 500 });
}
