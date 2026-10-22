import type { Metadata } from "next";
import { AccountPanel } from "@/components/auth/account-panel";
import { Container, PageHeader } from "@/components/ui/page-header";
import { allEvents } from "@/lib/events/registry";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  const events = allEvents().map((e) => ({ slug: e.slug, name: e.name }));
  return (
    <Container className="max-w-md">
      <PageHeader title="Your Account" />
      <AccountPanel events={events} />
    </Container>
  );
}
