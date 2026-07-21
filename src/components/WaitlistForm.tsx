"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

type Status = "idle" | "loading" | "error";

/**
 * Posts to /api/waitlist (MailerLite). `source` tags which section the
 * signup came from — useful once there's more than one entry point (hero,
 * founding CTA) to see what's converting.
 *
 * On success, navigates to /thank-you rather than showing an inline message —
 * a full page gives the reassurance copy room to actually land, instead of a
 * one-line swap in place of the form.
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
  const router = useRouter();
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

      if (!res.ok) {
        const data = (await res.json()) as { message: string };
        setStatus("error");
        setMessage(data.message);
        return;
      }

      router.push("/thank-you");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
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
