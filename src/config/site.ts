/* ===== Контактные данные ===== */

export const SITE = {
  /** Публичное название компании */
  company: "ООО «ХАУС»",
  /** ИНН */
  inn: "3907201307",
  /** ОГРН (TODO: вписать реальный ОГРН из ЕГРЮЛ) */
  ogrn: "",
  /** Юридический адрес */
  address: "236022, Калининградская область, г. Калининград, пл. Победы, д. 4, оф. 210",
  /** Домен */
  url: "https://diversebrand.ru",
} as const;

/** Единый URL сайта — сначала NEXT_PUBLIC_SITE_URL, потом fallback */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.vercel.app";

export const CONTACTS = {
  /** Телефон (сырой, для tel: ссылок) */
  phoneRaw: "+79062373561",
  /** Email для заявок */
  email: "diverserussia@yandex.ru",
  /** Telegram-ссылка (замена WhatsApp, т.к. WA заблокирован в РФ) */
  telegram: "https://t.me/diversebrand",
  /** Ссылка на WhatsApp */
  whatsapp: "https://wa.me/79062373561",
} as const;

/* ===== Социальные сети ===== */

export const SOCIALS = {
  vk: "https://vk.com/public214522625",
  instagram: "https://www.instagram.com/diversebrand.ru/",
  youtube: "https://youtube.com/@diversebrand7475",
  telegram: "https://t.me/diversebrand",
  whatsapp: "https://wa.me/79062373561",
  rutube: "https://rutube.ru/channel/15520266/",
} as const;

/* ===== Форматы франшизы (для форм) ===== */

export const FORMAT_OPTIONS = [
  { id: "island" as const,     label: "POP-UP STORE",        desc: "от 20 м², галерея ТЦ" },
  { id: "multibrand" as const, label: "MULTI BRAND STORE",   desc: "в мультибрендовом магазине" },
  { id: "renovation" as const, label: "Реновация",           desc: "переоборудование, готовое помещение" },
  { id: "manwomen" as const,   label: "DIVERSE Man / Women", desc: "от 70 м², мужская или женская коллекция" },
  { id: "brandstore" as const, label: "DIVERSE Brand Store", desc: "от 120 м², полный формат" },
] as const;

export type FormatId = (typeof FORMAT_OPTIONS)[number]["id"];


