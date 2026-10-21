import type { RuleSource } from "../types";

/**
 * Degree of difficulty (nandu, Judging Group C) from the IWUF Wushu Taolu
 * Competition Rules and Judging Methods (2024), Section 3 and Article 22:
 * Tables 10-3-3 (connection codes), 10-3-4/5/6 (techniques) and 10-3-7/8/9
 * (connections). Transcribed from the official PDF; spot-checked against the
 * page images.
 *
 * Scoring (Article 22, 2.3): techniques A 0.2 / B 0.3 / C 0.4, capped at 1.4;
 * connections A 0.1 / B 0.15 / C 0.2 / D 0.25, capped at 0.6; 2.0 total.
 * A connection only counts if it is listed in the event family's table.
 */

export const NANDU_SOURCE: RuleSource = {
  title: "IWUF Wushu Taolu Competition Rules and Judging Methods (2024), Judging Group C",
  revision: "2024",
  url: "https://www.iwuf.org/xhimg/soft/240912/WUSHU-TAOLU-COMPETITION-RULES-AND-JUDGING-METHODS-2024.pdf",
  verified: true,
  notes: ["Tables 10-3-3 to 10-3-9 and Article 22 scoring criteria."],
};

export type Family = "changquan" | "nanquan" | "taiji";
export type TechGrade = "A" | "B" | "C";
export type ConnGrade = "A" | "B" | "C" | "D";

export const FAMILY_LABEL: Record<Family, string> = {
  changquan: "Changquan, Jianshu, Daoshu, Qiangshu, Gunshu",
  nanquan: "Nanquan, Nandao, Nangun",
  taiji: "Taijiquan, Taijijian, Taijishan",
};

export const TECH_VALUE: Record<TechGrade, number> = { A: 0.2, B: 0.3, C: 0.4 };
export const CONN_VALUE: Record<ConnGrade, number> = { A: 0.1, B: 0.15, C: 0.2, D: 0.25 };
export const TECH_CAP = 1.4;
export const CONN_CAP = 0.6;
export const NANDU_MAX = 2.0;

export interface Technique {
  code: string;
  grade: TechGrade;
  category: "balance" | "leg" | "jump" | "tumbling";
  pinyin: string;
  english: string;
}

/** Table 10-3-3: landing / ending codes used after "+". */
export const LANDINGS: Record<string, { pinyin: string; english: string }> = {
  "0": { pinyin: "Pū Bù", english: "Crouching stance" },
  "1": { pinyin: "Mǎ Bù", english: "Horse stance" },
  "2": { pinyin: "Dié Bù", english: "Butterfly stance" },
  "3": { pinyin: "Tí Xī Dú Lì", english: "Single raised-knee stance" },
  "4": { pinyin: "Diē Shù Chā", english: "Falling front split" },
  "5": { pinyin: "Diē Chā", english: "Hurdler's split" },
  "6": { pinyin: "Zuò Pán", english: "Cross-legged sitting" },
  "7": { pinyin: "Gōng Bù", english: "Bow stance" },
  "8": { pinyin: "Dān Jiǎo Luò Dì", english: "Single-foot landing (on the take-off foot)" },
  "9": { pinyin: "Pāo + Jiē", english: "Throw and catch" },
  "10": { pinyin: "Jiǎn Shì", english: "Scissor position" },
  "11": { pinyin: "Xiē Shì", english: "Scorpion stance" },
};

const t = (code: string, category: Technique["category"], pinyin: string, english: string): Technique => ({
  code,
  grade: code.slice(-1) as TechGrade,
  category,
  pinyin,
  english,
});

