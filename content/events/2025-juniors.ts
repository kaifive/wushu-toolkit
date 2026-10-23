import { liveWithSnapshot, withSchedule } from "@/lib/data/event-data";
import { snapshotSource } from "@/lib/data/snapshot";
import { source } from "@/lib/data/source";
import { usawkfOrder } from "@/lib/data/usawkf-order";
import { joinOfficial, usawkfResults } from "@/lib/data/usawkf-results";

import type { EventConfig } from "@/lib/events/types";
import { SNAPSHOTS } from "@/data/snapshots";

/** Order of competition, as v1 read it. */
const ORDER_PAGE = "https://usawkf.org/2025TT/JuniorTaoluOrder.php";

/** USAWKF's official results for these trials: final, corrected scores (data audit 2026-10-22). */
const RESULTS_PAGE = "https://usawkf.org/competition-results/?ID=139";

/**
 * The live sources, kept for reference and for re-saving by hand
 * (`npm run snapshot -- <slug>` after pointing `data` back here). The event is
 * final, so pages read the saved copy only: a change on the source's side
 * (as when USAWKF trimmed its results page in October 2026) can't affect it.
 */
export function liveData() {
  const snapshot = snapshotSource(SNAPSHOTS, "2025-juniors");
  const live = source("USAWKF official results + Sportdata registration", async (ctx) => {
    const [snap, rows] = await Promise.all([snapshot.load(ctx), usawkfResults(RESULTS_PAGE).load(ctx)]);
    return { ...snap, scores: joinOfficial(snap.registrations, rows), asOf: new Date().toISOString(), source: "USAWKF official results" };
  });
  // The schedule comes from its own page; if that page is down, the snapshot's copy is kept.
  return withSchedule(liveWithSnapshot(live, snapshot), usawkfOrder(ORDER_PAGE));
}

export const JUNIORS_2025: EventConfig = {
  slug: "2025-juniors",
  name: "2025–26 USAWKF National Junior Taolu Team Trials",
  shortName: "2025 Junior Trials",
  dates: { start: "2025-12-18", end: "2025-12-21" },
  location: "Bethesda North Marriott, Rockville, MD",
  timeZone: "America/New_York",
  organizer: "USAWKF",
  status: "archived",
  access: "free",
  rulesetId: "usawkf-junior-trials-2025-26",
  views: ["standings", "team", "athletes", "stats", "schedule"],
  revalidate: 3600,
  data: () => snapshotSource(SNAPSHOTS, "2025-juniors"),
  description:
    "Selection for the 10th World Junior Wushu Championships (Tianjin, March 2026). Team projections use the r15 regulations: best barehand plus best weapon in one discipline, with minimum averages.",
  links: [
    { label: "Official results", url: "https://usawkf.org/competition-results/?ID=139" },
    { label: "Regulations (r15)", url: "https://usawkf.org/wp-content/uploads/2025/10/2025-2026-USAWKF-National-Junior-Taolu-Team-Trials-Regulations_r15.pdf" },
  ],
  notes: ["Registration from Sportdata (verid 71). Scores from USAWKF's official results (the hand-kept Google Sheet had typos)."],
};
