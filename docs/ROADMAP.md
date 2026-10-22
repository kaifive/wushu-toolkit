# Roadmap

Resume from the first unchecked item. One commit per item.

## Phase 0 — Groundwork
- [x] Move the old app to `legacy/`
- [x] CLAUDE.md, ROADMAP, DECISIONS, OPEN_QUESTIONS

## Phase 1 — Scaffold
- [x] Next.js + TS strict + Tailwind, `check` / `test` / `build` scripts green
- [x] App shell: top nav (desktop), bottom tab bar (mobile), 44px targets

## Phase 2 — Data layer
- [x] Domain types (`lib/domain`)
- [x] `DataSource` interface + snapshot fallback (`liveWithSnapshot`, ADR-012)
- [x] Google Sheets adapter (gviz JSON + CSV)
- [x] Published Google Doc adapter (JSON body and Sportdata scorecard HTML)
- [x] JSON API adapter (bowuu)
- [x] Snapshot adapter (`data/snapshots/`)
- [x] Sportdata adapter (registration, categories, scorecards) with saved fixtures (scorecard fixture synthetic, see OPEN_QUESTIONS #9)

## Phase 3 — Rules engine
- [x] `lib/rules` types + registry
- [x] USAWKF 2025–26 Junior Trials (r15): age groups, events, time limits, music, selection math
- [x] Legacy rulesets for archived events (2024 juniors, 2025 adults, 2025 juniors, PWC)
- [x] IWUF 2024 deduction codes: Tables 10-1-1 to 10-1-6 and 10-4-1 from the official PDF
- [x] IWUF 2024 nandu data: technique and connection tables (10-3-3 to 10-3-9) from the official PDF

## Phase 4 — Event engine
- [x] Event config types + registry (`content/events`)
- [x] Archived configs: 2024 Junior Trials, 2025 Adult Trials, 2025 Phoenix, 2025 Junior Trials (r15), 2026 PWC
- [ ] Current config: next paid competition (OPEN_QUESTIONS #10; the 2025–26 trials already happened and are archived on r15)
- [x] Event pages: overview, standings, schedule, team projection, scorecards, all-around
- [x] Mobile tables at 375px (sticky first column, no page-level scroll; checked with Playwright)
- [ ] Snapshot 2026 PWC and 2025 Junior Trials scores once Google Sheets is reachable (`npm run snapshot -- <slug>`)

## Phase 5 — Tools
- [x] Deduction code lookup
- [x] Required movements: IWUF 2024 Articles 29–33, put in routine order and copy for registration
- [x] Average score calculator (now "Score calculator")
- [x] Rules page for the current ruleset

## Phase 5d — More tools (requested 2026-10-21)
- [x] Demo order generator (groups and solos, levels 1–5, rest gaps, locks and links, regenerate, copy, import)
- [x] PNG/PDF export of scorecards, results by event and overall standings ("Powered by Wushu Toolkit" footer; canvas + built-in PDF writer, no libraries)
- [x] Light/dark toggle (follows the system until tapped; saved per device)
- [ ] AI code review loop over the whole PR until no new findings

## Phase 5b — Watch lists
- [x] Local watch lists (multiple, colored, one per school) with fuzzy name matching
- [x] Highlight on every competition page (standings, team, results, scorecards, schedule, all-around)
- [x] Type-ahead from past competitions
- [x] Sync lists to the account (ADR-009); end-to-end check waits on Firebase keys (Phase 7)

## Phase 5c — Nandu calculator
- [x] Calculator: pick techniques and listed connections, capped 1.4 + 0.6 = 2.0; matches 181/181 completed 2025 scorecards
- [x] Rule-break warnings
- [x] Mark the element cut by the 1.4 / 0.6 cap (only the last registered one loses value)
- [ ] Optional: prefill from an athlete's Sportdata registration

## Phase 5e — v1 parity (requested 2026-10-22)

- [x] Scorecards laid out like the judges' sheet; named nandu; deduction links; links from standings and schedules
- [x] Schedules: 2025 Adults (posted order), 2025 Juniors (USAWKF order page), 2024 Juniors (saved bowuu ring feed)
- [x] Stats view (v1 scorecard stats + 2024 dashboards) on every competition
- [x] Athletes view (v1 athlete dashboard) on every competition
- [x] Contact Us page (EmailJS, needs NEXT_PUBLIC_EMAILJS_SERVICE_ID)
- [x] Rules page and event overview removed
- [ ] Required movements: registration codes, if official ones exist (asked Khai)

## Phase 6 — Brand + landing
- [x] Three logo concepts for review (round 1, none picked)
- [x] Round 2: four "toolkit for wushu" concepts (`/brand`, screenshot in docs/logo-concepts.png)
- [x] Landing page (+ About page); own top-nav layout, no sidebar
- [ ] Finalize logo (after Khai picks)

## Phase 7 — Accounts (ADR-005)
- [x] Firebase client + sign-in page
- [x] Single-device session lock
- [x] Entitlements + gated data route
- [x] Manual grant script + admin page
- [x] Firestore security rules
- [ ] (Needs Firebase keys) End-to-end check of sign-in, session lock and granting on a Vercel preview

## Phase 8 — Ship
- [x] Snapshot GitHub Action (also runnable by hand from the Actions tab with a slug)
- [x] CI workflow (check, test, build)
- [x] Legacy hash-route redirect page (ADR-007): `npm run legacy-redirect` builds it
- [x] Push branch, open PR
- [ ] (Ask first) Vercel project + env vars
- [ ] (Ask first) Publish redirect to `gh-pages`

## Phase 9 — Payments (blocked)
- [ ] Choose provider (OPEN_QUESTIONS #3)
- [ ] **Move off Vercel Hobby first (ADR-006)**
- [ ] Checkout + webhook → entitlement
