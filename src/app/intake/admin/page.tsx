import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { timingSafeEqual } from "node:crypto";
import { intakeClients, intakeQuestions } from "@/content/intake-clients";
import {
  getEvents,
  getSubmissions,
  isStoreConfigured,
  type IntakeEvent,
} from "@/lib/intake-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Intake — admin",
  robots: { index: false, follow: false },
};

function keyMatches(given: string | undefined): boolean {
  const expected = process.env.INTAKE_ADMIN_KEY;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "America/New_York",
  timeZoneName: "short",
});

function when(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : fmt.format(d);
}

function device(ua?: string): string {
  if (!ua) return "unknown";
  const os = /iPhone|iPad/.test(ua)
    ? "iOS"
    : /Android/.test(ua)
      ? "Android"
      : /Mac OS X/.test(ua)
        ? "macOS"
        : /Windows/.test(ua)
          ? "Windows"
          : /Linux/.test(ua)
            ? "Linux"
            : "other";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /Chrome\//.test(ua)
      ? "Chrome"
      : /Safari\//.test(ua)
        ? "Safari"
        : /Firefox\//.test(ua)
          ? "Firefox"
          : "browser";
  return `${os} · ${browser}`;
}

function describe(e: IntakeEvent): string {
  switch (e.type) {
    case "open":
      return `Opened · ${device(e.ua)}${e.tz ? ` · ${e.tz}` : ""}${e.referrer ? ` · from ${e.referrer}` : ""}`;
    case "progress":
      return `Left with ${e.answered ?? 0}/${e.total ?? "?"} answered after ${e.elapsedSec ?? 0}s`;
    case "submit":
      return "Submitted";
  }
}

const label = (id: string) => intakeQuestions.find((q) => q.id === id)?.label ?? id;

export default async function IntakeAdmin({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  if (!keyMatches(key)) notFound();

  const configured = isStoreConfigured();
  const rows = configured
    ? await Promise.all(
        intakeClients.map(async (c) => ({
          client: c,
          events: await getEvents(c.slug),
          submissions: await getSubmissions(c.slug),
        })),
      )
    : [];

  return (
    <main className="relative w-full">
      <div className="mx-auto max-w-[860px] px-6 pt-16 pb-24">
        <p
          className="font-mono text-xs uppercase"
          style={{ letterSpacing: "0.18em", color: "var(--text-muted)" }}
        >
          Intake · admin
        </p>
        <h1 style={{ fontSize: "2rem", marginTop: 12 }}>Who opened what</h1>

        {!configured && (
          <p
            className="mt-6 rounded-lg p-4 font-mono text-sm"
            style={{ border: "1px solid rgba(248,113,113,0.5)", color: "#f87171" }}
          >
            Store not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
          </p>
        )}

        <div className="mt-10 flex flex-col gap-12">
          {rows.map(({ client, events, submissions }) => {
            const opens = events.filter((e) => e.type === "open");
            const sessions = new Set(opens.map((e) => e.sessionId)).size;
            const firstOpen = opens.at(-1);
            const lastOpen = opens[0];
            const latest = submissions[0];
            return (
              <section
                key={client.slug}
                className="rounded-xl"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                <header
                  className="flex flex-wrap items-baseline justify-between gap-3 px-6 py-5"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <div>
                    <h2 style={{ fontSize: "1.25rem" }}>
                      {client.firstName ?? client.slug}
                      {client.company ? (
                        <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                          {" "}
                          · {client.company}
                        </span>
                      ) : null}
                    </h2>
                    <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                      /intake/{client.slug}
                    </p>
                  </div>
                  <span
                    className="font-mono text-xs"
                    style={{
                      color: latest ? "#0a0a0a" : "var(--text-dim)",
                      background: latest ? "var(--accent)" : "var(--surface-2)",
                      borderRadius: 999,
                      padding: "4px 10px",
                    }}
                  >
                    {latest ? "submitted" : opens.length ? "opened, not submitted" : "not opened"}
                  </span>
                </header>

                <dl
                  className="grid gap-4 px-6 py-5 sm:grid-cols-3"
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <Stat label="Opens" value={`${opens.length} (${sessions} session${sessions === 1 ? "" : "s"})`} />
                  <Stat label="First open" value={firstOpen ? when(firstOpen.at) : "—"} />
                  <Stat label="Last open" value={lastOpen ? when(lastOpen.at) : "—"} />
                </dl>

                {latest && (
                  <div className="px-6 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
                    <p
                      className="font-mono text-xs uppercase"
                      style={{ letterSpacing: "0.14em", color: "var(--accent)" }}
                    >
                      Submission · {when(latest.at)}
                      {submissions.length > 1 ? ` · ${submissions.length} total, latest shown` : ""}
                    </p>
                    <dl className="mt-4 flex flex-col gap-4">
                      {intakeQuestions.map((q) => {
                        const v = latest.answers[q.id];
                        const other = latest.answers[`${q.id}__other`];
                        if (v === undefined && !other) return null;
                        return (
                          <div key={q.id}>
                            <dt style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                              {label(q.id)}
                            </dt>
                            <dd style={{ color: "var(--text)", whiteSpace: "pre-wrap" }}>
                              {Array.isArray(v) ? v.join(", ") : v}
                              {other ? ` — ${other}` : ""}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </div>
                )}

                <div className="px-6 py-5">
                  <p
                    className="font-mono text-xs uppercase"
                    style={{ letterSpacing: "0.14em", color: "var(--text-muted)" }}
                  >
                    Timeline · newest first
                  </p>
                  {events.length === 0 ? (
                    <p className="mt-3" style={{ color: "var(--text-muted)" }}>
                      No activity yet.
                    </p>
                  ) : (
                    <ol className="mt-3 flex flex-col gap-2 font-mono text-sm">
                      {events.slice(0, 60).map((e, i) => (
                        <li key={`${e.at}-${i}`} className="flex flex-wrap gap-x-4 gap-y-1">
                          <span style={{ color: "var(--text-muted)", minWidth: 190 }}>
                            {when(e.at)}
                          </span>
                          <span style={{ color: e.type === "submit" ? "var(--accent)" : "var(--text-dim)" }}>
                            {describe(e)}
                          </span>
                          <span style={{ color: "var(--text-muted)" }}>
                            {e.sessionId.slice(0, 6)}
                            {e.ip ? ` · ${e.ip}` : ""}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-xs" style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}>
        {label}
      </dt>
      <dd style={{ color: "var(--text)", marginTop: 4 }}>{value}</dd>
    </div>
  );
}
