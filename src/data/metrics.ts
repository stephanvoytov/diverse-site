export interface Metric {
  value: string;
  label: string;
}

export const whyDiverseMetrics: Metric[] = [
  { value: "30+", label: "лет на рынке" },
  { value: "400+", label: "магазинов" },
  { value: "20+", label: "стран" },
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
    investment: "3 000 000 ₽",
    profitMonth: "~250 000 ₽",
    paybackPeriod: "12–14 мес",
    roi: "8%",
  },
  {
    id: "ufa-mega",
    city: "Уфа",
    mall: "ТЦ «Мега-Уфа»",
    photo: "/images/stores/ufa-mega.jpg",
    opened: "2022",
    area: "—",
    format: "Полная линейка коллекций Diverse",
    tag: "Высокий трафик ТЦ.",
    quote: "Формат позволяет быстро запуститься в любом крупном ТЦ. Уже через полгода вышли на плановую выручку.",
    investment: "2 400 000 ₽",
    profitMonth: "~180 000 ₽",
    paybackPeriod: "~13 мес",
    roi: "8%",
  },
  {
    id: "almaty",
    city: "Алматы",
    mall: "ул. Розыбакиева, 289",
    photo: "/images/stores/almaty.jpg",
    opened: "2024",
    area: "—",
    format: "Международный формат",
    tag: "Подтверждает возможность масштабирования сети за пределами РФ.",
    quote: "Запуск в Казахстане показал, что бренд Diverse востребован не только в России. Логистика из Польши налажена.",
    investment: "3 200 000 ₽",
    profitMonth: "~200 000 ₽",
    paybackPeriod: "14–16 мес",
    roi: "6%",
  },
];
