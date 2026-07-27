import { describe, it, expect } from "vitest";
import { formatPhone } from "@/lib/phone";

describe("formatPhone", () => {
  it("formats 11-digit RU phone", () => {
    expect(formatPhone("+79001234567")).toBe("+7 (900) 123-45-67");
  });

  it("formats phone with dashes", () => {
    expect(formatPhone("+7-900-123-45-67")).toBe("+7 (900) 123-45-67");
  });

  it("formats phone with spaces", () => {
    expect(formatPhone("+7 900 123 45 67")).toBe("+7 (900) 123-45-67");
  });

  it("formats phone with parentheses", () => {
    expect(formatPhone("+7 (900) 123-45-67")).toBe("+7 (900) 123-45-67");
  });

  it("returns raw string for too-short input", () => {
    expect(formatPhone("123")).toBe("123");
  });

  it("returns raw string for non-phone input", () => {
    expect(formatPhone("hello")).toBe("hello");
  });

  it("returns raw for 10 digits", () => {
    expect(formatPhone("9001234567")).toBe("9001234567");
  });
});
