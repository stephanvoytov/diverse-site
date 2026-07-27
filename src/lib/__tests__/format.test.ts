import { describe, it, expect } from "vitest";
import { formatBig, formatPayoff } from "@/lib/format";

describe("formatBig", () => {
  it("formats millions with ₽/мес", () => {
    expect(formatBig("~2 500 000 ₽/мес")).toBe("~2 млн ₽/мес");
  });

  it("formats thousands with ₽/мес", () => {
    expect(formatBig("~450 000 ₽/мес")).toBe("~450 тыс ₽/мес");
  });

  it("formats millions without suffix", () => {
    expect(formatBig("~5 000 000")).toBe("~5 млн");
  });

  it("formats thousands without suffix", () => {
    expect(formatBig("~120 000")).toBe("~120 тыс");
  });

  it("returns small numbers as-is", () => {
    expect(formatBig("~500")).toBe("~500");
  });

  it("returns exact threshold (1000) as-is — 4 digits = thousands", () => {
    expect(formatBig("~1 000")).toBe("~1 тыс");
  });

  it("handles number without tilde", () => {
    expect(formatBig("2500000 ₽/мес")).toBe("2 млн ₽/мес");
  });
});

describe("formatPayoff", () => {
  it("is an alias for formatBig", () => {
    expect(formatPayoff("~3 000 000 ₽/мес")).toBe("~3 млн ₽/мес");
  });
});
