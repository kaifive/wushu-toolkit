import { Sidebar, type SidebarGroup } from "@/components/layout/sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WatchlistHighlighter } from "@/components/watchlist/highlighter";
import { WatchlistSync } from "@/components/watchlist/sync";
import { allEvents } from "@/lib/events/registry";

function navGroups(): SidebarGroup[] {
  const events = allEvents();
  const live = events.filter((e) => e.status !== "archived");
  return [
    { items: [{ href: "/", label: "Home" }, { href: "/events", label: "All competitions", exact: true }] },
    ...(live.length ? [{ title: "Live", items: live.map((e) => ({ href: `/events/${e.slug}`, label: e.shortName, badge: e.status === "live" ? "Live" : undefined })) }] : []),
    {
      title: "Athlete toolkit",
      items: [
        { href: "/tools/deductions", label: "Deduction codes" },
        { href: "/tools/required-movements", label: "Required movements" },
        { href: "/tools/nandu", label: "Nandu calculator" },
        { href: "/tools/score-calculator", label: "Score calculator" },
        { href: "/tools/demo-order", label: "Demo order" },
        { href: "/rules", label: "Rules" },
      ],
    },
    { title: "Past competitions", items: events.filter((e) => e.status === "archived").map((e) => ({ href: `/events/${e.slug}`, label: e.shortName })) },
    { title: "You", items: [{ href: "/watchlists", label: "Watch lists" }, { href: "/account", label: "Sign in / passes" }] },
  ];
}

/** App pages: v1-style dark sidebar on desktop, dark top bar on phones. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar groups={navGroups()} />
      <div className="flex min-h-dvh flex-col md:pl-64">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
      <WatchlistHighlighter />
      <WatchlistSync />
    </>
  );
}
