/**
 * Grant or revoke an event pass by email (ADR-005, manual granting).
 *
 *   FIREBASE_SERVICE_ACCOUNT=<base64 json> npm run grant -- someone@example.com 2027-juniors
 *   ... npm run grant -- someone@example.com 2027-juniors --revoke
 *   ... npm run grant -- someone@example.com 2027-juniors --expires 2027-01-31
 */
import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { EVENT_CONFIGS } from "../content/events";
import { applyGrant, GrantError, parseExpiry } from "../lib/auth/grants";

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
try {
  const expiresAt = expiresIdx === -1 ? undefined : parseExpiry(flags[expiresIdx + 1] ?? "");
  const user = await applyGrant(getAuth(app), getFirestore(app), email, slug, "script", { revoke, expiresAt });
  console.log(
    revoke ? `Revoked ${slug} for ${user.email}` : `Granted ${slug} to ${user.email}${expiresAt ? ` until ${new Date(expiresAt).toISOString().slice(0, 10)}` : ""}`,
  );
} catch (err) {
  console.error(err instanceof GrantError ? err.message : err);
  process.exit(1);
}
