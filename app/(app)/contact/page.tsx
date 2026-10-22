import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Container, PageHeader } from "@/components/ui/page-header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Us", description: "Feature requests, corrections and event passes." };

export default function ContactPage() {
  return (
    <Container className="max-w-2xl">
      <PageHeader title="Contact Us" />
      {process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? <ContactForm /> : <p className="text-ink-muted">Reach out to {SITE.author} through your club or team.</p>}
    </Container>
  );
}
