export interface Subbrand {
  name: string;
  desc: string;
  img: string;
}

export const subbrands: Subbrand[] = [
  {
    name: "Diverse",
    desc: "Флагманский суббренд для городских жителей. Концепция «из поколения в поколение» — одежда на годы.",
    img: "/images/diverse.avif",
  },
  {
    name: "Diverse Extreme Team",
    desc: "Технический партнёр Dakar Rally. Спорт, эмоции, DEXT TECH.",
    img: "/images/etremeteam.avif",
  },
  {
    name: "Coalition",
    desc: "Премиум-суббренд. Streetwear, workwear, спорт.",
    img: "/images/coalition.avif",
  },
];

export interface StatItem {
  num: string;
  label: string;
  accent?: boolean;
}

export const aboutStats: StatItem[] = [
  { num: "1993", label: "Год основания" },
  { num: "400+", label: "Магазинов" },
  { num: "3", label: "Суббренда", accent: true },
];

export const heroStats = [
  { num: "30+", label: "Лет на рынке" },
  { num: "400+", label: "Магазинов в мире" },
  { num: "11", label: "В РФ и Казахстане", accent: true },
];
