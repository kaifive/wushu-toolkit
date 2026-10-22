import type { Metadata } from "next";
import { AccountPanel } from "@/components/auth/account-panel";
import { Container, PageHeader } from "@/components/ui/page-header";
import { allEvents } from "@/lib/events/registry";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  // One live (paid) competition at a time: it comes first, so the grant box defaults to it.
  const rank = (s: string) => (s === "live" ? 0 : s === "upcoming" ? 1 : 2);
  const events = allEvents()
    .sort((a, b) => rank(a.status) - rank(b.status))
    .map((e) => ({ slug: e.slug, name: e.name }));
  return (
    <Container className="max-w-md">
      <PageHeader title="Your Account" />
      <AccountPanel events={events} />
    </Container>
  );
}
