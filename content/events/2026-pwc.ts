import { SNAPSHOTS } from "@/data/snapshots";
import { liveWithSnapshot } from "@/lib/data/event-data";
import { snapshotSource } from "@/lib/data/snapshot";
import { joinRegistrationScores, registrationsFromScores } from "@/lib/data/join";
import { athletesFromRows, scoresFromRows } from "@/lib/data/parsers/sheet-scores";
import { parseScheduleRows } from "@/lib/data/parsers/schedule";
import { csvTab, gvizTab, type TabRef } from "@/lib/data/sheets";
import { source } from "@/lib/data/source";
import type { EventData } from "@/lib/domain/types";
import type { EventConfig } from "@/lib/events/types";

/** Live production sheet: schedule + scores, one tab per ring. */
const PROD_SHEET = "1QBaEYns9YHykZpj3UdUPftrGfnn1W8nwhbzS6IKyh-w";
/** Older copy that still carries Age (D) and the all-around opt-in (H). */
const REFERENCE_SHEET = "11kwXcCvledDdkZW6R_U4JvhWlXxTtJYeYU7OBEeRdXA";
const RINGS = [
  { gid: "205393319", name: "Ring 1" },
  { gid: "260479325", name: "Ring 2" },
  { gid: "0", name: "Ring 3" },
];
const tab = (sheetId: string, r: (typeof RINGS)[number]): TabRef => ({ sheetId, ...r });

function data() {
  return liveWithSnapshot(live(), snapshotSource(SNAPSHOTS, "2026-pwc"));
}

function live() {
  return source("Google Sheet (live)", async (ctx): Promise<EventData> => {
    const [prod, ref, schedules] = await Promise.all([
      Promise.all(RINGS.map(async (r) => scoresFromRows(await gvizTab(tab(PROD_SHEET, r)).load(ctx), { firstName: "B", lastName: "C", gender: "D", event: "F", score: "G" }, { ring: r.name }))),
      Promise.all(RINGS.map((r) => gvizTab(tab(REFERENCE_SHEET, r)).load(ctx))),
      Promise.all(
        RINGS.map(async (r) => ({
          ring: r.name,
          blocks: parseScheduleRows(await csvTab(tab(PROD_SHEET, r)).load(ctx), { time: 0, firstName: 1, lastName: 2, experience: 4, event: 5, score: 6 }),
        })),
      ),
    ]);
    const scores = prod.flat();
    const info = athletesFromRows(ref.flat(), { firstName: "B", lastName: "C", age: "D", flag: "H", flagValue: "Yes" });
    const registrations = registrationsFromScores(scores).map((r) => {
      const extra = info.get(r.athlete.id);
      return extra ? { ...r, athlete: { ...r.athlete, age: extra.age, tags: extra.flagged ? ["all-around"] : [] } } : r;
    });
    return { registrations, scores: joinRegistrationScores(registrations, scores), schedules, asOf: new Date().toISOString(), source: "Google Sheet (live)" };
  });
}

export const PWC_2026: EventConfig = {
  slug: "2026-pwc",
  name: "2026 Presidential Wushu Cup",
  shortName: "2026 PWC",
  dates: { start: "2026-06-26", end: "2026-06-28", approximate: true },
  status: "archived",
  access: "free",
  rulesetId: "pwc-2026",
  views: ["all-around", "schedule"],
  revalidate: 86400, // archived: the sheet is final; re-read daily until a snapshot exists
  data,
  description: "All-around standings (sum of each athlete's top three forms), age-group champions and live ring schedules.",
  highlights: [
    {
      name: "Nova Wushu",
      color: "#6f42c1",
      athletes: ["Aaron Yang", "Ryan Tran", "Benjamin Le", "Daniel Sinor", "Joshua Le", "Aivy Stone", "Elizabeth Le", "Arya Mohan", "Denisa Bento", "Nanette Hill", "Samson Turner"],
    },
  ],
  notes: ["Scores and schedules are read live from the organizer's Google Sheet."],
};
