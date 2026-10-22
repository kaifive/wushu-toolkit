import type { Metadata } from "next";
import { Container, PageHeader } from "@/components/ui/page-header";
import { WatchlistManager } from "@/components/watchlist/manager";
import { WatchlistSyncStatus } from "@/components/watchlist/sync";

export const metadata: Metadata = { title: "Watch Lists", description: "Highlight your athletes on every competition page." };

export default function WatchlistsPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="Watch Lists" />
      <WatchlistManager />
      <div className="mt-4">
        <WatchlistSyncStatus />
      </div>
    </Container>
  );
}
