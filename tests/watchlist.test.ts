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
});
