/**
 * One-off: convert the legacy app's saved data into normalized snapshots
 * under data/snapshots/<slug>/. Safe to re-run; it overwrites the same files.
 *
 *   npx tsx scripts/import-legacy-snapshots.ts
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fromBowuu, fromJuniors2025Registration, fromLegacyAthleteData } from "../lib/data/legacy-format";
import { joinRegistrationScores } from "../lib/data/join";
import type { EventData } from "../lib/domain/types";
import { writeSnapshotIndex } from "./snapshot-index";

const L = (p: string) => JSON.parse(readFileSync(join(process.cwd(), "legacy/src/views", p), "utf8"));
const out = (slug: string, isoAsOf: string, data: EventData) => {
  const dir = join(process.cwd(), "data/snapshots", slug);
  mkdirSync(dir, { recursive: true });
  const file = `${isoAsOf.replace(/[:.]/g, "-")}.json`;
  writeFileSync(join(dir, file), `${JSON.stringify(data)}\n`);
  console.log(`${slug}/${file}: ${data.registrations.length} athletes, ${data.scores.length} entries`);
};

const asOf2024 = "2024-07-31T00:00:00.000Z";
out("2024-juniors", asOf2024, fromBowuu(L("2024team-trials/helpers/snapshot.json"), { source: "bowuu results (saved)", asOf: asOf2024 }));

const asOfAdults = "2025-08-04T16:02:48.343Z";
out("2025-adults", asOfAdults, fromLegacyAthleteData(L("sportdataComponents/utils/snapshots/tempadults2025-2025-08-04T16-02-48-343Z.json"), { source: "Sportdata (saved)", asOf: asOfAdults, division: "adult" }));

const asOfPhoenix = "2025-06-13T20:57:34.230Z";
out("2025-phoenix", asOfPhoenix, fromLegacyAthleteData(L("sportdataComponents/utils/snapshots/2025-phoenix-2025-06-13T20-57-34-230Z.json"), { source: "Sportdata (saved)", asOf: asOfPhoenix, division: "open" }));

const asOfJuniors = "2025-12-17T00:00:00.000Z";
const regs = fromJuniors2025Registration(L("2025-junior-team-trials/scripts/Juniors2025.json"));
out("2025-juniors", asOfJuniors, {
  registrations: regs,
  scores: joinRegistrationScores(regs, []),
  schedules: [],
  asOf: asOfJuniors,
  source: "Sportdata registration (saved, no scores)",
});

writeSnapshotIndex();
