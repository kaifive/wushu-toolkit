import { test } from "node:test";
import assert from "node:assert/strict";
import { activeGrants, deviceLabel, hasEntitlement, isSessionCurrent, newSessionId, parseAdminUids } from "@/lib/auth/model";

test("session lock: only the newest session id is current", () => {
  const a = newSessionId();
  const b = newSessionId();
  assert.notEqual(a, b);
  const doc = { sessionId: b, device: "Chrome on Android", updatedAt: 1 };
  assert.equal(isSessionCurrent(doc, b), true);
  assert.equal(isSessionCurrent(doc, a), false, "older device is signed out");
  assert.equal(isSessionCurrent(undefined, a), false);
  assert.equal(isSessionCurrent(doc, null), false);
});

test("entitlements respect expiry", () => {
  const doc = {
    events: {
      "2027-juniors": { grantedAt: 1, grantedBy: "admin", source: "manual" as const },
      "2026-pwc": { grantedAt: 1, grantedBy: "admin", source: "manual" as const, expiresAt: 100 },
    },
  };
  assert.equal(hasEntitlement(doc, "2027-juniors"), true);
  assert.equal(hasEntitlement(doc, "2026-pwc", 50), true);
  assert.equal(hasEntitlement(doc, "2026-pwc", 150), false);
  assert.equal(hasEntitlement(doc, "nope"), false);
  assert.equal(hasEntitlement(null, "x"), false);
  assert.deepEqual(activeGrants(doc, 150), ["2027-juniors"]);
});

test("deviceLabel and admin list parsing", () => {
  assert.equal(deviceLabel("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit Version/17.0 Mobile/15E148 Safari/604.1"), "Safari on iOS");
  assert.equal(deviceLabel("Mozilla/5.0 (Linux; Android 14) Chrome/120 Mobile Safari/537.36"), "Chrome on Android");
  assert.deepEqual([...parseAdminUids(" a, b ,,c")], ["a", "b", "c"]);
});

test("sessionVerdict: only a later claim from another device signs this one out", async () => {
  const { sessionVerdict, parseLocalSession, CLAIM_TTL } = await import("@/lib/auth/model");
  const doc = (sessionId: string, updatedAt: number) => ({ sessionId, device: "Chrome on Mac", updatedAt });
  const mine = { id: "me", claimedAt: 1000, startedAt: 900 };
  assert.equal(sessionVerdict(doc("me", 1000), mine, 2000), "ok");
  assert.equal(sessionVerdict(doc("laptop", 500), mine, 2000), "ok", "stale snapshot from before our claim");
  assert.equal(sessionVerdict(doc("laptop", 1500), mine, 2000), "kicked");
  const pending = { id: "me", claimedAt: null, startedAt: 1000 };
  assert.equal(sessionVerdict(doc("laptop", 500), pending, 1500), "pending");
  assert.equal(sessionVerdict(doc("laptop", 500), pending, 1000 + CLAIM_TTL + 1), "lost", "abandoned claim");
  assert.equal(sessionVerdict(doc("laptop", 500), null, 2000), "lost");
  assert.equal(sessionVerdict(undefined, mine, 2000), "ok", "no session doc yet");
  assert.deepEqual(parseLocalSession("abc123"), { id: "abc123", claimedAt: 0, startedAt: 0 }, "old bare-id format");
  assert.equal(parseLocalSession(null), null);
});
