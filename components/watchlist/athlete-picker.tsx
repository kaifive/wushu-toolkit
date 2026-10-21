"use client";

import { useCallback, useEffect, useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { suggestAthletes, type AthleteIndex } from "@/lib/watchlist/suggest";
import { loadAthleteIndex } from "./athlete-index";

/** Type-ahead for adding athletes, suggesting names from past competitions. */
export function AthletePicker({ exclude, onAdd }: { exclude: string[]; onAdd: (names: string[]) => void }) {
  const [index, setIndex] = useState<AthleteIndex | null>(null);
  useEffect(() => {
    void loadAthleteIndex().then(setIndex);
  }, []);

  const suggest = useCallback(
    (q: string) =>
      (index ? suggestAthletes(index, q, exclude) : []).map((a) => ({ value: a.name, detail: [a.clubs[0], a.events.slice(0, 2).join(", ")].filter(Boolean).join(" · ") })),
    [index, exclude],
  );

  return (
    <Combobox
      label="Add athletes"
      placeholder="Start typing a name"
      suggest={suggest}
      // A typed name is offered once it looks like a full name.
      allowTyped={(q) => q.split(/\s+/).length >= 2}
      typedLabel={(v) => `Add “${v}” (not in past results)`}
      onPick={(v) => onAdd([v])}
    />
  );
}
