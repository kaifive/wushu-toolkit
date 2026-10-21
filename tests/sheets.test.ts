import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseCsv } from "@/lib/data/csv";
import { columnLetter, csvToLetterRows, gvizTab, parseGviz } from "@/lib/data/sheets";
import { athletesFromRows, scoresFromRows } from "@/lib/data/parsers/sheet-scores";
import { parseScheduleRows } from "@/lib/data/parsers/schedule";
import { withCurrentCompetitor } from "@/lib/domain/schedule";

const fx = (f: string) => readFileSync(new URL(`./fixtures/sheets/${f}`, import.meta.url), "utf8");

test("parseCsv handles quotes, escaped quotes and CRLF", () => {
  assert.deepEqual(parseCsv('a,"b,c","d ""e"""\r\n1,2,3'), [["a", "b,c", 'd "e"'], ["1", "2", "3"]]);
  assert.deepEqual(parseCsv("x\n"), [["x"]]);
});

test("column letters round-trip", () => {
  assert.equal(columnLetter(0), "A");
  assert.equal(columnLetter(26), "AA");
});

test("parseGviz unwraps the response and keys rows by letter", () => {
  const rows = parseGviz(fx("pwc-ring.gviz.txt"));
  assert.equal(rows.length, 4);
  assert.equal(rows[0]?.B, "Ada");
  assert.equal(rows[0]?.G, 9.12);
  assert.equal(rows[2]?.G, "");
});

test("parseGviz surfaces gviz errors", () => {
  assert.throws(
    () => parseGviz('setResponse({"status":"error","errors":[{"detailed_message":"Access denied"}]})'),
    /Access denied/,
  );
});

test("scoresFromRows maps PWC columns, keeps unscored rows, skips blanks", () => {
  const scores = scoresFromRows(parseGviz(fx("pwc-ring.gviz.txt")), {
    firstName: "B", lastName: "C", gender: "D", event: "F", score: "G",
  }, { ring: "Ring 1" });
  assert.equal(scores.length, 3);
  assert.deepEqual(
    scores.map((s) => [s.athleteName, s.code, s.gender, s.finalScore]),
    [
      ["Ada Chen", "CQ", "female", 9.12],
      ["Ada Chen", "JS", "female", 8.95],
      ["Ben Ortiz", "NQ", "male", null],
    ],
  );
  assert.equal(scores[0]?.ring, "Ring 1");
});

test("scoresFromRows flips Last_First names (2025 juniors sheet)", () => {
  const rows = csvToLetterRows(parseCsv("Name,Event,Score\nchen_ada,Junior Female 1st Set Changquan,9.01"), 1);
  const [s] = scoresFromRows(rows, { name: "A", nameIsLastFirst: true, event: "B", score: "C" }, { eventPrefix: "Taolu" });
  assert.equal(s?.athleteName, "ada chen");
  assert.equal(s?.raw, "Taolu Junior Female 1st Set Changquan");
  assert.equal(s?.gender, "female");
});

test("athletesFromRows merges duplicate rows and reads the opt-in flag", () => {
  const rows = csvToLetterRows(parseCsv("x,Ada,Chen,12,,,,Yes\nx,Ada,Chen,,,,,No\nx,Ben,Ortiz,15,,,,"));
  const m = athletesFromRows(rows, { firstName: "B", lastName: "C", age: "D", flag: "H", flagValue: "Yes" });
  assert.equal(m.size, 2);
  const ada = [...m.values()].find((a) => a.name === "Ada Chen");
  assert.equal(ada?.age, 12);
  assert.equal(ada?.flagged, true);
});

test("parseScheduleRows splits sessions on break rows and skips title rows", () => {
  const blocks = parseScheduleRows(parseCsv(fx("pwc-schedule.csv")), { time: 0, firstName: 1, lastName: 2, experience: 4, event: 5, score: 6 });
  assert.deepEqual(blocks.map((b) => b.type), ["session", "break", "session", "break"]);
  const s2 = blocks[2];
  assert.ok(s2?.type === "session");
  assert.equal(s2.entries[1]?.athleteName, 'Cy Lee "CJ"');
  assert.equal(s2.start, "9:30 AM");
  assert.equal(s2.end, "9:40 AM");
});

test("withCurrentCompetitor flags the entry after the last score", () => {
  const blocks = withCurrentCompetitor(
    parseScheduleRows(parseCsv(fx("pwc-schedule.csv")), { time: 0, firstName: 1, lastName: 2, event: 5, score: 6 }),
  );
  const sessions = blocks.filter((b) => b.type === "session");
  // Ben skipped, Cy scored, so Dee is current.
  const current = sessions.flatMap((s) => s.entries).filter((e) => e.isCurrent);
  assert.deepEqual(current.map((e) => e.athleteName), ["Dee Park"]);
  assert.equal(sessions[0]?.finished, true);
  assert.equal(sessions[1]?.finished, false);
});

test("gvizTab loads through injected fetch", async () => {
  const fakeFetch = (async (url: string) => {
    assert.match(String(url), /gviz\/tq\?tqx=out:json&gid=205393319/);
    return new Response(fx("pwc-ring.gviz.txt"));
  }) as typeof fetch;
  const rows = await gvizTab({ sheetId: "abc", gid: "205393319", name: "Ring 1" }).load({ fetch: fakeFetch });
  assert.equal(rows.length, 4);
});