/** Tables 10-3-4, 10-3-5, 10-3-6. "(F)" rotations are the women's requirement. */
export const TECHNIQUES: Record<Family, Technique[]> = {
  changquan: [
    t("111A", "balance", "Bān Tuǐ Cháo Tiān Zhí Lì", "Standing vertical leg hold (grasp foot)"),
    t("112A", "balance", "Cè Tī Bào Jiǎo Zhí Lì", "Standing side kick, catch the foot"),
    t("123A", "balance", "Yǎng Shēn Píng Héng", "Backward leaning balance"),
    t("153A", "balance", "Tàn Hǎi Píng Héng", "Exploring the Ocean balance"),
    t("163A", "balance", "Wàng Yuè Píng Héng", "Gazing at the Moon balance"),
    t("133B", "balance", "Shí Zì Píng Héng", "Forward leaning balance, arms outspread"),
    t("244A", "leg", "Qián Sǎo Tuǐ 540°", "Front sweep 540°"),
    t("244B", "leg", "Qián Sǎo Tuǐ 900°", "Front sweep 900°"),
    t("312A", "jump", "Téng Kōng Fēi Jiǎo", "Jumping front slap kick (also slant / double front slap kick)"),
    t("312B", "jump", "Téng Kōng Zhèng Tī Tuǐ", "Jumping front straight kick"),
    t("323A", "jump", "Xuàn Fēng Jiǎo 360°", "Tornado kick 360°"),
    t("323B", "jump", "Xuàn Fēng Jiǎo 540°", "Tornado kick 540°"),
    t("323C", "jump", "Xuàn Fēng Jiǎo 720°", "Tornado kick 720° (women 630°)"),
    t("324A", "jump", "Téng Kōng Bǎi Lián 360°", "Jumping lotus kick 360°"),
    t("324B", "jump", "Téng Kōng Bǎi Lián 540°", "Jumping lotus kick 540°"),
    t("324C", "jump", "Téng Kōng Bǎi Lián 720°", "Jumping lotus kick 720° (women 630°)"),
    t("333A", "jump", "Xuànzi", "Butterfly kick"),
    t("353B", "jump", "Xuàn Zǐ Zhuǎn Tǐ 360°", "Butterfly twist 360°"),
    t("353C", "jump", "Xuàn Zǐ Zhuǎn Tǐ 720°", "Butterfly twist 720°"),
    t("335A", "jump", "Cè Kōng Fān", "Aerial cartwheel"),
    t("355B", "jump", "Cè Kōng Fān Zhuǎn Tǐ 360°", "Aerial cartwheel twist 360°"),
  ],
  nanquan: [
    t("244A", "leg", "Qián Sǎo Tuǐ 540°", "Front sweep 540°"),
    t("244B", "leg", "Qián Sǎo Tuǐ 900°", "Front sweep 900°"),
    t("312A", "jump", "Téng Kōng Fēi Jiǎo", "Jumping front slap kick"),
    t("323A", "jump", "Xuàn Fēng Jiǎo 360°", "Tornado kick 360°"),
    t("323B", "jump", "Xuàn Fēng Jiǎo 540°", "Tornado kick 540°"),
    t("323C", "jump", "Xuàn Fēng Jiǎo 720°", "Tornado kick 720° (women 630°)"),
    t("324A", "jump", "Téng Kōng Wài Bǎi Tuǐ 360°", "Jumping outside swing kick 360°"),
    t("324B", "jump", "Téng Kōng Wài Bǎi Tuǐ 540°", "Jumping outside swing kick 540°"),
    t("324C", "jump", "Téng Kōng Wài Bǎi Tuǐ 720°", "Jumping outside swing kick 720° (women 630°)"),
    t("335A", "jump", "Cè Kōng Fān", "Aerial cartwheel"),
    t("346A", "jump", "Yuán Dì Hòu Kōng Fān", "No-step back flip"),
    t("346B", "jump", "Dān Tiào Hòu Kōng Fān", "Single-step back flip"),
    t("415A", "tumbling", "Téng Kōng Shuāng Cè Chuài", "Jumping double side kick"),
    t("423A", "tumbling", "Téng Kōng Pán Tuǐ 360° Cè Pū", "Flying cross-legged 360° kick, fall on side"),
    t("447A", "tumbling", "Lǐ Yú Dǎ Tǐng", "Carp kip-up"),
  ],
  taiji: [
    t("142A", "balance", "Dīshì Qián Dēng Cǎi Jiǎo Píng Héng", "Forward stepping kick, low step balance"),
    t("143A", "balance", "Qián Jǔ Tuǐ Dī Shì Píng Héng", "Low balance, leg stretched forward"),
    t("143B", "balance", "Hòu Chā Tuǐ Dī Shì Píng Héng", "Low balance, leg crossed behind"),
    t("212A", "leg", "Fēn Jiǎo / Dēng Jiǎo", "Parting kick / heel kick"),
    t("312A", "jump", "Téng Kōng Fēi Jiǎo", "Jumping front slap kick"),
    t("312B", "jump", "Téng Kōng Zhèng Tī Tuǐ", "Jumping front straight kick"),
    t("323A", "jump", "Xuàn Fēng Jiǎo 180°", "Tornado kick 180°"),
    t("323B", "jump", "Xuàn Fēng Jiǎo 360°", "Tornado kick 360°"),
    t("323C", "jump", "Xuàn Fēng Jiǎo 540°", "Tornado kick 540° (women 450°)"),
    t("324B", "jump", "Téng Kōng Bǎi Lián 360°", "Jumping lotus kick 360°"),
    t("324C", "jump", "Téng Kōng Bǎi Lián 540°", "Jumping lotus kick 540° (women 450°)"),
  ],
};

