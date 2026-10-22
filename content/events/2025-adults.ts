import { withSchedule } from "@/lib/data/event-data";
import { snapshotSource } from "@/lib/data/snapshot";
import { constant } from "@/lib/data/source";
import { orderSchedule } from "@/lib/domain/schedule";
import { ADULTS_2025_ORDER } from "./2025-adults-order";
import type { EventConfig } from "@/lib/events/types";
import { SNAPSHOTS } from "@/data/snapshots";

export const ADULTS_2025: EventConfig = {
  slug: "2025-adults",
  name: "2025 USAWKF Taolu Team Trials",
  shortName: "2025 Adult Trials",
  dates: { start: "2025-06-27", end: "2025-06-29", approximate: true },
  status: "archived",
  access: "free",
  rulesetId: "usawkf-adult-trials-2025",
  views: ["standings", "team", "athletes", "scorecards", "stats", "schedule"],
  // The snapshot has no schedule; add the posted order of competition (scores are filled in).
  data: () => withSchedule(snapshotSource(SNAPSHOTS, "2025-adults"), constant("posted order of competition", [orderSchedule("Order of Competition", ADULTS_2025_ORDER, [])])),
  description: "Adult team trials: category averages, with full difficulty required for the A team.",
  notes: ["Scores were scraped from Sportdata during the event and saved as a snapshot."],
};
