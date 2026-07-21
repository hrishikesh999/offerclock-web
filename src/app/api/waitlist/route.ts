import { type NextRequest, NextResponse } from "next/server";

/**
 * Proxies waitlist signups to MailerLite. Kept server-side so the API key
 * never reaches the client (PRD §10 credential discipline).
 *
 * Requires env: MAILERLITE_API_KEY, MAILERLITE_GROUP_ID.
 * MailerLite API docs: https://developers.mailerlite.com/docs/subscribers.html
 *
 * The `source` custom field must exist on the MailerLite account before first
 * use (Subscribers → Custom fields) — the API silently drops fields it
 * doesn't recognize rather than erroring.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Basic per-IP throttle. Fine for a single-instance/edge deploy; swap for a
// shared store (e.g. Upstash) if this ever runs across multiple regions.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;
  if (!apiKey || !groupId) {
    return NextResponse.json({ message: "Waitlist is not configured yet" }, { status: 500 });
  }

  let body: { email?: unknown; source?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 64) : undefined;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address" }, { status: 400 });
  }

  const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      fields: source ? { source } : undefined,
    }),
  });

  if (!response.ok) {
    // MailerLite returns 422 for "already a subscriber" — treat that as success
    // so a returning visitor doesn't see an error for re-submitting the form.
    if (response.status === 422) {
      return NextResponse.json({ message: "You're on the list" });
    }
    return NextResponse.json({ message: "Something went wrong. Try again." }, { status: 502 });
  }

  return NextResponse.json({ message: "You're on the list" });
}
