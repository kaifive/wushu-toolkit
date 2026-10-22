import { withSchedule } from "@/lib/data/event-data";
import { snapshotSource } from "@/lib/data/snapshot";
import { constant } from "@/lib/data/source";
import type { Schedule } from "@/lib/domain/types";
import SCHEDULE from "@/data/schedules/2024-juniors.json";
import type { EventConfig } from "@/lib/events/types";
import { SNAPSHOTS } from "@/data/snapshots";

export const JUNIORS_2024: EventConfig = {
  slug: "2024-juniors",
  name: "2024 USAWKF Junior Taolu Team Trials",
  shortName: "2024 Junior Trials",
  dates: { start: "2024-07-01", end: "2024-07-31", approximate: true },
  status: "archived",
  access: "free",
  rulesetId: "usawkf-junior-trials-2024",
  views: ["standings", "team", "stats", "schedule"],
  // Ring schedules saved from the bowuu feed v1 read (rings 8 and 9, Sunday and Monday).
  data: () => withSchedule(snapshotSource(SNAPSHOTS, "2024-juniors"), constant("bowuu ring schedules (saved)", SCHEDULE as Schedule[])),
  description: "Final results from the 2024 Junior Taolu Team Trials, scored by best barehand plus best weapon.",
  notes: ["Results come from the bowuu results feed, saved before the feed changed."],
};
