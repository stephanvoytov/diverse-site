export interface Collection {
  id: string;
  name: string;
  short: string;
  tag: string;
  vibe: string;
  colorFrom: string;
  colorTo: string;
}

export const collections: Collection[] = [
  {
    id: "diverse",
    name: "Diverse",
    short: "DV",
    tag: "Флагман",
    vibe:
      "Уличная культура, хип-хоп, скейтбординг — это ДНК Diverse. Одежда, в которой живут города: от Нью-Йорка до Варшавы, от Москвы до Алматы.",
    colorFrom: "#1a1a2e",
    colorTo: "#16213e",
  },
  {
    id: "dakar",
    name: "Dakar",
    short: "DK",
    tag: "Ралли",
    vibe:
      "Песок, ветер, адреналин. Diverse Extreme Team — технический партнёр Dakar Rally. Одежда, прошедшая тысячи километров пустыни.",
    colorFrom: "#e94560",
    colorTo: "#533483",
  },
  {
    id: "denim",
    name: "Denim",
    short: "DN",
    tag: "Деним",
    vibe:
      "Route 66, Ford Mustang, гранж в наушниках. Сырой деним и косуха — вещи, которые не выходят из моды, потому что они вне времени.",
    colorFrom: "#c0392b",
    colorTo: "#f39c12",
  },
  {
    id: "lemans",
    name: "24H Le Mans",
    short: "LM",
    tag: "Ле-Ман",
    vibe:
      "Легендарная гонка, лимитированная серия. Белый, тёмно-синий, красный — цвета скорости и премиума. Diverse Extreme Team × Automobile Club de l'Ouest.",
    colorFrom: "#0f3460",
    colorTo: "#1a1a2e",
  },
  {
    id: "dext",
    name: "DEXT",
    short: "DX",
    tag: "Технологии",
    vibe:
      "Фазы Луны, минимализм, отражающие материалы. DEXT TECH II — одежда будущего, где каждая деталь продумана, каждая молния на своём месте.",
    colorFrom: "#2d3436",
    colorTo: "#636e72",
  },
  {
    id: "coalition",
    name: "Coalition",
    short: "CL",
    tag: "Outdoor",
    vibe:
      "Шерпа флис, пуховики, клетчатые рубашки. Coalition — это уют и стиль одновременно. Городской outdoor, в котором хочется гулять часами.",
    colorFrom: "#6c5ce7",
    colorTo: "#a29bfe",
  },
  {
    id: "evo",
    name: "EVO Series",
    short: "EV",
    tag: "Инновации",
    vibe:
      "PrimaLoft® греет, RECCO® спасает. EVO — технологии, которые работают. Для города, для гор, для тех, кто не идёт лёгкими путями.",
    colorFrom: "#00b894",
    colorTo: "#00cec9",
  },
  {
    id: "open",
    name: "Open",
    short: "OP",
    tag: "Премиум",
    vibe:
      "Солнечная Каталония, теннисные корты, белый — не совсем белый. Премиум без крика, качество, которое чувствуешь с первого касания.",
    colorFrom: "#e17055",
    colorTo: "#fdcb6e",
  },
  {
    id: "athletics",
    name: "Athletics",
    short: "AT",
    tag: "Спорт",
    vibe:
      "Вязаные комплекты, мягкий хлопок, oversize. То, что хочется надеть утром в выходной. Комфорт, который выглядит дорого.",
    colorFrom: "#2c3e50",
    colorTo: "#95a5a6",
  },
];