export interface Connection {
  /** e.g. "312A+323C" (jump into jump) or "323B+1" (jump into horse stance). */
  code: string;
  grade: ConnGrade;
  /** Max run-up steps between two jumps. Undefined between jumps = straight after a two-foot landing. */
  steps?: number;
  note?: string;
}

const c = (grade: ConnGrade, list: (string | [string, number] | [string, number | undefined, string])[]): Connection[] =>
  list.map((x) => (typeof x === "string" ? { code: x, grade } : { code: x[0], grade, steps: x[1], note: x[2] }));

/** Tables 10-3-7, 10-3-8, 10-3-9. */
export const CONNECTIONS: Record<Family, Connection[]> = {
  changquan: [
    ...c("A", [
      "244A+6", "312A+6", ["312A+323A", 2], ["312A+324A", 2], ["312A+353B", 4], "323A+1", "323A+4", "323A+6", "323A+324A",
      ["323A+353B", 4], "324A+1", "324A+4", "324A+6", "324A+7", ["333A+353B", 1], "333A+6", "335A+4", ["335A+353B", 4],
      ["312A+9", undefined, "Throw, jumping front slap kick, catch"], ["445A+9", undefined, "Throw, forward dive roll (Qiǎng Bèi), catch"],
    ]),
    ...c("B", [
      ["312A+335A", 1], ["312A+323B", 2], "312A+324B", "323A+3", "323A+324B", "323B+1", "323B+4", "323B+6", "324A+3", "324B+1",
      "324B+6", "333A+244A", "353B+4", ["353B+323B", 4], ["335A+323B", 4],
      ["323A+9", undefined, "Throw, tornado kick 360°, catch"], ["324A+9", undefined, "Throw, jumping lotus kick 360°, catch"],
    ]),
    ...c("C", [
      ["312A+323C", 4], "312A+324C", ["312A+353C", 4], ["323A+353C", 4], "323B+3", "323B+324B", "323C+1", "323C+6", "324B+0",
      "324B+3", "324C+6", ["333A+353C", 4], ["353B+323C", 4], ["335A+323C", 4], ["335A+353C", 4],
    ]),
    ...c("D", ["323B+324C", "323C+4", "324C+1", "353C+4"]),
  ],
  nanquan: [
    ...c("A", ["312A+3", "323A+1", "323A+2", ["323A+312A", 2], "323A+324A", "324A+1", "324A+346A", "335A+10", "346A+2"]),
    ...c("B", [["312A+346B", 2], ["323A+324B", 2], "323B+1", "323B+2", ["324A+346B", 2], "324B+1", "346B+2", "447A+2"]),
    ...c("C", ["323A+3", ["323A+346B", 2], "323B+324B", "324A+3", "324B+0", ["324B+346B", 2], "346B+11"]),
    ...c("D", ["323C+1", "324C+1", "323B+324C"]),
  ],
  taiji: [
    ...c("A", [
      ["142A+3", undefined, "180° turn into raised-knee stance"], ["143A+3", undefined, "180° turn into raised-knee stance"], "143A+212A",
      "312A+3", ["312A+324B", undefined, "Land in hurdler's split, left leg forward"], "323A+3", "323B+8", "324B+8",
    ]),
    ...c("B", [
      ["143B+3", undefined, "Lotus kick, 180° turn into raised-knee stance"], "143B+212A",
      ["312A+324C", undefined, "Land in hurdler's split, left leg forward"], "312B+8", "324B+5",
    ]),
    ...c("C", ["323B+3", "324B+3", "324C+5"]),
    ...c("D", ["323C+3", "324C+3"]),
  ],
};

