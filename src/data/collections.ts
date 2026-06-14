export interface Collection {
  id: string;
  name: string;
  short: string;
  tag: string;
  vibe: string;
  colorFrom: string;
  colorTo: string;
  image?: string;
  bgPosition?: string;
}

export const collections: Collection[] = [
  {
    id: "diverse",
    name: "Diverse",
    short: "DV",
    tag: "Флагман",
    vibe:
      "Бренд для активных людей, для которых одежда — манифест образа жизни: открытость, спонтанность, энергия. Почти 30 лет Diverse задаёт стандарты уличной моды, сочетая комфорт, качество и стиль.",
    colorFrom: "#1a1a2e",
    colorTo: "#16213e",
    image: "diverse.jpg",
  },
  {
    id: "dakar",
    name: "Dakar",
    short: "DK",
    tag: "Ралли",
    vibe:
      "Команда Diverse Extreme Team — технический партнёр ралли Дакар с 2020 года. Официальная коллекция гонки. Цвета пустыни: беж, хаки, графит, чёрный. Адреналин, экстрим, ставки на пределе возможного.",
    colorFrom: "#e94560",
    colorTo: "#533483",
    image: "dakar.jpg",
  },
  {
    id: "denim",
    name: "Denim",
    short: "DN",
    tag: "Деним",
    vibe:
      "Деним вне времени. Каждый сезон — новая форма, но верность классике. Для неё: от skinny до wide leg, макси-юбки и куртки. Для него: свободный крой, cargo. Джинсовая классика от Diverse.",
    colorFrom: "#c0392b",
    colorTo: "#f39c12",
    image: "denim.jpg",
  },
  {
    id: "lemans",
    name: "24H Le Mans",
    short: "LM",
    tag: "Ле-Ман",
    vibe:
      "Лимитированная коллекция по лицензии Automobile Club de l'Ouest. Цвета гонки: синий, красный, белый. Шахматный флаг, бомбер, стёганый жилет, поло. Для фанатов легендарного кольца Сарт.",
    colorFrom: "#0f3460",
    colorTo: "#1a1a2e",
    image: "leman.jpg",
  },
  {
    id: "dext",
    name: "DEXT",
    short: "DX",
    tag: "Технологии",
    vibe:
      "Команда Diverse Extreme Team — стритвир и утилитарная эстетика. Городской камуфляж: функциональность, характер и дерзость. Для поколения Z: граффити, энергия улиц, никаких рамок.",
    colorFrom: "#2d3436",
    colorTo: "#636e72",
    image: "dext.png",
    bgPosition: "center 25%",
  },
  {
    id: "coalition",
    name: "Coalition",
    short: "CL",
    tag: "Outdoor",
    vibe:
      "Для тех, кто живёт активным отдыхом. Лето — скейтбординг и спорт-ретро, Coalition Skate. Зима — outdoor-ретро, Патагония, природа. Свежесть, молодость, комфорт.",
    colorFrom: "#6c5ce7",
    colorTo: "#a29bfe",
    image: "coalition.jpg",
  },
  {
    id: "evo",
    name: "EVO Series",
    short: "EV",
    tag: "Инновации",
    vibe:
      "Технологичная линейка курток. Утеплитель PrimaLoft, система спасения RECCO, обогрев от пауэрбанка — три уровня тепла. Непромокаемые, дышащие материалы. Для города и гор, для холода и ветра.",
    colorFrom: "#00b894",
    colorTo: "#00cec9",
    image: "evo.jpg",
  },
  {
    id: "open",
    name: "Open",
    short: "OP",
    tag: "Теннис",
    vibe:
      "Теннисная эстетика, тихая роскошь. Солнечная Каталония, оттенки off-white, navy и бутылочно-зелёный. Для него и для неё. Мотивация к активному и здоровому образу жизни.",
    colorFrom: "#e8e0d4",
    colorTo: "#1e2a38",
    image: "open.jpg",
  },
  {
    id: "athletics",
    name: "Athletics",
    short: "AT",
    tag: "Спорт",
    vibe:
      "Городской спорт-кэжуал: комфорт без компромиссов. Плотный джерси, приглушённые оттенки, расслабленные силуэты. От утреннего кофе до вечерних встреч — спортивная лёгкость каждый день.",
    colorFrom: "#2c3e50",
    colorTo: "#95a5a6",
    image: "athletics.jpg",
  },
];
