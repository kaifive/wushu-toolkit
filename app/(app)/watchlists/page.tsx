import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui/page-header";
import { WatchlistManager } from "@/components/watchlist/manager";
import { WatchlistSync } from "@/components/watchlist/sync";

export const metadata: Metadata = { title: "Watch lists", description: "Highlight your athletes on every competition page." };

export default function WatchlistsPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="Watch lists" />
      <div className="mb-4">
        <WatchlistSync />
      </div>
      <WatchlistManager />
    </Container>
  );
}
