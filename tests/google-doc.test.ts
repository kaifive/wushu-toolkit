import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { docText, parseDocJson, parseDocScorecards } from "@/lib/data/google-doc";
import { athleteKey } from "@/lib/domain/names";

const fx = (f: string) => readFileSync(new URL(`./fixtures/docs/${f}`, import.meta.url), "utf8");

test("docText ignores the Docs banner and joins paragraphs", () => {
  assert.match(docText(fx("json-doc.html")), /^\{“MALES”/);
});

test("parseDocJson straightens smart quotes", () => {
  assert.deepEqual(parseDocJson(fx("json-doc.html")), { MALES: { CQ: { "Testlast1 Ada": 9.1 } }, FEMALES: {} });
});

test("parseDocJson reports invalid JSON clearly", () => {
  assert.throws(() => parseDocJson("<p>not json</p>"), /not valid JSON/);
});

test("parseDocScorecards reads pasted Sportdata HTML", () => {
  const cards = parseDocScorecards(fx("scorecard-doc.html"));
  assert.equal(cards.get(athleteKey("Testlast1 Ada"))?.finalScore, 9.01);
});
