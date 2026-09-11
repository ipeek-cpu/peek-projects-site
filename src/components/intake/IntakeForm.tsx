"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { intakeQuestions, type Question } from "@/content/intake-clients";

type Answers = Record<string, string | string[]>;

type Props = {
  slug: string;
  firstName?: string;
};

const STORAGE_KEY = (slug: string) => `intake:draft:${slug}`;

function getSessionId(): string {
  try {
    const k = "intake:session";
    let id = sessionStorage.getItem(k);
    if (!id) {
      id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      sessionStorage.setItem(k, id);
    }
    return id;
  } catch {
    return "nostorage";
  }
}

function isAnswered(q: Question, answers: Answers): boolean {
  const v = answers[q.id];
  if (v === undefined) return false;
  return Array.isArray(v) ? v.length > 0 : v.trim().length > 0;
}

export function IntakeForm({ slug, firstName }: Props) {
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [hydrated, setHydrated] = useState(false);
  const startedAt = useRef<number>(0);
  const sessionId = useRef<string>("");
  const lastProgress = useRef<number>(-1);
  const statusRef = useRef(status);
  statusRef.current = status;
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const answeredCount = useMemo(
    () => intakeQuestions.filter((q) => isAnswered(q, answers)).length,
    [answers],
  );
  const total = intakeQuestions.length;

  /* Restore draft, then fire the open event. */
  useEffect(() => {
    startedAt.current = Date.now();
    sessionId.current = getSessionId();
    try {
      const raw = localStorage.getItem(STORAGE_KEY(slug));
      if (raw) {
        const parsed = JSON.parse(raw) as { answers?: Answers; sent?: boolean };
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.sent) setStatus("sent");
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);

    void fetch("/api/intake/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        type: "open",
        slug,
        sessionId: sessionId.current,
        referrer: document.referrer || undefined,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        lang: navigator.language,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
      }),
    }).catch(() => {});
  }, [slug]);

  /* Persist draft locally so a closed tab doesn't lose her answers. */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY(slug),
        JSON.stringify({ answers, sent: status === "sent" }),
      );
    } catch {
      /* ignore */
    }
  }, [answers, status, slug, hydrated]);

  /* Progress beacon when she leaves or hides the tab, only if something changed. */
  useEffect(() => {
    const send = () => {
      if (statusRef.current === "sent") return;
      const answered = intakeQuestions.filter((q) => isAnswered(q, answersRef.current)).length;
      if (answered === lastProgress.current) return;
      lastProgress.current = answered;
      const payload = JSON.stringify({
        type: "progress",
        slug,
        sessionId: sessionId.current,
        answered,
        total,
        elapsedSec: Math.round((Date.now() - startedAt.current) / 1000),
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/intake/events",
          new Blob([payload], { type: "application/json" }),
        );
      } else {
        void fetch("/api/intake/events", {
          method: "POST",
          headers: { "content-type": "application/json" },
          keepalive: true,
          body: payload,
        }).catch(() => {});
      }
    };
    const onVis = () => {
      if (document.visibilityState === "hidden") send();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", send);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", send);
    };
  }, [slug, total]);

  const setValue = useCallback((id: string, value: string | string[]) => {
    setAnswers((a) => ({ ...a, [id]: value }));
    setErrors((e) => {
      if (!e[id]) return e;
      const next = { ...e };
      delete next[id];
      return next;
    });
  }, []);

  const toggle = useCallback(
    (id: string, option: string) => {
      const current = (answers[id] as string[] | undefined) ?? [];
      setValue(
        id,
        current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
      );
    },
    [answers, setValue],
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    for (const q of intakeQuestions) {
      if (q.required && !isAnswered(q, answers)) {
        nextErrors[q.id] = "This one I need before the call.";
      }
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`q-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/intake/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "submit",
          slug,
          sessionId: sessionId.current,
          answers,
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div
        className="rounded-xl"
        style={{
          border: "1px solid var(--border-strong)",
          background: "var(--surface)",
          padding: "40px 32px",
        }}
      >
        <p
          className="font-mono text-xs uppercase"
          style={{ letterSpacing: "0.18em", color: "var(--accent)" }}
        >
          Received
        </p>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
            marginTop: 12,
            color: "var(--text)",
            textWrap: "balance",
          }}
        >
          {firstName ? `Thanks, ${firstName}.` : "Thanks."} That's everything I need before we talk.
        </h2>
        <p style={{ marginTop: 16, color: "var(--text-dim)", maxWidth: "52ch" }}>
          I&rsquo;ll read through this before our call and come with a first take on scope,
          approach, and what a realistic timeline looks like. If anything changes before then,
          just reply to my email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-10">
      <div
        className="sticky top-0 z-10 -mx-6 px-6 py-3 backdrop-blur-md"
        style={{
          background: "rgba(10, 10, 10, 0.78)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <span
            className="font-mono text-xs"
            style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
          >
            {answeredCount} of {total} answered
          </span>
          <div
            aria-hidden
            style={{
              flex: 1,
              maxWidth: 220,
              height: 3,
              borderRadius: 2,
              background: "var(--surface-2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(answeredCount / total) * 100}%`,
                height: "100%",
                background: "var(--accent)",
                transition: "width 240ms ease",
              }}
            />
          </div>
        </div>
      </div>

      {intakeQuestions.map((q, i) => (
        <fieldset
          key={q.id}
          id={`q-${q.id}`}
          className="intake-q flex flex-col gap-4"
          style={{ border: 0, minWidth: 0 }}
        >
          <legend className="flex flex-col gap-2" style={{ padding: 0 }}>
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-muted)", letterSpacing: "0.12em" }}
            >
              {String(i + 1).padStart(2, "0")}
              {q.required ? (
                <span style={{ color: "var(--accent)", marginLeft: 6 }} title="Required">
                  ●
                </span>
              ) : (
                <span style={{ marginLeft: 6 }}>optional</span>
              )}
            </span>
            <span
              style={{
                display: "block",
                fontSize: "1.2rem",
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "var(--text)",
                textWrap: "balance",
              }}
            >
              {q.label}
            </span>
            {q.help && (
              <span style={{ display: "block", color: "var(--text-dim)", fontSize: "0.95rem" }}>
                {q.help}
              </span>
            )}
          </legend>

          {q.type === "textarea" && (
            <textarea
              id={`f-${q.id}`}
              name={q.id}
              rows={4}
              placeholder={q.placeholder}
              value={(answers[q.id] as string) ?? ""}
              onChange={(e) => setValue(q.id, e.target.value)}
              className="intake-input"
              aria-invalid={!!errors[q.id]}
            />
          )}

          {q.type === "text" && (
            <input
              id={`f-${q.id}`}
              name={q.id}
              type="text"
              placeholder={q.placeholder}
              value={(answers[q.id] as string) ?? ""}
              onChange={(e) => setValue(q.id, e.target.value)}
              className="intake-input"
              aria-invalid={!!errors[q.id]}
            />
          )}

          {(q.type === "radio" || q.type === "checkbox") && (
            <div className="grid gap-2 sm:grid-cols-2">
              {q.options?.map((opt) => {
                const checked =
                  q.type === "radio"
                    ? answers[q.id] === opt
                    : ((answers[q.id] as string[] | undefined) ?? []).includes(opt);
                const inputId = `f-${q.id}-${opt.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
                return (
                  <label
                    key={opt}
                    htmlFor={inputId}
                    className="intake-option"
                    data-checked={checked ? "true" : "false"}
                  >
                    <input
                      id={inputId}
                      type={q.type}
                      name={q.id}
                      value={opt}
                      checked={checked}
                      onChange={() =>
                        q.type === "radio" ? setValue(q.id, opt) : toggle(q.id, opt)
                      }
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          )}

          {q.otherOption &&
            (q.type === "radio"
              ? answers[q.id] === q.otherOption
              : ((answers[q.id] as string[] | undefined) ?? []).includes(q.otherOption)) && (
              <input
                id={`f-${q.id}-other`}
                name={`${q.id}__other`}
                type="text"
                placeholder={q.id === "timeline" ? "Which date, and why that one?" : "Tell me more"}
                value={(answers[`${q.id}__other`] as string) ?? ""}
                onChange={(e) => setValue(`${q.id}__other`, e.target.value)}
                className="intake-input"
                autoFocus
              />
            )}

          {errors[q.id] && (
            <p role="alert" className="font-mono text-xs" style={{ color: "#f87171" }}>
              {errors[q.id]}
            </p>
          )}
        </fieldset>
      ))}

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="intake-submit"
        >
          {status === "sending" ? "Sending…" : "Send to Isaiah"}
        </button>
        {status === "failed" && (
          <p role="alert" className="font-mono text-xs" style={{ color: "#f87171" }}>
            That didn&rsquo;t go through. Your answers are saved in this browser, so try again in
            a moment, or reply to the email with them.
          </p>
        )}
        <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          Answers save in this browser as you type. Nothing is shared beyond this call.
        </p>
      </div>
    </form>
  );
}
