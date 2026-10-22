import { test } from "node:test";
import assert from "node:assert/strict";
import { DEDUCTION_GROUPS, DEDUCTIONS_SOURCE, deductionCodes, deductionGroupFor, findDeduction } from "@/lib/rules/iwuf-2024/deductions";
import { CONNECTIONS, TECHNIQUES, chainFromCode, nextOptions, scoreNandu, sheetElements } from "@/lib/rules/iwuf-2024/nandu";

test("deduction groups cover every taolu event exactly once", () => {
  const events = DEDUCTION_GROUPS.flatMap((g) => g.events);
  assert.equal(new Set(events).size, events.length);
  for (const code of ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ", "TS"]) assert.ok(events.includes(code as never), code);
  assert.equal(DEDUCTIONS_SOURCE.verified, true);
});

test("deduction codes are well formed and unique within a group", () => {
  for (const g of DEDUCTION_GROUPS) {
    assert.ok(g.codes.length > 5, g.id);
    const seen = new Set<string>();
    for (const c of g.codes) {
      assert.match(c.code, /^\d{2}[AB]?$/, `${g.id} ${c.code}`);
      assert.ok(!seen.has(c.code), `${g.id} ${c.code} is unique`);
      seen.add(c.code);
      assert.ok(c.content.length > 0, `${g.id} ${c.code} has content`);
    }
  }
});

test("scoreNandu: a full 2.0 Daoshu set from the 2025 Phoenix scorecards", () => {
  const r = scoreNandu("changquan", ["353B+323C+1", "324B+1", "312A+335A"].map(chainFromCode));
  assert.equal(r.techniqueRaw, 1.4);
  assert.equal(r.connectionRaw, 0.7);
  assert.equal(r.connection, 0.6, "connections cap at 0.6");
  assert.equal(r.total, 2);
  assert.deepEqual(r.warnings, []);
});

test("scoreNandu: unlisted connections earn nothing and are flagged", () => {
  const r = scoreNandu("changquan", [chainFromCode("323C+2")]);
  assert.equal(r.technique, 0.4);
  assert.equal(r.connection, 0);
  assert.match(r.warnings.join(), /323C\+2 is not a listed connection/);
});

test("scoreNandu: technique cap and family-specific tables", () => {
  const r = scoreNandu("changquan", ["323C", "324C", "353C", "355B", "312B"].map(chainFromCode));
  assert.equal(r.techniqueRaw, 1.8);
  assert.equal(r.technique, 1.4);
  assert.equal(scoreNandu("taiji", [chainFromCode("324C+5")]).total, 0.6, "taiji lotus 540 + hurdler split: 0.4 + C 0.2");
  assert.match(scoreNandu("nanquan", [chainFromCode("353B")]).warnings.join(), /not a Nanquan difficulty technique/);
});

test("scoreNandu: Taiji hurdler's split connection only once", () => {
  assert.match(scoreNandu("taiji", ["324C+5", "324B+5"].map(chainFromCode)).warnings.join(), /Only one hurdler/);
});

test("nandu tables are internally consistent", () => {
  for (const fam of ["changquan", "nanquan", "taiji"] as const) {
    const codes = new Set(TECHNIQUES[fam].map((t) => t.code));
    const seen = new Set<string>();
    for (const c of CONNECTIONS[fam]) {
      assert.ok(!seen.has(c.code), `${fam} duplicate ${c.code}`);
      seen.add(c.code);
      const [first] = c.code.split("+");
      assert.ok(codes.has(first!) || first === "445A", `${fam} ${c.code} starts with a known technique`);
    }
  }
  assert.deepEqual(nextOptions("changquan", "323C").map((c) => c.code).sort(), ["323C+1", "323C+4", "323C+6"]);
});

import { familyOfEvent } from "@/lib/rules/iwuf-2024/nandu";

test("rule breaks: Taiji 312A+324B must land in a hurdler's split", () => {
  assert.match(scoreNandu("taiji", [chainFromCode("312A+324B+3")]).warnings.join(), /must land in a hurdler's split/);
  assert.match(scoreNandu("taiji", [chainFromCode("312A+324B")]).warnings.join(), /must land in a hurdler's split/);
  assert.doesNotMatch(scoreNandu("taiji", [chainFromCode("312A+324B+5")]).warnings.join(), /must land/);
});

test("rule breaks: throw and catch once, weapons only", () => {
  const two = scoreNandu("changquan", ["323A+9", "324A+9"].map(chainFromCode), { weapon: true });
  assert.match(two.warnings.join(), /Only one throw-and-catch/);
  assert.match(scoreNandu("changquan", [chainFromCode("323A+9")], { weapon: false }).warnings.join(), /for weapon routines/);
  assert.deepEqual(scoreNandu("changquan", [chainFromCode("323A+9")], { weapon: true }).warnings, []);
});

test("familyOfEvent", () => {
  assert.deepEqual(familyOfEvent("DS"), { family: "changquan", weapon: true });
  assert.deepEqual(familyOfEvent("NQ"), { family: "nanquan", weapon: false });
  assert.deepEqual(familyOfEvent("TS"), { family: "taiji", weapon: true });
});

test("only the element that crosses a cap loses value", () => {
  // 3 × C + 1 × B = 1.5 raw: the fourth counts 0.2.
  const chains = ["353C", "324C", "323C", "133B"].map(chainFromCode);
  const s = scoreNandu("changquan", chains);
  assert.equal(s.technique, 1.4);
  assert.deepEqual(s.chains.map((c) => c.techniques[0]!.counted), [0.4, 0.4, 0.4, 0.2]);
  // Moving the cut element earlier moves the cut to the new last one.
  const r = scoreNandu("changquan", [chains[3]!, chains[0]!, chains[1]!, chains[2]!]);
  assert.deepEqual(r.chains.map((c) => c.techniques[0]!.counted), [0.3, 0.4, 0.4, 0.3]);
});

test("a step after a landing still gets a (zero) link so the editor lines up", () => {
  const s = scoreNandu("changquan", [chainFromCode("1+323A+324A")]);
  assert.deepEqual(s.chains[0]!.links.map((l) => l.code), ["1+323A", "323A+324A"]);
  assert.equal(s.chains[0]!.links[0]!.value, 0);
});

test("sheetElements numbers techniques and connections the way Sportdata does", () => {
  const els = sheetElements("changquan", ["324B+1", "312A+335A", "335A"]);
  assert.deepEqual(els.map((e) => e.code), ["324B", "324B+1", "312A", "312A+335A", "335A", "335A"]);
  assert.equal(els[1]!.label, "into horse stance");
  assert.equal(els[1]!.value, 0.15);
  assert.equal(els[0]!.kind, "technique");
});

test("deduction codes from a scorecard resolve in the event's table", () => {
  assert.deepEqual(deductionCodes(["70b", "5.00", "0.0", " 22 "]), ["70B", "22"]);
  assert.ok(findDeduction("70B", "CQ"));
  assert.equal(deductionGroupFor("NQ").id, "southern");
  assert.equal(deductionGroupFor(undefined).id, "northern");
});
