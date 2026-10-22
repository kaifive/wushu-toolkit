import { test } from "node:test";
import assert from "node:assert/strict";
import { imagesToPdf } from "@/lib/export/pdf";
import { fileName, resultSheet, scorecardSheet } from "@/lib/export/sheet";

test("fileName makes safe, readable file names", () => {
  assert.equal(fileName("2025 Adult Trials", "Ashton Wú", "Men's CQ"), "2025-adult-trials-ashton-wu-men-s-cq");
  assert.equal(fileName("!!!"), "wushu-toolkit");
});

test("scorecard sheet keeps struck marks and missed nandu", () => {
  const s = scorecardSheet("2025 Adults", {
    athleteName: "Amy Lee",
    raw: "Women's Changquan",
    finalScore: 9.123,
    scorecard: { a: { score: 4.7, deductions: ["20", "31"] }, b: { score: 2.5, marks: [2.4, 2.5, 2.6], counted: [false, true, false] }, c: { score: 1.6, elements: ["323B", "353B+1"], made: [true, false] } },
  });
  assert.equal(s.title, "Amy Lee");
  assert.equal(s.subtitle, "2025 Adults · Women's Changquan");
  const block = s.blocks[0]!;
  assert.ok(block.kind === "fields");
  assert.equal(block.heading, "Final score 9.123");
  assert.deepEqual(block.items.map((i) => i.label), ["A · Quality 4.70", "B · Performance 2.500", "C · Difficulty 1.60"]);
  assert.deepEqual(block.items[1]!.value.map((v) => !!v.strike), [true, false, true]);
  assert.deepEqual(block.items[2]!.value.map((v) => !!v.miss), [false, true]);
});

test("result sheet ranks rows and leaves unscored places blank", () => {
  const s = resultSheet("PWC", { raw: "Men's NQ", rows: [{ place: 1, athleteName: "Ben Ho", club: "Club", finalScore: 9.1, hasScorecard: false }, { place: 2, athleteName: "Dan Ng", finalScore: null, hasScorecard: false }] });
  const t = s.blocks[0]!;
  assert.ok(t.kind === "table");
  assert.deepEqual(t.rows.map((r) => r.map((c) => c.text)), [["1", "Ben Ho · Club", "9.100"], ["", "Dan Ng", "—"]]);
});

test("PDF writer produces a well-formed file with one page per image", () => {
  const jpeg = new Uint8Array([0xff, 0xd8, 0xff, 0xd9]);
  const pdf = imagesToPdf([{ jpeg, width: 100, height: 140 }, { jpeg, width: 100, height: 50 }]);
  const text = new TextDecoder("latin1").decode(pdf);
  assert.ok(text.startsWith("%PDF-1.4"));
  assert.ok(text.trimEnd().endsWith("%%EOF"));
  assert.match(text, /\/Type \/Pages \/Count 2/);
  // xref offsets point at their objects.
  const xref = Number(text.match(/startxref\n(\d+)/)![1]);
  const entries = text.slice(xref).split("\n").slice(3, 3 + 8);
  entries.forEach((line, i) => assert.equal(text.slice(Number(line.slice(0, 10)), Number(line.slice(0, 10)) + `${i + 1} 0 obj`.length), `${i + 1} 0 obj`));
});

test("stats and athlete sheets", async () => {
  const { statsSheet, athleteSheet } = await import("@/lib/export/sheet");
  const st = statsSheet("Ev", { deductions: [{ code: "70B", count: 3, eventCode: "CQ" }], byEvent: [{ raw: "CQ", gender: "male", routines: 2, a: 4.9, b: 2.5, c: 2, final: 9.4 }] });
  assert.equal(st.blocks.length, 2);
  const at = athleteSheet("Ev", { id: "a", name: "Amy", routines: [{ raw: "CQ", score: 9, place: 1, of: 3, average: 8.5, hasScorecard: false }], overall: [{ scope: "Women", rank: 2, of: 10, discipline: "Changquan", team: "A" }] });
  assert.equal(at.title, "Amy");
  assert.equal(at.blocks[0]!.kind, "fields");
});

test("combineSheets: one sheet per event, each title becomes a heading", async () => {
  const { combineSheets, resultSheet } = await import("@/lib/export/sheet");
  const r = (raw: string) => resultSheet("Ev", { raw, rows: [{ place: 1, athleteName: "Amy", finalScore: 9, hasScorecard: false }] });
  const all = combineSheets("Results by Event · Female", "Ev", [r("CQ"), r("JS")]);
  assert.equal(all.blocks.length, 2);
  assert.deepEqual(all.blocks.map((b) => b.heading), ["CQ", "JS"]);
});
