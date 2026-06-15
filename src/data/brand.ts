export interface Subbrand {
  name: string;
  desc: string;
  img: string;
}

export const subbrands: Subbrand[] = [
  {
    name: "Diverse",
    desc: "Флагманская линия для тех, кто ищет разнообразие и живёт активно. Одежда — манифест образа жизни: открытость, спонтанность, уверенность.",
    img: "/images/diverse.avif",
  },
  {
    name: "Diverse Extreme Team",
    desc: "Сила, адреналин, ломание барьеров. Спонсор Night of the Jumps и технический партнёр Dakar Rally. Для тех, кто пересекает внутренние границы.",
    img: "/images/etremeteam.avif",
  },
  {
    name: "Coalition",
    desc: "ДНК снега и воды. Летние виды спорта, молодость, комфорт, воздушные ткани и яркие цветовые контрасты. Микс спорта с casual стилем.",
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
