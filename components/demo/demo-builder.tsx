"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { athleteKey } from "@/lib/domain/names";
import { nameTokens } from "@/lib/watchlist/match";
import { suggestAthletes, type AthleteIndex } from "@/lib/watchlist/suggest";
import {
  LEVELS,
  actTitle,
  fromText,
  generateOrder,
  people,
  problems,
  reconcile,
  toText,
  wouldCycle,
  type Act,
  type Demo,
  type Level,
} from "@/lib/demo/order";
import { loadAthleteIndex } from "@/components/watchlist/athlete-index";
import { Combobox, type ComboOption } from "@/components/ui/combobox";
import { moveItem, useCopy } from "@/components/ui/use-copy";

const KEY = "wt:demo:v1";

type State = Demo & { roster: string[]; generated: boolean };
const EMPTY: State = { acts: [], order: [], roster: [], generated: false };
type View = "acts" | "athletes" | "order";

const newId = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `a${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`);
const sameName = (a: string, b: string) => athleteKey(a) === athleteKey(b);
const btn = "min-h-tap rounded-card border border-line bg-surface px-3 text-sm font-semibold disabled:opacity-40";
const primary = "min-h-tap rounded-card bg-primary px-4 font-semibold text-primary-ink disabled:opacity-40";
const iconBtn = "flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-line bg-surface text-lg disabled:opacity-30";
const field = "min-h-tap w-full rounded-card border border-line bg-surface px-3";

function load(): State {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Partial<State>) };
  } catch {
    /* storage blocked */
  }
  return EMPTY;
}

