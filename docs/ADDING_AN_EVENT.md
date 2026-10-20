# Adding an event

1. Create `content/events/<slug>.ts` exporting an `EventConfig`
   (see `lib/events/types.ts`). Copy the closest existing event:
   - Sportdata registration + scorecards: use `sportdataRegistration` /
     `sportdataScores` from `lib/data/sportdata.ts` (`verid` is in the
     Sportdata URL, `filter` is a word that appears in this event's category
     names).
   - Organizer Google Sheet: see `content/events/2026-pwc.ts`.
   - Hand-tracked published sheet: see `content/events/2025-juniors.ts`.
2. Wrap the live source with `liveWithSnapshot(live, snapshotSource(SNAPSHOTS, "<slug>"))`
   so the page falls back to the last saved copy.
3. Pick the ruleset (`rulesetId`) and the views to show.
4. For a paid event set `status: "live"` and `access: "paid"`.
   **Payments: Vercel Hobby forbids commercial use (ADR-006).**
5. To pre-scrape on a schedule set `snapshot: { until: "<end date>" }`.
6. Register it in `content/events/index.ts`.
7. `npm run check && npm test && npm run build`.
