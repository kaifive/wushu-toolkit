import { test } from "node:test";
import assert from "node:assert/strict";
import { all, constant, map, source, fetchText } from "@/lib/data/source";

test("map and all compose sources", async () => {
  const doubled = map(constant("a", 21), (n) => n * 2);
  const [x, y] = await all([doubled, constant("b", "hi")] as const).load();
  assert.equal(x, 42);
  assert.equal(y, "hi");
});

test("fetchText throws on non-2xx with the host in the message", async () => {
  const fakeFetch = (async () => new Response("nope", { status: 503 })) as typeof fetch;
  await assert.rejects(fetchText("https://example.com/x", { fetch: fakeFetch }), /HTTP 503 from example.com/);
});

import { liveWithSnapshot } from "@/lib/data/event-data";
import { emptyEventData } from "@/lib/data/snapshot";

test("liveWithSnapshot marks the snapshot stale and rethrows when both fail", async () => {
  const fail = source<ReturnType<typeof emptyEventData>>("live", async () => {
    throw new Error("live down");
  });
  const r = await liveWithSnapshot(fail, constant("snap", emptyEventData("Snapshot X"))).load();
  assert.equal(r.stale, true);
  assert.match(r.source, /Snapshot X \(live source unavailable\)/);
  await assert.rejects(liveWithSnapshot(fail, fail).load(), /live down \(no saved copy: live down\)/);
});

test("liveWithSnapshot serves the saved copy when live answers with less", async () => {
  const withScores = (n: number, label: string) => ({
    ...emptyEventData(label),
    registrations: [{ athlete: { id: "a", name: "A" }, entries: [] }],
    scores: Array.from({ length: 3 }, (_, i) => ({ athleteId: `a${i}`, athleteName: "A", raw: "CQ", finalScore: i < n ? 9 : null })),
  });
  const cleared = await liveWithSnapshot(constant("live", withScores(0, "Live")), constant("snap", withScores(3, "Saved"))).load();
  // A single corrected score is normal and stays live.
  const corrected = await liveWithSnapshot(constant("live", withScores(2, "Live")), constant("snap", withScores(3, "Saved"))).load();
  assert.equal(corrected.source, "Live");
  // The snapshot script reads live only.
  assert.equal((await liveWithSnapshot(constant("live", withScores(0, "Live")), constant("snap", withScores(3, "Saved"))).load({ liveOnly: true })).source, "Live");
  assert.equal(cleared.stale, true);
  assert.match(cleared.source, /Saved \(live source has less: 0 scored routines vs 3/);
  const better = await liveWithSnapshot(constant("live", withScores(3, "Live")), constant("snap", withScores(2, "Saved"))).load();
  assert.equal(better.source, "Live");
});
