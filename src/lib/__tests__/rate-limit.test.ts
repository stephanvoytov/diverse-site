import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

// Use unique keys per test to avoid cross-contamination
let testKeyCounter = 0;
function uniqueKey(): string {
  return `test-ip-${++testKeyCounter}-${Date.now()}`;
}

describe("checkRateLimit", () => {
  it("allows first request with remaining = limit - 1", () => {
    const key = uniqueKey();
    const result = checkRateLimit(key, 5, 60_000);

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
    expect(result.limit).toBe(5);
    expect(result.retryAfter).toBe(0);
  });

  it("allows requests within limit", () => {
    const key = uniqueKey();
    for (let i = 0; i < 4; i++) {
      const result = checkRateLimit(key, 5, 60_000);
      expect(result.allowed).toBe(true);
    }
  });

  it("blocks requests over limit", () => {
    const key = uniqueKey();
    // Exhaust the limit
    for (let i = 0; i < 5; i++) {
      checkRateLimit(key, 5, 60_000);
    }
    // 6th request should be blocked
    const result = checkRateLimit(key, 5, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("different keys are independent", () => {
    const key1 = uniqueKey();
    const key2 = uniqueKey();

    // Exhaust key1
    for (let i = 0; i < 5; i++) {
      checkRateLimit(key1, 5, 60_000);
    }
    const blocked = checkRateLimit(key1, 5, 60_000);
    expect(blocked.allowed).toBe(false);

    // key2 should still be allowed
    const allowed = checkRateLimit(key2, 5, 60_000);
    expect(allowed.allowed).toBe(true);
  });

  it("returns correct retryAfter seconds", () => {
    const key = uniqueKey();
    const result = checkRateLimit(key, 5, 60_000);
    expect(result.retryAfter).toBeGreaterThanOrEqual(0);
    expect(result.retryAfter).toBeLessThanOrEqual(60);
  });

  it("decrements remaining correctly", () => {
    const key = uniqueKey();
    const r1 = checkRateLimit(key, 10, 60_000);
    expect(r1.remaining).toBe(9);

    const r2 = checkRateLimit(key, 10, 60_000);
    expect(r2.remaining).toBe(8);

    const r3 = checkRateLimit(key, 10, 60_000);
    expect(r3.remaining).toBe(7);
  });
});
