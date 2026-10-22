# Architecture decisions

Each decision is an ADR. To change one, add a new ADR that supersedes it.

---

## ADR-001 — Next.js App Router + TypeScript + Tailwind on Vercel

**Status:** accepted

The old app was a CoreUI admin template (React + Vite + Redux + MUI + CoreUI +
Chart.js) with an Express scraping server that only ran on a laptop. Most of
the bundle was template demo code.

**Decision:** Next.js App Router, TypeScript `strict`, Tailwind CSS v4,
deployed on Vercel.

- Static generation and ISR first. Archived events are fully static. Live
  events revalidate on a short interval (30–60 s) instead of every phone
  polling Google directly.
- Route handlers replace the Express server. Scraping uses `fetch` plus a
  small HTML parser. **No puppeteer in production.**
- No component libraries. Hand-written components on Tailwind. Icons are
  inline SVG.
- Client JS only where needed (filters, live refresh, auth).

---

## ADR-002 — One `DataSource` interface for every data path

**Status:** accepted

Competition data has come from five places: a JSON API (bowuu, 2024), live
Sportdata HTML, Google Sheets (gviz JSON and CSV), published Google Docs, and
pre-scraped snapshots committed to the repo.

**Decision:** every source implements `DataSource` in `lib/data/`. It returns
normalized domain types (`Registration`, `ScoreEntry`, `ScheduleBlock`) from
`lib/domain/`. Pages never know where data came from. Adapters are pure
functions over `fetch` and can be tested with saved fixtures.

Sources can be layered: `withFallback(primary, snapshot)` serves the snapshot
when the live source fails, which is what the 2024 page did by hand.

---

## ADR-003 — Each competition is a config file

**Status:** accepted

The old app had a hand-built folder of pages per competition, each with its
own copy of standings, schedule and team logic.

**Decision:** a competition is one file in `content/events/<slug>.ts`
describing its dates, ruleset, data sources, divisions and which views it
has. One shared engine under `app/events/[slug]/` renders every event.
Archived events keep their data as committed snapshots so they never break
when an upstream sheet disappears.

---

## ADR-004 — Rules are versioned data with citations

**Status:** accepted

**Decision:** `lib/rules/` holds rulesets as typed data, each with a `source`
(document, revision, URL) and a `verified` flag. Selection math is a pure
function parameterized by the ruleset, so last year's events keep last year's
rules.

- `usawkf-junior-trials-2025-26` (r15) for the current junior trials.
- Deductions, nandu and judging come from the IWUF 2024 Taolu Competition
  Rules, which the USAWKF document defers to.
- Data that has not been checked against the official document is marked
  `verified: false` and the UI shows a "pending verification" note.

---

## ADR-005 — Accounts: Firebase Auth, single-device session lock, per-competition entitlements

**Status:** accepted (payments deferred)

Access to current competitions is sold per competition, and an account may be
signed in on only one device at a time.

**Decision:**

- **Auth:** Firebase Auth, email + password (the project the old app already
  used), with email-link sign-in as a later option. The client SDK is loaded
  only on account and gated pages.
- **Session lock:** on sign-in the client creates a random `sessionId` and
  calls `POST /api/session`, which writes `sessions/{uid} = { sessionId,
  device, updatedAt }` with the Admin SDK. The newest sign-in wins. Each
  client listens to its own `sessions/{uid}` doc and signs out with a "signed
  in on another device" notice when the id changes. Gated API routes also
  check the `x-session-id` header against the doc, so the lock holds even
  if a client ignores the listener.
- **Entitlements:** `entitlements/{uid}` = `{ events: { [slug]: { grantedAt,
  grantedBy, source: "manual" | "purchase", expiresAt? } } }`. Only the
  Admin SDK writes it. Firestore rules deny client writes to `sessions` and
  `entitlements`.
- **Gating:** archived events are public and static. A current event marked
  `access: "paid"` renders its shell statically and loads its data from
  `/api/events/[slug]/data`, which verifies the ID token, session and
  entitlement.
- **Granting:** manual first: `npm run grant -- <email> <event-slug>` and an
  admin page restricted to admin uids. Payments plug into the same
  entitlement write later.

---

## ADR-006 — Vercel Hobby forbids commercial use

**Status:** accepted, **action needed before payments**

