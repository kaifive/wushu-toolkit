/**
 * Build the static redirect page for the old GitHub Pages site (ADR-007).
 * Output: legacy-redirect/index.html and 404.html. Publishing them to the
 * gh-pages branch is a separate step that needs Khai's go-ahead.
 *
 *   npm run legacy-redirect
 */
import { pathToFileURL } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { LEGACY_ROUTES, resolveLegacy } from "../lib/legacy-routes";
import { SITE } from "../lib/site";

export function redirectHtml(target = SITE.url): string {
  const fn = resolveLegacy.toString();
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Wushu Toolkit has moved</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${target}/">
<script>
(function () {
  var ROUTES = ${JSON.stringify(LEGACY_ROUTES)};
  var resolveLegacy = ${fn};
  var path = resolveLegacy(location.hash, location.pathname, ROUTES);
  location.replace(${JSON.stringify(target)} + path);
})();
</script>
<noscript><meta http-equiv="refresh" content="0; url=${target}/"></noscript>
<style>body{font-family:system-ui,sans-serif;background:#f3f4f7;color:#1f2430;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px;text-align:center}a{color:#5856d6}</style>
</head>
<body>
<p>Wushu Toolkit has moved to <a href="${target}/">${target.replace(/^https?:\/\//, "")}</a>. Taking you there…</p>
</body>
</html>
`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const dir = join(process.cwd(), "legacy-redirect");
  mkdirSync(dir, { recursive: true });
  const html = redirectHtml();
  writeFileSync(join(dir, "index.html"), html);
  writeFileSync(join(dir, "404.html"), html);
  writeFileSync(join(dir, ".nojekyll"), "");
  console.log(`Wrote legacy-redirect/ (target ${SITE.url})`);
}
