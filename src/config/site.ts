/* ===== Контактные данные ===== */

export const SITE = {
  /** Публичное название компании */
  company: "ООО «ХАУС»",
  /** ИНН */
  inn: "3907201307",
  /** Юридический адрес */
  address: "236022, Калининградская область, г. Калининград, пл. Победы, д. 4, оф. 210",
  /** Домен */
  url: "https://diversebrand.ru",
} as const;

/** Единый URL сайта — сначала NEXT_PUBLIC_SITE_URL, потом fallback */
export const SITE_URL: string = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.ru";

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
  { id: "island" as const,     label: "POP-UP STORE",      desc: "от 800 тыс ₽, от 20 м²" },
  { id: "renovation" as const, label: "Реновация",         desc: "от 1,5 млн ₽, готовое помещение" },
  { id: "standard" as const,   label: "Полный стандарт",   desc: "от 3 млн ₽, от 60 м²" },
] as const;

export type FormatId = (typeof FORMAT_OPTIONS)[number]["id"];


