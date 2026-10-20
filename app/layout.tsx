import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { BottomTabs } from "@/components/layout/bottom-tabs";
import { Sidebar, type SidebarGroup } from "@/components/layout/sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { allEvents } from "@/lib/events/registry";
import { SITE } from "@/lib/site";

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-barlow", display: "swap" });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-barlow-condensed", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.tagline,
  applicationName: SITE.name,
  authors: [{ name: SITE.author }],
  openGraph: { title: SITE.name, description: SITE.tagline, siteName: SITE.name, type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#212631" },
    { media: "(prefers-color-scheme: dark)", color: "#13161c" },
  ],
};

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
        { href: "/tools/score-calculator", label: "Score calculator" },
        { href: "/rules", label: "Rules" },
      ],
    },
    { title: "Past competitions", items: events.filter((e) => e.status === "archived").map((e) => ({ href: `/events/${e.slug}`, label: e.shortName })) },
    { title: "Account", items: [{ href: "/account", label: "Sign in / passes" }] },
  ];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="pb-tabbar min-h-dvh antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-surface focus:p-2">
          Skip to content
        </a>
        <Sidebar groups={navGroups()} />
        <div className="flex min-h-dvh flex-col md:pl-64">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <BottomTabs />
      </body>
    </html>
  );
}
