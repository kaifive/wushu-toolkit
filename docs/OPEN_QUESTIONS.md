# Open questions

Non-blocking questions for Khai. Work proceeds on the **default** until
answered. Mark answered ones with the answer and date, don't delete them.

---

### 1. The previous session's v2 bundle was lost

The handoff bundle (`wushu-toolkit-v2.bundle`) never reached this
environment. v2 was rebuilt from scratch from the brief and `legacy/`.
**Default:** this rebuild replaces it. If the old bundle has anything worth
keeping (logo SVG details, ADR wording), merge it by hand.

### 2. Official rules documents can't be downloaded from the build environment

`usawkf.org` and `iwuf.org` are blocked by the cloud environment's network
policy, so the r15 regulations and the IWUF 2024 Taolu Rules could not be read.
**Default:** the rules engine is built and tested, but values from those
documents are entered as `verified: false`:

- Selection math uses the rules in the brief (best barehand + best weapon,
  discipline spots, minimum averages 9.0/8.9/8.8).
- Deduction codes: resolved, re-entered from the IWUF 2024 PDF (see #12).
- Nandu data: resolved, from the IWUF 2024 PDF Khai supplied (see #12).

Partial data was recovered from search-engine extracts of r15: age groups
(birth ranges), events per age group, time limits, music and dates. These are
in the ruleset but still marked unverified. The time-limit text was garbled
in the extract (the 1:10 minimum is ambiguous).

**A newer revision, r19 (2025-11-07), exists.** Should the app follow r19
instead of r15?

To finish: allow `usawkf.org` and `iwuf.org` in the environment's network
settings, or drop the PDFs into `docs/sources/`.

### 3. Payment provider

**Default:** none. Manual granting only (ADR-005). Stripe Checkout is the
likely fit (per-competition one-time purchase, webhook writes the
entitlement).

### 4. Price and access window per competition

The old app charged $50 per user before the 2025 adult trials and $75 after
the start. **Default:** each paid event config has `access: "paid"`.
Entitlements don't expire unless `expiresAt` is set.

### 5. Custom domain

The redirect target and the Firebase auth domain depend on it. **Default:**
`wushu-toolkit.vercel.app` until a domain is chosen. The redirect target is a
single constant in `lib/site.ts`.

### 6. Firebase project

**Default:** reuse the project the old app used (same `FIREBASE_*` env vars,
renamed `NEXT_PUBLIC_FIREBASE_*`). Admin SDK needs a service-account key in
Vercel env (`FIREBASE_SERVICE_ACCOUNT`, base64 JSON).

### 7. r15 contradicts itself on minimum averages

The brief says the PDF gives minimum averages of 9.0 / 8.9 / 8.8 but
contradicts itself elsewhere. **Default:** A / B / C team minimums of 9.0 / 8.9
/ 8.8, applied to the athlete's selection average (best barehand + best weapon
over 2). This is a single value in
`lib/rules/usawkf-junior-trials-2025-26.ts`, so it is a one-line change once the
right reading is confirmed.

### 8. Branch name

The brief says to push `v2`. This environment can only push
`claude/wushu-toolkit-v2-rewrite-wbxpoz`. **Default:** the work is on that
branch and the PR opens from it.

### 9. Live sources not reachable from the build environment

Sportdata, Google Sheets/Docs and bowuu were unreachable here, so adapters
are tested only against saved fixtures (from `legacy/`). **Default:** ship
with fixture tests and check live on the first Vercel preview.

### 10. Which competition is the first paid one?

The 2025–26 Junior Trials (Dec 18–21, 2025) already happened, so they are
an archived, free event on the r15 rules. **Default:** no live event is
configured. Paid access is built and tested with a config flag, and the next
competition gets its own file in `content/events/` once you name it.

### 11. Event dates for archived events

Exact dates for the 2024 Junior Trials, 2025 Adult Trials, 2025 Phoenix and
2026 PWC aren't in the legacy code. **Default:** they're shown as month and
year (`approximate: true`). Send exact dates to fix.

### 12. Nandu calculator: source and scoring model

The calculator needs the IWUF 2024 degree-of-difficulty tables (jumps,
landings, rotation degrees, connection values and caps). They are in the
2024 rules PDF on iwuf.org, which this environment can't reach. **Default:**
not built until the tables arrive. See the chat for the specific questions.

**Answered:** Khai supplied the 2024 PDF. Model per Article 22: techniques
A/B/C = 0.2/0.3/0.4 (cap 1.4), listed connections A/B/C/D =
0.1/0.15/0.2/0.25 (cap 0.6). "Landing" is the connection code after "+"
(Table 10-3-3). Separate tables per event family. Built; checked against
181 completed routines in the 2025 snapshots (all match). Panel A
deduction codes were re-entered from the same PDF (Tables 10-1-1 to 10-1-6,
10-4-1); they differed a lot from the v1 list.

### 13. Are selection averages rounded before the minimum check?

Barehand 9.000 + weapon 8.999 averages 8.9995. **Default:** not rounded, so
it does not meet a 9.0 minimum, and averages are shown cut to thousandths
(8.999) so the display agrees. If USAWKF rounds averages to thousandths first, that
athlete qualifies; one line in `lib/rules/selection.ts` changes it.

### 14. What counts as "clean nandu" for the 2025 adult A team?

The A team needs a routine with clean difficulty. **Default:** clean = every
declared element was made, or a C score of 2.0. The "more full nandu"
tie-break counts only C = 2.0. If the rule means full 2.0 difficulty,
`isClean` in `lib/rules/selection.ts` is a one-line change.

---

## Answers (2026-10-21)

| # | Question | Answer | Next step |
|---|----------|--------|-----------|
| Logo | A / B / C | None of them. Keep the "toolkit for wushu" idea | New concepts in that direction |
| 2 | r15 or r19 | **r19**; Khai uploads the PDF | Verify the ruleset against r19 when it arrives |
| 7 | Minimum averages | Khai checks the PDF; keep 9.0/8.9/8.8 until then | Fix from r19 |
| 10 | First paid event | **Everything free for now** | No paid configs; payments stay parked |
| 6 | Accounts | **Turn on now**, reuse the existing Firebase project | Khai adds Firebase keys in Vercel |
| 5 | Domain | **vercel.app for now** | — |
| 8 | Deploy | Khai installs the Claude GitHub App, then imports into Vercel | Push + PR once the app is installed |
| Redirect | gh-pages | **After the new site is live**, with Khai's OK | — |
| Deductions | Update to IWUF 2024 | **Yes** | Done |
| Nandu cap | Mark the cut element | **Yes** | Done |
| 11 | Exact archive dates | Month/year is fine | Closed |
| Extras | Next features | **Watch-list sync to account, light/dark toggle** | Queue after the above |
| Demo order | Level scale | **Level 1–5** | — |
| Demo order | Rest gap | **Never back to back; may be unavoidable** | Show where it was broken |
| Demo order | Flow | **Mixed, strong open and close** | — |
| Exports | Which first | **Individual scorecard, results/standings** | — |
