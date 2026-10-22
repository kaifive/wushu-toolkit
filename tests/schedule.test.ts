import { test } from "node:test";
import assert from "node:assert/strict";

test("orderSchedule matches scores across name spellings", async () => {
  const { orderSchedule } = await import("@/lib/domain/schedule");
  const s = orderSchedule("Order", [{ event: "CQ", athletes: ["Yim Ashton", "Nobody Here"] }], [
    { athleteId: "a", athleteName: "Ashton Yim", raw: "CQ", finalScore: 9.4 },
  ]);
  const b = s.blocks[0]!;
  assert.equal(b.type, "session");
  if (b.type === "session") {
    assert.equal(b.title, "CQ");
    assert.deepEqual(b.entries.map((e) => [e.athleteName, e.score]), [["Ashton Yim", "9.400"], ["Nobody Here", undefined]]);
  }
});

test("orderSchedule falls back to a unique partial name", async () => {
  const { orderSchedule } = await import("@/lib/domain/schedule");
  const s = orderSchedule("Order", [{ event: "GS", athletes: ["Yang Chien-Mu"] }], [
    { athleteId: "a", athleteName: "Yang Chien", raw: "GS", finalScore: 9.3 },
    { athleteId: "b", athleteName: "Yang Aaron", raw: "GS", finalScore: 9.1 },
  ]);
  const b = s.blocks[0]!;
  assert.equal(b.type === "session" && b.entries[0]!.athleteName, "Yang Chien");
});
