import { test } from "node:test";
import assert from "node:assert/strict";
import { EVENT_CONFIGS } from "@/content/events";
import { joinRegistrationScores, registrationsFromScores } from "@/lib/data/join";
import { fromJuniors2025Registration, fromLegacyAthleteData } from "@/lib/data/legacy-format";
import { allEvents, formatEventDates, getEvent, requiresEntitlement } from "@/lib/events/registry";
import { RULESETS } from "@/lib/rules";

test("event slugs are unique, url-safe, and point at real rulesets", () => {
  const slugs = EVENT_CONFIGS.map((e) => e.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const e of EVENT_CONFIGS) {
    assert.match(e.slug, /^[a-z0-9-]+$/);
    assert.ok(RULESETS[e.rulesetId], e.slug);
    assert.ok(e.views.length > 0);
  }
});

test("the five archived events are present and free", () => {
  for (const slug of ["2024-juniors", "2025-adults", "2025-phoenix", "2025-juniors", "2026-pwc"]) {
    const e = getEvent(slug);
    assert.ok(e, slug);
    assert.equal(e.status, "archived");
    assert.equal(requiresEntitlement(e), false);
  }
  assert.equal(allEvents()[0]?.slug, "2026-pwc");
});

test("archived snapshot events load", async () => {
  for (const slug of ["2024-juniors", "2025-adults", "2025-phoenix"]) {
    const d = await getEvent(slug)!.data().load();
    assert.ok(d.scores.length > 10, slug);
    assert.ok(d.scores.some((s) => s.finalScore !== null), slug);
  }
});

test("archived events are free even if marked paid", () => {
  assert.equal(requiresEntitlement({ ...getEvent("2025-adults")!, access: "paid" }), false);
  assert.equal(requiresEntitlement({ ...getEvent("2025-adults")!, access: "paid", status: "live" }), true);
});

test("formatEventDates", () => {
  assert.equal(formatEventDates(getEvent("2025-juniors")!), "Dec 18–21, 2025");
  assert.equal(formatEventDates(getEvent("2025-adults")!), "June 2025");
});

test("joinRegistrationScores matches by athlete and event, ignoring name order and case", () => {
  const regs = fromJuniors2025Registration({
    x: { athleteName: "Chen Ada", ageGroup: "B", gender: "Female", events: { CQ: { eventInfo: "Taolu Junior Female 1st Set Changquan" }, JS: { eventInfo: "Taolu Junior Female 1st Set Jianshu" } } },
  });
  const joined = joinRegistrationScores(regs, [
    { athleteId: "ada chen", athleteName: "ada chen", raw: "taolu junior female 1st set changquan", finalScore: 9.05 },
  ]);
  assert.deepEqual(joined.map((s) => [s.code, s.finalScore, s.division, s.gender]), [["CQ", 9.05, "B", "female"], ["JS", null, "B", "female"]]);
});

test("fromLegacyAthleteData dedupes Changquan copied into two categories", () => {
  const ev = { event: "Male Optional Changquan", finalScore: "9.1", C: { score: "2", counts: ["1"], isNotMissed: [true] } };
  const d = fromLegacyAthleteData(
    {
      MALES: { CQ_DS_GS: { "Meng Stanley": { competitor: { name: "MENG STANLEY" }, events: [ev] } }, CQ_JS_QS: { "Meng Stanley": { competitor: { name: "Meng Stanley" }, events: [ev] } } },
      FEMALES: {},
    },
    { source: "t", asOf: "2025-01-01T00:00:00Z" },
  );
  assert.equal(d.scores.length, 1);
  assert.equal(d.scores[0]?.athleteName, "Meng Stanley");
  assert.equal(d.scores[0]?.scorecard?.c?.score, 2);
  assert.equal(registrationsFromScores(d.scores).length, 1);
});
