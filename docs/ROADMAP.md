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
- [x] `DataSource` interface + `withFallback`
- [x] Google Sheets adapter (gviz JSON + CSV)
- [x] Published Google Doc adapter (JSON body and Sportdata scorecard HTML)
- [x] JSON API adapter (bowuu)
- [x] Snapshot adapter (`data/snapshots/`)
- [x] Sportdata adapter (registration, categories, scorecards) with saved fixtures (scorecard fixture synthetic, see OPEN_QUESTIONS #9)

## Phase 3 — Rules engine
- [x] `lib/rules` types + registry
- [x] USAWKF 2025–26 Junior Trials (r15): age groups, events, time limits, music, selection math
- [x] Legacy rulesets for archived events (2024 juniors, 2025 adults, 2025 juniors, PWC)
- [x] IWUF 2024 deduction codes (migrated, pending verification)
- [x] IWUF 2024 nandu data: code parser done, movement table pending source

## Phase 4 — Event engine
- [x] Event config types + registry (`content/events`)
- [x] Archived configs: 2024 Junior Trials, 2025 Adult Trials, 2025 Phoenix, 2025 Junior Trials (r15), 2026 PWC
- [ ] Current config: next paid competition (OPEN_QUESTIONS #10; the 2025–26 trials already happened and are archived on r15)
- [x] Event pages: overview, standings, schedule, team projection, scorecards, all-around
- [x] Mobile tables at 375px (sticky first column, no page-level scroll; checked with Playwright)
- [ ] Snapshot 2026 PWC and 2025 Junior Trials scores once Google Sheets is reachable (`npm run snapshot -- <slug>`)

## Phase 5 — Tools
- [x] Deduction code lookup
- [x] Required movements checklist
- [x] Average score calculator (now "Score calculator")
- [x] Rules page for the current ruleset

## Phase 6 — Brand + landing
- [x] Three logo concepts for review (`/brand`, screenshot in docs/logo-concepts.png)
- [ ] Landing page
- [ ] Finalize logo (after Khai picks)

## Phase 7 — Accounts (ADR-005)
- [ ] Firebase client + sign-in page
- [ ] Single-device session lock
- [ ] Entitlements + gated data route
- [ ] Manual grant script + admin page
- [ ] Firestore security rules

## Phase 8 — Ship
- [ ] Snapshot GitHub Action
- [ ] CI workflow (check, test, build)
- [ ] Legacy hash-route redirect page (ADR-007)
- [ ] Push branch, open PR
- [ ] (Ask first) Vercel project + env vars
- [ ] (Ask first) Publish redirect to `gh-pages`

## Phase 9 — Payments (blocked)
- [ ] Choose provider (OPEN_QUESTIONS #3)
- [ ] **Move off Vercel Hobby first (ADR-006)**
- [ ] Checkout + webhook → entitlement
