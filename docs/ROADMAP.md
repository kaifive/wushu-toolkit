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
- [ ] IWUF 2024 deduction codes (migrated, pending verification)
- [ ] IWUF 2024 nandu data (pending source)

## Phase 4 — Event engine
- [ ] Event config types + registry (`content/events`)
- [ ] Archived configs: 2024 Junior Trials, 2025 Adult Trials, 2025 Phoenix, 2025 Junior Trials, 2026 PWC
- [ ] Current config: 2025–26 Junior Trials
- [ ] Event pages: overview, standings, schedule, team projection, scorecards
- [ ] Mobile tables at 375px

## Phase 5 — Tools
- [ ] Deduction code lookup
- [ ] Required movements checklist
- [ ] Average score calculator

## Phase 6 — Brand + landing
- [ ] Three logo concepts for review
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
