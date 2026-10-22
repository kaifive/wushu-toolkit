"use client";

import { useState } from "react";
import { Notice } from "@/components/ui/notice";

/** EmailJS, as in v1: the template and public key are public by design; the service id comes from Vercel. */
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = "template_fgrygiq";
const PUBLIC_KEY = "xo572Xf-hdKwWQOr6";

const field = "min-h-tap w-full rounded-card border border-line bg-surface px-3";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  if (!SERVICE_ID) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("sending");
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ service_id: SERVICE_ID, template_id: TEMPLATE_ID, user_id: PUBLIC_KEY, template_params: data }),
    }).catch(() => null);
    if (res?.ok) {
      form.reset();
      setState("sent");
    } else setState("error");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {state === "sent" && <Notice title="Message Sent">Thanks! You&apos;ll get a reply by email.</Notice>}
      {state === "error" && (
        <Notice tone="error" title="Couldn't Send">
          Something went wrong. Please try again in a minute.
        </Notice>
      )}
      <label className="block text-sm font-semibold">
        Name
        <input name="contact_name" required autoComplete="name" className={`mt-1 ${field}`} />
      </label>
      <label className="block text-sm font-semibold">
        Email
        <input name="contact_email" type="email" required autoComplete="email" className={`mt-1 ${field}`} />
      </label>
      <label className="block text-sm font-semibold">
        Subject
        <input name="subject" required className={`mt-1 ${field}`} />
      </label>
      <label className="block text-sm font-semibold">
        Message
        <textarea name="message" required rows={6} className={`mt-1 ${field} py-2`} />
      </label>
      <button type="submit" disabled={state === "sending"} className="min-h-12 w-full rounded-card bg-primary font-semibold text-primary-ink disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