/** Demo running order builder: enter acts by group or by athlete, then generate. */
export function DemoBuilder() {
  const [s, setS] = useState<State>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<View>("acts");
  const [index, setIndex] = useState<AthleteIndex | null>(null);

  useEffect(() => {
    // Restore the saved demo once on mount (storage is client-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setS(load());
    setLoaded(true);
    void loadAthleteIndex().then(setIndex);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(s));
    } catch {
      /* storage blocked */
    }
  }, [s, loaded]);

  const order = useMemo(() => reconcile(s), [s]);
  const cast = useMemo(() => {
    const inActs = people(s.acts);
    const extra = s.roster.filter((n) => !inActs.some((p) => sameName(p.name, n))).map((name) => ({ name, acts: [] as Act[] }));
    return [...inActs, ...extra].sort((a, b) => a.name.localeCompare(b.name));
  }, [s.acts, s.roster]);

  const update = (fn: (st: State) => State) => setS((st) => fn(st));
  const setActs = (fn: (acts: Act[]) => Act[]) => update((st) => ({ ...st, acts: fn(st.acts) }));
  const patchAct = (id: string, patch: Partial<Act>) => setActs((acts) => acts.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const addAct = (a: Omit<Act, "id">) => {
    const act = { ...a, id: newId() };
    update((st) => ({ ...st, acts: [...st.acts, act], order: [...reconcile(st), act.id] }));
    return act.id;
  };
  const removeAct = (id: string) =>
    setActs((acts) => acts.filter((a) => a.id !== id).map((a) => (a.follows === id ? { ...a, follows: undefined } : a)));

  /** Performer names: people already in this demo first, then past competitions. */
  const suggestPeople = useCallback(
    (q: string, exclude: string[] = []): ComboOption[] => {
      const qt = nameTokens(q);
      const local = cast
        .filter((p) => !exclude.some((e) => sameName(e, p.name)) && qt.every((t) => nameTokens(p.name).some((w) => w.startsWith(t))))
        .slice(0, 5)
        .map((p) => ({ value: p.name, detail: p.acts.length ? `In this demo · ${p.acts.length} act${p.acts.length > 1 ? "s" : ""}` : "In this demo" }));
      const past = index
        ? suggestAthletes(index, q, [...exclude, ...local.map((l) => l.value)], 5).map((a) => ({ value: a.name, detail: a.clubs[0] ?? "Past competitions" }))
        : [];
      return [...local, ...past];
    },
    [cast, index],
  );

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label="Demo view" className="grid grid-cols-3 overflow-hidden rounded-card border border-line bg-surface">
        {(
          [
            ["acts", `Groups (${s.acts.length})`],
            ["athletes", `Athletes (${cast.length})`],
            ["order", "Order"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={view === id}
            onClick={() => setView(id)}
            className={`min-h-tap px-2 text-sm font-semibold ${view === id ? "bg-primary text-primary-ink" : "text-ink-muted"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {view === "acts" && <ActsView acts={s.acts} addAct={addAct} patchAct={patchAct} removeAct={removeAct} suggestPeople={suggestPeople} />}
      {view === "athletes" && (
        <AthletesView
          cast={cast}
          acts={s.acts}
          addAct={addAct}
          patchAct={patchAct}
          suggestPeople={suggestPeople}
          addPerson={(name) => update((st) => (st.roster.some((n) => sameName(n, name)) ? st : { ...st, roster: [...st.roster, name] }))}
          removePerson={(name) =>
            update((st) => ({
              ...st,
              roster: st.roster.filter((n) => !sameName(n, name)),
              acts: st.acts.map((a) => ({ ...a, performers: a.performers.filter((p) => !sameName(p, name)) })),
            }))
          }
        />
      )}
      {view === "order" && (
        <OrderView
          acts={s.acts}
          order={order}
          generated={s.generated}
          setOrder={(o) => update((st) => ({ ...st, order: o }))}
          patchAct={patchAct}
          generate={() => update((st) => ({ ...st, order: generateOrder(st.acts, (Date.now() ^ Math.floor(Math.random() * 2 ** 31)) >>> 0), generated: true }))}
          replace={(d) => update(() => ({ ...d, roster: [], generated: true }))}
          clear={() => update(() => EMPTY)}
        />
      )}
    </div>
  );
}

// ------------------------------------------------------------------ pieces

function LevelPicker({ value, onChange, label = "Level" }: { value: Level; onChange: (l: Level) => void; label?: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1">
      {LEVELS.map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={value === l}
          aria-label={`Level ${l}`}
          onClick={() => onChange(l)}
          className={`h-11 w-11 rounded-card border text-sm font-semibold tnum ${value === l ? "border-primary bg-primary text-primary-ink" : "border-line bg-surface"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/** An act as seen from one of its performers: solos don't repeat the name. */
const ownLabel = (a: Act) => (a.kind === "solo" ? `Solo${a.name ? `: ${a.name}` : ""}` : a.name);

const LevelTag = ({ level }: { level: Level }) => <span className="shrink-0 rounded bg-surface-2 px-1.5 py-0.5 text-xs font-semibold tnum text-ink-muted">L{level}</span>;

function Chips({ items, onRemove, label }: { items: { key: string; text: React.ReactNode; aria: string }[]; onRemove: (key: string) => void; label: string }) {
  if (!items.length) return null;
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((it) => (
        <li key={it.key} className="flex min-h-tap items-center gap-1 rounded-card border border-line bg-surface-2 pl-3 text-sm">
          <span>{it.text}</span>
          <button type="button" onClick={() => onRemove(it.key)} aria-label={`Remove ${it.aria}`} className="flex h-11 w-9 items-center justify-center text-ink-muted hover:text-ink">
            ×
          </button>
        </li>
      ))}
    </ul>
  );
}

// ------------------------------------------------------------------ groups view

function ActsView({
  acts,
  addAct,
  patchAct,
  removeAct,
  suggestPeople,
}: {
  acts: Act[];
  addAct: (a: Omit<Act, "id">) => string;
  patchAct: (id: string, p: Partial<Act>) => void;
  removeAct: (id: string) => void;
  suggestPeople: (q: string, exclude?: string[]) => ComboOption[];
}) {
  const [kind, setKind] = useState<Act["kind"]>("group");
  const [name, setName] = useState("");
  const [level, setLevel] = useState<Level>(3);
  const [who, setWho] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const ready = kind === "group" ? name.trim().length > 0 : who.length === 1;

  const submit = () => {
    if (!ready) return;
    addAct({ kind, name: name.trim(), level, performers: who });
    setName("");
    setWho([]);
  };

  return (
    <>
      <section className="space-y-3 rounded-card border border-line bg-surface p-4">
        <div className="grid grid-cols-2 gap-1" role="radiogroup" aria-label="Kind">
          {(["group", "solo"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={kind === k}
              onClick={() => {
                setKind(k);
                setWho([]);
              }}
              className={`min-h-tap rounded-card border text-sm font-semibold ${kind === k ? "border-primary bg-primary-soft text-primary" : "border-line"}`}
            >
              {k === "group" ? "Group" : "Solo"}
            </button>
          ))}
        </div>
        <div>
          <label htmlFor="act-name" className="mb-1 block text-sm font-semibold">
            {kind === "group" ? "Group name" : "Routine (optional)"}
          </label>
          <input id="act-name" value={name} onChange={(e) => setName(e.target.value)} placeholder={kind === "group" ? "Beginner fan" : "Jianshu"} className={field} />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold">Level</p>
          <LevelPicker value={level} onChange={setLevel} />
        </div>
        <Chips label="Performers" items={who.map((w) => ({ key: w, text: w, aria: w }))} onRemove={(k) => setWho(who.filter((w) => w !== k))} />
        {(kind === "group" || who.length === 0) && (
          <Combobox
            label={kind === "group" ? "Performers" : "Athlete"}
            placeholder="Start typing a name"
            suggest={(q) => suggestPeople(q, who)}
            onPick={(v) => setWho(kind === "solo" ? [v] : who.some((w) => sameName(w, v)) ? who : [...who, v])}
          />
        )}
        <button type="button" disabled={!ready} onClick={submit} className={`${primary} w-full`}>
          Add {kind === "group" ? "group" : "solo"}
        </button>
      </section>

      {acts.length > 0 && (
        <ul className="space-y-2">
          {acts.map((a) => (
            <li key={a.id} className="rounded-card border border-line bg-surface">
              <button type="button" aria-expanded={open === a.id} onClick={() => setOpen(open === a.id ? null : a.id)} className="flex min-h-tap w-full items-center gap-2 px-4 py-2 text-left">
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{actTitle(a)}</span>
                  <span className="block truncate text-sm text-ink-muted">{a.kind === "solo" ? "Solo" : `${a.performers.length} performer${a.performers.length === 1 ? "" : "s"}`}</span>
                </span>
                <LevelTag level={a.level} />
                <span aria-hidden className="text-ink-muted">
                  {open === a.id ? "▴" : "▾"}
                </span>
              </button>
              {open === a.id && (
                <div className="space-y-3 border-t border-line p-4">
                  <div>
                    <label htmlFor={`n-${a.id}`} className="mb-1 block text-sm font-semibold">
                      {a.kind === "group" ? "Group name" : "Routine"}
                    </label>
                    <input id={`n-${a.id}`} value={a.name} onChange={(e) => patchAct(a.id, { name: e.target.value })} className={field} />
                  </div>
                  <LevelPicker value={a.level} onChange={(l) => patchAct(a.id, { level: l })} />
                  <Chips
                    label="Performers"
                    items={a.performers.map((p) => ({ key: p, text: p, aria: p }))}
                    onRemove={(k) => patchAct(a.id, { performers: a.performers.filter((p) => p !== k) })}
                  />
                  {(a.kind === "group" || a.performers.length === 0) && (
                    <Combobox
                      label="Add performer"
                      hideLabel
                      placeholder="Add performer"
                      suggest={(q) => suggestPeople(q, a.performers)}
                      onPick={(v) => !a.performers.some((p) => sameName(p, v)) && patchAct(a.id, { performers: [...a.performers, v] })}
                    />
                  )}
                  <button type="button" onClick={() => removeAct(a.id)} className="min-h-tap text-sm font-semibold text-ink-muted hover:text-ink">
                    Delete {a.kind}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// ------------------------------------------------------------------ athletes view

function AthletesView({
  cast,
  acts,
  addAct,
  patchAct,
  suggestPeople,
  addPerson,
  removePerson,
}: {
  cast: { name: string; acts: Act[] }[];
  acts: Act[];
  addAct: (a: Omit<Act, "id">) => string;
  patchAct: (id: string, p: Partial<Act>) => void;
  suggestPeople: (q: string, exclude?: string[]) => ComboOption[];
  addPerson: (name: string) => void;
  removePerson: (name: string) => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const groups = acts.filter((a) => a.kind === "group");

  return (
    <>
      <section className="rounded-card border border-line bg-surface p-4">
        <Combobox
          label="Add athlete"
          placeholder="Start typing a name"
          suggest={(q) => suggestPeople(q, cast.map((c) => c.name))}
          onPick={(v) => {
            addPerson(v);
            setOpen(v);
          }}
        />
      </section>
      {cast.length > 0 && (
        <ul className="space-y-2">
          {cast.map((p) => {
            const isOpen = open !== null && sameName(open, p.name);
            const solos = p.acts.filter((a) => a.kind === "solo");
            return (
              <li key={athleteKey(p.name)} className="rounded-card border border-line bg-surface">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : p.name)} className="flex min-h-tap w-full items-center gap-2 px-4 py-2 text-left">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold" data-athlete={p.name}>
                      {p.name}
                    </span>
                    <span className="block truncate text-sm text-ink-muted">{p.acts.length ? p.acts.map(ownLabel).join(" · ") : "No acts yet"}</span>
                  </span>
                  <span className="shrink-0 text-sm text-ink-muted tnum">{p.acts.length}</span>
                  <span aria-hidden className="text-ink-muted">
                    {isOpen ? "▴" : "▾"}
                  </span>
                </button>
                {isOpen && (
                  <div className="space-y-3 border-t border-line p-4">
                    <Chips
                      label={`${p.name}'s acts`}
                      items={p.acts.map((a) => ({ key: a.id, aria: actTitle(a), text: <>{ownLabel(a)} · L{a.level}</> }))}
                      onRemove={(id) => {
                        const a = acts.find((x) => x.id === id);
                        if (a) patchAct(id, { performers: a.performers.filter((x) => !sameName(x, p.name)) });
                      }}
                    />
                    <Combobox
                      label="Add to group"
                      placeholder="Group name"
                      typedLabel={(v) => `New group “${v}” (L3)`}
                      suggest={(q) =>
                        groups
                          .filter((g) => !g.performers.some((x) => sameName(x, p.name)) && g.name.toLowerCase().includes(q.toLowerCase()))
                          .slice(0, 6)
                          .map((g) => ({ value: g.name, detail: `L${g.level} · ${g.performers.length} performers` }))
                      }
                      onPick={(v) => {
                        const g = groups.find((x) => x.name.toLowerCase() === v.toLowerCase());
                        if (g) {
                          if (!g.performers.some((x) => sameName(x, p.name))) patchAct(g.id, { performers: [...g.performers, p.name] });
                        } else addAct({ kind: "group", name: v, level: 3, performers: [p.name] });
                      }}
                    />
                    <SoloForm count={solos.length} onAdd={(name, level) => addAct({ kind: "solo", name, level, performers: [p.name] })} />
                    <button type="button" onClick={() => removePerson(p.name)} className="min-h-tap text-sm font-semibold text-ink-muted hover:text-ink">
                      Remove {p.name} from the demo
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

function SoloForm({ count, onAdd }: { count: number; onAdd: (name: string, level: Level) => void }) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<Level>(3);
  return (
    <div className="space-y-2 rounded-card border border-dashed border-line p-3">
      <p className="text-sm font-semibold">Add a solo{count ? ` (has ${count})` : ""}</p>
      <input aria-label="Solo routine" value={name} onChange={(e) => setName(e.target.value)} placeholder="Routine (optional)" className={field} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <LevelPicker value={level} onChange={setLevel} label="Solo level" />
        <button
          type="button"
          onClick={() => {
            onAdd(name.trim(), level);
            setName("");
          }}
          className={btn}
        >
          Add solo
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ order view

function OrderView({
  acts,
  order,
  generated,
  setOrder,
  patchAct,
  generate,
  replace,
  clear,
}: {
  acts: Act[];
  order: string[];
  generated: boolean;
  setOrder: (o: string[]) => void;
  patchAct: (id: string, p: Partial<Act>) => void;
  generate: () => void;
  replace: (d: Demo) => void;
  clear: () => void;
}) {
  const { copied, copy } = useCopy();
  const [importing, setImporting] = useState(false);
  const [text, setText] = useState("");
  const [skipped, setSkipped] = useState<string[]>([]);
  const byId = useMemo(() => new Map(acts.map((a) => [a.id, a])), [acts]);
  const list = order.map((id) => byId.get(id)!).filter(Boolean);
  const issues = useMemo(() => problems(acts, order), [acts, order]);
  const flagged = new Set(issues.flatMap((p) => p.at));

  const doImport = () => {
    const r = fromText(text, newId);
    setSkipped(r.skipped);
    if (r.demo.acts.length) {
      replace(r.demo);
      setImporting(false);
      setText("");
    }
  };

  const pinValue = (a: Act) => (a.pin === "first" ? "first" : a.pin === "last" ? "last" : typeof a.pin === "number" ? "here" : "free");
  const setPin = (a: Act, i: number, v: string) => {
    // Only one act can be first and one last.
    if (v === "first" || v === "last") for (const o of acts) if (o.id !== a.id && o.pin === v) patchAct(o.id, { pin: undefined });
    patchAct(a.id, { pin: v === "first" ? "first" : v === "last" ? "last" : v === "here" ? i + 1 : undefined });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        <button type="button" disabled={acts.length < 2} onClick={generate} className={primary}>
          {generated ? "Regenerate" : "Generate"}
        </button>
        <button type="button" disabled={!acts.length} onClick={() => void copy(toText({ acts, order }))} className={btn}>
          {copied === "all" ? "Copied" : "Copy"}
        </button>
        <button type="button" aria-expanded={importing} onClick={() => setImporting(!importing)} className={btn}>
          Import
        </button>
      </div>
      {copied === "blocked" && <p className="text-sm text-ink-muted">Copy is blocked here. Use Import to see the text and select it.</p>}

      {importing && (
        <section className="space-y-2 rounded-card border border-line bg-surface p-4">
          <label htmlFor="demo-import" className="block text-sm font-semibold">
            Paste a copied order
          </label>
          <textarea
            id="demo-import"
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"1. Beginner Fan (L2) — Amy Lee, Dan Ng [first]\n2. Solo: Jianshu (L4) — Amy Lee"}
            className="w-full rounded-card border border-line bg-surface p-3 font-mono text-sm"
          />
          {skipped.length > 0 && <p className="text-sm text-seal">Couldn&rsquo;t read: {skipped.join(" / ")}</p>}
          <div className="flex justify-between gap-2">
            <button type="button" onClick={() => setText(toText({ acts, order }))} className={btn}>
              Load current
            </button>
            <button type="button" disabled={!text.trim()} onClick={doImport} className={primary}>
              Replace demo
            </button>
          </div>
        </section>
      )}

      {issues.length > 0 && (
        <ul className="space-y-1 rounded-card border border-warn-ink/15 bg-warn px-4 py-3 text-sm text-warn-ink">
          {issues.map((p, i) => (
            <li key={i}>{p.message}</li>
          ))}
        </ul>
      )}

      {list.length ? (
        <ol className="overflow-hidden rounded-card border border-line bg-surface">
          {list.map((a, i) => {
            const linked = !!a.follows && list[i - 1]?.id === a.follows;
            const prev = list[i - 1];
            return (
              <li key={a.id} className={`px-3 py-2 ${linked ? "border-l-4 border-l-primary" : i ? "border-t border-line" : ""} ${flagged.has(i) ? "bg-warn/50" : ""}`}>
                <div className="flex items-center gap-2">
                  <span className="w-6 shrink-0 text-right font-semibold text-ink-muted tnum">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2">
                      <span className="truncate font-semibold">{actTitle(a)}</span>
                      <LevelTag level={a.level} />
                    </p>
                    {a.kind === "group" && a.performers.length > 0 && <p className="truncate text-sm text-ink-muted">{a.performers.join(", ")}</p>}
                  </div>
                  <button type="button" disabled={i === 0} onClick={() => setOrder(moveItem(order, i, -1))} aria-label={`Move ${actTitle(a)} earlier`} className={iconBtn}>
                    ↑
                  </button>
                  <button type="button" disabled={i === list.length - 1} onClick={() => setOrder(moveItem(order, i, 1))} aria-label={`Move ${actTitle(a)} later`} className={iconBtn}>
                    ↓
                  </button>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 pl-8">
                  <select aria-label={`Lock ${actTitle(a)}`} value={pinValue(a)} onChange={(e) => setPin(a, i, e.target.value)} className="min-h-tap rounded-card border border-line bg-surface px-2 text-sm">
                    <option value="free">Free</option>
                    <option value="first">Always first</option>
                    <option value="last">Always last</option>
                    <option value="here">{typeof a.pin === "number" ? `Locked at #${a.pin}` : `Lock at #${i + 1}`}</option>
                  </select>
                  {prev && (
                    <label className="flex min-h-tap items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={a.follows === prev.id}
                        disabled={a.follows !== prev.id && (wouldCycle(acts, a.id, prev.id) || acts.some((o) => o.follows === prev.id))}
                        onChange={(e) => patchAct(a.id, { follows: e.target.checked ? prev.id : undefined })}
                        className="h-5 w-5 accent-[var(--primary)]"
                      />
                      Keep after #{i}
                    </label>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="text-ink-muted">Add groups and solos first, or import a copied order.</p>
      )}

      {list.length > 0 && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Clear the whole demo?")) clear();
            }}
            className="min-h-tap px-3 text-sm font-semibold text-ink-muted hover:text-ink"
          >
            Clear demo
          </button>
        </div>
      )}
    </>
  );
}
