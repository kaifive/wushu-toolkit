import { snapshotSource } from "@/lib/data/snapshot";
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
  views: ["standings", "team"],
  data: () => snapshotSource(SNAPSHOTS, "2024-juniors"),
  description: "Final results from the 2024 Junior Taolu Team Trials, scored by best barehand plus best weapon.",
  notes: ["Results come from the bowuu results feed, saved before the feed changed."],
};
