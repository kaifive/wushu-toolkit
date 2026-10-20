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
