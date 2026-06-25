export interface Metric {
  value: string;
  label: string;
}

export const whyDiverseMetrics: Metric[] = [
  { value: "30+", label: "лет на рынке" },
  { value: "400+", label: "магазинов" },
  { value: "9+", label: "стран" },
  { value: "11", label: "действующих точек в РФ и Казахстане" },
  { value: "0 ₽", label: "паушальный взнос" },
  { value: "0%", label: "роялти" },
];

export interface CaseStudy {
  id: string;
  city: string;
  mall: string;
  photo: string;
  opened: string;
  area: string;
  format: string;
  tag: string;
  /** Цитата владельца */
  quote: string;
  /** Инвестиции */
  investment: string;
  /** Прибыль в месяц */
  profitMonth: string;
  /** Срок окупаемости */
  paybackPeriod: string;
  /** Доходность (ROI % в месяц) */
  roi: string;
  /** ID видео на YouTube (опционально) */
  youtubeId?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "kaliningrad",
    city: "Калининград",
    mall: "ТРЦ «Европа»",
    photo: "/images/stores/kaliningrad.jpg",
    opened: "2019",
    area: "120 м²",
    format: "Полный стандарт",
    tag: "Один из самых стабильных магазинов сети.",
    quote: "Diverse даёт готовый бизнес с нулевым взносом — это уникальное предложение на рынке франшиз. Мы работаем уже 6 лет, и сеть только растёт.",
    investment: "3 млн ₽",
    profitMonth: "~350 тыс ₽",
    paybackPeriod: "12 мес",
    roi: "12%",
  },
  {
    id: "ufa-mega",
    city: "Уфа",
    mall: "ТЦ «Мега-Уфа»",
    photo: "/images/stores/ufa-mega.webp",
    opened: "2022",
    area: "65 м²",
    format: "Полный стандарт",
    tag: "Высокий трафик ТЦ.",
    quote: "Формат позволяет быстро запуститься в любом крупном ТЦ. Уже через полгода вышли на плановую выручку.",
    investment: "2,4 млн ₽",
    profitMonth: "~250 тыс ₽",
    paybackPeriod: "13 мес",
    roi: "10%",
  },
];
