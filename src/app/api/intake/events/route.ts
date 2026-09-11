import { NextResponse } from "next/server";
import { getIntakeClient, intakeQuestions } from "@/content/intake-clients";
import {
  isStoreConfigured,
  recordEvent,
  recordSubmission,
  type IntakeEvent,
} from "@/lib/intake-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32 * 1024;
const MAX_FIELD_CHARS = 4000;

type Incoming = {
  type?: string;
  slug?: string;
  sessionId?: string;
  ua?: string;
  referrer?: string;
  tz?: string;
  lang?: string;
  viewport?: string;
  answered?: number;
  total?: number;
  elapsedSec?: number;
  answers?: Record<string, unknown>;
};

const str = (v: unknown, max = 300): string | undefined =>
  typeof v === "string" && v.length > 0 ? v.slice(0, max) : undefined;

const num = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? Math.round(v) : undefined;

function clientIp(req: Request): string | undefined {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || undefined;
}

/** Keep only known question ids, coerced to the shape each question expects. */
function sanitizeAnswers(raw: Record<string, unknown>): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  for (const q of intakeQuestions) {
    const v = raw[q.id];
    if (q.type === "checkbox") {
      if (Array.isArray(v)) {
        out[q.id] = v
          .filter((x): x is string => typeof x === "string")
          .map((x) => x.slice(0, MAX_FIELD_CHARS))
          .slice(0, 50);
      }
    } else if (typeof v === "string" && v.trim()) {
      out[q.id] = v.slice(0, MAX_FIELD_CHARS);
    }
    const other = raw[`${q.id}__other`];
    if (q.otherOption && typeof other === "string" && other.trim()) {
      out[`${q.id}__other`] = other.slice(0, MAX_FIELD_CHARS);
    }
  }
  return out;
}

export async function POST(req: Request) {
  if (!isStoreConfigured()) {
    return NextResponse.json({ ok: false, error: "store_not_configured" }, { status: 503 });
  }

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: Incoming;
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const slug = str(body.slug, 80);
  const type = body.type;
  if (!slug || !getIntakeClient(slug)) {
    return NextResponse.json({ ok: false, error: "unknown_slug" }, { status: 404 });
  }
  if (type !== "open" && type !== "progress" && type !== "submit") {
    return NextResponse.json({ ok: false, error: "bad_type" }, { status: 400 });
  }

  const base: IntakeEvent = {
    type,
    slug,
    at: new Date().toISOString(),
    sessionId: str(body.sessionId, 64) ?? "unknown",
    ua: str(body.ua ?? req.headers.get("user-agent"), 400),
    referrer: str(body.referrer, 400),
    tz: str(body.tz, 80),
    lang: str(body.lang, 40),
    viewport: str(body.viewport, 40),
    ip: clientIp(req),
  };

  try {
    if (type === "submit") {
      const answers = sanitizeAnswers(
        body.answers && typeof body.answers === "object" ? body.answers : {},
      );
      const missing = intakeQuestions
        .filter((q) => q.required)
        .filter((q) => {
          const v = answers[q.id];
          return v === undefined || (Array.isArray(v) ? v.length === 0 : !v.trim());
        })
        .map((q) => q.id);
      if (missing.length) {
        return NextResponse.json({ ok: false, error: "missing_required", missing }, { status: 422 });
      }
      await recordSubmission({
        slug,
        at: base.at,
        sessionId: base.sessionId,
        answers,
        ua: base.ua,
        ip: base.ip,
      });
      await recordEvent(base);
    } else {
      await recordEvent({
        ...base,
        answered: num(body.answered),
        total: num(body.total),
        elapsedSec: num(body.elapsedSec),
      });
    }
  } catch (err) {
    console.error("[intake] store write failed", err);
    return NextResponse.json({ ok: false, error: "store_error" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
