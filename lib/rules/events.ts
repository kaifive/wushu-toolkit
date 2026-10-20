import type { Discipline, EventCode, EventKind } from "@/lib/domain/types";

export interface EventDef {
  code: EventCode;
  name: string;
  english: string;
  discipline: Discipline;
  kind: EventKind;
  /** Short or long weapon (2024 dashboards), undefined for barehand. */
  weaponClass?: "short" | "long";
}

/** The taolu events used across all rulesets. */
export const EVENTS: Record<EventCode, EventDef> = {
  CQ: { code: "CQ", name: "Changquan", english: "Long Fist", discipline: "changquan", kind: "barehand" },
  DS: { code: "DS", name: "Daoshu", english: "Broadsword", discipline: "changquan", kind: "weapon", weaponClass: "short" },
  JS: { code: "JS", name: "Jianshu", english: "Straight Sword", discipline: "changquan", kind: "weapon", weaponClass: "short" },
  GS: { code: "GS", name: "Gunshu", english: "Staff", discipline: "changquan", kind: "weapon", weaponClass: "long" },
  QS: { code: "QS", name: "Qiangshu", english: "Spear", discipline: "changquan", kind: "weapon", weaponClass: "long" },
  NQ: { code: "NQ", name: "Nanquan", english: "Southern Fist", discipline: "nanquan", kind: "barehand" },
  ND: { code: "ND", name: "Nandao", english: "Southern Broadsword", discipline: "nanquan", kind: "weapon", weaponClass: "short" },
  NG: { code: "NG", name: "Nangun", english: "Southern Staff", discipline: "nanquan", kind: "weapon", weaponClass: "long" },
  TQ: { code: "TQ", name: "Taijiquan", english: "Tai Chi", discipline: "taijiquan", kind: "barehand" },
  TJ: { code: "TJ", name: "Taijijian", english: "Tai Chi Sword", discipline: "taijiquan", kind: "weapon", weaponClass: "short" },
  TS: { code: "TS", name: "Taijishan", english: "Tai Chi Fan", discipline: "taijiquan", kind: "weapon", weaponClass: "short" },
};

export const DISCIPLINE_LABEL: Record<Discipline, string> = {
  changquan: "Changquan",
  nanquan: "Nanquan",
  taijiquan: "Taijiquan",
};

export const eventDef = (code: EventCode | undefined) => (code ? EVENTS[code] : undefined);
