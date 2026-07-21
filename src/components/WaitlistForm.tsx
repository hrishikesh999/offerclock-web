"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Posts to /api/waitlist (MailerLite). `source` tags which section the
 * signup came from — useful once there's more than one entry point (hero,
 * founding CTA, switcher link) to see what's converting.
 */
export function WaitlistForm({
  source,
  buttonLabel,
  className = "",
}: {
  source: string;
  buttonLabel: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const inputId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json()) as { message: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message);
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p className={`text-serif text-lg text-ink ${className}`} role="status">
        {message}
      </p>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-xl flex-col gap-2.5 sm:flex-row"
        noValidate
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          className="field-pill"
          type="email"
          required
          placeholder="you@yourbrand.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <button className="btn-pill" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : buttonLabel}
        </button>
      </form>
      {status === "error" && message && (
        <p className="mt-2 text-sm" style={{ color: "var(--bad)" }} role="alert">
          {message}
        </p>
      )}
    </div>
  );
}
