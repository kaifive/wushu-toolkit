import { snapshotSource } from "@/lib/data/snapshot";
import type { EventConfig } from "@/lib/events/types";
import { SNAPSHOTS } from "@/data/snapshots";

export const PHOENIX_2025: EventConfig = {
  slug: "2025-phoenix",
  name: "2025 Phoenix Optional Taolu",
  shortName: "2025 Phoenix",
  dates: { start: "2025-06-01", end: "2025-06-30", approximate: true },
  location: "Phoenix, AZ",
  status: "archived",
  access: "free",
  rulesetId: "open-tournament",
  views: ["standings", "scorecards"],
  data: () => snapshotSource(SNAPSHOTS, "2025-phoenix"),
  description: "Optional taolu results with full scorecards.",
};
