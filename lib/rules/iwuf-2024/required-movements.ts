import { slugify } from "@/lib/domain/names";
import type { EventCode } from "@/lib/domain/types";
import type { RuleSource } from "../types";

/**
 * Optional routine compulsory content, IWUF 2024 Articles 29–33.
 * Items marked `open` are a kind of technique the athlete picks
 * (e.g. "Fist technique"); the athlete names the one they use.
 */

export interface RequiredItem {
  /** Stable within its set, used for saved orders. */
  id: string;
  label: string;
  open?: boolean;
}

export interface RequiredMovementSet {
  id: string;
  type: string;
  events: EventCode[];
  requirements: { title: string; items: RequiredItem[]; note?: string }[];
}

export const REQUIRED_MOVEMENTS_SOURCE: RuleSource = {
  title: "IWUF Wushu Taolu Competition Rules and Judging Methods",
  revision: "2024",
  url: "https://www.iwuf.org/xhimg/soft/240912/WUSHU-TAOLU-COMPETITION-RULES-AND-JUDGING-METHODS-2024.pdf",
  verified: true,
  notes: ["Articles 28–33. Content used inside nandu techniques or connections does not count (Article 28)."],
};

type Req = RequiredMovementSet["requirements"][number];

/** Named techniques, each its own item. */
const named = (title: string, labels: string[], note?: string): Req => ({
  title,
  note,
  items: labels.map((label) => ({ id: slug(label), label })),
});

/**
 * `n` techniques of a kind the athlete chooses. Registration only needs the
 * kind, so each one is listed by it ("Fist" three times). `idBase` keeps saved
 * orders working.
 */
const open = (title: string, idBase: string, n: number, label: string): Req => ({
  title,
  items: Array.from({ length: n }, (_, i) => ({ id: `${slug(idBase)}-${i + 1}`, label, open: true })),
});

