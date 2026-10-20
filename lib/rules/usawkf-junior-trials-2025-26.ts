import type { Ruleset } from "./types";

/**
 * USAWKF 2025–2026 National Junior Taolu Team Trials (r15).
 *
 * The PDF could not be downloaded from the build environment
 * (OPEN_QUESTIONS #2). Divisions, events, time limits and music below come
 * from search-engine extracts of r15; selection math comes from the project
 * brief. Everything stays `verified: false` until checked against the PDF.
 * A newer revision (r19, 2025-11-07) also exists and should be compared.
 */
export const USAWKF_JUNIOR_TRIALS_2025_26: Ruleset = {
  id: "usawkf-junior-trials-2025-26",
  name: "USAWKF National Junior Taolu Team Trials 2025–26",
  governingBody: "USAWKF",
  season: "2025-26",
  source: {
    title: "2025–2026 USAWKF National Junior Team Trials (Taolu) Regulations",
    revision: "r15",
    url: "https://usawkf.org/wp-content/uploads/2025/10/2025-2026-USAWKF-National-Junior-Taolu-Team-Trials-Regulations_r15.pdf",
    verified: false,
    notes: [
      "Trials: December 18–21, 2025, Bethesda North Marriott, Rockville, MD. Selects the team for the 10th World Junior Wushu Championships (Tianjin, March 26–30, 2026) and the 15th Pan American Wushu Championships (2026).",
      "Judging follows the IWUF Wushu Taolu Competition Rules and Judging Methods (2024) unless the regulations say otherwise.",
      "Minimum averages: the document contradicts itself (OPEN_QUESTIONS #7). Using A 9.0 / B 8.9 / C 8.8.",
      "Team sizes and tie-breaks are carried over from 2025 and the 2025 senior regulations until confirmed.",
      "Revision r19 (2025-11-07) exists; compare before relying on these values.",
    ],
  },
  judging: { rulesetId: "iwuf-2024", label: "IWUF Taolu Competition Rules (2024)" },
  genders: ["male", "female"],
  divisions: [
    {
      id: "A",
      label: "Youth (A)",
      born: { from: "2008-11-14", to: "2011-12-31" },
      routines: "3rd Set of International Wushu Competition Routines",
      matchers: [/\byouth\b/i, /3rd set/i],
      events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ", "TS"],
    },
    {
      id: "B",
      label: "Junior (B)",
      born: { from: "2012-01-01", to: "2014-12-31" },
      routines: "1st Set of International Wushu Competition Routines (Taijiquan and Taijijian: 42 Movements)",
      matchers: [/\bjunior\b/i, /1st set/i],
      events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ"],
    },
    {
      id: "C",
      label: "Children (C)",
      born: { from: "2015-01-01" },
      routines: "No. 3 Elementary Routines (Changquan and weapons); Elementary Routines (Nanquan, Nandao, Nangun); Taijiquan 24, Taijijian 32",
      matchers: [/\bchild(ren)?\b/i, /elementary/i],
      events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ"],
    },
  ],
  timeLimits: [
    { division: "A", events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG"], min: 70, note: "Minimum 1:10. Placement in the extracted text is ambiguous; confirm." },
    { division: "A", events: ["TQ", "TJ", "TS"], min: 180, max: 240 },
    { division: "B", events: ["TQ"], min: 300, max: 360, note: "42 Movements Taijiquan" },
    { division: "B", events: ["TJ"], min: 180, max: 240, note: "42 Movements Taijijian" },
    { division: "C", events: ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ"], note: "No duration requirement" },
  ],
  music: [
    { division: "A", events: ["TQ", "TJ", "TS"], requirement: "required", note: "Self-selected accompaniment" },
    { division: "B", events: ["TQ", "TJ"], requirement: "required", note: "Self-selected accompaniment (42 Movements)" },
  ],
  selection: {
    scoring: { method: "barehand-plus-weapon", pairing: "same-discipline" },
    perDivision: true,
    tieBreaks: ["highest-single-event", "more-full-nandu", "higher-performance", "higher-lowest-discarded"],
    teams: [
      { id: "A", size: { A: 3, "*": 2 }, minAverage: 9.0, onePerDiscipline: true },
      { id: "B", size: { A: 3, "*": 2 }, minAverage: 8.9, onePerDiscipline: true },
      { id: "C", size: { A: 3, "*": 2 }, minAverage: 8.8, onePerDiscipline: true },
    ],
  },
};
