import { MarketingNav } from "@/components/layout/marketing-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { WatchlistHighlighter } from "@/components/watchlist/highlighter";

/** Landing page: full width, top navigation, no sidebar. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <MarketingNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <WatchlistHighlighter />
    </div>
  );
}