/** Moves that only appear inside a connection (no technique value of their own). */
export const CONNECTION_ONLY: Record<string, string> = { "445A": "Forward dive roll (Qiǎng Bèi)" };

export function technique(family: Family, code: string): Technique | undefined {
  return TECHNIQUES[family].find((x) => x.code === code);
}

export function connection(family: Family, from: string, to: string): Connection | undefined {
  return CONNECTIONS[family].find((x) => x.code === `${from}+${to}`);
}

/** What can follow `from`: listed landings and jumps, with the connection grade. */
export function nextOptions(family: Family, from: string): Connection[] {
  return CONNECTIONS[family].filter((x) => x.code.startsWith(`${from}+`));
}

// ---------- Parsing declared codes (Sportdata registrations, scorecards) ----------

export interface NanduMovement {
  code: string;
  number: string;
  level: string;
}

export interface NanduElement {
  raw: string;
  movements: NanduMovement[];
  connections: string[];
}

const MOVEMENT = /^(\d{3})([A-Z])$/i;

/** "353B+323C+1" -> movements 353B, 323C and landing code 1. */
export function parseNandu(raw: string): NanduElement | null {
  const parts = raw.replace(/\s+/g, "").split("+").filter(Boolean);
  if (!parts.length) return null;
  const movements: NanduMovement[] = [];
  const connections: string[] = [];
  for (const p of parts) {
    const m = p.match(MOVEMENT);
    if (m) movements.push({ code: `${m[1]}${m[2]!.toUpperCase()}`, number: m[1]!, level: m[2]!.toUpperCase() });
    else if (/^\d{1,2}$/.test(p)) connections.push(p);
    else return null;
  }
  return movements.length ? { raw, movements, connections } : null;
}

export function parseNanduList(list: string[]): { elements: NanduElement[]; unknown: string[] } {
  const elements: NanduElement[] = [];
  const unknown: string[] = [];
  for (const raw of list) {
    const el = parseNandu(raw);
    if (el) elements.push(el);
    else unknown.push(raw);
  }
  return { elements, unknown };
}

// ---------- Scoring a routine ----------

/** One registered element: a chain of techniques, optionally ending in a landing code. */
export interface Chain {
  steps: string[];
}

export interface ScoredLink {
  code: string;
  grade?: ConnGrade;
  value: number;
  /** What actually counts after the 0.6 cap; less than value only for the element that crosses it. */
  counted: number;
  listed: boolean;
  steps?: number;
  note?: string;
}

export interface ScoredChain {
  /** counted: value after the 1.4 cap, in registration order. */
  techniques: { code: string; grade?: TechGrade; value: number; counted: number; known: boolean }[];
  links: ScoredLink[];
}

export interface NanduScore {
  chains: ScoredChain[];
  techniqueRaw: number;
  connectionRaw: number;
  technique: number;
  connection: number;
  total: number;
  /** Rule breaks in what was declared: these cost points. */
  warnings: string[];
}

/** Options that refine the checks: the exact event decides barehand vs weapon rules. */
export interface ScoreOptions {
  weapon?: boolean;
}

/** Map an event code (CQ, DS, …) to its difficulty family and whether it is a weapon routine. */
export function familyOfEvent(code: string): { family: Family; weapon: boolean } {
  if (["NQ", "ND", "NG"].includes(code)) return { family: "nanquan", weapon: code !== "NQ" };
  if (["TQ", "TJ", "TS"].includes(code)) return { family: "taiji", weapon: code !== "TQ" };
  return { family: "changquan", weapon: code !== "CQ" };
}

const r3 = (n: number) => Math.round(n * 1000) / 1000;

/** Chain from a code string: "353B+323C+1" -> ["353B", "323C", "1"]. */
export function chainFromCode(code: string): Chain {
  return { steps: code.replace(/\s+/g, "").split("+").filter(Boolean).map((s) => s.toUpperCase()) };
}

export function chainToCode(chain: Chain): string {
  return chain.steps.join("+");
}

/**
 * Score a routine's declared difficulty, assuming everything is completed.
 * Technique value is capped at 1.4 and connection value at 0.6 (2.0 total).
 */
