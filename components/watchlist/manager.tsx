"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Notice } from "@/components/ui/notice";
import { nameTokens, parseRoster, WATCH_COLORS, type WatchList } from "@/lib/watchlist/match";
import { newId, useWatchLists, writeLists } from "@/lib/watchlist/store";
import { AthletePicker } from "./athlete-picker";

const input = "min-h-tap w-full rounded-card border border-line bg-surface px-3";

export function WatchlistManager() {
  const lists = useWatchLists();
  const update = (id: string, patch: Partial<WatchList>) => writeLists(lists.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const remove = (id: string) => writeLists(lists.filter((l) => l.id !== id));
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= lists.length) return;
    const next = [...lists];
    [next[i], next[j]] = [next[j]!, next[i]!];
    writeLists(next);
  };
  const add = () =>
    writeLists([...lists, { id: newId(), name: `List ${lists.length + 1}`, color: WATCH_COLORS[lists.length % WATCH_COLORS.length]!, athletes: [], enabled: true }]);

  return (
    <div className="space-y-4">
      {lists.length === 0 && (
        <Notice>
          Make a list per school or team, give it a color, and those athletes are highlighted on every competition page. Lists stay on this
          device.
        </Notice>
      )}
      {lists.map((l, i) => (
        <ListEditor key={l.id} list={l} first={i === 0} last={i === lists.length - 1} onChange={(p) => update(l.id, p)} onRemove={() => remove(l.id)} onMove={(d) => move(i, d)} />
      ))}
      <button type="button" onClick={add} className="min-h-12 w-full rounded-card bg-primary font-semibold text-primary-ink">
        New watch list
      </button>
      {lists.length > 1 && <p className="text-sm text-ink-muted">If an athlete is on two lists, the higher list&apos;s color wins.</p>}
    </div>
  );
}

function ListEditor({
  list,
  first,
  last,
  onChange,
  onRemove,
  onMove,
}: {
  list: WatchList;
  first: boolean;
  last: boolean;
  onChange: (p: Partial<WatchList>) => void;
  onRemove: () => void;
  onMove: (d: -1 | 1) => void;
}) {
  const [draft, setDraft] = useState(list.athletes.join("\n"));
  const [confirming, setConfirming] = useState(false);
  const saved = parseRoster(draft).join("\n") === list.athletes.join("\n");
  const oneWord = list.athletes.filter((a) => nameTokens(a).length < 2);

  return (
    <Card
      title={
        <span className="inline-flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-sm" style={{ background: list.color }} aria-hidden />
          {list.name || "Untitled"}
        </span>
      }
      context={`${list.athletes.length} athlete${list.athletes.length === 1 ? "" : "s"}${list.enabled ? "" : " · off"}`}
      action={
        <label className="flex min-h-tap cursor-pointer items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={list.enabled} onChange={(e) => onChange({ enabled: e.target.checked })} className="h-5 w-5 accent-[var(--primary)]" />
          On
        </label>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor={`name-${list.id}`}>
            Name
          </label>
          <input id={`name-${list.id}`} value={list.name} onChange={(e) => onChange({ name: e.target.value })} className={input} />
        </div>
        <fieldset>
          <legend className="mb-1 text-sm font-semibold">Color</legend>
          <div className="flex flex-wrap items-center gap-2">
            {WATCH_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Color ${c}`}
                aria-pressed={list.color === c}
                onClick={() => onChange({ color: c })}
                className={`h-11 w-11 rounded-card border-2 ${list.color === c ? "border-ink" : "border-transparent"}`}
                style={{ background: c }}
              />
            ))}
            <label className="inline-flex h-11 items-center gap-2 rounded-card border border-line px-2 text-sm">
              Custom
              <input type="color" value={list.color} onChange={(e) => onChange({ color: e.target.value })} className="h-7 w-9 cursor-pointer border-0 bg-transparent" />
            </label>
          </div>
        </fieldset>
        <AthletePicker
          exclude={parseRoster(draft)}
          onAdd={(names) => {
            const next = parseRoster([...parseRoster(draft), ...names].join("\n"));
            setDraft(next.join("\n"));
            onChange({ athletes: next });
          }}
        />
        <div>
          <label className="mb-1 block text-sm font-semibold" htmlFor={`ath-${list.id}`}>
            On this list <span className="font-normal text-ink-muted">(one per line, any name order; paste a roster here)</span>
          </label>
          <textarea
            id={`ath-${list.id}`}
            rows={Math.min(12, Math.max(4, list.athletes.length + 1))}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => onChange({ athletes: parseRoster(draft) })}
            placeholder={"Ada Chen\nOrtiz Ben\nlee_cy"}
            className="w-full rounded-card border border-line bg-surface px-3 py-2"
          />
          {oneWord.length > 0 && (
            <p className="mt-2 text-sm text-warn-ink">Add a last name so these can match: {oneWord.join(", ")}</p>
          )}
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-sm text-ink-muted">{saved ? "Saved on this device." : "Unsaved changes"}</p>
            <button
              type="button"
              disabled={saved}
              onClick={() => {
                const names = parseRoster(draft);
                setDraft(names.join("\n"));
                onChange({ athletes: names });
              }}
              className="min-h-tap rounded-card bg-primary px-4 font-semibold text-primary-ink disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-line pt-3">
          <button type="button" disabled={first} onClick={() => onMove(-1)} className="min-h-tap rounded-card border border-line px-3 font-semibold disabled:opacity-40">
            Move up
          </button>
          <button type="button" disabled={last} onClick={() => onMove(1)} className="min-h-tap rounded-card border border-line px-3 font-semibold disabled:opacity-40">
            Move down
          </button>
          <button
            type="button"
            onClick={() => (confirming ? onRemove() : setConfirming(true))}
            onBlur={() => setConfirming(false)}
            className="ml-auto min-h-tap rounded-card px-3 font-semibold text-seal"
          >
            {confirming ? "Tap again to delete" : "Delete list"}
          </button>
        </div>
      </div>
    </Card>
  );
}
