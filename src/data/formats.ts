import type { FormatId } from "@/config/site";

/* ——— Финансовые параметры форматов ——— */

export interface Scenario {
  label: string;
  payoff: string;
  months: string;
}

export interface FormatCard {
  id: string;
  name: string;
  tagline: string;
  revenue: string;
  area: string;
  fee: string;
  royalty: string;
  accent: boolean;
  scenarios: Scenario[];
}

export const formatCards: FormatCard[] = [
  {
    id: "island",
    name: "Торговый остров",
    tagline: "Быстрый старт",
    revenue: "~450 000 ₽/мес",
    area: "от 12 м²",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
    scenarios: [
      { label: "Пессимистичный", payoff: "~40 000 ₽/мес", months: "24 мес" },
      { label: "Базовый", payoff: "~75 000 ₽/мес", months: "14 мес" },
      { label: "Агрессивный", payoff: "~120 000 ₽/мес", months: "9 мес" },
    ],
  },
  {
    id: "renovation",
    name: "Реновация",
    tagline: "Переоборудование",
    revenue: "~1 000 000 ₽/мес",
    area: "Готовое помещение",
    fee: "0 ₽",
    royalty: "0%",
    accent: true,
    scenarios: [
      { label: "Пессимистичный", payoff: "~60 000 ₽/мес", months: "30 мес" },
      { label: "Базовый", payoff: "~150 000 ₽/мес", months: "14 мес" },
      { label: "Агрессивный", payoff: "~250 000 ₽/мес", months: "9 мес" },
    ],
  },
  {
    id: "standard",
    name: "Полный стандарт",
    tagline: "Магазин под ключ",
    revenue: "~2 500 000 ₽/мес",
    area: "от 60 м²",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
    scenarios: [
      { label: "Пессимистичный", payoff: "~150 000 ₽/мес", months: "28 мес" },
      { label: "Базовый", payoff: "~400 000 ₽/мес", months: "12 мес" },
      { label: "Агрессивный", payoff: "~700 000 ₽/мес", months: "7 мес" },
    ],
  },
];

/* ——— Прибыль по форматам для главной ——— */

export const cardProfit: Record<FormatId, string> = {
  island: "~80 тыс ₽",
  renovation: "~150 тыс ₽",
  standard: "~250 тыс ₽",
};

/* ——— Таблица сравнения форматов ——— */

export interface ComparisonRow {
  label: string;
  values: string[];
}

export const comparisonRows: ComparisonRow[] = [
  { label: "Инвестиции", values: ["от 800 000 ₽", "от 1 500 000 ₽", "от 3 000 000 ₽"] },
  { label: "Площадь", values: ["от 12 м²", "Существующее помещение", "от 60 м²"] },
  { label: "Дизайн-проект", values: ["Базовый", "Переоборудование", "Полный от ETOS"] },
  { label: "Срок запуска", values: ["от 2 недель", "от 3 недель", "от 4 недель"] },
  { label: "Товарный запас", values: ["Стартовый", "Стартовый", "Максимальный"] },
  { label: "Роялти", values: ["0%", "0%", "0%"] },
  { label: "Паушальный взнос", values: ["0 ₽", "0 ₽", "0 ₽"] },
];
