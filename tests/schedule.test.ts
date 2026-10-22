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

test("athleteProfiles: each routine's place and event average", async () => {
  const { athleteProfiles } = await import("@/lib/events/views");
  const { RULESETS } = await import("@/lib/rules");
  const ruleset = Object.values(RULESETS).find((r) => !r.selection && !r.allAround) ?? Object.values(RULESETS)[0]!;
  const e = (id: string, raw: string, score: number) => ({ athleteId: id, athleteName: id, raw, gender: "male" as const, finalScore: score });
  const p = athleteProfiles({ registrations: [], schedules: [], asOf: "", source: "", scores: [e("Amy", "CQ", 9), e("Ben", "CQ", 8), e("Amy", "JS", 7)] }, ruleset);
  const amy = p.find((x) => x.name === "Amy")!;
  assert.deepEqual(amy.routines.map((r) => [r.raw, r.place, r.of, r.average]), [["CQ", 1, 2, 8.5], ["JS", 1, 1, 7]]);
});

test("scorecardStats keeps the same code apart in different deduction tables", async () => {
  const { scorecardStats } = await import("@/lib/events/views");
  const card = (ded: string[]) => ({ a: { score: 4.9, deductions: ded } });
  const st = scorecardStats({
    registrations: [], schedules: [], asOf: "", source: "",
    scores: [
      { athleteId: "a", athleteName: "A", raw: "CQ", code: "CQ", finalScore: 9.5, scorecard: card(["23"]) },
      { athleteId: "b", athleteName: "B", raw: "NQ", code: "NQ", finalScore: 9.3, scorecard: card(["23"]) },
    ],
  });
  assert.deepEqual(st.deductions.map((d) => [d.code, d.count, d.eventCode]), [["23", 1, "CQ"], ["23", 1, "NQ"]]);
});

test("USAWKF order page (saved copy of the 2025 Junior Trials page)", async () => {
  const { readFileSync } = await import("node:fs");
  const { parseUsawkfOrder } = await import("@/lib/data/usawkf-order");
  const s = parseUsawkfOrder(readFileSync("tests/fixtures/usawkf/junior-2025-order.html", "utf8"));
  assert.deepEqual(s.map((r) => r.ring), ["Ring 1", "Ring 2"]);
  const entries = s.flatMap((r) => r.blocks.flatMap((b) => (b.type === "session" ? b.entries : [])));
  assert.equal(entries.length, 778);
  assert.ok(entries.every((e) => !e.athleteName.includes("_")));
  const first = s[0]!.blocks[0]!;
  assert.equal(first.type === "session" && first.title, "Friday Morning Session 8:30am · Junior Female 1st Set Changquan");
});

test("USAWKF official results: overall ranks with teams, per-event scores joined to registrations", async () => {
  const { readFileSync } = await import("node:fs");
  const { parseUsawkfResults, joinOfficial } = await import("@/lib/data/usawkf-results");
  const rows = parseUsawkfResults(readFileSync("tests/fixtures/usawkf/results-excerpt.html", "utf8"));
  const overall = rows.filter((r) => r.table === "Children Female Athletes Overall Rank");
  assert.deepEqual([overall[0]!.name, overall[0]!.score, overall[0]!.prize], ["Kolette Kooc", 9.157, "A Team"]);
  const event = rows.filter((r) => r.table === "Taolu Junior Female 1st Set Changquan");
  assert.ok(event.length > 5 && event.every((r) => r.score === null || (r.score > 5 && r.score < 10)));
  const first = event.find((r) => r.place === 1)!;
  const raw = "Taolu Junior Female 1st Set Changquan";
  // Registration spells the name surname-first; the join still finds it.
  const [last, ...given] = first.name.split(" ").reverse();
  const reg = { athlete: { id: "x", name: `${last} ${given.reverse().join(" ")}` }, entries: [{ raw, code: "CQ" as const }] };
  const joined = joinOfficial([reg], rows);
  assert.equal(joined[0]!.finalScore, first.score);
  assert.ok(joined.length > 1, "official results without a registration are kept");
});

test("a 0 is 'did not compete': dropped before any average", async () => {
  const { dropZeroScores } = await import("@/lib/events/registry");
  const d = dropZeroScores({ registrations: [], schedules: [], asOf: "", source: "", scores: [
    { athleteId: "a", athleteName: "A", raw: "CQ", finalScore: 0 },
    { athleteId: "a", athleteName: "A", raw: "DS", finalScore: 9.1 },
  ] });
  assert.deepEqual(d.scores.map((s) => [s.finalScore, !!s.didNotCompete]), [[null, true], [9.1, false]]);
});