export function scoreNandu(family: Family, chains: Chain[], opts: ScoreOptions = {}): NanduScore {
  const warnings: string[] = [];
  const scored = chains.map((ch) => {
    const techniques: ScoredChain["techniques"] = [];
    const links: ScoredLink[] = [];
    ch.steps.forEach((s, i) => {
      const isLanding = /^\d{1,2}$/.test(s);
      if (!isLanding) {
        const tech = technique(family, s);
        techniques.push({ code: s, grade: tech?.grade, value: tech ? TECH_VALUE[tech.grade] : 0, counted: 0, known: !!tech || s in CONNECTION_ONLY });
        if (!tech && !(s in CONNECTION_ONLY)) warnings.push(`${s} is not a ${FAMILY_LABEL[family].split(",")[0]} difficulty technique.`);
      }
      if (i > 0) {
        const prev = ch.steps[i - 1]!;
        if (/^\d{1,2}$/.test(prev)) {
          // Keep one link per step (the editor lines links up by index); it earns nothing.
          links.push({ code: `${prev}+${s}`, value: 0, counted: 0, listed: false });
          warnings.push(`Nothing can follow a landing (${chainToCode(ch)}).`);
          return;
        }
        const conn = connection(family, prev, s);
        links.push({ code: `${prev}+${s}`, grade: conn?.grade, value: conn ? CONN_VALUE[conn.grade] : 0, counted: 0, listed: !!conn, steps: conn?.steps, note: conn?.note });
        if (!conn) warnings.push(`${prev}+${s} is not a listed connection, so it earns no connection value.`);
      }
    });
    return { techniques, links };
  });

  const links = scored.flatMap((c) => c.links).filter((l) => l.listed);

  // Taiji (3.3.2.3): one hurdler's split per routine; 312A+324B/C must land in it.
  if (family === "taiji") {
    if (links.filter((l) => l.code.endsWith("+5")).length > 1) warnings.push("Only one hurdler's split (Diē Chā) connection is allowed per routine.");
    for (const ch of chains) {
      const code = chainToCode(ch);
      const m = code.match(/312A\+(324[BC])(\+(\d+))?/);
      if (m && m[3] !== "5") warnings.push(`312A+${m[1]} must land in a hurdler's split, left leg forward (${m[1]}+5).`);
    }
  }

  // Throw and catch (+9): one per weapon routine (3.1.2.3); it needs a weapon.
  const throws = links.filter((l) => l.code.endsWith("+9")).length;
  if (throws > 1) warnings.push("Only one throw-and-catch connection is allowed per weapon routine.");
  if (throws > 0 && opts.weapon === false) warnings.push("Throw-and-catch connections are for weapon routines.");

  // Over a cap, only the last registered technique/connection loses value (Art. 22),
  // so fill the caps in registration order.
  let techLeft = TECH_CAP;
  let connLeft = CONN_CAP;
  for (const c of scored) {
    for (const t of c.techniques) techLeft = r3(techLeft - (t.counted = r3(Math.min(t.value, techLeft))));
    for (const l of c.links) connLeft = r3(connLeft - (l.counted = r3(Math.min(l.value, connLeft))));
  }

  const techniqueRaw = r3(scored.flatMap((c) => c.techniques).reduce((s, x) => s + x.value, 0));
  const connectionRaw = r3(scored.flatMap((c) => c.links).reduce((s, x) => s + x.value, 0));
  const tech = Math.min(TECH_CAP, techniqueRaw);
  const conn = Math.min(CONN_CAP, connectionRaw);
  return {
    chains: scored,
    techniqueRaw,
    connectionRaw,
    technique: r3(tech),
    connection: r3(conn),
    total: r3(tech + conn),
    warnings: [...new Set(warnings)],
  };
}

/** Value a scored element actually earns after the caps. */
export function chainCounted(c: ScoredChain | undefined): number {
  if (!c) return 0;
  return r3(c.techniques.reduce((s, t) => s + t.counted, 0) + c.links.reduce((s, l) => s + l.counted, 0));
}

/** Sum of declared technique values (legacy helper used by scorecards). */
export function declaredValue(elements: NanduElement[], family: Family = "changquan"): number {
  return scoreNandu(family, elements.map((e) => ({ steps: [...e.movements.map((m) => m.code), ...e.connections] }))).total;
}
