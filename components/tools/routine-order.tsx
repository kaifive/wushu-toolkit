"use client";

import { useEffect, useMemo, useState } from "react";
import { allItems, orderToText, type PlacedItem, type RequiredMovementSet } from "@/lib/rules/iwuf-2024/required-movements";
import { moveItem, useCopy } from "@/components/ui/use-copy";

const KEY = "wt:required-order:v1";

type Saved = { set: string; orders: Record<string, PlacedItem[]> };

function load(fallback: string): Saved {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Saved;
  } catch {
    /* storage blocked */
  }
  return { set: fallback, orders: {} };
}

const iconBtn = "flex h-11 w-11 shrink-0 items-center justify-center rounded-card border border-line bg-surface text-lg disabled:opacity-30";

/**
 * Required movements: tap each one into routine order, name the open ones,
 * then copy the list for the compulsory content registration form.
 */
export function RoutineOrder({ sets }: { sets: RequiredMovementSet[] }) {
  const [setId, setSetId] = useState(sets[0]?.id ?? "");
  const [orders, setOrders] = useState<Record<string, PlacedItem[]>>({});
  const [loaded, setLoaded] = useState(false);
  const { copied, copy } = useCopy();

  useEffect(() => {
    const s = load(sets[0]?.id ?? "");
    // Restore the saved orders once on mount (storage is client-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sets.some((x) => x.id === s.set)) setSetId(s.set);
    setOrders(s.orders);
    setLoaded(true);
  }, [sets]);
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ set: setId, orders } satisfies Saved));
    } catch {
      /* storage blocked */
    }
  }, [setId, orders, loaded]);

  const set = sets.find((s) => s.id === setId) ?? sets[0]!;
  const items = useMemo(() => allItems(set), [set]);
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  // Drop saved ids that no longer exist in the rules.
  const order = (orders[set.id] ?? []).filter((p) => byId.has(p.id));
  const placed = new Set(order.map((p) => p.id));
  const setOrder = (next: PlacedItem[]) => setOrders({ ...orders, [set.id]: next });
  const text = orderToText(set, order);

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="mv-set" className="mb-1 block text-sm font-semibold">
          Routine
        </label>
        <select id="mv-set" value={set.id} onChange={(e) => setSetId(e.target.value)} className="min-h-tap w-full rounded-card border border-line bg-surface px-3">
          {sets.map((s) => (
            <option key={s.id} value={s.id}>
              {s.type}
            </option>
          ))}
        </select>
      </div>

      <section className="overflow-hidden rounded-card border border-line bg-surface">
        <header className="flex min-h-12 items-center justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2">
          <h2 className="text-[15px] font-semibold">
            Routine order <span className="font-normal text-ink-muted tnum">· {order.length} of {items.length}</span>
          </h2>
          <button
            type="button"
            disabled={!order.length}
            onClick={() => void copy(text)}
            className="min-h-tap rounded-card bg-primary px-4 font-semibold text-primary-ink disabled:opacity-40"
          >
            {copied === "all" ? "Copied" : "Copy"}
          </button>
        </header>
        <div className="h-1.5 bg-line" aria-hidden>
          <div className="h-full bg-jade transition-all" style={{ width: `${items.length ? (order.length / items.length) * 100 : 0}%` }} />
        </div>
        {order.length ? (
          <ol className="divide-y divide-line">
            {order.map((p, i) => {
              const item = byId.get(p.id)!;
              return (
                <li key={p.id} className="flex items-center gap-2 px-3 py-2">
                  <span className="w-6 shrink-0 text-right text-ink-muted tnum">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-[15px] ${item.open ? "text-sm text-ink-muted" : "font-semibold"}`}>{item.label}</p>
                    {item.open && (
                      <input
                        aria-label={`Name for ${item.label}`}
                        value={p.name ?? ""}
                        onChange={(e) => setOrder(order.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
                        placeholder="Which one?"
                        className="mt-1 min-h-tap w-full rounded-card border border-line bg-surface px-3 font-semibold"
                      />
                    )}
                  </div>
                  <button type="button" disabled={i === 0} onClick={() => setOrder(moveItem(order, i, -1))} aria-label={`Move ${item.label} earlier`} className={iconBtn}>
                    ↑
                  </button>
                  <button type="button" disabled={i === order.length - 1} onClick={() => setOrder(moveItem(order, i, 1))} aria-label={`Move ${item.label} later`} className={iconBtn}>
                    ↓
                  </button>
                  <button type="button" onClick={() => setOrder(order.filter((_, j) => j !== i))} aria-label={`Remove ${item.label}`} className={`${iconBtn} text-ink-muted hover:text-ink`}>
                    ×
                  </button>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="px-4 py-3 text-sm text-ink-muted">Tap movements below in the order they appear in your routine.</p>
        )}
        {copied === "blocked" && <p className="border-t border-line px-4 py-2 text-sm text-ink-muted">Copy is blocked here; press and hold to select the text.</p>}
        {order.length > 0 && (
          <div className="flex justify-end border-t border-line px-2 py-1">
            <button type="button" onClick={() => setOrder([])} className="min-h-tap px-3 text-sm font-semibold text-ink-muted hover:text-ink">
              Clear
            </button>
          </div>
        )}
      </section>

      {set.requirements.map((r) => {
        const left = r.items.filter((it) => !placed.has(it.id));
        return (
          <section key={r.title} className="rounded-card border border-line bg-surface">
            <header className="flex items-baseline justify-between gap-3 border-b border-line bg-surface-2 px-4 py-2">
              <h3 className="text-sm font-semibold">{r.title}</h3>
              <span className={`shrink-0 text-sm tnum ${left.length ? "text-ink-muted" : "font-semibold text-jade"}`}>
                {left.length ? `${r.items.length - left.length} / ${r.items.length}` : "Done"}
              </span>
            </header>
            {r.note && <p className="px-4 pt-2 text-sm text-ink-muted">{r.note}</p>}
            {left.length > 0 && (
              <ul className="flex flex-wrap gap-2 p-3">
                {left.map((it) => (
                  <li key={it.id}>
                    <button
                      type="button"
                      onClick={() => setOrder([...order, { id: it.id }])}
                      className="min-h-tap rounded-card border border-line bg-surface px-3 text-left text-sm font-semibold hover:border-primary"
                    >
                      + {it.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