/** Several different kinds, one each. */
const kinds = (title: string, labels: string[]): Req => ({
  title,
  items: labels.map((label) => ({ id: slug(label), label: label.replace(/(^|[\s-])([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase()), open: true })),
});

const slug = slugify;

const FIVE_STANCES = named("Five stances", [
  "Gōng Bù (Bow Stance)",
  "Mǎ Bù (Horse Stance)",
  "Pū Bù (Crouching Stance)",
  "Xū Bù (Empty Stance)",
  "Xiē Bù (Cross-Legged Crouching Stance)",
]);

const SOUTHERN_STANCES = named("Six stances", [
  "Gōng Bù (Bow Stance)",
  "Mǎ Bù (Horse Stance)",
  "Pū Bù (Crouching Stance)",
  "Xū Bù (Empty Stance)",
  "Dié Bù (Butterfly Stance)",
  "Qí Lóng Bù (Dragon Riding Stance)",
]);

const SOUTHERN_FEET = [named("Footwork", ["Qí Lín Bù (Kirin Steps)"]), named("Leg technique", ["Héng Dīng Tuǐ (Horizontal Nail Kick)"])];

const TAIJI_STANCES = named("Three stances", ["Gōng Bù (Bow Stance)", "Pū Bù (Crouching Stance)", "Xū Bù (Empty Stance)"]);

const BALANCE = open("Extended balance", "Extended balance", 1, "Extended Balance");

export const REQUIRED_MOVEMENTS: RequiredMovementSet[] = [
  {
    id: "changquan",
    type: "Changquan",
    events: ["CQ"],
    requirements: [
      named("Three hand forms", ["Quán (Fist)", "Zhǎng (Palm)", "Gōu (Hook)"]),
      open("Three fist techniques", "Fist technique", 3, "Fist"),
      open("Two palm techniques", "Palm technique", 2, "Palm"),
      open("Offensive elbow", "Offensive elbow", 1, "Offensive Elbow"),
      FIVE_STANCES,
      kinds("Three leg techniques", ["Straight-leg swing kick", "Flexion-extension kick", "Sweep"]),
      BALANCE,
    ],
  },
  {
    id: "jianshu",
    type: "Jianshu",
    events: ["JS"],
    requirements: [
      named(
        "Eight sword techniques",
        [
          "Cì Jiàn (Thrust)",
          "Guà Jiàn (Hooking Parry)",
          "Liāo Jiàn (Uppercut)",
          "Diǎn Jiàn (Pointing)",
          "Pī Jiàn (Chop)",
          "Bēng Jiàn (Upward Tilt)",
          "Jié Jiàn (Intercept)",
          "Jiǎn Wàn Huā (Figure 8)",
        ],
        "One must be a full set of Guà Jiàn left and right connected with Chuān Guà Jiàn behind the back.",
      ),
      FIVE_STANCES,
      BALANCE,
    ],
  },
  {
    id: "daoshu",
    type: "Daoshu",
    events: ["DS"],
    requirements: [
      named(
        "Eight broadsword techniques",
        [
          "Chán Tóu Dāo (Twining)",
          "Guǒ Nǎo Dāo (Wrapping)",
          "Pī Dāo (Chop)",
          "Zhā Dāo (Thrust)",
          "Zhǎn Dāo (Hack)",
          "Guà Dāo (Hooking Parry)",
          "Yún Dāo (Cloud Waving)",
          "Bèi Huā Dāo (Figure 8 Behind the Back)",
        ],
        "One must be a full set of Chán Tóu Dāo and Guǒ Nǎo Dāo.",
      ),
      FIVE_STANCES,
    ],
  },
  {
    id: "qiangshu",
    type: "Qiangshu",
    events: ["QS"],
    requirements: [
      named(
        "Eight spear techniques",
        [
          "Lán Qiāng (Outward Block)",
          "Ná Qiāng (Inward Block)",
          "Zhā Qiāng (Thrust)",
          "Chuān Qiāng (Pierce)",
          "Bēng Qiāng (Tilt)",
          "Diǎn Qiāng (Pointing)",
          "Wǔ Huā Qiāng (Vertical Figure 8)",
          "Tiǎo Bǎ (Upward Handle Strike)",
        ],
        "One must be three continuous Lán, Ná, Zhā Qiāng combinations.",
      ),
      FIVE_STANCES,
    ],
  },
  {
    id: "gunshu",
    type: "Gunshu",
    events: ["GS"],
    requirements: [
      named(
        "Eight cudgel techniques",
        [
          "Píng Lūn Gùn (Horizontal Windmill)",
          "Pī Gùn (Chop)",
          "Yún Gùn (Cloud Waving)",
          "Bēng Gùn (Tilt)",
          "Jiǎo Gùn (Enveloping)",
          "Chuō Gùn (Poke)",
          "Wǔ Huā Gùn (Vertical Figure 8)",
          "Tí Liāo Huā Gùn (Two-handed Uppercut)",
        ],
        "One must be three continuous revolutions of Shuāng Shǒu Tí Liāo Huā Gùn.",
      ),
      FIVE_STANCES,
    ],
  },
  {
    id: "nanquan",
    type: "Nanquan",
    events: ["NQ"],
    requirements: [
      named("Hand form", ["Hǔ Zhǎo (Tiger's Claw)"]),
      named("Two fist techniques", ["Guà Gài Quán (Hanging & Capping Fist)", "Pāo Quán (Tossing Punch)"]),
      named("Bridge technique", ["Gǔn Qiáo (Rolling Bridge)"]),
      SOUTHERN_STANCES,
      ...SOUTHERN_FEET,
    ],
  },
  {
    id: "nandao",
    type: "Nandao",
    events: ["ND"],
    requirements: [
      named("Eight broadsword techniques", [
        "Chán Tóu Dāo (Twining)",
        "Guǒ Nǎo Dāo (Wrapping)",
        "Pī Dāo (Chop)",
        "Mǒ Dāo (Slicing)",
        "Gé Dāo (Parry)",
        "Jié Dāo (Intercept)",
        "Sǎo Dāo (Sweeping)",
        "Jiǎn Wàn Huā Dāo (Figure 8)",
      ]),
      SOUTHERN_STANCES,
      ...SOUTHERN_FEET,
    ],
  },
  {
    id: "nangun",
    type: "Nangun",
    events: ["NG"],
    requirements: [
      named("Eight cudgel techniques", [
        "Pī Gùn (Chop)",
        "Bēng Gùn (Tilt)",
        "Jiǎo Gùn (Enveloping)",
        "Gǔn Yā Gùn (Rolling Press)",
        "Gé Gùn (Parry)",
        "Jī Gùn (Horizontal Strike)",
        "Dǐng Gùn (Handle Planting)",
        "Pāo Gùn (Upward Strike)",
      ]),
      SOUTHERN_STANCES,
      ...SOUTHERN_FEET,
    ],
  },
  {
    id: "taijiquan",
    type: "Taijiquan",
    events: ["TQ"],
    requirements: [
      named("Eight techniques", [
        "Lǎn Què Wěi (Grasp the Peacock's Tail)",
        "Zuǒ Yòu Yě Mǎ Fēn Zōng (Part the Wild Horse's Mane, L & R)",
        "Zuǒ Yòu Lōu Xī Ào Bù (Brush Knee, L & R)",
        "Yún Shǒu (Cloud Hands)",
        "Chuān Suō (Work the Shuttle, L & R)",
        "Yǎn Shǒu Gōng Chuí (Concealed Fist)",
        "Zuǒ Yòu Dào Juǎn Gōng (Repulse Monkey, L & R)",
        "Bān Lán Chuí (Deflect, Parry and Punch)",
      ]),
      TAIJI_STANCES,
      open("Two different leg techniques", "Leg technique", 2, "Leg Technique"),
    ],
  },
  {
    id: "taijijian",
    type: "Taijijian",
    events: ["TJ"],
    requirements: [
      named("Eight sword techniques", [
        "Cì Jiàn (Thrust)",
        "Zuǒ Yòu Guà Jiàn (Hooking Parry, L & R)",
        "Liāo Jiàn (Uppercut)",
        "Diǎn Jiàn (Pointing)",
        "Pī Jiàn (Chop)",
        "Jié Jiàn (Intercept)",
        "Mǒ Jiàn (Slicing)",
        "Jiǎo Jiàn (Enveloping)",
      ]),
      TAIJI_STANCES,
    ],
  },
  {
    id: "taijishan",
    type: "Taijishan",
    events: ["TS"],
    requirements: [
      named("Eight fan techniques", [
        "Kāi Shàn (Opening)",
        "Hé Shàn (Closing)",
        "Cì Shàn (Thrust)",
        "Guà Shàn (Hooking Parry)",
        "Liāo Shàn (Uppercut)",
        "Diǎn Shàn (Dotting)",
        "Pī Shàn (Smack)",
        "Pāo Jiē Shàn (Toss & Catch)",
      ]),
      TAIJI_STANCES,
    ],
  },
  {
    id: "barehand-duilian",
    type: "Barehand Duilian",
    events: [],
    requirements: [
      open("Three fist techniques", "Fist technique", 3, "Fist"),
      open("Two palm techniques", "Palm technique", 2, "Palm"),
      open("Five leg techniques", "Leg technique", 5, "Leg Technique"),
      open("Two break-falls", "Break-fall", 2, "Break-fall"),
    ],
  },
  {
    id: "weapon-duilian",
    type: "Weapon Duilian",
    events: [],
    requirements: [open("Six weapon techniques", "Weapon technique", 6, "Weapon Technique"), open("Two leg techniques", "Leg technique", 2, "Leg Technique"), open("Break-fall", "Break-fall", 1, "Break-fall")],
  },
  {
    id: "barehand-vs-weapon-duilian",
    type: "Barehand vs. Weapon Duilian",
    events: [],
    requirements: [open("Three fist techniques", "Fist technique", 3, "Fist"), open("Four weapon techniques", "Weapon technique", 4, "Weapon Technique"), open("Two break-falls", "Break-fall", 2, "Break-fall")],
  },
  {
    id: "jiti",
    type: "Jiti (Group)",
    events: [],
    requirements: [
      open("Five hand or weapon techniques", "Hand or weapon technique", 5, "Hand or Weapon Technique"),
      open("Five stances", "Stance", 5, "Stance"),
      open("Four leg techniques", "Leg technique", 4, "Leg Technique"),
      open("Three jumps", "Jump", 3, "Jump"),
      open("Five formations", "Formation", 5, "Formation"),
    ],
  },
];

/** Every item of a set in rule order. */
export function allItems(set: RequiredMovementSet): (RequiredItem & { group: string })[] {
  return set.requirements.flatMap((r) => r.items.map((i) => ({ ...i, group: r.title })));
}

export interface PlacedItem {
  id: string;
  /** The athlete's own name for it, e.g. "Chōng Quán" for "Fist technique 1". */
  name?: string;
}

/** Copyable text for the routine order: one numbered line per item. */
export function orderToText(set: RequiredMovementSet, order: PlacedItem[]): string {
  const byId = new Map(allItems(set).map((i) => [i.id, i]));
  return order
    .flatMap((p) => byId.get(p.id) ?? [])
    .map((item, n) => `${n + 1}. ${item.label}`)
    .join("\n");
}
