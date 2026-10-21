import { test } from "node:test";
import assert from "node:assert/strict";
import { athleteKey, eventCodeFromName, genderFromText, titleCaseName, toNumber } from "@/lib/domain/names";

test("athleteKey ignores order, case, underscores and accents", () => {
  assert.equal(athleteKey("Tang Abram"), athleteKey("abram_tang"));
  assert.equal(athleteKey("MENG  STANLEY"), "meng stanley");
  assert.equal(athleteKey("José Núñez"), athleteKey("nunez jose"));
});

test("eventCodeFromName handles sportdata, sheet and bowuu names", () => {
  assert.equal(eventCodeFromName("Taolu Junior Male 1st Set Changquan"), "CQ");
  assert.equal(eventCodeFromName("Taolu Youth Female 3rd Set Taijijian"), "TJ");
  assert.equal(eventCodeFromName("Taolu Youth Male 3rd Set Taijishan"), "TS");
  assert.equal(eventCodeFromName("Male Optional Nandao"), "ND");
  assert.equal(eventCodeFromName("Men´s Daoshu"), "DS");
  assert.equal(eventCodeFromName("Elementary Long Fist (IWuF)"), "CQ");
  assert.equal(eventCodeFromName("Sanda Adult Male 60kg"), undefined);
});

test("genderFromText checks female before male", () => {
  assert.equal(genderFromText("Taolu Junior Female 1st Set Changquan"), "female");
  assert.equal(genderFromText("Male Optional Daoshu"), "male");
  assert.equal(genderFromText("Men´s Changquan"), "male");
  assert.equal(genderFromText("Women's Nanquan"), "female");
  assert.equal(genderFromText("F"), "female");
  assert.equal(genderFromText(""), undefined);
});

test("titleCaseName and toNumber", () => {
  assert.equal(titleCaseName("MENG STANLEY"), "Meng Stanley");
  assert.equal(titleCaseName("Mary-Kate O'Neil"), "Mary-Kate O'Neil");
  assert.equal(toNumber("9.266"), 9.266);
  assert.equal(toNumber(""), null);
  assert.equal(toNumber("DNS"), null);
  assert.equal(toNumber("9.266*"), 9.266);
  assert.equal(toNumber("8.95 (2)"), null);
  assert.equal(toNumber("1:30"), null);
});

test("eventCodeFromName handles 2024 bowuu names with spaces", () => {
  assert.equal(eventCodeFromName("Elementary Broad Sword (IWuF)"), "DS");
  assert.equal(eventCodeFromName("3rd Set Southern Broad Sword (IWuF)"), "ND");
  assert.equal(eventCodeFromName("Compulsory Southern Broadsword  (IWuF)"), "ND");
  assert.equal(eventCodeFromName("1st Set Straight Sword (IWuf)"), "JS");
  assert.equal(eventCodeFromName("3rd Set Southern Staff (IWuF)"), "NG");
  assert.equal(eventCodeFromName("Elementary Staff (IWuF)"), "GS");
  assert.equal(eventCodeFromName("32 Movements Taijijian "), "TJ");
  assert.equal(eventCodeFromName("3rd Set Taijishan (IWuF)"), "TS");
});

test("eventCodeFromName reads English taiji names", () => {
  assert.equal(eventCodeFromName("Female 42 Taiji Sword"), "TJ");
  assert.equal(eventCodeFromName("Tai Chi Straight Sword"), "TJ");
  assert.equal(eventCodeFromName("Taiji Fan"), "TS");
  assert.equal(eventCodeFromName("Tai Chi 24 Form"), "TQ");
  assert.equal(eventCodeFromName("Taijijian"), "TJ");
});
