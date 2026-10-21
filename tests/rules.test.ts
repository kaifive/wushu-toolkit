import { test } from "node:test";
import assert from "node:assert/strict";
import type { EventCode, ScoreEntry } from "@/lib/domain/types";
import { RULESETS, formatDuration } from "@/lib/rules";
import { buildCandidates, rankCandidates, runSelection, selectTeams, withDivisions } from "@/lib/rules/selection";
import { ageGroupChampions, allAround, grandChampion, standings } from "@/lib/rules/all-around";

let n = 0;
function e(name: string, code: EventCode, score: number | null, extra: Partial<ScoreEntry> = {}): ScoreEntry {
  n++;
  return { athleteId: name.toLowerCase(), athleteName: name, raw: `Taolu Youth Male 3rd Set ${code}#${n}`, code, gender: "male", finalScore: score, ...extra };
}

test("every ruleset id matches its registry key", () => {
  for (const [k, r] of Object.entries(RULESETS)) assert.equal(r.id, k);
});

test("r15 has three divisions with birth ranges and is marked unverified", () => {
  const r = RULESETS["usawkf-junior-trials-2025-26"];
  assert.deepEqual(r.divisions.map((d) => d.id), ["A", "B", "C"]);
  assert.equal(r.divisions[0]?.born?.from, "2008-11-14");
  assert.equal(r.source.verified, false);
  assert.deepEqual(r.selection?.teams.map((t) => t.minAverage), [9.0, 8.9, 8.8]);
});

test("same-discipline pairing ranks athletes in their best discipline", () => {
  const [c] = buildCandidates(
    [e("Ada", "CQ", 9.0), e("Ada", "DS", 8.0), e("Ada", "NQ", 8.9), e("Ada", "ND", 8.95)],
    { method: "barehand-plus-weapon", pairing: "same-discipline" },
  );
  assert.equal(c?.key, "nanquan");
  assert.equal(c?.score, 17.85);
  assert.equal(c?.average, 8.925);
});

test("any pairing takes best barehand and best weapon across disciplines (2024)", () => {
  const [c] = buildCandidates(
    [e("Ada", "CQ", 9.0), e("Ada", "DS", 8.0), e("Ada", "NQ", 8.9), e("Ada", "ND", 8.95)],
    { method: "barehand-plus-weapon", pairing: "any" },
  );
  assert.equal(c?.score, 17.95);
  assert.equal(c?.barehand?.code, "CQ");
  assert.equal(c?.weapon?.code, "ND");
});

test("unscored events count as zero but do not crash", () => {
  const [c] = buildCandidates([e("Ada", "CQ", 9.1), e("Ada", "JS", null)], { method: "barehand-plus-weapon", pairing: "same-discipline" });
  assert.equal(c?.score, 9.1);
  assert.equal(c?.weapon, undefined);
});

test("r15 selection: one per discipline, minimum averages push athletes down", () => {
  const rules = RULESETS["usawkf-junior-trials-2025-26"].selection!;
  const scores = [
    e("Cq1", "CQ", 9.5), e("Cq1", "DS", 9.4), // 18.9 avg 9.45
    e("Cq2", "CQ", 9.3), e("Cq2", "JS", 9.2), // 18.5 avg 9.25, second changquan
    e("Nq1", "NQ", 9.0), e("Nq1", "ND", 8.95), // avg 8.975 < 9.0 -> not A
    e("Tq1", "TQ", 9.1), e("Tq1", "TJ", 9.0), // avg 9.05
    e("Low", "CQ", 8.5), e("Low", "GS", 8.5), // avg 8.5, no team
  ];
  const r = runSelection(scores, rules, "A");
  const names = (id: string) => r.teams.find((t) => t.id === id)!.members.map((m) => m.athleteName);
  assert.deepEqual(names("A"), ["Cq1", "Tq1"]);
  assert.deepEqual(names("B"), ["Cq2", "Nq1"]);
  assert.deepEqual(names("C"), []);
  assert.equal(r.ranked.find((c) => c.athleteName === "Low")?.team, undefined);
  assert.equal(r.ranked[0]?.rank, 1);
});

test("division B/C rosters use 2 per team", () => {
  const rules = RULESETS["usawkf-junior-trials-2025-26"].selection!;
  const scores = ["changquan", "nanquan", "taijiquan"].flatMap((d, i) => {
    const [b, w] = d === "changquan" ? (["CQ", "DS"] as const) : d === "nanquan" ? (["NQ", "ND"] as const) : (["TQ", "TJ"] as const);
    return [e(`X${i}`, b, 9.5), e(`X${i}`, w, 9.5)];
  });
  const r = runSelection(scores, rules, "B");
  assert.equal(r.teams[0]?.members.length, 2);
  assert.equal(r.teams[1]?.members.length, 1);
});

