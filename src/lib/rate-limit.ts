/**
 * In-memory rate limiter for API routes.
 * Resets on server restart. Not shared across instances.
 */

const rateMap = new Map<string, { count: number; resetAt: number }>();

/** Check if request from `key` is within limit. Returns true if allowed. */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60_000,
): boolean {
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  entry.count += 1;
  return entry.count <= limit;
}

/** Get remaining requests for a key (0 if over limit or expired). */
export function getRemaining(key: string): number {
  const entry = rateMap.get(key);
  if (!entry || Date.now() > entry.resetAt) return 0;
  return Math.max(0, entry.count - 1);
}
