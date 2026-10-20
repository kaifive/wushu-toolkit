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
- Deduction codes are migrated from the old app.
- Nandu data is a stub.

To finish: allow `usawkf.org` and `iwuf.org` in the environment's network
settings, or drop the PDFs into `docs/sources/`.

### 3. Payment provider

**Default:** none. Manual granting only (ADR-005). Stripe Checkout is the
likely fit (per-competition one-time purchase, webhook writes the
entitlement).

### 4. Price and access window per competition

**Default:** each paid event config has `access: "paid"`. Entitlements don't
expire unless `expiresAt` is set.

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
