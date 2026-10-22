# Data audit (2026-10-22)

Our data and team projections, checked against USAWKF's official results
pages (usawkf.org/competition-results/?ID=…) and the published 2025–26
junior team roster.

| Competition | Official source | Routines | Overall scores | Places | Teams |
|---|---|---|---|---|---|
| 2025 Junior Trials | [ID=139](https://usawkf.org/competition-results/?ID=139), [roster](https://usawkf.org/news/us-junior-team-trials-results-coach-certification-and-duan-grading/) | Sheet: 740/778 matched. **Now served from the official page** | 232/233 | 225/233 | 233/233 |
| 2025 Adult Trials | [ID=132](https://usawkf.org/competition-results/?ID=132) (overall only) | No per-event table to compare | 103/105 | 100/105 | 105/106 |
| 2024 Junior Trials | [ID=98](https://usawkf.org/competition-results/?ID=98) | No per-event table to compare | 243/243 | 241/243 | 245/245 |

## What was wrong, and what changed

1. **2025 Juniors scores: the hand-kept Google Sheet had 38 problems** the
   official page doesn't: swapped digits (8.683 typed 8.863; 9.130 as 9.013),
   scores on the wrong athlete (Gunshu: Gunawan's 9.386 under Lu, Lu's under
   Shen), and blanks typed as 0. The event now reads USAWKF's official
   results (`lib/data/usawkf-results.ts`), with the saved snapshot as the
   fallback.
2. **2025–26 junior team rule.** USAWKF filled teams like this in every
   division: A = the best qualifier (9.0+) in each discipline, then the rest
   of the A spots by rank; B and C strictly by rank (8.9 / 8.8 minimums). We
   applied one-per-discipline to B and C too, which moved 30 athletes.
3. **2025 adult categories.** An athlete counts only in a category they
   entered in full (CQ/DS/GS, CQ/JS/QS, NQ/ND/NG). We were also ranking
   CQ/DS/GS athletes in CQ/JS/QS on their Changquan alone, which inflated 45
   overall scores.
4. **Standings list each athlete once** (best line), numbered like USAWKF's.

## Remaining differences (not fixed)

- Places: every remaining case is a tie. USAWKF prints equal scores as
  the same place; we apply the tie-break and list them in order.
- 2025 Adults: USAWKF's C team skips #14 Nathan Chao and #15 Ryan Huang for
  #16/#17 and names only 5 C members. A club page says Chao made the team,
  so this looks like a withdrawal or a call made outside the scores.
- 2025 Adults: Lanhong Huang and Matthew Wong's official averages come from
  a different category than their best one (0.02–0.03 off).
- 2025 Juniors: Stephen Chen's official overall is 9.037 vs our 9.077 (best
  pairing differs).
- 2024 Juniors: "Aviendha Johnson" (official) is "Aviendha Wang" in the
  bowuu feed; same athlete, same A team.
