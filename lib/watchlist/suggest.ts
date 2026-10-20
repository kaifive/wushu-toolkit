import { athleteKey } from "@/lib/domain/names";
import type { EventData } from "@/lib/domain/types";
import { nameTokens, namesMatch } from "./match";

/** One athlete seen in past competitions, for watch-list type-ahead. */
export interface KnownAthlete {
  name: string;
  clubs: string[];
  events: string[];
}

export interface AthleteIndex {
  athletes: KnownAthlete[];
}

const clubKey = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/** Prefer the "First Last" spelling seen most often; sources disagree on order and case. */
function bestSpelling(spellings: Map<string, number>): string {
  const score = (s: string) => (spellings.get(s) ?? 0) * 2 + (s === s.toUpperCase() ? 0 : 1);
  return [...spellings.keys()].sort((a, b) => score(b) - score(a) || a.localeCompare(b))[0]!;
}

export function buildAthleteIndex(events: { label: string; data: EventData }[]): AthleteIndex {
  const people = new Map<string, { spellings: Map<string, number>; clubs: Map<string, string>; events: Set<string> }>();
  const note = (name: string, club: string | undefined, label: string) => {
    if (nameTokens(name).length < 2) return;
    const id = athleteKey(name);
    const p = people.get(id) ?? { spellings: new Map(), clubs: new Map(), events: new Set() };
    p.spellings.set(name, (p.spellings.get(name) ?? 0) + 1);
    if (club && !/^individual$/i.test(club)) p.clubs.set(clubKey(club), p.clubs.get(clubKey(club)) ?? club);
    p.events.add(label);
    people.set(id, p);
  };
  for (const { label, data } of events) {
    for (const r of data.registrations) note(r.athlete.name, r.athlete.club, label);
    for (const s of data.scores) note(s.athleteName, s.club, label);
  }
  const athletes = [...people.values()]
    .map((p) => ({ name: bestSpelling(p.spellings), clubs: [...p.clubs.values()], events: [...p.events] }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return { athletes };
}

/** Every query word must start some word of the name, in any order: "tan ab" finds "Abram Tang". */
function prefixMatch(query: string[], words: string[]): boolean {
  return query.every((q) => words.some((w) => w.startsWith(q)));
}

export function suggestAthletes(index: AthleteIndex, query: string, exclude: string[] = [], limit = 8): KnownAthlete[] {
  const q = nameTokens(query);
  if (!q.length || q.join("").length < 2) return [];
  return index.athletes
    .filter((a) => prefixMatch(q, nameTokens(a.name)) && !exclude.some((e) => namesMatch(e, a.name)))
    .sort((a, b) => b.events.length - a.events.length || a.name.localeCompare(b.name))
    .slice(0, limit);
}
