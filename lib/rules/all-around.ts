import type { Gender, ScoreEntry } from "@/lib/domain/types";
import type { AllAroundRules } from "./types";

export interface AllAroundAthlete {
  athleteId: string;
  athleteName: string;
  gender?: Gender;
  age?: number;
  club?: string;
  optedIn: boolean;
  forms: ScoreEntry[];
  top: ScoreEntry[];
  total: number;
}

export interface AthleteInfo {
  age?: number;
  gender?: Gender;
  optedIn?: boolean;
}

const round3 = (n: number) => Math.round(n * 1000) / 1000;

/** Sum each athlete's top N scored forms. `info` joins age / opt-in from a reference source. */
export function allAround(scores: ScoreEntry[], rules: AllAroundRules, info: Map<string, AthleteInfo> = new Map()): AllAroundAthlete[] {
  const by = new Map<string, ScoreEntry[]>();
  for (const s of scores) by.set(s.athleteId, [...(by.get(s.athleteId) ?? []), s]);
  return [...by.entries()].map(([id, forms]) => {
    const extra = info.get(id) ?? {};
    const top = [...forms].filter((f) => f.finalScore != null).sort((a, b) => b.finalScore! - a.finalScore!).slice(0, rules.topN);
    return {
      athleteId: id,
      athleteName: forms[0]!.athleteName,
      gender: extra.gender ?? forms.find((f) => f.gender)?.gender,
      age: extra.age,
      club: forms.find((f) => f.club)?.club,
      optedIn: rules.requiresOptIn ? !!extra.optedIn : true,
      forms,
      top,
      total: round3(top.reduce((s, f) => s + (f.finalScore ?? 0), 0)),
    };
  });
}

export const isEligible = (a: AllAroundAthlete, rules: AllAroundRules) => a.optedIn && a.forms.length >= rules.minForms;

export function standings(athletes: AllAroundAthlete[], gender: Gender): AllAroundAthlete[] {
  return athletes.filter((a) => a.optedIn && a.gender === gender).sort((a, b) => b.total - a.total || a.athleteName.localeCompare(b.athleteName));
}

export function grandChampion(athletes: AllAroundAthlete[], rules: AllAroundRules): AllAroundAthlete | null {
  return athletes.filter((a) => isEligible(a, rules) && a.total > 0).sort((a, b) => b.total - a.total)[0] ?? null;
}

export function ageGroupOf(age: number | undefined, rules: AllAroundRules) {
  if (age === undefined || !Number.isFinite(age)) return undefined;
  return rules.ageGroups.find((g) => age >= g.min && age <= g.max);
}

/** Highest eligible male and female per age group; null until someone has a total. */
export function ageGroupChampions(athletes: AllAroundAthlete[], rules: AllAroundRules) {
  const eligible = athletes.filter((a) => isEligible(a, rules));
  const top = (pool: AllAroundAthlete[], g: Gender) =>
    pool.filter((a) => a.gender === g && a.total > 0).sort((a, b) => b.total - a.total)[0] ?? null;
  return rules.ageGroups.map((group) => {
    const inGroup = eligible.filter((a) => ageGroupOf(a.age, rules)?.id === group.id);
    return { group, male: top(inGroup, "male"), female: top(inGroup, "female") };
  });
}
