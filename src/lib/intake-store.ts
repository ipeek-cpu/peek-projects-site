import { Redis } from "@upstash/redis";

/**
 * Storage for intake page tracking and submissions.
 *
 * Keys:
 *   intake:events:<slug>       LIST of IntakeEvent JSON, newest first (capped)
 *   intake:submissions:<slug>  LIST of IntakeSubmission JSON, newest first
 *
 * Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 */

export type IntakeEventType = "open" | "progress" | "submit";

export type IntakeEvent = {
  type: IntakeEventType;
  slug: string;
  at: string; // ISO timestamp, server-side
  sessionId: string;
  /** Client-reported context. Untrusted. */
  ua?: string;
  referrer?: string;
  tz?: string;
  lang?: string;
  viewport?: string;
  ip?: string;
  /** progress-only */
  answered?: number;
  total?: number;
  elapsedSec?: number;
};

export type IntakeSubmission = {
  slug: string;
  at: string;
  sessionId: string;
  answers: Record<string, string | string[]>;
  ua?: string;
  ip?: string;
};

const MAX_EVENTS = 500;
const MAX_SUBMISSIONS = 50;

let client: Redis | null | undefined;

export function getRedis(): Redis | null {
  if (client !== undefined) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}

export function isStoreConfigured(): boolean {
  return getRedis() !== null;
}

const eventsKey = (slug: string) => `intake:events:${slug}`;
const submissionsKey = (slug: string) => `intake:submissions:${slug}`;

export async function recordEvent(event: IntakeEvent): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Intake store not configured");
  const key = eventsKey(event.slug);
  await redis
    .multi()
    .lpush(key, JSON.stringify(event))
    .ltrim(key, 0, MAX_EVENTS - 1)
    .exec();
}

export async function recordSubmission(sub: IntakeSubmission): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Intake store not configured");
  const key = submissionsKey(sub.slug);
  await redis
    .multi()
    .lpush(key, JSON.stringify(sub))
    .ltrim(key, 0, MAX_SUBMISSIONS - 1)
    .exec();
}

function parseList<T>(rows: unknown[]): T[] {
  return rows
    .map((row) => {
      if (typeof row === "string") {
        try {
          return JSON.parse(row) as T;
        } catch {
          return null;
        }
      }
      // @upstash/redis auto-deserializes JSON strings by default.
      return row as T;
    })
    .filter((x): x is T => x !== null);
}

export async function getEvents(slug: string): Promise<IntakeEvent[]> {
  const redis = getRedis();
  if (!redis) return [];
  const rows = await redis.lrange<unknown>(eventsKey(slug), 0, MAX_EVENTS - 1);
  return parseList<IntakeEvent>(rows);
}

export async function getSubmissions(slug: string): Promise<IntakeSubmission[]> {
  const redis = getRedis();
  if (!redis) return [];
  const rows = await redis.lrange<unknown>(submissionsKey(slug), 0, MAX_SUBMISSIONS - 1);
  return parseList<IntakeSubmission>(rows);
}
