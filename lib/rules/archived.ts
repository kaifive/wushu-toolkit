import type { Division, Ruleset } from "./types";
import { CHILDREN_MATCHERS, JUNIOR_MATCHERS, YOUTH_MATCHERS } from "./divisions";

/**
 * Rulesets for archived events, reconstructed from how the legacy app
 * computed standings and teams (legacy/src/views/*). They reproduce what
 * those pages showed at the time, not an official reading of each year's rules.
 */

const JUNIOR_DIVISIONS: Division[] = [
  { id: "A", label: "Group A (Youth)", matchers: YOUTH_MATCHERS, events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ", "TS"] },
  { id: "B", label: "Group B (Junior)", matchers: JUNIOR_MATCHERS, events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ"] },
  { id: "C", label: "Group C (Children)", matchers: CHILDREN_MATCHERS, events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ"] },
];

/** 2024 Junior Team Trials: best barehand + best weapon (any discipline); top 9 (A) / 6 (B, C) split into teams. */
export const USAWKF_JUNIOR_TRIALS_2024: Ruleset = {
  id: "usawkf-junior-trials-2024",
  name: "USAWKF Junior Taolu Team Trials 2024",
  governingBody: "USAWKF",
  season: "2024",
  source: {
    title: "2024 Junior Taolu and Taijiquan Team Trials Regulation",
    url: "https://usawkf.org/wp-content/uploads/2024/03/1-1.-2024-Junior-Taolu-and-Taijiquan-Team-Trials-Regulation-Final1.pdf",
    verified: false,
    notes: ["Reconstructed from the legacy 2024 dashboards."],
  },
  judging: { rulesetId: "iwuf-2024", label: "IWUF Taolu Competition Rules" },
  genders: ["male", "female"],
  divisions: JUNIOR_DIVISIONS,
  timeLimits: [],
  music: [],
  selection: {
    scoring: { method: "barehand-plus-weapon", pairing: "any" },
    perDivision: true,
    tieBreaks: ["higher-barehand", "higher-weapon"],
    teams: [
      { id: "A", size: { A: 3, "*": 2 } },
      { id: "B", size: { A: 3, "*": 2 } },
      { id: "C", size: { A: 3, "*": 2 } },
    ],
  },
};

const ADULT_CATEGORIES = [
  // The three-event categories count only for athletes who entered all three (USAWKF results).
  { id: "CQ_DS_GS", label: "Changquan / Daoshu / Gunshu", events: ["CQ", "DS", "GS"], complete: true },
  { id: "CQ_JS_QS", label: "Changquan / Jianshu / Qiangshu", events: ["CQ", "JS", "QS"], complete: true },
  { id: "NQ_ND_NG", label: "Nanquan / Nandao / Nangun", events: ["NQ", "ND", "NG"], complete: true },
  { id: "TQ_TJ", label: "Taijiquan / Taijijian", events: ["TQ", "TJ"] },
] as const;

/** 2025 Adult Team Trials: average per category; A team needs full difficulty in one form. */
export const USAWKF_ADULT_TRIALS_2025: Ruleset = {
  id: "usawkf-adult-trials-2025",
  name: "USAWKF Taolu Team Trials 2025",
  governingBody: "USAWKF",
  season: "2025",
  source: {
    title: "2025 USAWKF Taolu Team Trials Regulations",
    url: "https://usawkf.org/2025%20Team%20Trials/2025%20USAWKF%20Taolu%20Team%20Trials%20Regulations.pdf",
    verified: false,
    notes: [
      "Reconstructed from legacy determineAdultWushuTeam.js.",
      "Tie-breaks per the 2025 regulations: highest single event, more events with 2.0 nandu, harder completed movements, highest performance score, higher lowest discarded score, then Arbitration Committee.",
    ],
  },
  judging: { rulesetId: "iwuf-2024", label: "IWUF Taolu Competition Rules (2024)" },
  genders: ["male", "female"],
  divisions: [{ id: "adult", label: "Adult", matchers: [/./], events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ"] }],
  timeLimits: [],
  music: [],
  selection: {
    scoring: { method: "category-average", categories: ADULT_CATEGORIES.map((c) => ({ ...c, events: [...c.events] })) },
    perDivision: false,
    tieBreaks: ["highest-single-event", "more-full-nandu", "higher-performance", "higher-lowest-discarded"],
    teams: [
      { id: "A", size: { "*": 4 }, onePerDiscipline: true, disciplineOrder: ADULT_CATEGORIES.map((c) => c.id), fill: true, requireCleanNandu: true },
      { id: "B", size: { "*": 6 }, onePerDiscipline: true, disciplineOrder: ADULT_CATEGORIES.map((c) => c.id), fill: true },
      { id: "C", size: { "*": 6 }, onePerDiscipline: true, disciplineOrder: ADULT_CATEGORIES.map((c) => c.id), fill: true },
    ],
  },
};

/** Open tournaments (2025 Phoenix): standings only, no team selection. */
export const OPEN_TOURNAMENT: Ruleset = {
  id: "open-tournament",
  name: "Open tournament",
  governingBody: "Event organizer",
  season: "any",
  source: { title: "Event organizer rules", verified: false },
  judging: { rulesetId: "iwuf-2024", label: "IWUF Taolu Competition Rules (2024)" },
  genders: ["male", "female"],
  divisions: [{ id: "open", label: "Open", matchers: [/./], events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ", "TS"] }],
  timeLimits: [],
  music: [],
};

/** 2026 Presidential Wushu Cup: all-around = sum of top 3 forms; 8 age-group champions per gender. */
export const PWC_2026: Ruleset = {
  id: "pwc-2026",
  name: "Presidential Wushu Cup 2026",
  governingBody: "Event organizer",
  season: "2026",
  source: { title: "2026 PWC all-around rules", verified: false, notes: ["From the legacy PWC pages: top 3 scores, at least 3 forms, registration opt-in."] },
  genders: ["male", "female"],
  divisions: [{ id: "open", label: "All", matchers: [/./], events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ", "TS"] }],
  timeLimits: [],
  music: [],
  allAround: {
    topN: 3,
    minForms: 3,
    requiresOptIn: true,
    ageGroups: [
      { id: "A", label: "8 & under", min: 0, max: 8 },
      { id: "B", label: "9–11", min: 9, max: 11 },
      { id: "C", label: "12–14", min: 12, max: 14 },
      { id: "D", label: "15–17", min: 15, max: 17 },
      { id: "E", label: "18–21", min: 18, max: 21 },
      { id: "F", label: "22–29", min: 22, max: 29 },
      { id: "G", label: "30–39", min: 30, max: 39 },
      { id: "H", label: "40 & over", min: 40, max: Number.POSITIVE_INFINITY },
    ],
  },
};
