import { athleteKey, clean } from "@/lib/domain/names";
import type { Registration, ScoreEntry } from "@/lib/domain/types";

const eventKey = (raw: string) => clean(raw).toLowerCase();

/**
 * One ScoreEntry per registered entry, with the score (and scorecard) from
 * `scores` when an entry with the same athlete and event exists. Registration
 * supplies gender, division and club; unscored entries get finalScore null.
 */
export function joinRegistrationScores(regs: Registration[], scores: ScoreEntry[]): ScoreEntry[] {
  const byKey = new Map<string, ScoreEntry>();
  for (const s of scores) {
    // A duplicated row (re-run, copied line) must not blank out a real score.
    const key = `${s.athleteId}|${eventKey(s.raw)}`;
    const prev = byKey.get(key);
    if (!prev || (prev.finalScore == null && s.finalScore != null)) byKey.set(key, s);
  }
  return regs.flatMap((r) =>
    r.entries
      .filter((e) => !e.waitlisted)
      .map((e) => {
        const hit = byKey.get(`${r.athlete.id}|${eventKey(e.raw)}`);
        return {
          athleteId: r.athlete.id,
          athleteName: r.athlete.name,
          club: r.athlete.club ?? hit?.club,
          raw: e.raw,
          code: e.code ?? hit?.code,
          gender: e.gender ?? r.athlete.gender ?? hit?.gender,
          division: e.division ?? r.athlete.division,
          nandu: e.nandu ?? hit?.nandu,
          finalScore: hit?.finalScore ?? null,
          scorecard: hit?.scorecard,
          ring: hit?.ring,
        } satisfies ScoreEntry;
      }),
  );
}

/** Registrations implied by a list of score entries (for sources that only publish scores). */
export function registrationsFromScores(scores: ScoreEntry[]): Registration[] {
  const m = new Map<string, Registration>();
  for (const s of scores) {
    const id = s.athleteId || athleteKey(s.athleteName);
    const reg = m.get(id) ?? { athlete: { id, name: s.athleteName, gender: s.gender, club: s.club, division: s.division }, entries: [] };
    reg.entries.push({ raw: s.raw, code: s.code, gender: s.gender, division: s.division, nandu: s.nandu });
    m.set(id, reg);
  }
  return [...m.values()];
}
