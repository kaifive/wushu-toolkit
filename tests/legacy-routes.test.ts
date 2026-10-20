import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { LEGACY_ROUTES, resolveLegacy } from "@/lib/legacy-routes";
import { redirectHtml } from "../scripts/build-legacy-redirect";

test("maps old hash routes to new paths", () => {
  assert.equal(resolveLegacy("#/2026-pwc/male-standings", "/wushu-toolkit/"), "/events/2026-pwc/all-around?view=male");
  assert.equal(resolveLegacy("#/2025-juniors/female-us-team", "/wushu-toolkit/"), "/events/2025-juniors/team?gender=female");
  assert.equal(resolveLegacy("#/toolkit/deduction-code-lookup", "/wushu-toolkit/"), "/tools/deductions");
  assert.equal(resolveLegacy("#/2026-pwc/schedule/ring-2/", "/wushu-toolkit/"), "/events/2026-pwc/schedule?ring=ring-2");
});

test("falls back to the event page, then home", () => {
  assert.equal(resolveLegacy("#/2025-adults/something-new", "/wushu-toolkit/"), "/events/2025-adults");
  assert.equal(resolveLegacy("#/base/accordion", "/wushu-toolkit/"), "/");
  assert.equal(resolveLegacy("", "/wushu-toolkit/"), "/");
  assert.equal(resolveLegacy("", "/wushu-toolkit/about"), "/about", "GitHub Pages 404 for a non-hash path");
});

/** Every target must be a page that exists in app/. */
test("every redirect target exists in the app", () => {
  const pages = new Set<string>();
  const walk = (dir: string, route: string) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p, `${route}/${f}`);
      else if (f === "page.tsx") pages.add(route || "/");
    }
  };
  walk(join(process.cwd(), "app"), "");
  const slugs = ["2024-juniors", "2025-adults", "2025-juniors", "2025-phoenix", "2026-pwc"];
  for (const target of Object.values(LEGACY_ROUTES)) {
    const path = target.split(/[?#]/)[0]!;
    const generic = slugs.reduce((p, s) => p.replace(`/events/${s}`, "/events/[slug]"), path);
    assert.ok(pages.has(generic), `${target} -> ${generic}`);
  }
});

test("redirect page inlines the resolver and works when evaluated", () => {
  const html = redirectHtml("https://example.app");
  const script = html.match(/<script>([\s\S]*?)<\/script>/)![1]!;
  let went = "";
  const location = { hash: "#/2026-pwc/grand-champion", pathname: "/wushu-toolkit/", replace: (u: string) => (went = u) };
  new Function("location", script)(location);
  assert.equal(went, "https://example.app/events/2026-pwc/all-around?view=champions");
});
