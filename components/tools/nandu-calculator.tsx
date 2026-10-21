"use client";

import { storageJson, storageSet } from "@/lib/storage";
import { useEffect, useMemo, useState } from "react";
import {
  CONN_CAP, CONN_VALUE, CONNECTION_ONLY, LANDINGS, NANDU_MAX, TECH_CAP, TECH_VALUE, TECHNIQUES,
  chainCounted, chainFromCode, isLanding, chainToCode, familyOfEvent, nextOptions, scoreNandu, technique, type Chain, type Family,
} from "@/lib/rules/iwuf-2024/nandu";
import { EVENTS } from "@/lib/rules";
import { moveItem, useCopy } from "@/components/ui/use-copy";
import type { EventCode } from "@/lib/domain/types";

const EVENT_CODES: EventCode[] = ["CQ", "DS", "JS", "GS", "QS", "NQ", "ND", "NG", "TQ", "TJ", "TS"];

const KEY = "wt:nandu:v2";
const fmt = (n: number) => n.toFixed(2).replace(/0$/, "");
const field = "min-h-tap w-full rounded-card border border-line bg-surface px-3";

function stepLabel(family: Family, code: string): string {
  if (isLanding(code)) return LANDINGS[code]?.english ?? `+${code}`;
  return technique(family, code)?.english ?? CONNECTION_ONLY[code] ?? code;
}

function load(): { event: EventCode; chains: Chain[] } {
  const s = storageJson(KEY) as { event?: unknown; chains?: unknown } | null;
  // Old or hand-edited values: keep only well-formed chains.
  if (s && typeof s === "object") {
    const event = EVENT_CODES.includes(s.event as EventCode) ? (s.event as EventCode) : "CQ";
    const chains = Array.isArray(s.chains)
      ? s.chains.filter((c): c is Chain => !!c && Array.isArray((c as Chain).steps) && (c as Chain).steps.every((x) => typeof x === "string"))
      : [];
    return { event, chains };
  }
  return { event: "CQ", chains: [] };
}

