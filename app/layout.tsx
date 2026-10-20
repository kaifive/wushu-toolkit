import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomTabs } from "@/components/layout/bottom-tabs";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SITE } from "@/lib/site";

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
    { media: "(prefers-color-scheme: light)", color: "#faf7f2" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pb-tabbar min-h-dvh antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-surface focus:p-2">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          {children}
        </main>
        <SiteFooter />
        <BottomTabs />
      </body>
    </html>
  );
}
