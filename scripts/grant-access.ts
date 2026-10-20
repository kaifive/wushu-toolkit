/**
 * Grant or revoke an event pass by email (ADR-005, manual granting).
 *
 *   FIREBASE_SERVICE_ACCOUNT=<base64 json> npm run grant -- someone@example.com 2027-juniors
 *   ... npm run grant -- someone@example.com 2027-juniors --revoke
 *   ... npm run grant -- someone@example.com 2027-juniors --expires 2027-01-31
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { EVENT_CONFIGS } from "../content/events";

const [email, slug, ...flags] = process.argv.slice(2);
if (!email || !slug) {
  console.error("Usage: npm run grant -- <email> <event-slug> [--revoke] [--expires YYYY-MM-DD]");
  process.exit(1);
}
if (!EVENT_CONFIGS.some((e) => e.slug === slug)) {
  console.error(`Unknown event "${slug}". Known: ${EVENT_CONFIGS.map((e) => e.slug).join(", ")}`);
  process.exit(1);
}
const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!raw) {
  console.error("Set FIREBASE_SERVICE_ACCOUNT (base64 of the service-account JSON).");
  process.exit(1);
}
const sa = JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as { project_id: string; client_email: string; private_key: string };
const app = initializeApp({ credential: cert({ projectId: sa.project_id, clientEmail: sa.client_email, privateKey: sa.private_key }) });

const revoke = flags.includes("--revoke");
const expiresIdx = flags.indexOf("--expires");
const expiresAt = expiresIdx !== -1 && flags[expiresIdx + 1] ? Date.parse(`${flags[expiresIdx + 1]}T23:59:59Z`) : undefined;

const user = await getAuth(app).getUserByEmail(email.toLowerCase());
const ref = getFirestore(app).collection("entitlements").doc(user.uid);
if (revoke) {
  await ref.set({ events: { [slug]: FieldValue.delete() } }, { merge: true });
  console.log(`Revoked ${slug} for ${user.email}`);
} else {
  await ref.set({ email: user.email, events: { [slug]: { grantedAt: Date.now(), grantedBy: "script", source: "manual", ...(expiresAt ? { expiresAt } : {}) } } }, { merge: true });
  console.log(`Granted ${slug} to ${user.email}${expiresAt ? ` until ${new Date(expiresAt).toISOString().slice(0, 10)}` : ""}`);
}