export function NanduCalculator() {
  const [event, setEvent] = useState<EventCode>("CQ");
  const { family, weapon } = familyOfEvent(event);
  const [chains, setChains] = useState<Chain[]>([]);
  const [codes, setCodes] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const s = load();
    // Restore the saved routine once on mount (storage is client-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvent(s.event);
    setChains(s.chains);
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    storageSet(KEY, JSON.stringify({ event, chains }));
  }, [event, chains, loaded]);

  const score = useMemo(() => scoreNandu(family, chains, { weapon }), [family, chains, weapon]);
  const move = (i: number, d: -1 | 1) => setChains(moveItem(chains, i, d));
  const setChain = (i: number, ch: Chain | null) => setChains(ch ? chains.map((c, j) => (j === i ? ch : c)) : chains.filter((_, j) => j !== i));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="family" className="mb-1 block text-sm font-semibold">
            Event
          </label>
          <select
            id="family"
            value={event}
            onChange={(e) => {
              const next = e.target.value as EventCode;
              // Switching to another difficulty family clears elements that don't exist there.
              if (familyOfEvent(next).family !== family) setChains([]);
              setEvent(next);
            }}
            className={field}
          >
            {EVENT_CODES.map((c) => (
              <option key={c} value={c}>
                {EVENTS[c].name} ({EVENTS[c].english})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="codes" className="mb-1 block text-sm font-semibold">
            Load codes
          </label>
          <div className="flex gap-2">
            <input id="codes" value={codes} onChange={(e) => setCodes(e.target.value)} placeholder="353B+323C+1, 324B+1" className={field} />
            <button
              type="button"
              onClick={() => {
                // "353B + 323C + 1" is one chain: join around "+", then split on commas, semicolons or spaces.
                const parsed = codes
                  .replace(/\s*\+\s*/g, "+")
                  .split(/[,;\s]+/)
                  .filter(Boolean)
                  .map(chainFromCode)
                  .filter((c) => c.steps.length);
                if (parsed.length) setChains(parsed);
              }}
              className="min-h-tap shrink-0 rounded-card border border-line px-3 font-semibold"
            >
              Load
            </button>
          </div>
        </div>
      </div>

      <section aria-live="polite" className="sticky top-14 z-20 rounded-card border border-line bg-surface p-4 md:top-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm text-ink-muted">Difficulty (C panel)</p>
            <p className="font-display text-4xl font-bold tnum">
              {score.total.toFixed(2)}
              <span className="text-xl text-ink-muted"> / {NANDU_MAX.toFixed(2)}</span>
            </p>
          </div>
          <p className={`text-right text-sm font-semibold ${score.total >= NANDU_MAX ? "text-jade" : "text-ink-muted"}`}>
            {score.total >= NANDU_MAX ? "Full difficulty" : `${fmt(NANDU_MAX - score.total)} to go`}
          </p>
        </div>
        <Bar label="Techniques" value={score.techniqueRaw} cap={TECH_CAP} />
        <Bar label="Connections" value={score.connectionRaw} cap={CONN_CAP} />
      </section>

      <ol className="space-y-3">
        {chains.map((ch, i) => (
          <li key={i}>
            <ChainEditor
              family={family}
              weapon={weapon}
              chain={ch}
              scored={score.chains[i]}
              index={i}
              count={chains.length}
              onMove={(d) => move(i, d)}
              onChange={(c) => setChain(i, c)}
            />
          </li>
        ))}
      </ol>

      <AddElement family={family} weapon={weapon} onAdd={(code) => setChains([...chains, { steps: [code] }])} />

      {score.warnings.length > 0 && (
        <section role="alert" className="rounded-card border border-warn-ink/15 bg-warn p-3 text-warn-ink">
          <h2 className="font-semibold">Rule breaks ({score.warnings.length})</h2>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
            {score.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </section>
      )}

      {chains.length > 0 && <RegistrationCodes chains={chains} score={score} />}
    </div>
  );
}

/** Codes in routine order, ready to type into a registration form. */
function RegistrationCodes({ chains, score }: { chains: Chain[]; score: ReturnType<typeof scoreNandu> }) {
  const { copied, copy } = useCopy();
  const codes = chains.map(chainToCode);
  return (
    <section className="overflow-hidden rounded-card border border-line bg-surface">
      <header className="flex min-h-12 items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2">
        <h2 className="text-[15px] font-semibold">Registration codes</h2>
        <button type="button" onClick={() => void copy(codes.join(", "), "all")} className="min-h-tap rounded-card bg-primary px-4 font-semibold text-primary-ink">
          {copied === "all" ? "Copied" : "Copy all"}
        </button>
      </header>
      <ol className="divide-y divide-line">
        {codes.map((code, i) => {
          const sc = score.chains[i];
          const v = chainCounted(sc);
          return (
            <li key={i} className="flex items-center gap-3 px-4 py-2">
              <span className="w-5 text-ink-muted tnum">{i + 1}</span>
              <code className="flex-1 select-all font-mono text-lg font-semibold">{code}</code>
              <span className="tnum text-sm text-ink-muted">{fmt(v)}</span>
              <button type="button" onClick={() => void copy(code, code)} aria-label={`Copy ${code}`} className="min-h-tap rounded-card border border-line px-3 text-sm font-semibold">
                {copied === code ? "Copied" : "Copy"}
              </button>
            </li>
          );
        })}
      </ol>
      <p className="border-t border-line px-4 py-2 text-sm text-ink-muted">
        {copied === "blocked" ? "Copy is blocked here; press and hold a code to select it." : `Total ${score.total.toFixed(2)}`}
      </p>
    </section>
  );
}

/** A value, with the cut shown when the cap reduces it. */
function Value({ value, counted, prefix = "" }: { value: number; counted: number; prefix?: string }) {
  if (counted >= value) return <>{prefix + fmt(value)}</>;
  return (
    <span title="Over the cap: only this last element loses value">
      <s>{prefix + fmt(value)}</s> <span className="font-semibold text-ink">{counted > 0 ? prefix + fmt(counted) : "0"} over cap</span>
    </span>
  );
}

function Bar({ label, value, cap }: { label: string; value: number; cap: number }) {
  const over = value > cap;
  return (
    <div className="mt-3">
      <div className="flex justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="tnum text-ink-muted">
          {fmt(Math.min(value, cap))} / {fmt(cap)}
          {over ? ` (${fmt(value)})` : ""}
        </span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-line" aria-hidden>
        <div className={`h-full ${value >= cap ? "bg-jade" : "bg-primary"}`} style={{ width: `${Math.min(1, value / cap) * 100}%` }} />
      </div>
    </div>
  );
}

function AddElement({ family, weapon, onAdd }: { family: Family; weapon: boolean; onAdd: (code: string) => void }) {
  const groups: [string, string][] = [
    ["jump", "Jumps"],
    ["balance", "Balances"],
    ["leg", "Leg techniques"],
    ["tumbling", "Tumbling"],
  ];
  return (
    <div>
      <label htmlFor="add" className="mb-1 block text-sm font-semibold">
        Add a difficulty element
      </label>
      <select
        id="add"
        value=""
        onChange={(e) => e.target.value && onAdd(e.target.value)}
        className={`${field} font-semibold text-primary`}
      >
        <option value="">Choose a jump, balance or kick…</option>
        {groups.map(([cat, label]) => {
          const list = TECHNIQUES[family].filter((x) => x.category === cat);
          return list.length ? (
            <optgroup key={cat} label={label}>
              {list.map((x) => (
                <option key={x.code} value={x.code}>
                  {x.english} · {x.code} · {fmt(TECH_VALUE[x.grade])}
                </option>
              ))}
            </optgroup>
          ) : null;
        })}
        {family === "changquan" && weapon && (
          <optgroup label="Connection only">
            <option value="445A">Forward dive roll (for throw and catch) · 445A · 0</option>
          </optgroup>
        )}
      </select>
    </div>
  );
}

function ChainEditor({
  family,
  weapon,
  chain,
  scored,
  index,
  count,
  onMove,
  onChange,
}: {
  family: Family;
  weapon: boolean;
  chain: Chain;
  scored?: ReturnType<typeof scoreNandu>["chains"][number];
  index: number;
  count: number;
  onMove: (d: -1 | 1) => void;
  onChange: (c: Chain | null) => void;
}) {
  const last = chain.steps[chain.steps.length - 1]!;
  const ended = isLanding(last);
  const options = ended ? [] : nextOptions(family, last).filter((o) => weapon || !o.code.endsWith("+9")); // throw and catch needs a weapon
  const value = chainCounted(scored);
  let li = 0;

  return (
    <div className="rounded-card border border-line bg-surface">
      <div className="flex items-center justify-between gap-2 border-b border-line bg-surface-2 px-4 py-2">
        <p className="text-sm">
          <span className="font-semibold">Element {index + 1}</span>
          <span className="text-ink-muted"> · {chainToCode(chain)} · {fmt(value)}</span>
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove(-1)}
            aria-label={`Move element ${index + 1} earlier`}
            className="flex h-11 w-11 items-center justify-center rounded-card border border-line bg-surface text-lg disabled:opacity-30"
          >
            ↑
          </button>
          <button
            type="button"
            disabled={index === count - 1}
            onClick={() => onMove(1)}
            aria-label={`Move element ${index + 1} later`}
            className="flex h-11 w-11 items-center justify-center rounded-card border border-line bg-surface text-lg disabled:opacity-30"
          >
            ↓
          </button>
          <button type="button" onClick={() => onChange(null)} className="min-h-tap px-2 text-sm font-semibold text-ink-muted hover:text-ink">
            Remove
          </button>
        </div>
      </div>
      <ol className="space-y-2 p-4">
        {chain.steps.map((s, i) => {
          const landing = isLanding(s);
          const tech = landing ? undefined : scored?.techniques.find((t, k) => k === chain.steps.slice(0, i + 1).filter((x) => !isLanding(x)).length - 1);
          const link = i > 0 ? scored?.links[li++] : undefined;
          return (
            <li key={i} className="space-y-1">
              {link && (
                <p className={`text-sm ${link.listed ? "text-ink-muted" : "text-seal"}`}>
                  {link.listed
                    ? <>Connection {link.grade} · <Value value={link.value} counted={link.counted} prefix="+" />{link.steps ? ` · within ${link.steps} step${link.steps > 1 ? "s" : ""}` : ""}</>
                    : "Not a listed connection · +0"}
                  {link.note ? ` · ${link.note}` : ""}
                </p>
              )}
              <p className="flex items-center justify-between gap-3">
                <span className="font-semibold">{landing ? `Land in ${stepLabel(family, s).toLowerCase()}` : stepLabel(family, s)}</span>
                {!landing && <span className="shrink-0 tnum text-sm text-ink-muted">{tech?.grade ? <>{tech.grade} · <Value value={tech.value} counted={tech.counted} /></> : "0"}</span>}
              </p>
            </li>
          );
        })}
      </ol>
      <div className="flex flex-col gap-2 border-t border-line p-4 sm:flex-row">
        {options.length > 0 && (
          <select
            aria-label={`Then, for element ${index + 1}`}
            value=""
            onChange={(e) => e.target.value && onChange({ steps: [...chain.steps, e.target.value] })}
            className={field}
          >
            <option value="">Then… (connection)</option>
            {options.map((o) => {
              const next = o.code.slice(last.length + 1);
              const landing = isLanding(next);
              return (
                <option key={o.code} value={next}>
                  {landing ? `Land in ${stepLabel(family, next).toLowerCase()}` : `Into ${stepLabel(family, next)}`} · {o.grade} +{fmt(CONN_VALUE[o.grade])}
                  {o.steps ? ` (≤${o.steps} steps)` : ""}
                </option>
              );
            })}
          </select>
        )}
        {chain.steps.length > 1 && (
          <button type="button" onClick={() => onChange({ steps: chain.steps.slice(0, -1) })} className="min-h-tap shrink-0 rounded-card border border-line px-3 font-semibold">
            Undo last
          </button>
        )}
      </div>
    </div>
  );
}
