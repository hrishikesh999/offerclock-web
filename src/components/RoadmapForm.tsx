"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const PLATFORMS = ["Kajabi", "Podia", "Circle", "LearnDash", "Skool", "Mighty Networks", "Other"];

/** Footer §7, column 3: "On a different platform? Put it on the roadmap." */
export function RoadmapForm() {
  const [platform, setPlatform] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const selectId = useId();
  const emailId = useId();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer-roadmap", platform: platform || undefined }),
      });
      const data = (await res.json()) as { message: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.message);
        return;
      }

      setStatus("success");
      setMessage("Added to the roadmap list");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="mt-3 text-sm" style={{ color: "var(--slate)" }} role="status">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2.5" noValidate>
      <label htmlFor={selectId} className="sr-only">
        Your platform
      </label>
      <select
        id={selectId}
        className="rounded-[10px] border px-3 py-2.5 text-sm"
        style={{ borderColor: "var(--rule)", background: "var(--card)", color: "var(--ink)" }}
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="">On a different platform?</option>
        {PLATFORMS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>

      <label htmlFor={emailId} className="sr-only">
        Email for roadmap updates
      </label>
      <input
        id={emailId}
        type="email"
        required
        placeholder="you@yourbrand.com"
        className="rounded-[10px] border px-3 py-2.5 text-sm"
        style={{ borderColor: "var(--rule)", background: "var(--card)", color: "var(--ink)" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn-pill btn-ghost btn-sm" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Put my platform on the roadmap"}
      </button>
      {status === "error" && message && (
        <p className="text-xs" style={{ color: "var(--bad)" }} role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
