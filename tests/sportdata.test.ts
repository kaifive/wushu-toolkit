import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  clubFromCell, joinScores, mergeRegistrations, parseCategories, parseRegistration, parseScorecards,
  parseWaitingList, sportdataScores, sportdataUrls,
} from "@/lib/data/sportdata";
import { athleteKey } from "@/lib/domain/names";

const fx = (f: string) => readFileSync(new URL(`./fixtures/sportdata/${f}`, import.meta.url), "utf8");

test("clubFromCell", () => {
  assert.equal(clubFromCell("Abram Tang(Tang)"), "Abram Tang");
  assert.equal(clubFromCell("        Academy(Academy), UNITED STATES (USA)"), "Academy");
  assert.equal(clubFromCell(""), undefined);
});

test("parseRegistration groups entries per athlete and filters by event", () => {
  const all = parseRegistration(fx("registration.html"));
  const taolu = parseRegistration(fx("registration.html"), "Taolu");
  assert.ok(all.length >= taolu.length);
  assert.ok(taolu.length > 5);
  for (const r of taolu) for (const e of r.entries) assert.match(e.raw, /Taolu/);
  const first = taolu[0]!;
  assert.equal(first.athlete.name, "Testlast1 Ada");
  assert.equal(first.athlete.club, "Club A0");
  assert.deepEqual(first.entries.map((e) => e.code), ["CQ", "DS", "GS"].slice(0, first.entries.length));
  assert.equal(first.athlete.gender, "male");
  const codes = new Set(taolu.flatMap((r) => r.entries.map((e) => e.code)));
  assert.ok(!codes.has(undefined), "every taolu entry resolves to an event code");
});

test("parseWaitingList skips Sum rows and marks entries waitlisted", () => {
  const wl = parseWaitingList(fx("waiting-list.html"));
  assert.ok(wl.length >= 2);
  assert.ok(wl.every((r) => r.entries.every((e) => e.waitlisted)));
  assert.ok(wl.every((r) => r.athlete.name !== "Sum"));
  assert.equal(wl[0]?.athlete.club, "Club A0");
});

test("parseCategories maps event names to catids", () => {
  assert.deepEqual(parseCategories(fx("categories.html"), "Taolu"), {
    "Taolu Junior Male 1st Set Daoshu": "9001",
    "Taolu Junior Male 1st Set Changquan": "9002",
  });
});

test("parseScorecards reads panels A/B/C, struck marks and adjustments", () => {
  const cards = parseScorecards(fx("scorecard.html"));
  assert.equal(cards.size, 3);
  const ada = cards.get(athleteKey("Testlast1 Ada"))!;
  assert.equal(ada.name, "Testlast1 Ada");
  assert.equal(ada.club, "CLUB A ACADEMY,USA");
  assert.equal(ada.finalScore, 8.83);
  assert.deepEqual(ada.scorecard.a, { score: 4.8, deductions: ["30", "22"] });
  assert.deepEqual(ada.scorecard.b?.marks, [2.22, 2.4, 2.31, 2.35, 2.2]);
  assert.deepEqual(ada.scorecard.b?.counted, [true, false, true, true, false]);
  assert.equal(ada.scorecard.b?.score, 2.33);
  assert.deepEqual(ada.scorecard.c?.made, [true, true, false, true]);
  assert.equal(ada.scorecard.adjustment, -0.1);
  const ben = cards.get(athleteKey("testlast2 ben"))!;
  assert.deepEqual(ben.scorecard.a, { score: 4.5, deductions: [] }, "no deductions does not shift the score");
  assert.equal(cards.get(athleteKey("testlast3 cy"))?.finalScore, null);
});

test("joinScores keeps unscored entries and attaches scorecards", () => {
  const regs = mergeRegistrations([
    { athlete: { id: athleteKey("Testlast1 Ada"), name: "Testlast1 Ada" }, entries: [{ raw: "Taolu Junior Male 1st Set Daoshu", code: "DS" }] },
    { athlete: { id: athleteKey("Testlast1 Ada"), name: "Testlast1 Ada" }, entries: [{ raw: "Taolu Junior Male 1st Set Changquan", code: "CQ" }] },
  ]);
  assert.equal(regs.length, 1);
  const scores = joinScores(regs, new Map([["Taolu Junior Male 1st Set Daoshu", parseScorecards(fx("scorecard.html"))]]));
  assert.deepEqual(scores.map((s) => [s.code, s.finalScore]), [["DS", 8.83], ["CQ", null]]);
});

test("sportdataScores fetches registration, categories and each scorecard", async () => {
  const seen: string[] = [];
  const fakeFetch = (async (url: string) => {
    const u = String(url);
    seen.push(u);
    if (u === sportdataUrls.registration(71)) return new Response(fx("registration.html"));
    if (u === sportdataUrls.categories(71)) return new Response(fx("categories.html"));
    if (u.includes("catid=")) return new Response(fx("scorecard.html"));
    return new Response("not found", { status: 404 });
  }) as typeof fetch;
  const scores = await sportdataScores({ verid: 71, filter: "Taolu" }).load({ fetch: fakeFetch });
  assert.ok(scores.length > 10);
  assert.equal(seen.filter((u) => u.includes("catid=")).length, 2);
});

test("joinScores leaves waitlisted entries out", () => {
  const regs = [{ athlete: { id: "a", name: "Amy Lee" }, entries: [{ raw: "CQ", code: "CQ" as const }, { raw: "DS", code: "DS" as const, waitlisted: true }] }];
  assert.deepEqual(joinScores(regs, new Map()).map((s) => s.raw), ["CQ"]);
});

test("joinRegistrationScores keeps the scored copy of a duplicated row", async () => {
  const { joinRegistrationScores, registrationsFromScores } = await import("@/lib/data/join");
  const row = { athleteId: "amy lee", athleteName: "Amy Lee", raw: "CQ", code: "CQ" as const };
  const scores = [{ ...row, finalScore: 8.9 }, { ...row, finalScore: null }];
  const joined = joinRegistrationScores(registrationsFromScores(scores), scores);
  assert.ok(joined.every((s) => s.finalScore === 8.9));
});
