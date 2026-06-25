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
    quote: "Искал бизнес без огромного входного билета — наткнулся на Diverse, подкупило что взнос и роялти вообще отсутствуют. Первый год работал сам с одной продавщицей, сейчас штат 4 человека. За 6 лет ни разу не пожалел — стабильные 400–500 чистыми каждый месяц, клиенты любят бренд.",
    investment: "3 млн ₽",
    profitMonth: "~450 тыс ₽",
    paybackPeriod: "10 мес",
    roi: "15%",
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
    quote: "Сомневался, выстрелит ли польский бренд в Уфе. Оказалось, что люди уже знают Diverse по Instagram и Dakar Rally. В первый же день продали 45 тысяч. Сейчас средняя выручка 1,8–2 млн в месяц, прибыль стабильно 250–300. В планах открыть POP-UP в спальном районе города.",
    investment: "2,4 млн ₽",
    profitMonth: "~280 тыс ₽",
    paybackPeriod: "11 мес",
    roi: "12%",
  },
];
