import { test } from "node:test";
import assert from "node:assert/strict";

test("orderSchedule matches scores across name spellings", async () => {
  const { orderSchedule } = await import("@/lib/domain/schedule");
  const s = orderSchedule("Order", [{ event: "CQ", athletes: ["Yim Ashton", "Nobody Here"] }], [
    { athleteId: "a", athleteName: "Ashton Yim", raw: "CQ", finalScore: 9.4 },
  ]);
  const b = s.blocks[0]!;
  assert.equal(b.type, "session");
  if (b.type === "session") {
    assert.equal(b.title, "CQ");
    assert.deepEqual(b.entries.map((e) => [e.athleteName, e.score]), [["Ashton Yim", "9.400"], ["Nobody Here", undefined]]);
  }
});

test("orderSchedule falls back to a unique partial name", async () => {
  const { orderSchedule } = await import("@/lib/domain/schedule");
  const s = orderSchedule("Order", [{ event: "GS", athletes: ["Yang Chien-Mu"] }], [
    { athleteId: "a", athleteName: "Yang Chien", raw: "GS", finalScore: 9.3 },
    { athleteId: "b", athleteName: "Yang Aaron", raw: "GS", finalScore: 9.1 },
  ]);
  const b = s.blocks[0]!;
  assert.equal(b.type === "session" && b.entries[0]!.athleteName, "Yang Chien");
});

test("USAWKF order page: one schedule per ring, a block per session and category", async () => {
  const { readFileSync } = await import("node:fs");
  const { parseUsawkfOrder } = await import("@/lib/data/usawkf-order");
  const s = parseUsawkfOrder(readFileSync("tests/fixtures/usawkf/order.html", "utf8"));
  assert.deepEqual(s.map((r) => r.ring), ["Ring 1", "Ring 2"]);
  const b = s[0]!.blocks;
  assert.equal(b.length, 2);
  assert.equal(b[0]!.type === "session" && b[0]!.title, "Friday Morning Dec 19, 2025 · Group A Male Changquan");
  assert.deepEqual(b[0]!.type === "session" && b[0]!.entries.map((e) => e.athleteName), ["Lee Amy", "Ho Ben"]);
});

test("scorecardStats counts codes and averages panels per event", async () => {
  const { scorecardStats } = await import("@/lib/events/views");
  const card = (a: number, ded: string[]) => ({ a: { score: a, deductions: ded }, b: { score: 2.5, marks: [], counted: [] }, c: { score: 2, elements: [], made: [] } });
  const st = scorecardStats({
    registrations: [], schedules: [], asOf: "", source: "",
    scores: [
      { athleteId: "a", athleteName: "A", raw: "CQ", code: "CQ", finalScore: 9.5, scorecard: card(5, ["70b", "5.00"]) },
      { athleteId: "b", athleteName: "B", raw: "CQ", code: "CQ", finalScore: 9.3, scorecard: card(4.8, ["70B", "22"]) },
      { athleteId: "c", athleteName: "C", raw: "CQ", code: "CQ", finalScore: null, scorecard: card(1, ["99"]) },
    ],
  });
  assert.deepEqual(st.deductions.map((d) => [d.code, d.count]), [["70B", 2], ["22", 1]]);
  assert.equal(st.byEvent[0]!.routines, 2);
  assert.ok(Math.abs(st.byEvent[0]!.a! - 4.9) < 1e-9);
});

test("bowuu ring: events in order, participants by lot order, scores kept", async () => {
  const { parseBowuuRing } = await import("@/lib/data/bowuu");
  const s = parseBowuuRing({
    schedule: {
      ringName: "Ring8 Sun, B-TJQ",
      events: [
        { eventName: "42 Movements  Taijijian", ageGroupName: "B", gender: "M", completeParticipants: [{ name: "Justin Shen (USA)", lotOrder: 2, score: 8.91 }, { name: "Ryan Yin (USA)", lotOrder: 1, score: 7.916 }] },
      ],
    },
  });
  assert.equal(s.ring, "Ring 8 · Sunday");
  const b = s.blocks[0]!;
  assert.equal(b.type === "session" && b.title, "42 Movements Taijijian · Group B · Male");
  assert.deepEqual(b.type === "session" && b.entries.map((e) => [e.athleteName, e.score]), [["Ryan Yin", "7.916"], ["Justin Shen", "8.910"]]);
});
