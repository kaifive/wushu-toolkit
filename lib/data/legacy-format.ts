import { athleteKey, clean, eventCodeFromName, genderFromText, titleCaseName, toNumber } from "@/lib/domain/names";
import type { EventData, Gender, Registration, ScoreEntry, Scorecard } from "@/lib/domain/types";
import { mapBowuu, type BowuuResults } from "./api";
import { registrationsFromScores } from "./join";

/**
 * Converters from the legacy app's saved formats into EventData, used once by
 * scripts/import-legacy-snapshots.ts to build the archived snapshots.
 */

interface LegacyEvent {
  event: string;
  nandu?: string[];
  A?: { score?: string; deductions?: string[] };
  B?: { score?: string; scores?: string[]; isNotDropped?: boolean[] };
  C?: { score?: string; counts?: string[]; isNotMissed?: boolean[] };
  adjustment?: string;
  finalScore?: string;
  schoolName?: string;
}
type LegacyAthleteData = Record<"MALES" | "FEMALES", Record<string, Record<string, { competitor: { name: string }; events: LegacyEvent[] }>>>;

function scorecardOf(e: LegacyEvent): Scorecard | undefined {
  if (!e.A && !e.B && !e.C) return undefined;
  return {
    a: e.A ? { score: toNumber(e.A.score), deductions: (e.A.deductions ?? []).map(clean).filter(Boolean) } : undefined,
    b: e.B ? { score: toNumber(e.B.score), marks: (e.B.scores ?? []).map((m) => toNumber(m) ?? 0), counted: e.B.isNotDropped ?? [] } : undefined,
    c: e.C ? { score: toNumber(e.C.score), elements: e.C.counts ?? [], made: e.C.isNotMissed ?? [] } : undefined,
    adjustment: toNumber(e.adjustment) ?? undefined,
  };
}

/** Legacy getData()/snapshot shape: { MALES: { CQ_DS_GS: { name: { competitor, events } } } }. */
export function fromLegacyAthleteData(json: LegacyAthleteData, meta: { source: string; asOf: string; division?: string }): EventData {
  const seen = new Map<string, ScoreEntry>();
  for (const [g, cats] of Object.entries(json) as [keyof LegacyAthleteData, LegacyAthleteData["MALES"]][]) {
    const gender: Gender = g === "MALES" ? "male" : "female";
    for (const athletes of Object.values(cats)) {
      for (const reg of Object.values(athletes)) {
        const name = titleCaseName(reg.competitor.name);
        const id = athleteKey(name);
        for (const ev of reg.events) {
          const key = `${id}|${ev.event}`;
          if (seen.has(key)) continue;
          seen.set(key, {
            athleteId: id,
            athleteName: name,
            club: clean(ev.schoolName) || undefined,
            raw: clean(ev.event),
            code: eventCodeFromName(ev.event),
            gender,
            division: meta.division,
            finalScore: toNumber(ev.finalScore),
            scorecard: scorecardOf(ev),
            nandu: ev.nandu?.length ? ev.nandu : undefined,
          });
        }
      }
    }
  }
  const scores = [...seen.values()];
  return { registrations: registrationsFromScores(scores), scores, schedules: [], asOf: meta.asOf, source: meta.source };
}

/** 2025 Junior Trials registration file (legacy Juniors2025.json). */
export function fromJuniors2025Registration(
  json: Record<string, { athleteName: string; ageGroup: string; gender: string; events: Record<string, { eventInfo: string }> }>,
): Registration[] {
  const m = new Map<string, Registration>();
  for (const r of Object.values(json)) {
    const name = clean(r.athleteName);
    const id = athleteKey(name);
    const gender = genderFromText(r.gender);
    const reg = m.get(id) ?? { athlete: { id, name, gender, division: r.ageGroup || undefined }, entries: [] };
    for (const e of Object.values(r.events)) {
      reg.entries.push({ raw: clean(e.eventInfo), code: eventCodeFromName(e.eventInfo), gender, division: r.ageGroup || undefined });
    }
    m.set(id, reg);
  }
  return [...m.values()];
}

/** 2024 bowuu results snapshot. */
export function fromBowuu(json: BowuuResults, meta: { source: string; asOf: string }): EventData {
  const scores = mapBowuu(json);
  return { registrations: registrationsFromScores(scores), scores, schedules: [], asOf: meta.asOf, source: meta.source };
}
