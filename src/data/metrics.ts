export interface Metric {
  value: string;
  label: string;
  desc: string;
}

export const whyDiverseMetrics: Metric[] = [
  {
    value: "4 500 ₽",
    label: "Средний чек",
    desc: "По всей сети магазинов",
  },
  {
    value: "50–55%",
    label: "Торговая маржа",
    desc: "Стабильная наценка на ассортимент",
  },
  {
    value: "60%",
    label: "Повторные продажи",
    desc: "Клиенты возвращаются в течение месяца",
  },
  {
    value: "35%",
    label: "Конверсия",
    desc: "Посетителей в покупатели",
  },
  {
    value: "2 000+",
    label: "SKU в ассортименте",
    desc: "Мужская, женская, детская, обувь, аксессуары",
  },
  {
    value: "1 раз/мес",
    label: "Поставки",
    desc: "Со склада в Гданьске, таможня включена",
  },
];

export interface CaseStudy {
  id: string;
  city: string;
  mall: string;
  photo: string;
  opened: string;
  area: string;
  format: string;
  sales: string;
  description: string;
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
    sales: "> 25 млн ₽/мес",
    description:
      "Первый магазин Diverse в России. Флагманский проект, на котором отрабатывались логистика, ассортиментная матрица и стандарты мерчандайзинга для всей сети.",
  },
  {
    id: "ufa-mega",
    city: "Уфа",
    mall: "ТЦ «Мега-Уфа»",
    photo: "/images/stores/ufa-mega.jpg",
    opened: "2021",
    area: "85 м²",
    format: "Торговый остров",
    sales: "> 15 млн ₽/мес",
    description:
      "Первый магазин в формате торгового острова. Доказал, что формат работает — через год партнёр открыл второй магазин (ТРЦ «Планета») уже по полному стандарту.",
  },
  {
    id: "surgut",
    city: "Сургут",
    mall: "ТРЦ «Сургут Сити Молл»",
    photo: "/images/stores/surgut.jpg",
    opened: "2022",
    area: "110 м²",
    format: "Полный стандарт",
    sales: "> 20 млн ₽/мес",
    description:
      "Удалённый регион — но высокий спрос. Магазин в Сургуте входит в топ-3 по выручке среди всех точек сети. Подтверждает, что формат работает в любом городе-миллионнике.",
  },
  {
    id: "krasnoyarsk",
    city: "Красноярск",
    mall: "ТРЦ «Комсомолл»",
    photo: "/images/stores/krasnoyarsk.jpg",
    opened: "2023",
    area: "95 м²",
    format: "Реновация",
    sales: "> 18 млн ₽/мес",
    description:
      "Открыт в 2023 году в непростой экономической ситуации. Вышел на окупаемость за 8 месяцев. Один из самых быстроокупаемых проектов в сети.",
  },
];
