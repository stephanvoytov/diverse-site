import { describe, it, expect } from "vitest";
import { asset } from "@/lib/path";

describe("asset", () => {
  it("prepends base path to absolute path", () => {
    // NEXT_PUBLIC_BASE_PATH is empty by default in test env
    expect(asset("/images/logo.svg")).toBe("/images/logo.svg");
  });

  it("returns / for root", () => {
    expect(asset("/")).toBe("/");
  });

  it("handles path without leading slash", () => {
    expect(asset("images/logo.svg")).toBe("images/logo.svg");
  });
});
