import { test } from "node:test";
import assert from "node:assert/strict";
import { bowuuResults, mapBowuu } from "@/lib/data/api";

const sample = {
  eventParticipation: [
    { participantName: "Testlast1 Ada", gender: "Female", ageGroup: "C", eventName: "Elementary Long Fist (IWuF)", score: 8.923, teamName: "Club A", ringName: "Ring8" },
    { participantName: "Testlast2 Ben", gender: "Male", ageGroup: "A", eventName: "Optional Nandao", score: null, teamName: null, didNotStart: true },
  ],
};

test("mapBowuu normalizes entries", () => {
  const [a, b] = mapBowuu(sample);
  assert.deepEqual([a?.code, a?.gender, a?.division, a?.finalScore, a?.club], ["CQ", "female", "C", 8.923, "Club A"]);
  assert.deepEqual([b?.code, b?.gender, b?.finalScore, b?.club], ["ND", "male", null, "Individual"]);
});

test("mapBowuu rejects a changed schema", () => {
  assert.throws(() => mapBowuu({}), /no eventParticipation/);
});

test("bowuuResults loads through fetch", async () => {
  const f = (async () => new Response(JSON.stringify(sample))) as unknown as typeof fetch;
  assert.equal((await bowuuResults(24).load({ fetch: f })).length, 2);
});
