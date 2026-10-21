import { test } from "node:test";
import assert from "node:assert/strict";
import { blocks, fromText, generateOrder, people, problems, reconcile, toText, wouldCycle, type Act, type Level } from "@/lib/demo/order";

const act = (id: string, level: Level, performers: string[], extra: Partial<Act> = {}): Act => ({ id, kind: "group", name: id, level, performers, ...extra });

/** A school demo: overlapping kids across groups, plus solos. */
function school(): Act[] {
  return [
    act("tiny-tigers", 1, ["Amy Lee", "Ben Ho", "Cara Wu"]),
    act("beginner-fan", 2, ["Amy Lee", "Dan Ng"]),
    act("beginner-staff", 2, ["Ben Ho", "Eve Lam"]),
    act("int-broadsword", 3, ["Cara Wu", "Finn Do"]),
    act("int-spear", 3, ["Dan Ng", "Gia Vo"]),
    act("adv-changquan", 4, ["Finn Do", "Hana Ly"]),
    act("adv-weapons", 5, ["Gia Vo", "Ivan Tu"]),
    { ...act("solo-hana", 5, ["Hana Ly"]), kind: "solo", name: "Jianshu" },
    { ...act("solo-ivan", 4, ["Ivan Tu"]), kind: "solo", name: "Nanquan" },
    act("lion-dance", 4, ["Jon Ma", "Kai Ma"]),
  ];
}

test("generated order uses every act once and avoids back-to-back performers", () => {
  const acts = school();
  for (const seed of [1, 2, 3, 42]) {
    const order = generateOrder(acts, seed);
    assert.deepEqual([...order].sort(), acts.map((a) => a.id).sort());
    assert.deepEqual(problems(acts, order), [], `seed ${seed}`);
  }
});

test("opens strong, closes with the strongest, and doesn't bunch the beginners", () => {
  const acts = school();
  const byId = new Map(acts.map((a) => [a.id, a]));
  const levels = generateOrder(acts, 7).map((id) => byId.get(id)!.level);
  assert.ok(levels[0]! >= 4, `opener ${levels[0]}`);
  assert.equal(levels[levels.length - 1], 5);
  for (let i = 0; i + 2 < levels.length; i++) assert.ok(!levels.slice(i, i + 3).every((l) => l <= 2), `low run at ${i}`);
});

test("different seeds give different orders", () => {
  const acts = school();
  const seen = new Set([1, 2, 3, 4, 5].map((s) => generateOrder(acts, s).join()));
  assert.ok(seen.size > 1);
});

test("pins and links are kept", () => {
  const acts = school().map((a) =>
    a.id === "tiny-tigers" ? { ...a, pin: "first" as const } : a.id === "lion-dance" ? { ...a, pin: "last" as const } : a.id === "int-spear" ? { ...a, follows: "beginner-staff" } : a.id === "adv-changquan" ? { ...a, pin: 5 } : a,
  );
  for (const seed of [1, 9, 23]) {
    const order = generateOrder(acts, seed);
    assert.equal(order[0], "tiny-tigers");
    assert.equal(order[order.length - 1], "lion-dance");
    assert.equal(order.indexOf("int-spear"), order.indexOf("beginner-staff") + 1);
    assert.equal(order[4], "adv-changquan");
    assert.deepEqual(problems(acts, order).filter((p) => p.kind === "pin"), []);
  }
});

