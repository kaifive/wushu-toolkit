# Wushu Toolkit

Live standings, team projections, scorecards and rules tools for wushu taolu
competitions. Mobile-first, built for the stands.

- **Stack:** Next.js (App Router), TypeScript strict, Tailwind CSS v4, Vercel.
- **Data:** one `DataSource` interface over Google Sheets/Docs, Sportdata,
  JSON APIs and committed snapshots (`lib/data/`).
- **Events:** one config file per competition (`content/events/`).
- **Rules:** versioned rulesets with sources (`lib/rules/`).
- **Accounts:** Firebase Auth, one device per account, per-competition passes.

## Develop

```
npm install
cp .env.example .env.local   # optional: Firebase keys for accounts
npm run dev
npm run check                # typecheck + lint
npm test                     # unit tests
npm run build
```

## Docs

- [Roadmap](docs/ROADMAP.md): what's done and what's next
- [Decisions](docs/DECISIONS.md): architecture decisions (ADRs)
- [Open questions](docs/OPEN_QUESTIONS.md)
- [Adding an event](docs/ADDING_AN_EVENT.md)

## Operations

- Grant a pass: `FIREBASE_SERVICE_ACCOUNT=... npm run grant -- <email> <event-slug>`
  (or the admin panel on `/account` for uids in `ADMIN_UIDS`).
- Snapshot an event: `npm run snapshot -- <slug>`, or run the "Snapshot event
  data" workflow from the Actions tab.
- Old GitHub Pages redirect: `npm run legacy-redirect` writes
  `legacy-redirect/` for the `gh-pages` branch (ADR-007).

The previous Vite + CoreUI app is kept in `legacy/` for reference.

Not affiliated with USAWKF, IWUF or any event organizer.
