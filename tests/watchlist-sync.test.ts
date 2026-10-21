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

test("mergeLists three-way: deletions on this device stick, changes elsewhere come in", () => {
  const base = [list("a", ["Amy Lee", "Old Kid"]), list("b", ["Ben Ho"])];
  // Here: deleted list b, removed Old Kid, added Zed Q. Elsewhere: added Cara Wu to a.
  const local = [list("a", ["Amy Lee", "Zed Q"])];
  const remote = [list("a", ["Amy Lee", "Old Kid", "Cara Wu"]), list("b", ["Ben Ho"])];
  assert.deepEqual(mergeLists(local, remote, false, base), [list("a", ["Amy Lee", "Zed Q", "Cara Wu"])]);
});

test("mergeLists three-way: a list deleted elsewhere stays deleted unless changed here", () => {
  const base = [list("a", ["Amy Lee"]), list("c", ["Cy Do"])];
  const remote = [list("a", ["Amy Lee"])];
  assert.deepEqual(mergeLists([list("a", ["Amy Lee", "New Kid"]), list("c", ["Cy Do"])], remote, false, base), [list("a", ["Amy Lee", "New Kid"])]);
  assert.deepEqual(mergeLists([list("a", ["Amy Lee"]), list("c", ["Cy Do", "Edited"])], remote, false, base).map((l) => l.id), ["a", "c"]);
});

test("mergeLists matches athletes regardless of word order", () => {
  assert.deepEqual(mergeLists([list("a", ["Chen Ada"])], [list("a", ["Ada Chen"])], false).map((l) => l.athletes), [["Chen Ada"]]);
});

test("mergeLists: key order from the store doesn't matter", () => {
  const base = [list("x", ["Amy Lee"]), list("y", ["Ben Ho"])];
  // Firestore-style sorted keys on the account copy.
  const sorted = (l: WatchList) => ({ athletes: l.athletes, color: l.color, enabled: l.enabled, id: l.id, name: l.name }) as WatchList;
  const remote = base.map(sorted);
  const local = [list("y", ["Ben Ho", "New Kid"])]; // x deleted here, y edited
  assert.deepEqual(mergeLists(local, remote, false, base).map((l) => l.id), ["y"]);
});

test("mergeLists: a rename elsewhere survives an unrelated edit here", () => {
  const base = [list("y", ["Amy Lee"], { name: "Nova" }), list("z", [])];
  const remote = [list("y", ["Amy Lee"], { name: "Nova Wushu" }), list("z", [])];
  const local = [list("y", ["Amy Lee"], { name: "Nova" }), list("z", ["Added Here"])];
  assert.equal(mergeLists(local, remote, false, base)[0]!.name, "Nova Wushu");
});

test("mergeLists: a reorder made only here is kept", () => {
  const base = [list("y", []), list("z", [])];
  const local = [list("z", ["Kid One"]), list("y", [])];
  assert.deepEqual(mergeLists(local, base, false, base).map((l) => l.id), ["z", "y"]);
});

test("mergeLists: same person despite punctuation", () => {
  assert.deepEqual(mergeLists([list("a", ["O'Brien Sean"])], [list("a", ["OBrien Sean"])], false)[0]!.athletes, ["O'Brien Sean"]);
});