test("unavoidable back-to-back is reported, not hidden", () => {
  const acts = [act("a", 3, ["Amy Lee"]), act("b", 3, ["Amy Lee"])];
  const order = generateOrder(acts, 1);
  const p = problems(acts, order);
  assert.equal(p.length, 1);
  assert.match(p[0]!.message, /Amy Lee is in #1 and #2/);
});

test("names match across spelling and case", () => {
  const acts = [act("a", 3, ["Amy Lee"]), act("b", 3, ["LEE, Amy"]), act("c", 3, ["Zed Q"])];
  assert.deepEqual(problems(acts, ["a", "b", "c"]).map((p) => p.kind), ["back-to-back"]);
  assert.equal(people(acts).length, 2);
});

test("a broken link is reported", () => {
  const acts = [act("a", 1, []), act("b", 1, [], { follows: "a" }), act("c", 1, [])];
  assert.deepEqual(problems(acts, ["a", "b", "c"]), []);
  assert.deepEqual(problems(acts, ["b", "a", "c"]).map((p) => p.kind), ["link"]);
});

test("blocks join linked acts and survive cycles", () => {
  const acts = [act("a", 1, []), act("b", 1, [], { follows: "a" }), act("c", 1, [], { follows: "b" }), act("d", 1, [])];
  assert.deepEqual(blocks(acts), [["a", "b", "c"], ["d"]]);
  assert.equal(wouldCycle(acts, "a", "c"), true);
  assert.equal(wouldCycle(acts, "d", "c"), false);
  const loop = [act("x", 1, [], { follows: "y" }), act("y", 1, [], { follows: "x" })];
  assert.equal(blocks(loop).flat().length, 2);
});

test("text export round-trips through import", () => {
  const acts = [
    act("fan", 2, ["Amy Lee", "Dan Ng"], { name: "Beginner Fan", pin: "first" }),
    { ...act("solo", 4, ["Amy Lee"]), kind: "solo" as const, name: "Jianshu", follows: "fan" },
    { ...act("solo2", 3, ["Bob Tran"]), kind: "solo" as const, name: "", pin: 3 },
    act("lion", 5, [], { name: "Lion Dance", pin: "last" }),
  ];
  const text = toText({ acts, order: ["fan", "solo", "solo2", "lion"] });
  assert.equal(
    text,
    ["1. Beginner Fan (L2) — Amy Lee, Dan Ng [first]", "2. Solo: Jianshu (L4) — Amy Lee [with previous]", "3. Solo (L3) — Bob Tran [pinned #3]", "4. Lion Dance (L5) [last]"].join("\n"),
  );
  let n = 0;
  const { demo, skipped } = fromText(`${text}\nnot an act`, () => `id${n++}`);
  assert.deepEqual(skipped, ["not an act"]);
  assert.equal(toText(demo), text);
  assert.equal(demo.acts[1]!.follows, "id0");
});

test("reconcile keeps order, appends new acts and drops removed ones", () => {
  const acts = [act("a", 1, []), act("b", 1, []), act("c", 1, [])];
  assert.deepEqual(reconcile({ acts, order: ["c", "gone", "a", "c"] }), ["c", "a", "b"]);
});

test("a group named 'Solo …' stays a group through copy and import", () => {
  const acts = [act("g", 3, ["Amy Lee", "Ben Ho"], { name: "Solo Stars" }), { ...act("s", 4, ["Amy Lee"]), kind: "solo" as const, name: "" }];
  let n = 0;
  const { demo } = fromText(toText({ acts, order: ["g", "s"] }), () => `id${n++}`);
  assert.deepEqual(demo.acts.map((a) => [a.kind, a.name]), [["group", "Solo Stars"], ["solo", ""]]);
});

test("athletes without acts survive copy and import", () => {
  let n = 0;
  const text = toText({ acts: [act("g", 3, ["Ben Ho"], { name: "Fan" })], order: ["g"] }, ["Amy Lee", "Cy Do"]);
  assert.match(text, /\nAlso in the demo: Amy Lee, Cy Do$/);
  const r = fromText(text, () => `id${n++}`);
  assert.deepEqual(r.roster, ["Amy Lee", "Cy Do"]);
  assert.equal(r.demo.acts.length, 1);
  assert.deepEqual(r.skipped, []);
});

test("copy/import keeps unmet pins and links and names with commas", () => {
  const acts = [
    act("a", 3, ["Wu, Ashton", "Bob Tran"], { name: "Fan" }),
    act("b", 3, ["Cy Do"], { name: "Staff", pin: 1 }),
    act("c", 2, ["Dee Ng"], { name: "Spear", follows: "a" }),
  ];
  const text = toText({ acts, order: ["a", "b", "c"] });
  assert.match(text, /Fan \(L3\) — Wu, Ashton; Bob Tran/);
  assert.match(text, /Staff \(L3\) — Cy Do \[pinned #1\]/);
  assert.match(text, /Spear \(L2\) — Dee Ng \[after #1\]/);
  let n = 0;
  const { demo } = fromText(text, () => `id${n++}`);
  assert.deepEqual(demo.acts[0]!.performers, ["Wu, Ashton", "Bob Tran"]);
  assert.equal(demo.acts[1]!.pin, 1);
  assert.equal(demo.acts[2]!.follows, demo.acts[0]!.id);
});

test("import: 'after #N' follows the printed number; a group named Solo stays a group", () => {
  let n = 0;
  const text = ["3. Spear (L2) — Dee Ng [after #1]", "1. Fan (L3) — Amy Lee", "2. Group: Solo (L3) — Bo Ho, Cy Do"].join("\n");
  const { demo } = fromText(text, () => `id${n++}`);
  assert.equal(demo.acts[0]!.follows, demo.acts[1]!.id);
  assert.deepEqual([demo.acts[2]!.kind, demo.acts[2]!.name], ["group", "Solo"]);
  assert.match(toText({ acts: [act("g", 3, ["Bo Ho"], { name: "Solo" })], order: ["g"] }), /^1\. Group: Solo \(L3\)/);
});

test("demo treats O'Brien and OBrien as one person; 'Group: Seniors' survives", () => {
  const acts = [act("a", 3, ["Liam O'Brien"]), act("b", 3, ["Liam OBrien"])];
  assert.deepEqual(problems(acts, ["a", "b"]).map((p) => p.kind), ["back-to-back"]);
  let n = 0;
  const text = toText({ acts: [act("g", 3, ["Bo Ho"], { name: "Group: Seniors" })], order: ["g"] });
  assert.equal(fromText(text, () => `id${n++}`).demo.acts[0]!.name, "Group: Seniors");
});
