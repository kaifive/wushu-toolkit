# Wushu Toolkit — working notes for Claude

Wushu Toolkit is a mobile-first web app for wushu (taolu) athletes, coaches and
parents at competitions: live standings, schedules, team-selection projections,
scorecards, and rules tools (deduction codes, required movements, nandu).

v2 is a rewrite of the old Vite + CoreUI app, which lives in `legacy/` as
read-only reference. Do not import from `legacy/`.

## Source of truth

- `docs/ROADMAP.md` — what is done, what is next. Resume from the first
  unchecked item.
- `docs/DECISIONS.md` — architecture decisions (ADR-xxx). Change by adding a
  new ADR, not by rewriting an old one.
- `docs/OPEN_QUESTIONS.md` — questions for Khai. Non-blocking ones are logged
  there and work proceeds on the stated default.

## Standing rules

- Commits and PRs have **no attribution**: no Co-Authored-By, no session
  links, no "Generated with" footers. Commit as Khai Nguyen
  <tuongkhai.nguyen@gmail.com>.
- Small commits, one per roadmap item.
- Ask before anything expensive or irreversible (deploys, DNS, paid services,
  deleting data, pushing to `gh-pages`, enabling payments).
- Vercel Hobby forbids commercial use. Flag this again before payments ship
  (ADR-006).

## Stack

Next.js (App Router) + TypeScript strict + Tailwind CSS v4, deployed on
Vercel. Static/ISR first. No puppeteer in production, no heavy UI libraries.

## Layout

```
app/                 routes (App Router)
  (marketing)/       landing page
  events/[slug]/     the shared event engine (standings, schedule, team, ...)
  tools/             deduction lookup, required movements, calculators
  account/           sign in, entitlements
components/          UI (brand/, ui/, events/, layout/)
content/events/      one config file per competition — add events here
lib/data/            DataSource interface + adapters (sheet, doc, api,
                     sportdata, snapshot)
lib/rules/           rulesets: age groups, events, time limits, selection
                     math, deductions, nandu
lib/events/          event config types + registry
lib/auth/            Firebase auth, single-device session lock, entitlements
data/snapshots/      pre-scraped Sportdata registration (GitHub Action)
scripts/             snapshot + admin scripts (grant access, etc.)
public/legacy-redirect/  page that goes on gh-pages to forward old hash URLs
tests/               node:test tests + fixtures
```

## Commands

```
npm run dev      # local dev server
npm run check    # typecheck + lint
npm test         # node:test unit tests (via tsx)
npm run build    # production build
```

## Mobile-first checklist

- Bottom tab bar on phones, top nav on desktop.
- Tap targets at least 44px.
- Every table must work at 375px wide: sticky first column, horizontal
  scroll inside the table only, no page-level horizontal scroll.