test("tie-breaks: highest single event, then full nandu, then name; flags unresolved ties", () => {
  const a = e("Bee", "CQ", 9.0, { scorecard: { c: { score: 2, elements: ["1"], made: [true] } } });
  const ranked = rankCandidates(
    buildCandidates(
      [a, e("Bee", "DS", 9.0), e("Ace", "CQ", 9.2), e("Ace", "DS", 8.8), e("Cat", "CQ", 9.0), e("Cat", "DS", 9.0)],
      { method: "barehand-plus-weapon", pairing: "same-discipline" },
    ),
    ["highest-single-event", "more-full-nandu"],
  );
  assert.deepEqual(ranked.map((c) => c.athleteName), ["Ace", "Bee", "Cat"]);
  assert.equal(ranked[1]?.tiedWithAbove, undefined);
  const plain = rankCandidates(
    buildCandidates([e("Q", "CQ", 9), e("Q", "DS", 9), e("P", "CQ", 9), e("P", "DS", 9)], { method: "barehand-plus-weapon", pairing: "same-discipline" }),
    ["highest-single-event"],
  );
  assert.deepEqual(plain.map((c) => [c.athleteName, !!c.tiedWithAbove]), [["P", false], ["Q", true]]);
});

test("2025 adults: category averages, A team needs clean nandu, then fills to size", () => {
  const rules = RULESETS["usawkf-adult-trials-2025"].selection!;
  const clean = { scorecard: { c: { score: 2, elements: ["1", "2"], made: [true, true] } } };
  const scores = [
    e("Dirty", "CQ", 9.6), e("Dirty", "DS", 9.6), // best average, no clean nandu
    e("Clean", "CQ", 9.0, clean), e("Clean", "DS", 9.0),
    e("Nan", "NQ", 9.1, clean),
    e("Tai", "TQ", 9.2, clean),
  ];
  const ranked = rankCandidates(buildCandidates(scores, rules.scoring), rules.tieBreaks);
  const teams = selectTeams(ranked, rules);
  assert.deepEqual(teams[0]?.members.map((m) => m.athleteName), ["Clean", "Nan", "Tai"]);
  assert.deepEqual(teams[1]?.members.map((m) => m.athleteName), ["Dirty"]);
});

test("withDivisions classifies by event name", () => {
  const r = RULESETS["usawkf-junior-trials-2025-26"];
  const out = withDivisions(
    [
      { ...e("A", "CQ", 9), raw: "Taolu Youth Male 3rd Set Changquan" },
      { ...e("B", "CQ", 9), raw: "Taolu Junior Female 1st Set Changquan" },
      { ...e("C", "CQ", 9), raw: "Taolu Children Female Elementary Changquan" },
    ],
    r,
  );
  assert.deepEqual(out.map((s) => s.division), ["A", "B", "C"]);
});

test("PWC all-around: top 3 sum, opt-in, age-group champions", () => {
  const rules = RULESETS["pwc-2026"].allAround!;
  const scores = [
    e("Ada", "CQ", 9), e("Ada", "JS", 8), e("Ada", "QS", 7), e("Ada", "DS", 6),
    { ...e("Bea", "TQ", 9.5), gender: "female" as const }, { ...e("Bea", "TJ", 9.5), gender: "female" as const }, { ...e("Bea", "TS", 9.5), gender: "female" as const },
    e("Cal", "NQ", 9.9),
  ];
  const info = new Map([
    ["ada", { age: 10, optedIn: true }],
    ["bea", { age: 16, optedIn: true }],
    ["cal", { age: 16, optedIn: false }],
  ]);
  const aa = allAround(scores, rules, info);
  const ada = aa.find((a) => a.athleteName === "Ada")!;
  assert.equal(ada.total, 24);
  assert.equal(ada.top.length, 3);
  assert.deepEqual(standings(aa, "male").map((a) => a.athleteName), ["Ada"]);
  assert.equal(grandChampion(aa, rules)?.athleteName, "Bea");
  const champs = ageGroupChampions(aa, rules);
  assert.equal(champs.find((c) => c.group.id === "B")?.male?.athleteName, "Ada");
  assert.equal(champs.find((c) => c.group.id === "D")?.female?.athleteName, "Bea");
  assert.equal(champs.find((c) => c.group.id === "D")?.male, null);
});

test("helpers", () => {
  assert.equal(formatDuration(70), "1:10");
  assert.equal(formatDuration(undefined), "—");
});

import { scoreToBeat } from "@/lib/rules/calculator";
import { REQUIRED_MOVEMENTS, allItems, orderToText } from "@/lib/rules/iwuf-2024/required-movements";

