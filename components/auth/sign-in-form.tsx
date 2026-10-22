"use client";

import { useState } from "react";
import { Notice } from "@/components/ui/notice";
import { useAuth } from "./auth-provider";

const input = "min-h-tap w-full rounded-card border border-line bg-surface px-3";

function friendly(err: unknown): string {
  const code = (err as { code?: string }).code ?? "";
  if (/invalid-credential|wrong-password|user-not-found/.test(code)) return "Email or password is wrong.";
  if (/email-already-in-use/.test(code)) return "There's already an account with that email. Sign in instead.";
  if (/weak-password/.test(code)) return "Use a password of at least 6 characters.";
  if (/too-many-requests/.test(code)) return "Too many tries. Wait a minute and try again.";
  if (/popup-blocked|operation-not-supported|web-storage-unsupported/.test(code))
    return "Google sign-in can't open here (some in-app browsers block it). Open the site in Safari or Chrome, or use email.";
  if (/popup-closed-by-user|cancelled-popup-request/.test(code)) return "Google sign-in was closed before it finished.";
  if (/account-exists-with-different-credential/.test(code)) return "That email already has a password account. Sign in with email instead.";
  if (/unauthorized-domain|operation-not-allowed/.test(code)) return "Google sign-in isn't switched on for this site yet.";
  return err instanceof Error ? err.message : "Something went wrong.";
}

export function SignInForm() {
  const { signIn, signUp, signInWithGoogle, resetPassword, kicked } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "info"; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      await (mode === "in" ? signIn(email, password) : signUp(email, password));
    } catch (err) {
      setMsg({ tone: "error", text: friendly(err) });
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!email) return setMsg({ tone: "error", text: "Enter your email first." });
    try {
      await resetPassword(email);
      setMsg({ tone: "info", text: "Check your email for a reset link." });
    } catch (err) {
      setMsg({ tone: "error", text: friendly(err) });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 rounded-card border border-line bg-surface p-5">
      {kicked && (
        <Notice tone="warn" title="Signed Out">
          Your account was signed in on {kicked}. An account can be used on one device at a time.
        </Notice>
      )}
      <h2 className="font-display text-xl font-bold">{mode === "in" ? "Sign In" : "Create an Account"}</h2>
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setMsg(null);
          try {
            await signInWithGoogle();
          } catch (err) {
            setMsg({ tone: "error", text: friendly(err) });
          } finally {
            setBusy(false);
          }
        }}
        className="flex min-h-12 w-full items-center justify-center gap-3 rounded-card border border-line bg-surface font-semibold hover:border-primary disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path fill="#4285F4" d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2.1-1.9 3.3-4.8 3.3-8Z" />
          <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23Z" />
          <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9Z" />
          <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4Z" />
        </svg>
        Continue with Google
      </button>
      <p className="text-center text-xs text-ink-muted">or with email</p>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold">
          Email
        </label>
        <input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete={mode === "in" ? "current-password" : "new-password"}
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={input}
        />
      </div>
      {msg && <Notice tone={msg.tone === "error" ? "error" : "info"}>{msg.text}</Notice>}
      <button type="submit" disabled={busy} className="min-h-12 w-full rounded-card bg-primary font-semibold text-primary-ink disabled:opacity-60">
        {busy ? "One moment…" : mode === "in" ? "Sign in" : "Create account"}
      </button>
      <div className="flex flex-wrap justify-between gap-2 text-sm">
        <button type="button" className="min-h-tap font-semibold text-primary" onClick={() => setMode(mode === "in" ? "up" : "in")}>
          {mode === "in" ? "New here? Create an account" : "Have an account? Sign in"}
        </button>
        {mode === "in" && (
          <button type="button" className="min-h-tap text-ink-muted" onClick={reset}>
            Forgot password
          </button>
        )}
      </div>
      <p className="text-xs text-ink-muted">Signing in here signs out any other device using this account.</p>
    </form>
  );
}
