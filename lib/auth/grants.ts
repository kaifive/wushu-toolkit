import type { Auth } from "firebase-admin/auth";
import { FieldPath, FieldValue, type Firestore } from "firebase-admin/firestore";

/**
 * Grant or revoke an event pass by email. Shared by the admin route and
 * scripts/grant-access.ts (which can't import the "server-only" admin module).
 */
export class GrantError extends Error {
  constructor(
    message: string,
    readonly code: "no-user" | "not-verified" | "bad-expiry",
  ) {
    super(message);
  }
}

/** "2027-01-31" -> end of that day (UTC) in ms. Throws on anything else. */
export function parseExpiry(value: string): number {
  const ms = /^\d{4}-\d{2}-\d{2}$/.test(value) ? Date.parse(`${value}T23:59:59Z`) : NaN;
  if (!Number.isFinite(ms)) throw new GrantError(`Bad expiry date "${value}". Use YYYY-MM-DD.`, "bad-expiry");
  return ms;
}

export async function applyGrant(
  auth: Auth,
  db: Firestore,
  email: string,
  slug: string,
  grantedBy: string,
  opts: { revoke?: boolean; expiresAt?: number } = {},
) {
  const user = await auth.getUserByEmail(email.trim().toLowerCase()).catch((err: { code?: string }) => {
    if (err?.code === "auth/user-not-found") throw new GrantError("No account with that email. Ask them to sign up first.", "no-user");
    throw err; // permissions, quota, network: report as a real failure
  });
  const ref = db.collection("entitlements").doc(user.uid);
  if (opts.revoke) {
    await ref.set({ events: { [slug]: FieldValue.delete() } }, { merge: true });
  } else {
    // Sign-up doesn't prove the address, so only a verified email can receive a pass.
    if (!user.emailVerified) throw new GrantError("That account hasn't verified its email yet. Ask them to open the verification link first.", "not-verified");
    const grant = { grantedAt: Date.now(), grantedBy, source: "manual" as const, ...(opts.expiresAt ? { expiresAt: opts.expiresAt } : {}) };
    // update() with a field path replaces this event's grant whole: a merge would keep an old expiresAt.
    await ref.set({ email: user.email }, { merge: true });
    await ref.update(new FieldPath("events", slug), grant);
  }
  return { uid: user.uid, email: user.email };
}
