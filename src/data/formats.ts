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
    name: "POP-UP STORE",
    tagline: "Магазин в галерее ТЦ",
    revenue: "~700 000 ₽/мес",
    area: "от 20 м²",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
    scenarios: [
      { label: "Пессимистичный", payoff: "~80 000 ₽/мес", months: "24 мес" },
      { label: "Базовый", payoff: "~150 000 ₽/мес", months: "14 мес" },
      { label: "Агрессивный", payoff: "~250 000 ₽/мес", months: "9 мес" },
    ],
  },
  {
    id: "multibrand",
    name: "MULTI BRAND STORE",
    tagline: "Коллекция в мультибренде",
    revenue: "по запросу",
    area: "Существующий магазин",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
    scenarios: [
      { label: "Пессимистичный", payoff: "по запросу", months: "—" },
      { label: "Базовый", payoff: "по запросу", months: "—" },
      { label: "Агрессивный", payoff: "по запросу", months: "—" },
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
    id: "manwomen",
    name: "DIVERSE Man / Women",
    tagline: "Одно направление",
    revenue: "по запросу",
    area: "от 70 м²",
    fee: "0 ₽",
    royalty: "0%",
    accent: false,
    scenarios: [
      { label: "Пессимистичный", payoff: "по запросу", months: "—" },
      { label: "Базовый", payoff: "по запросу", months: "—" },
      { label: "Агрессивный", payoff: "по запросу", months: "—" },
    ],
  },
  {
    id: "brandstore",
    name: "DIVERSE Brand Store",
    tagline: "Полный формат",
    revenue: "~2 500 000 ₽/мес",
    area: "от 120 м²",
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
  island: "от 150 тыс ₽",
  multibrand: "по запросу",
  renovation: "от 300 тыс ₽",
  manwomen: "по запросу",
  brandstore: "от 300 тыс ₽",
};

/* ——— Таблица сравнения форматов ——— */

export interface ComparisonRow {
  label: string;
  values: string[];
}

export const comparisonRows: ComparisonRow[] = [
  { label: "Площадь", values: ["от 20 м²", "Существующий магазин", "Готовое помещение", "от 70 м²", "от 120 м²"] },
  { label: "Дизайн-проект", values: ["Базовый", "Адаптация", "Переоборудование", "Проект от польских архитекторов", "Полный от польских архитекторов"] },
  { label: "Срок запуска", values: ["от 2 недель", "от 2 недель", "от 3 недель", "от 4 недель", "от 4 недель"] },
  { label: "Товарный запас", values: ["Стартовый", "Стартовый", "Стартовый", "Полный", "Максимальный"] },
  { label: "Роялти", values: ["0%", "0%", "0%", "0%", "0%"] },
  { label: "Паушальный взнос", values: ["0 ₽", "0 ₽", "0 ₽", "0 ₽", "0 ₽"] },
];
