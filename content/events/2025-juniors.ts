import { liveWithSnapshot } from "@/lib/data/event-data";
import { joinRegistrationScores } from "@/lib/data/join";
import { scoresFromRows } from "@/lib/data/parsers/sheet-scores";
import { csvToLetterRows, publishedCsv } from "@/lib/data/sheets";
import { snapshotSource } from "@/lib/data/snapshot";
import { source } from "@/lib/data/source";
import { usawkfOrder } from "@/lib/data/usawkf-order";
import type { EventConfig } from "@/lib/events/types";
import { SNAPSHOTS } from "@/data/snapshots";

/** Order of competition, as v1 read it. */
const ORDER_PAGE = "https://usawkf.org/2025TT/JuniorTaoluOrder.php";

/** Score sheet the 2025 trials were tracked in by hand (published CSV). */
const SCORE_SHEET =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQ2zsg_hgZjMkoUJCGWIa6BsTlP9j6x61k68b-7ZuXHDWIBe5_UBVNdtRgxOEhh9545XMXfvNxi7Oo/pub?gid=563998125&single=true&output=csv";

function data() {
  const snapshot = snapshotSource(SNAPSHOTS, "2025-juniors");
  const live = source("Google Sheet (manual tracking) + Sportdata registration", async (ctx) => {
    const [snap, rows, order] = await Promise.all([
      snapshot.load(ctx),
      publishedCsv(SCORE_SHEET).load(ctx),
      // The schedule is extra: keep the saved one if the page is down.
      usawkfOrder(ORDER_PAGE).load(ctx).catch(() => null),
    ]);
    const scores = scoresFromRows(csvToLetterRows(rows, 1), { name: "A", event: "B", score: "C" }, { eventPrefix: "Taolu" });
    return { ...snap, schedules: order?.length ? order : snap.schedules, scores: joinRegistrationScores(snap.registrations, scores), asOf: new Date().toISOString(), source: "Google Sheet (manual tracking)" };
  });
  return liveWithSnapshot(live, snapshot);
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
  views: ["standings", "team", "schedule"],
  revalidate: 3600,
  data,
  // Keep snapshotting until the live sheet has been saved; the archive must not depend on it.
  snapshot: { until: "2026-12-31" },
  description:
    "Selection for the 10th World Junior Wushu Championships (Tianjin, March 2026). Team projections use the r15 regulations: best barehand plus best weapon in one discipline, with minimum averages.",
  links: [
    { label: "Regulations (r15)", url: "https://usawkf.org/wp-content/uploads/2025/10/2025-2026-USAWKF-National-Junior-Taolu-Team-Trials-Regulations_r15.pdf" },
  ],
  notes: ["Registration from Sportdata (verid 71). Scores were tracked by hand in a Google Sheet."],
};
