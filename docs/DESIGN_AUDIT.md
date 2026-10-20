# Frontend design audit (v2 vs v1)

## What read as "generic AI"

| # | Finding | Where | Fix |
|---|---------|-------|-----|
| 1 | Warm cream "paper" background, serif display headings and a terracotta accent: the default look of AI-generated pages, and nothing like v1 | `globals.css`, every heading | Cool slate neutrals from v1, a condensed sports typeface for headings, indigo for actions |
| 2 | Small uppercase red "eyebrow" above every title | `PageHeader`, landing | Removed. Context goes in breadcrumbs or the card header |
| 3 | Every block is the same `rounded-2xl` bordered card | everywhere | v1's headered card (gray header strip, bold title + muted context), radius 6px |
| 4 | Landing hero: pill badge, two-tone headline, fake phone mockup, accent-bar feature grid, FAQ accordions | `app/page.tsx` | Product-first page built from real archive data, plain headline, dark slate band like v1's sidebar |
| 5 | Nav is a centered top bar; v1's strongest identity was the dark sidebar listing every competition | layout | Dark slate sidebar on desktop with Toolkit / Competitions groups (v1 IA); dark top bar + bottom tabs on phones |
| 6 | Pastel pill badges for teams | `TeamBadge` | Solid square tags (A indigo, B slate, C outline), like v1's bold "A Team" column |
| 7 | Data status as faint gray text | `DataStatus` | v1's light-blue info bar: "Standings as of …" |
| 8 | No at-a-glance numbers | standings | v1 stat tiles with progress bar: athletes, routines scored, average |
| 9 | Plain tables | `OverallTable` etc. | v1 striped rows and bold header, scores in tabular figures |

## Kept from v2
- Bottom tab bar, 44px targets, tables that fit 375px (v1 failed here: its table overflowed the card on phones).
- Vermilion is the brand seal only (logo, "Live"), never the button color.
