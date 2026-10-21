import { test } from "node:test";
import assert from "node:assert/strict";
import { assertEventData, emptyEventData, latestSnapshot, snapshotFileName, snapshotSource } from "@/lib/data/snapshot";

test("snapshotSource lazily loads and validates", async () => {
  const data = emptyEventData("test", "2025-01-01T00:00:00.000Z");
  const src = snapshotSource({ x: { file: "2025-01-01T00-00-00-000Z.json", load: async () => ({ default: data }) } }, "x");
  assert.equal(src.label, "Snapshot 2025-01-01T00-00-00-000Z");
  assert.deepEqual(await src.load(), data);
});

test("snapshotSource rejects unknown slugs and bad data", async () => {
  await assert.rejects(snapshotSource({}, "nope").load(), /No snapshot/);
  assert.throws(() => assertEventData({ registrations: [] }), /missing array "scores"/);
});

test("snapshot file names sort chronologically", () => {
  const a = snapshotFileName(new Date("2025-06-13T20:05:00Z"));
  const b = snapshotFileName(new Date("2025-06-13T20:57:34Z"));
  assert.equal(a, "2025-06-13T20-05-00-000Z.json");
  assert.equal(latestSnapshot([b, a, "README.md"]), b);
});

test("snapshotRegression refuses scrapes that lost data", async () => {
  const { snapshotRegression } = await import("@/lib/data/snapshot");
  const data = (scored: number, entries = scored) => ({
    registrations: [{ athlete: { id: "a", name: "A" }, entries: [] }],
    scores: Array.from({ length: entries }, (_, i) => ({ athleteId: `a${i}`, athleteName: "A", raw: "CQ", finalScore: i < scored ? 9 : null })),
    schedules: [],
    asOf: "",
    source: "",
  });
  assert.equal(snapshotRegression(null, data(3)), null);
  assert.equal(snapshotRegression(data(3), data(4)), null);
  assert.match(snapshotRegression(data(3), data(0, 3)) ?? "", /0 scored routines vs 3/);
  assert.match(snapshotRegression(null, { registrations: [], scores: [], schedules: [], asOf: "", source: "" }) ?? "", /no entries/);
});
