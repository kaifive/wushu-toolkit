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
  return err instanceof Error ? err.message : "Something went wrong.";
}

export function SignInForm() {
  const { signIn, signUp, resetPassword, kicked } = useAuth();
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
        <Notice tone="warn" title="Signed out">
          Your account was signed in on {kicked}. An account can be used on one device at a time.
        </Notice>
      )}
      <h2 className="font-display text-xl font-bold tracking-wide">{mode === "in" ? "Sign in" : "Create an account"}</h2>
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
