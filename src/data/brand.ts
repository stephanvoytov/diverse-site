export interface Subbrand {
  name: string;
  desc: string;
  img: string;
}

export const subbrands: Subbrand[] = [
  {
    name: "Diverse",
    desc: "Флагманская линия для тех, кто ищет разнообразие и живёт активно. Одежда — манифест образа жизни: открытость, спонтанность, уверенность.",
    img: "/images/about/diverse.jpg",
  },
  {
    name: "Diverse Extreme Team",
    desc: "Сила, адреналин, ломание барьеров. Спонсор Night of the Jumps и технический партнёр Dakar Rally. Для тех, кто пересекает внутренние границы.",
    img: "/images/about/dext.avif",
  },
  {
    name: "Coalition",
    desc: "ДНК снега и воды. Летние виды спорта, молодость, комфорт, воздушные ткани и яркие цветовые контрасты. Микс спорта с casual стилем.",
    img: "/images/about/coalition.avif",
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

/* ——— Trust model (Как устроена модель) ——— */

export interface TrustPoint {
  title: string;
  desc: string;
}

export const trustPoints: TrustPoint[] = [
  {
    title: "Вы платите только за товар",
    desc: "Никакого паушального взноса и роялти. Наша прибыль — с оборота поставок, поэтому мы заинтересованы в ваших продажах.",
  },
  {
    title: "Ваша маржа — 50–55%",
    desc: "В закупочную цену уже заложены таможня, сертификация и доставка до Калининграда. В рознице вы делаете стандартную наценку.",
  },
  {
    title: "Никаких обязательств по объёму",
    desc: "Нет минимальной суммы заказа. Вы заказываете ровно столько, сколько продаёте.",
  },
  {
    title: "Поставки раз в месяц из Гданьска",
    desc: "Личный кабинет в B2B-платформе. Выбираете товар, мы собираем, таможим и отправляем в любой город.",
  },
];
