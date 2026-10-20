import { test } from "node:test";
import assert from "node:assert/strict";
import { all, constant, map, source, withFallback, fetchText } from "@/lib/data/source";

test("withFallback serves primary when it works", async () => {
  const r = await withFallback(constant("live", 1), constant("snap", 2)).load();
  assert.deepEqual(r, { value: 1, label: "live", stale: false });
});

test("withFallback serves fallback and marks stale on error", async () => {
  const broken = source<number>("live", async () => {
    throw new Error("boom");
  });
  const r = await withFallback(broken, constant("snap", 2)).load();
  assert.equal(r.value, 2);
  assert.equal(r.stale, true);
  assert.equal(r.error, "boom");
});

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
  await assert.rejects(liveWithSnapshot(fail, fail).load(), /live down/);
});
