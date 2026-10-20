import { athleteKey, clean, eventCodeFromName, genderFromText, toNumber } from "@/lib/domain/names";
import type { ScoreEntry } from "@/lib/domain/types";
import { fetchText, source, SourceError, type DataSource } from "./source";

/** Generic JSON API source with a mapper to domain types. */
export function jsonApi<Raw, T>(url: string, mapper: (raw: Raw) => T, label = new URL(url).host): DataSource<T> {
  return source(label, async (ctx) => {
    const body = await fetchText(url, ctx, { headers: { accept: "application/json" } });
    let raw: Raw;
    try {
      raw = JSON.parse(body) as Raw;
    } catch {
      throw new SourceError(`${label} did not return JSON`, url);
    }
    return mapper(raw);
  });
}

/** bowuu.com results feed (2024 Junior Team Trials). */
export interface BowuuResults {
  eventParticipation?: {
    participantName: string;
    gender?: string;
    ageGroup?: string;
    eventName: string;
    categoryName?: string;
    score?: number | string | null;
    teamName?: string | null;
    ringName?: string | null;
    didNotStart?: boolean | null;
  }[];
}

export function mapBowuu(raw: BowuuResults): ScoreEntry[] {
  if (!raw.eventParticipation) throw new SourceError("bowuu response has no eventParticipation");
  return raw.eventParticipation.map((p) => {
    const name = clean(p.participantName);
    return {
      athleteId: athleteKey(name),
      athleteName: name,
      club: clean(p.teamName) || "Individual",
      raw: clean(p.eventName),
      code: eventCodeFromName(p.eventName),
      gender: genderFromText(p.gender ?? ""),
      division: clean(p.ageGroup) || undefined,
      finalScore: p.didNotStart ? null : toNumber(p.score),
      ring: clean(p.ringName) || undefined,
    };
  });
}

export const bowuuResults = (eventId: number) =>
  jsonApi(`https://bowuu.com/v1/eventParticipation/results/${eventId}`, mapBowuu, "bowuu results");
