/**
 * In-memory rate limiter for API routes.
 * Resets on server restart. Not shared across instances.
 *
 * In production with multiple Vercel instances, consider migrating to
 * @upstash/ratelimit for consistent cross-instance rate limiting.
 */

import { NextResponse } from "next/server";

interface RateEntry {
  count: number;
  resetAt: number;
}

const rateMap = new Map<string, RateEntry>();

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number; // Unix ms
  /** Retry-After in seconds (0 if allowed) */
  retryAfter: number;
}

/**
 * Check if request from `key` is within limit.
 *
 * @param key — unique identifier (IP, user ID, etc.)
 * @param limit — max requests in the window (default 10)
 * @param windowMs — window duration in ms (default 60_000 = 1 min)
 */
export function checkRateLimit(
  key: string,
  limit: number = 10,
  windowMs: number = 60_000,
): RateLimitResult {
  const now = Date.now();
  const entry = rateMap.get(key);
  const resetEntry = (): RateEntry => ({ count: 1, resetAt: now + windowMs });

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, resetEntry());
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetAt: now + windowMs,
      retryAfter: 0,
    };
  }

  entry.count += 1;

  return {
    allowed: entry.count <= limit,
    limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
    retryAfter: Math.max(0, Math.ceil((entry.resetAt - now) / 1000)),
  };
}

/** Build a 429 NextResponse with standard rate‑limit headers. */
export function rateLimitResponse(
  result: RateLimitResult,
  message?: string,
): NextResponse {
  return NextResponse.json(
    { error: message ?? "Слишком много запросов. Попробуйте позже." },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfter),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
      },
    },
  );
}

/** Pure function: clean up stale entries (call periodically if desired). */
export function pruneRateLimit(olderThanMs: number = 300_000): number {
  const now = Date.now();
  let pruned = 0;
  for (const [key, entry] of rateMap) {
    if (now > entry.resetAt + olderThanMs) {
      rateMap.delete(key);
      pruned++;
    }
  }
  return pruned;
}
