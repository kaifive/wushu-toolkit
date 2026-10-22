import type { Metadata } from "next";
import { ContactForm, contactConfigured } from "@/components/contact/contact-form";
import { Container, PageHeader } from "@/components/ui/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Us", description: "Feature requests, corrections and event passes." };

export default function ContactPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="Contact Us" />
      <p className="mb-4 text-ink-muted">Feature requests, score corrections and event passes are all welcome.</p>
      {contactConfigured() ? <ContactForm /> : <p className="text-ink-muted">Reach out to {SITE.author} through your club or team.</p>}
    </Container>
  );
}
