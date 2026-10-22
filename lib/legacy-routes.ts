/**
 * Old HashRouter routes (kaifive.github.io/wushu-toolkit/#/...) -> new paths (ADR-007).
 * Shared by the redirect page generator and its tests. Unknown routes go home.
 */
export const LEGACY_ROUTES: Record<string, string> = {
  "/": "/",
  "/about": "/about",
  "/contact-us": "/contact",
  "/login": "/account",
  "/register": "/account",
  "/toolkit/deduction-code-lookup": "/tools/deductions",
  "/toolkit/required-movements": "/tools/required-movements",
  "/toolkit/average-score-calculator": "/tools/score-calculator",
  "/nandu-calculator": "/tools/nandu",

  "/2026-pwc/male-standings": "/events/2026-pwc/all-around?view=male",
  "/2026-pwc/female-standings": "/events/2026-pwc/all-around?view=female",
  "/2026-pwc/grand-champion": "/events/2026-pwc/all-around?view=champions",
  "/2026-pwc/schedule/ring-1": "/events/2026-pwc/schedule?ring=ring-1",
  "/2026-pwc/schedule/ring-2": "/events/2026-pwc/schedule?ring=ring-2",
  "/2026-pwc/schedule/ring-3": "/events/2026-pwc/schedule?ring=ring-3",

  "/2025-juniors/male-standings": "/events/2025-juniors/standings?gender=male",
  "/2025-juniors/female-standings": "/events/2025-juniors/standings?gender=female",
  "/2025-juniors/schedule": "/events/2025-juniors/schedule",
  "/2025-juniors/male-us-team": "/events/2025-juniors/team?gender=male",
  "/2025-juniors/female-us-team": "/events/2025-juniors/team?gender=female",
  "/2025-juniors/scorecards": "/events/2025-juniors/standings",

  "/2025-adults/about": "/events/2025-adults",
  "/2025-adults/schedule": "/events/2025-adults/schedule",
  "/2025-adults/male-standings": "/events/2025-adults/standings?gender=male",
  "/2025-adults/female-standings": "/events/2025-adults/standings?gender=female",
  "/2025-adults/us-team": "/events/2025-adults/team",
  "/2025-adults/scorecard": "/events/2025-adults/scorecards",
  "/2025-adults/scorecard-stats": "/events/2025-adults/stats",

  "/2025-phoenix/male-standings": "/events/2025-phoenix/standings?gender=male",
  "/2025-phoenix/female-standings": "/events/2025-phoenix/standings?gender=female",
  "/2025-phoenix/scorecard": "/events/2025-phoenix/scorecards",

  "/2024-juniors/about": "/events/2024-juniors",
  "/2024-juniors/schedule": "/events/2024-juniors/schedule",
  "/2024-juniors/total-scores": "/events/2024-juniors/standings",
  "/2024-juniors/male-standings": "/events/2024-juniors/standings?gender=male",
  "/2024-juniors/female-standings": "/events/2024-juniors/standings?gender=female",
  "/2024-juniors/holistic-dashboard": "/events/2024-juniors/standings",
  "/2024-juniors/athlete-dashboard": "/events/2024-juniors/athletes",
  "/2024-juniors/event-dashboard": "/events/2024-juniors/stats",
  "/2024-juniors/us-team-dashboard": "/events/2024-juniors/team",
};

/**
 * Resolve an old URL's hash (and, for GitHub Pages 404s, its path) to a new path.
 * Pure, and also inlined into the redirect page, so it must stay dependency-free.
 */
export function resolveLegacy(hash: string, pathname: string, routes: Record<string, string> = LEGACY_ROUTES): string {
  let route = hash.replace(/^#!?/, "");
  if (!route) route = pathname.replace(/^\/wushu-toolkit/, "") || "/";
  route = route.split("?")[0]!.replace(/\/+$/, "") || "/";
  if (!route.startsWith("/")) route = `/${route}`;
  if (routes[route]) return routes[route]!;
  const event = route.match(/^\/(\d{4}-[a-z0-9-]+?)(\/|$)/);
  if (event && Object.values(routes).some((p) => p.startsWith(`/events/${event[1]}`))) return `/events/${event[1]}`;
  return "/";
}
