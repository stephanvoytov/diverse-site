import { describe, it, expect } from "vitest";
import { parseMessagePairs } from "@/lib/message-parser";

describe("parseMessagePairs", () => {
  it("parses structured message with multiple pairs", () => {
    expect(parseMessagePairs("Формат: Реновация. Город: Казань")).toEqual([
      ["Формат", "Реновация"],
      ["Город", "Казань"],
    ]);
  });

  it("parses single pair", () => {
    expect(parseMessagePairs("Телефон: +79001234567")).toEqual([
      ["Телефон", "+79001234567"],
    ]);
  });

  it("parses three pairs", () => {
    expect(
      parseMessagePairs("Формат: Стандарт. Город: Уфа. Площадь: 80 м²")
    ).toEqual([
      ["Формат", "Стандарт"],
      ["Город", "Уфа"],
      ["Площадь", "80 м²"],
    ]);
  });

  it("returns null for free text without colons", () => {
    expect(parseMessagePairs("Хочу открыть магазин")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseMessagePairs("")).toBeNull();
  });

  it("returns null for pair with missing value", () => {
    expect(parseMessagePairs("Формат:")).toBeNull();
  });

  it("returns null if any part has no colon", () => {
    expect(parseMessagePairs("Формат: Реновация. Нет значения")).toBeNull();
  });

  it("handles whitespace around colons", () => {
    expect(parseMessagePairs("Формат :  Реновация")).toEqual([
      ["Формат", "Реновация"],
    ]);
  });
});
