import { test } from "node:test";
import assert from "node:assert/strict";
import { DEDUCTION_GROUPS, DEDUCTIONS_SOURCE } from "@/lib/rules/iwuf-2024/deductions";
import { CONNECTIONS, TECHNIQUES, chainFromCode, declaredValue, nextOptions, parseNandu, parseNanduList, scoreNandu } from "@/lib/rules/iwuf-2024/nandu";

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

test("parseNandu splits movements and connections", () => {
  assert.deepEqual(parseNandu("353B+323C+1"), {
    raw: "353B+323C+1",
    movements: [
      { code: "353B", number: "353", level: "B" },
      { code: "323C", number: "323", level: "C" },
    ],
    connections: ["1"],
  });
  assert.equal(parseNandu("355B")?.movements.length, 1);
  assert.equal(parseNandu("hello"), null);
});

test("parseNanduList keeps unknown entries", () => {
  const r = parseNanduList(["312A+335A", "??", "324B+1"]);
  assert.equal(r.elements.length, 2);
  assert.deepEqual(r.unknown, ["??"]);
  assert.equal(declaredValue(r.elements), 1); // 0.2+0.2+B 0.15, 0.3+B 0.15
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
