/**
 * USAWKF junior trials division matchers, shared by the 2024 and 2025–26
 * rulesets. The word "Junior" in a "Junior (Taolu) Team Trials" title isn't
 * the Junior division.
 */
export const YOUTH_MATCHERS = [/\byouth\b/i, /3rd set/i];
export const JUNIOR_MATCHERS = [/\bjunior\b(?!\s+(taolu\s+)?team\s+trials)/i, /1st set/i];
export const CHILDREN_MATCHERS = [/\bchild(ren)?\b/i, /elementary/i];
