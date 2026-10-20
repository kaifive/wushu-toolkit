"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Notice } from "@/components/ui/notice";
import { useAuth } from "./auth-provider";
import { SignInForm } from "./sign-in-form";

interface Me {
  email?: string;
  passes: string[];
  admin: boolean;
}

export function AccountPanel({ events }: { events: { slug: string; name: string }[] }) {
  const { status, user, signOut, authedFetch } = useAuth();
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "signed-in") return;
    let alive = true;
    void authedFetch("/api/me").then(async (res) => {
      const body = (await res.json()) as Me & { error?: string };
      if (!alive) return;
      if (res.ok) setMe(body);
      else setError(body.error ?? "Couldn't load your account.");
    });
    return () => {
      alive = false;
    };
  }, [status, authedFetch]);

  if (status === "off") {
    return (
      <Notice title="Accounts are coming soon">
        Everything on the site is free to use right now. Event passes will need an account.
      </Notice>
    );
  }
  if (status === "loading") return <p className="text-ink-muted">Loading…</p>;
  if (status === "signed-out" || !user) return <SignInForm />;

  const name = (slug: string) => events.find((e) => e.slug === slug)?.name ?? slug;
  return (
    <div className="space-y-4">
      <section className="rounded-card border border-line bg-surface p-5">
        <p className="text-sm text-ink-muted">Signed in as</p>
        <p className="font-semibold">{user.email}</p>
        <button type="button" onClick={() => void signOut()} className="mt-3 min-h-tap rounded-card border border-line px-4 font-semibold">
          Sign out
        </button>
      </section>
      <section className="rounded-card border border-line bg-surface p-5">
        <h2 className="font-display text-lg font-bold tracking-wide">Event passes</h2>
        {error && <Notice tone="error">{error}</Notice>}
        {!me && !error && <p className="text-sm text-ink-muted">Loading…</p>}
        {me && me.passes.length === 0 && <p className="mt-1 text-sm text-ink-muted">No passes yet. Past events are free.</p>}
        {me && me.passes.length > 0 && (
          <ul className="mt-2 space-y-1">
            {me.passes.map((slug) => (
              <li key={slug}>
                <Link href={`/events/${slug}`} className="inline-flex min-h-tap items-center font-semibold text-primary">
                  {name(slug)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      {me?.admin && <AdminGrant events={events} />}
    </div>
  );
}

function AdminGrant({ events }: { events: { slug: string; name: string }[] }) {
  const { authedFetch } = useAuth();
  const [email, setEmail] = useState("");
  const [slug, setSlug] = useState(events[0]?.slug ?? "");
  const [result, setResult] = useState<{ tone: "info" | "error"; text: string } | null>(null);

  const send = async (revoke: boolean) => {
    setResult(null);
    const res = await authedFetch("/api/admin/grant", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, slug, revoke }),
    });
    const body = (await res.json()) as { error?: string };
    setResult(res.ok ? { tone: "info", text: `${revoke ? "Revoked" : "Granted"} ${slug} for ${email}.` } : { tone: "error", text: body.error ?? "Failed." });
  };

  return (
    <section className="space-y-3 rounded-card border border-gold/40 bg-surface p-5">
      <h2 className="font-display text-lg font-bold tracking-wide">Admin: grant a pass</h2>
      <input type="email" placeholder="athlete@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" className="min-h-tap w-full rounded-card border border-line bg-surface px-3" />
      <select value={slug} onChange={(e) => setSlug(e.target.value)} aria-label="Event" className="min-h-tap w-full rounded-card border border-line bg-surface px-3">
        {events.map((e) => (
          <option key={e.slug} value={e.slug}>
            {e.name}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button type="button" onClick={() => void send(false)} className="min-h-tap flex-1 rounded-card bg-primary font-semibold text-primary-ink">
          Grant
        </button>
        <button type="button" onClick={() => void send(true)} className="min-h-tap flex-1 rounded-card border border-line font-semibold">
          Revoke
        </button>
      </div>
      {result && <Notice tone={result.tone}>{result.text}</Notice>}
    </section>
  );
}
