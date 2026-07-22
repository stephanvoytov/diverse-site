import { SITE_URL } from "@/config/site";
import type { NextRequest } from "next/server";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * llms.txt — помогает LLM (ChatGPT, Claude, Gemini) понять структуру сайта.
 * Спецификация: https://llmstxt.org/
 */
export async function GET(_request: NextRequest) {
  const url = SITE_URL;

  // -- данные для llms.txt (можно вынести в data/ если станет большим) --
  const pages: { title: string; path: string; desc: string }[] = [
    { title: "Главная",             path: "/",           desc: "Франшиза одежды Diverse — открыть магазин без взноса и роялти. 3 формата, старт от 800 тыс ₽." },
    { title: "О бренде",            path: "/about/",     desc: "30+ лет истории, таймлайн, философия бренда, суббренды DEXT и Coalition." },
    { title: "Франшиза",            path: "/franchise/",  desc: "Условия франшизы: 3 формата (POP-UP, Реновация, Полный стандарт), таблица P&L, галерея магазинов." },
    { title: "Коллекции",           path: "/collection/", desc: "10 коллекций: Dakar, Denim, 24H Le Mans, Urban, Outdoor, и другие направления." },
    { title: "Магазины",            path: "/stores/",    desc: "11 магазинов в 10 городах России и Казахстана: адреса, контакты, карта." },
    { title: "Политика конфиденциальности", path: "/privacy/", desc: "Обработка персональных данных, согласие на рекламные рассылки." },
  ];

  const features: { text: string }[] = [
    { text: "Паушальный взнос — 0 ₽ для всех форматов" },
    { text: "Роялти — 0%" },
    { text: "Старт от 800 тыс ₽ (формат POP-UP STORE)" },
    { text: "Более 400 магазинов в 9 странах мира" },
    { text: "Собственное производство в Польше" },
    { text: "Официальный партнёр Dakar Rally, 24H Le Mans" },
    { text: "Эксклюзивная территория без минимального объёма закупок" },
  ];

  const api: { title: string; path: string; desc: string }[] = [
    { title: "Отправить заявку",    path: "/api/lead",   desc: "POST /api/lead — отправка контактных данных. Тело: { name, phone, format?, city? }. Ответ: JSON." },
    { title: "Определить город",    path: "/api/geo/city", desc: "GET /api/geo/city — определение города по IP через DaData API." },
  ];

  // -- собираем текст --
  const lines: string[] = [];

  lines.push("# Diverse Russia");
  lines.push("> Официальный дистрибьютор марки Diverse в России и СНГ. Франшиза культового польского бренда одежды.");
  lines.push("");

  lines.push("## Pages");
  for (const p of pages) {
    lines.push(`- [${p.title}](${url}${basePath}${p.path}): ${p.desc}`);
  }
  lines.push("");

  lines.push("## Key features");
  for (const f of features) {
    lines.push(`- ${f.text}`);
  }
  lines.push("");

  lines.push("## API");
  for (const a of api) {
    lines.push(`- [${a.title}](${url}${basePath}${a.path}): ${a.desc}`);
  }
  lines.push("");

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