Vercel's Hobby plan is for non-commercial personal use only. Selling access
(taking payments) counts as commercial use.

**Decision:** build and launch free features on Hobby. **Before payments go
live, move to Vercel Pro (about $20/month per member) or to another host.**
This must be raised with Khai again before any payment work merges.

---

## ADR-007 — Redirect the old GitHub Pages URL, including hash routes

**Status:** accepted

The old app is at `kaifive.github.io/wushu-toolkit` and used `HashRouter`, so
real URLs look like `/wushu-toolkit/#/2026-pwc/male-standings`. Servers never
see the hash, so a server redirect cannot preserve it.

**Decision:** replace the `gh-pages` branch contents with one static
`index.html` (plus `404.html`) that reads `location.hash`, maps the old route
to the new path with `lib/legacy-routes.ts` (shared table, exported as JSON),
and calls `location.replace(newOrigin + newPath)`. Unknown routes go to the
home page. A `<noscript>` link and a meta refresh cover no-JS clients.

Pushing to `gh-pages` takes the old site down, so it waits for an explicit go
from Khai after the Vercel site is live.

---

## ADR-008 — Sportdata registration is pre-scraped on a schedule

**Status:** accepted

Sportdata pages are slow and sometimes captcha-protected, and the old flow
required running scripts by hand.

**Decision:** a GitHub Action (`.github/workflows/snapshot.yml`) runs
`scripts/snapshot.ts` on a schedule for each event whose config enables it,
and commits normalized JSON to `data/snapshots/<slug>/`. The next Vercel
deploy picks it up. Live scorecard scraping stays available as a source with
ISR caching, and falls back to the latest snapshot.

## ADR-009 — Watch lists sync through the server, merged on sign-in

**Status:** accepted (2026-10-21)

Watch lists stay in localStorage so highlighting works without an account.
Signed-in users also get a copy in Firestore `watchlists/{uid}`, read and
written only through `/api/watchlists` (Admin SDK, session-checked, input
cleaned and size-limited), matching ADR-005's "clients never write".

On sign-in the device merges with the account: if nothing changed locally
since the last sync, the account copy wins (so deletions made on another
device stick); otherwise lists merge by id, athletes are combined and this
device's name, colour and on/off win. After that each change is saved,
debounced. The single-device lock (ADR-005) makes simultaneous edits rare,
so no finer conflict handling is needed.

## ADR-010 — System font, as in v1

**Status:** accepted (2026-10-22). Replaces the Barlow / Barlow Condensed choice in DESIGN_AUDIT.

Khai found Barlow still read as "AI-made". v1 (CoreUI 5) used the device's
own font (`system-ui`, San Francisco, Segoe UI, Roboto…), so v2 does too:
nothing is downloaded, it looks native on every phone, and headings use the
same family in bold with normal letter-spacing. Exports draw with the same
stack.

## ADR-011 — Single-device lock decided by server claim times

**Status:** accepted (2026-10-22). Refines ADR-005.

Comparing "server session id vs local id" raced with stale snapshots,
other tabs and sign-ins in progress. Now `/api/session` returns the server
time of each claim and the device stores it with its session id. A device
signs out only when the server holds a different session recorded *after*
its own claim (`sessionVerdict` in `lib/auth/model.ts`, unit-tested). A
claim still in flight counts as pending (other tabs wait) and expires after
30s. Sign-in state is one shared store per page, so every component sees
the same status.

## ADR-012 — Snapshot fallback lives in `liveWithSnapshot`

**Status:** accepted (2026-10-22). Replaces the `withFallback` helper named in ADR-002.

Events read live with a saved copy behind them. Pages get the saved copy
(marked stale) when the live source fails **or has lost more than half of
its scored routines** (a cleared or rearranged sheet); a corrected or
removed score stays live. The snapshot script reads live only
(`liveOnly`) and refuses any drop in scored routines unless run with
`--force`. The generic `withFallback` had no other user and was removed.

## ADR-013 — Official results beat hand-kept sheets

Date: 2026-10-22. Status: accepted.

When USAWKF publishes results for a competition (usawkf.org/competition-results),
that page is the primary source and team rules are checked against its
published teams (docs/DATA_AUDIT.md). Hand-kept sheets are only for live
scoring before the official page exists. The 2025–26 junior team rule and
the 2025 adult category rule were corrected to match the official results.

