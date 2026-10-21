import { test } from "node:test";
import assert from "node:assert/strict";
import { findWatch, namesMatch, parseRoster, type WatchList } from "@/lib/watchlist/match";

test("matches across order, case, underscores and accents", () => {
  assert.ok(namesMatch("Abram Tang", "Tang Abram"));
  assert.ok(namesMatch("Abram Tang", "TANG ABRAM"));
  assert.ok(namesMatch("abram_tang", "Tang Abram"));
  assert.ok(namesMatch("Tang, Abram", "abram tang"));
  assert.ok(namesMatch("José Núñez", "NUNEZ JOSE"));
  assert.ok(namesMatch("Mary-Kate O'Neil", "oneil mary-kate"));
});

test("matches with a middle name on one side", () => {
  assert.ok(namesMatch("Rylee Fung", "Rylee Kate Fung"));
  assert.ok(namesMatch("Fung Rylee Kate", "rylee fung"));
});

test("matches split or joined given names", () => {
  assert.ok(namesMatch("LanHong Huang", "Huang Lan Hong"));
  assert.ok(namesMatch("Michiko Wu-Inouye", "Wu Inouye Michiko"));
});

test("does not over-match", () => {
  assert.equal(namesMatch("Ashton", "Ashton Yim"), false, "one-word entry");
  assert.equal(namesMatch("Ashton Yim", "Ashton Wu"), false);
  assert.equal(namesMatch("Joshua Le", "Benjamin Le"), false);
  assert.equal(namesMatch("Le Joshua", "Joshua Lee"), false);
  assert.equal(namesMatch("", "Ada"), false);
  assert.equal(namesMatch("Kim Lee", "Mike Le"), false, "anagram");
  assert.equal(namesMatch("Lee Lee", "Lee Wei"), false, "repeated word");
  assert.ok(namesMatch("Lee Lee", "LEE LEE"));
  assert.equal(namesMatch("Dana Ho", "Noah Ad"), false, "anagram");
});

test("findWatch uses the first enabled list", () => {
  const lists: WatchList[] = [
    { id: "a", name: "Off", color: "#000", athletes: ["Ada Chen"], enabled: false },
    { id: "b", name: "Nova", color: "#5856d6", athletes: ["Ada Chen"], enabled: true },
    { id: "c", name: "Other", color: "#d4371f", athletes: ["chen_ada"], enabled: true },
  ];
  assert.equal(findWatch(lists, "CHEN ADA")?.id, "b");
  assert.equal(findWatch(lists, "Ben Ortiz"), undefined);
});

test("parseRoster handles lines, commas and duplicates", () => {
  assert.deepEqual(parseRoster("Ada Chen\n  Ben  Ortiz \n\nchen ada"), ["Ada Chen", "Ben Ortiz"]);
  assert.deepEqual(parseRoster("Ada Chen, Ben Ortiz; Cy Lee"), ["Ada Chen", "Ben Ortiz", "Cy Lee"]);
  assert.deepEqual(parseRoster("Wu, Ashton"), ["Wu, Ashton"], "Last, First stays one name");
  assert.deepEqual(parseRoster("Wu, Ashton\nChen, Ada"), ["Wu, Ashton", "Chen, Ada"]);
});

import { buildAthleteIndex, suggestAthletes } from "@/lib/watchlist/suggest";
import type { EventData } from "@/lib/domain/types";

const ev = (label: string, rows: [string, string?][]): { label: string; data: EventData } => ({
  label,
  data: {
    registrations: rows.map(([name, club]) => ({ athlete: { id: name.toLowerCase(), name, club }, entries: [] })),
    scores: [],
    schedules: [],
    asOf: "",
    source: "",
  },
});

const index = buildAthleteIndex([
  ev("2024 Juniors", [["Abram Tang", "Elite Kung Fu"], ["Ada Chen", "Elite Kung Fu"], ["Solo", "X"]]),
  ev("2025 Juniors", [["TANG ABRAM", "Elite Kung Fu"], ["Ben Ortiz", "Individual"], ["Cy Lee", "Nova Wushu"]]),
]);

test("index merges spellings across events and prefers mixed case", () => {
  const tang = index.athletes.find((a) => a.name === "Abram Tang");
  assert.ok(tang);
  assert.deepEqual(tang.events, ["2024 Juniors", "2025 Juniors"]);
  assert.equal(index.athletes.length, 4, "one-word names are skipped");
});

test("suggestAthletes matches word prefixes in any order and skips listed athletes", () => {
  assert.deepEqual(suggestAthletes(index, "tan ab").map((a) => a.name), ["Abram Tang"]);
  assert.deepEqual(suggestAthletes(index, "a"), [], "one letter is too little");
  assert.deepEqual(suggestAthletes(index, "ada").map((a) => a.name), ["Ada Chen"]);
  assert.deepEqual(suggestAthletes(index, "ada", ["chen_ada"]), []);
});

test("names with Đ, ø and non-Latin scripts", () => {
  assert.ok(namesMatch("Nguyễn Đức", "Duc Nguyen"));
  assert.ok(namesMatch("Søren Berg", "Soren Berg"));
  assert.deepEqual(parseRoster("王小明\nAda Chen"), ["王小明", "Ada Chen"]);
});