test("scoreToBeat finds the lowest score that strictly beats the average", () => {
  assert.deepEqual(scoreToBeat(9.1, [9.1, 9.1], 3), { kind: "need", each: 9.101, missing: 1, possible: true });
  assert.deepEqual(scoreToBeat(9.0, [9.2], 3), { kind: "need", each: 8.901, missing: 2, possible: true });
  assert.deepEqual(scoreToBeat(9.5, [8.0, 8.0], 3), { kind: "need", each: 12.501, missing: 1, possible: false });
  assert.deepEqual(scoreToBeat(9.0, [9.1, 9.0, 9.0], 3), { kind: "already", average: 9.033333333333333 });
  assert.equal(scoreToBeat(9.0, [9.0, 9.0], 2).kind, "short");
  assert.equal(scoreToBeat(9, [11], 3).kind, "invalid");
  assert.deepEqual(scoreToBeat(9.0, [], 2), { kind: "need", each: 9.001, missing: 2, possible: true });
});

test("required movements cover every individual event with unique ids", () => {
  assert.equal(REQUIRED_MOVEMENTS.length, 15);
  const events = REQUIRED_MOVEMENTS.flatMap((m) => m.events);
  for (const code of ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ", "TS"]) assert.ok(events.includes(code as never), code);
  for (const m of REQUIRED_MOVEMENTS) {
    const ids = allItems(m).map((i) => i.id);
    assert.equal(new Set(ids).size, ids.length, m.id);
    assert.ok(m.requirements.every((r) => r.items.length > 0), m.id);
  }
});

test("orderToText numbers the routine and uses the athlete's names", () => {
  const cq = REQUIRED_MOVEMENTS.find((m) => m.id === "changquan")!;
  const text = orderToText(cq, [{ id: "gong-bu-bow-stance" }, { id: "gone" }, { id: "fist-technique-1", name: "Chōng Quán" }, { id: "fist-technique-2" }]);
  assert.equal(text, "1. Gōng Bù (Bow Stance)\n2. Chōng Quán (Fist technique 1)\n3. Fist technique 2");
});

test("category average ignores events not scored yet", () => {
  const [c] = buildCandidates([e("Bea", "CQ", 9.2), e("Bea", "DS", 9.1), e("Bea", "GS", null)], {
    method: "category-average",
    categories: [{ id: "cq", label: "Changquan", events: ["CQ", "DS", "GS"] }],
  });
  assert.equal(c?.score, 9.15);
  assert.ok(Math.abs(c!.average - 9.15) < 1e-9);
});

test("averages are not rounded up to meet a minimum", () => {
  const [c] = buildCandidates([e("Eli", "CQ", 9.0), e("Eli", "DS", 8.999)], { method: "barehand-plus-weapon", pairing: "same-discipline" });
  assert.equal(c?.score, 17.999);
  assert.ok(c!.average < 9.0);
});

test("all-around minimum forms counts scored forms only", () => {
  const rules = RULESETS["pwc-2026"].allAround!;
  const scores = [e("Dee", "CQ", 9), e("Dee", "JS", null), e("Dee", "QS", null)];
  const aa = allAround(scores, rules, new Map([["dee", { age: 12, optedIn: true }]]));
  assert.equal(grandChampion(aa, rules), null);
});

test("results by event split men and women when the event name has no gender", async () => {
  const { resultsByEvent } = await import("@/lib/events/views");
  const raw = "Elementary Long Fist (IWuF)";
  const scores = [
    { ...e("Amy", "CQ", 9.1), raw, gender: "female" as const },
    { ...e("Ben", "CQ", 9.3), raw, gender: "male" as const },
    { ...e("Cai", "CQ", 8.9), raw, gender: "female" as const },
  ];
  const r = resultsByEvent({ registrations: [], scores, schedules: [], asOf: "", source: "" }, RULESETS["pwc-2026"]);
  assert.ok(r.every((x) => x.raw === raw), "raw is the event name, without the gender key");
  assert.deepEqual(r.map((x) => [x.gender, x.rows.map((row) => `${row.place} ${row.athleteName}`)]), [
    ["female", ["1 Amy", "2 Cai"]],
    ["male", ["1 Ben"]],
  ]);
});

test("division from the event name: most matching words wins", async () => {
  const { divisionOf } = await import("@/lib/rules/selection");
  const r = RULESETS["usawkf-junior-trials-2025-26"];
  assert.equal(divisionOf("Junior Team Trials Children Male Elementary Changquan", r), "C");
  assert.equal(divisionOf("Taolu Junior Male 1st Set Changquan", r), "B");
  assert.equal(divisionOf("Taolu Youth Female 3rd Set Daoshu", r), "A");
});
