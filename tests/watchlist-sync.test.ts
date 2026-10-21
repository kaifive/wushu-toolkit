import { test } from "node:test";
import assert from "node:assert/strict";
import type { WatchList } from "@/lib/watchlist/match";
import { mergeLists, sanitizeLists, SYNC_LIMITS } from "@/lib/watchlist/sync";

const list = (id: string, athletes: string[], extra: Partial<WatchList> = {}): WatchList => ({ id, name: id, color: "#5856d6", athletes, enabled: true, ...extra });

test("sanitizeLists cleans untrusted input", () => {
  assert.equal(sanitizeLists({ lists: [] }), null);
  const out = sanitizeLists([
    { id: "a", name: "  My   club ", color: "red", athletes: ["Amy Lee", 5, "", "x".repeat(500)], enabled: false },
    { id: "a", name: "dupe" },
    "junk",
    { name: "no id" },
  ])!;
  assert.equal(out.length, 1);
  assert.deepEqual(out[0], { id: "a", name: "My club", color: "#5856d6", athletes: ["Amy Lee", "x".repeat(SYNC_LIMITS.text)], enabled: false });
  assert.equal(sanitizeLists(Array.from({ length: 80 }, (_, i) => ({ id: `l${i}` })))!.length, SYNC_LIMITS.lists);
});

test("mergeLists: account wins when this device has no new edits", () => {
  const remote = [list("a", ["Amy Lee"])];
  assert.deepEqual(mergeLists([list("a", ["Amy Lee", "Old Kid"]), list("gone", [])], remote, true), remote);
  assert.deepEqual(mergeLists([], remote, false), remote);
});

test("mergeLists combines athletes and keeps both sides' lists", () => {
  const local = [list("a", ["Amy Lee", "Ben Ho"], { color: "#d4371f" }), list("new", ["Zed Q"])];
  const remote = [list("a", ["ben ho", "Cara Wu"]), list("other", ["Dan Ng"])];
  assert.deepEqual(mergeLists(local, remote, false), [list("a", ["Amy Lee", "Ben Ho", "Cara Wu"], { color: "#d4371f" }), list("other", ["Dan Ng"]), list("new", ["Zed Q"])]);
});

test("parseExpiry accepts only YYYY-MM-DD", async () => {
  const { parseExpiry } = await import("@/lib/auth/grants");
  assert.equal(parseExpiry("2027-01-31"), Date.parse("2027-01-31T23:59:59Z"));
  assert.throws(() => parseExpiry("2027-1-31"), /Bad expiry/);
  assert.throws(() => parseExpiry(""), /Bad expiry/);
  assert.throws(() => parseExpiry("2027-02-31"), /Bad expiry/, "no roll-over to March");
});
