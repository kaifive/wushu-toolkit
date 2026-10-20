import { test } from "node:test";
import assert from "node:assert/strict";
import { DEDUCTION_GROUPS, DEDUCTIONS_SOURCE } from "@/lib/rules/iwuf-2024/deductions";
import { declaredValue, parseNandu, parseNanduList } from "@/lib/rules/iwuf-2024/nandu";

test("deduction groups cover every taolu event exactly once", () => {
  const events = DEDUCTION_GROUPS.flatMap((g) => g.events);
  assert.equal(new Set(events).size, events.length);
  for (const code of ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ", "TS"]) assert.ok(events.includes(code as never), code);
  assert.equal(DEDUCTIONS_SOURCE.verified, false);
});

test("deduction codes are well formed and unique within a group", () => {
  for (const g of DEDUCTION_GROUPS) {
    assert.ok(g.codes.length > 5, g.id);
    for (const c of g.codes) {
      assert.match(c.code, /^\d{2}$/, `${g.id} ${c.code}`);
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

test("parseNanduList keeps unknown entries and values stay null until sourced", () => {
  const r = parseNanduList(["312A+335A", "??", "324B+1"]);
  assert.equal(r.elements.length, 2);
  assert.deepEqual(r.unknown, ["??"]);
  assert.equal(declaredValue(r.elements), null);
});
