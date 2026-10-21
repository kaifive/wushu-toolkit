/**
 * Save an event's live data as a snapshot (ADR-008).
 *
 *   npm run snapshot -- 2026-pwc            one event
 *   npm run snapshot -- --scheduled         every event whose config has snapshot.until in the future
 *   add --force to save a scrape with fewer scored routines than the saved copy
 *
 * A snapshot is written only when the live source answered (not a stale
 * fallback) and the data changed since the newest saved file.
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { EVENT_CONFIGS } from "../content/events";
import { latestSnapshot, snapshotFileName, snapshotRegression } from "../lib/data/snapshot";
import type { EventData } from "../lib/domain/types";
import { writeSnapshotIndex } from "./snapshot-index";

const args = process.argv.slice(2);
const now = Date.now();
const targets = args.includes("--scheduled")
  ? EVENT_CONFIGS.filter((e) => e.snapshot && Date.parse(e.snapshot.until) > now)
  : EVENT_CONFIGS.filter((e) => args.includes(e.slug));

if (!targets.length) {
  console.log(args.includes("--scheduled") ? "No events scheduled for snapshots." : `Usage: npm run snapshot -- <slug>... | --scheduled`);
  process.exit(0);
}

/** Compare without the volatile timestamp. */
const fingerprint = (d: EventData) => JSON.stringify({ ...d, asOf: undefined, source: undefined, stale: undefined });

let failures = 0;
for (const event of targets) {
  try {
    // Live source only: the pages' snapshot fallback must not feed the snapshot back in.
    const data = await event.data().load({ liveOnly: true });
    if (data.stale) throw new Error("live source unavailable (got the saved copy)");
    const dir = join(process.cwd(), "data/snapshots", event.slug);
    mkdirSync(dir, { recursive: true });
    const last = latestSnapshot(existsSync(dir) ? readdirSync(dir) : []);
    const prev = last ? (JSON.parse(readFileSync(join(dir, last), "utf8")) as EventData) : null;
    if (prev && fingerprint(prev) === fingerprint(data)) {
      console.log(`${event.slug}: unchanged`);
      continue;
    }
    // Never let a broken source wipe the archive; --force overrides after a manual check.
    const regression = snapshotRegression(prev, data);
    if (regression && !args.includes("--force")) throw new Error(`not saved: ${regression} (rerun with --force if that's right)`);
    const file = snapshotFileName(new Date(data.asOf || now));
    writeFileSync(join(dir, file), `${JSON.stringify({ ...data, source: `${data.source} (saved)` })}\n`);
    console.log(`${event.slug}: saved ${file} (${data.scores.length} entries)`);
  } catch (err) {
    failures++;
    console.error(`${event.slug}: ${err instanceof Error ? err.message : err}`);
  }
}
writeSnapshotIndex();
// Any failure fails the run, so a source that keeps breaking gets noticed.
process.exit(failures ? 1 : 0);
