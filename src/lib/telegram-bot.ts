/**
 * Telegram Bot — обработка команд.
 *
 * Команды:
 *   /start   — приветствие
 *   /leads   — последние 10 заявок
 *   /stats   — статистика за неделю
 *   /today   — статистика за сегодня
 *   /city    — топ городов
 *   /export  — CSV-экспорт за месяц
 *   /help    — список команд
 */

import { escapeHtml } from "@/lib/html";
import { SITE_URL } from "@/config/site";
import logger from "@/lib/logger";

const TELEGRAM_API = "https://api.telegram.org";

interface BotContext {
  chatId: string;
  text: string;
}

/**
 * Обработать входящее обновление от Telegram.
 */
export async function handleBotUpdate(update: Record<string, unknown>): Promise<void> {
  const message = update.message as Record<string, unknown> | undefined;
  if (!message) return;

  const chat = message.chat as Record<string, unknown> | undefined;
  const chatId = String(chat?.id ?? "");
  const text = String(message.text ?? "");

  if (!chatId || !text) return;

  // Проверяем, что сообщение из разрешённого чата
  const rawChatIds = process.env.TELEGRAM_CHAT_ID || "";
  const allowedChatIds = rawChatIds.split(",").map((id) => id.trim()).filter(Boolean);
  if (!allowedChatIds.includes(chatId)) {
    await sendTelegramMessage(chatId, "⛔ У вас нет доступа к этому боту.");
    return;
  }

  const ctx: BotContext = { chatId, text };
  const command = text.split(" ")[0].toLowerCase().split("@")[0]; // /leads@bot_name → /leads

  switch (command) {
    case "/start":
      await handleStart(ctx);
      break;
    case "/leads":
      await handleLeads(ctx);
      break;
    case "/stats":
      await handleStats(ctx, "week");
      break;
    case "/today":
      await handleStats(ctx, "today");
      break;
    case "/month":
      await handleStats(ctx, "month");
      break;
    case "/city":
      await handleCity(ctx);
      break;
    case "/export":
      await handleExport(ctx);
      break;
    case "/help":
      await handleHelp(ctx);
      break;
    default:
      // Игнорируем неизвестные команды
      break;
  }
}

// ─── Команды ───

async function handleStart(ctx: BotContext): Promise<void> {
  await sendTelegramMessage(
    ctx.chatId,
    `🤖 <b>Diverse Bot</b>\n\n` +
    `Добро пожаловать! Я помогу отслеживать заявки с сайта.\n\n` +
    `<b>Команды:</b>\n` +
    `/leads — последние 10 заявок\n` +
    `/today — статистика за сегодня\n` +
    `/stats — статистика за неделю\n` +
    `/month — статистика за месяц\n` +
    `/city — топ городов\n` +
    `/export — CSV-экспорт\n` +
    `/help — список команд`
  );
}

async function handleLeads(ctx: BotContext): Promise<void> {
  const result = await fetchLeads("list", "all", undefined, 10);
  if (!result || typeof result === "string" || !result.ok) {
    const error = typeof result === "string" ? result : "unknown error";
    await sendTelegramMessage(ctx.chatId, `⚠️ Ошибка: ${error}`);
    return;
  }

  const leads = result.leads;
  if (!leads || leads.length === 0) {
    await sendTelegramMessage(ctx.chatId, `📭 Заявок пока нет`);
    return;
  }

  const lines = leads.map((lead, i) => {
    const date = new Date(String(lead.created_at)).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const city = lead.city ? ` 📍${escapeHtml(String(lead.city))}` : "";
    const source = lead.source === "callback" ? "📞" : "📩";
    return `${i + 1}. ${source} <b>${escapeHtml(String(lead.name))}</b> — ${escapeHtml(String(lead.phone))}${city} (${date})`;
  });

  await sendTelegramMessage(
    ctx.chatId,
    `📋 <b>Последние заявки:</b>\n\n${lines.join("\n")}`
  );
}

async function handleStats(ctx: BotContext, period: string): Promise<void> {
  const result = await fetchLeads("stats", period);
  if (!result || typeof result === "string" || !result.ok) {
    const error = typeof result === "string" ? result : "unknown error";
    await sendTelegramMessage(ctx.chatId, `⚠️ Ошибка: ${error}`);
    return;
  }

  const stats = result.stats;
  if (!stats) {
    await sendTelegramMessage(ctx.chatId, `📭 Нет данных`);
    return;
  }

  const periodLabel: Record<string, string> = {
    today: "Сегодня",
    week: "За неделю",
    month: "За месяц",
    all: "За всё время",
  };

  let msg = `📊 <b>Статистика — ${periodLabel[period] || period}</b>\n\n`;
  msg += `📬 Всего заявок: <b>${stats.total}</b>\n`;

  if (stats.byDay && stats.byDay.length > 0) {
    msg += `\n📅 <b>По дням:</b>\n`;
    for (const day of stats.byDay.slice(0, 7)) {
      const bar = "█".repeat(Math.min(Number(day.count), 20));
      msg += `  ${day.date}: ${bar} ${day.count}\n`;
    }
  }

  if (stats.bySource && stats.bySource.length > 0) {
    msg += `\n🔗 <b>По источникам:</b>\n`;
    const sourceNames: Record<string, string> = {
      form: "Форма",
      callback: "Обратный звонок",
      franchise: "Франшиза",
    };
    for (const src of stats.bySource) {
      msg += `  ${sourceNames[String(src.source)] || String(src.source)}: ${src.count}\n`;
    }
  }

  await sendTelegramMessage(ctx.chatId, msg);
}

async function handleCity(ctx: BotContext): Promise<void> {
  const result = await fetchLeads("stats", "all");
  if (!result || typeof result === "string" || !result.ok) {
    const error = typeof result === "string" ? result : "unknown error";
    await sendTelegramMessage(ctx.chatId, `⚠️ Ошибка: ${error}`);
    return;
  }

  const stats = result.stats;
  if (!stats || !stats.byCity || stats.byCity.length === 0) {
    await sendTelegramMessage(ctx.chatId, `📭 Данных о городах пока нет`);
    return;
  }

  const lines = stats.byCity.map((c, i) => {
    const emoji = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "  ";
    const bar = "█".repeat(Math.min(Number(c.count), 20));
    return `${emoji} <b>${escapeHtml(String(c.city))}</b>: ${bar} ${c.count}`;
  });

  await sendTelegramMessage(
    ctx.chatId,
    `🏙 <b>Топ городов (за всё время):</b>\n\n${lines.join("\n")}`
  );
}

async function handleExport(ctx: BotContext): Promise<void> {
  const csv = await fetchLeadsCsv("month");
  if (csv === null) {
    await sendTelegramMessage(ctx.chatId, `⚠️ Ошибка экспорта`);
    return;
  }
  // Пустой экспорт = только строка заголовка
  if (csv.trim() === "" || csv.trim() === "ID,Имя,Телефон,Email,Сообщение,Город,Источник,Дата") {
    await sendTelegramMessage(ctx.chatId, `📭 Заявок за месяц пока нет`);
    return;
  }
  const ok = await sendTelegramDocument(ctx.chatId, "leads.csv", csv, "text/csv");
  if (!ok) {
    await sendTelegramMessage(ctx.chatId, `⚠️ Не удалось отправить CSV-файл`);
  }
}

async function handleHelp(ctx: BotContext): Promise<void> {
  await sendTelegramMessage(
    ctx.chatId,
    `🤖 <b>Diverse Bot — Команды</b>\n\n` +
    `/leads — последние 10 заявок\n` +
    `/today — статистика за сегодня\n` +
    `/stats — статистика за неделю\n` +
    `/month — статистика за месяц\n` +
    `/city — топ городов\n` +
    `/export — CSV-экспорт за месяц\n` +
    `/help — эта справка`
  );
}

// ─── API вызовы ───

interface FetchLeadsOk {
  ok: true;
  leads?: Array<Record<string, unknown>>;
  stats?: {
    total: number;
    byCity: Array<Record<string, unknown>>;
    bySource: Array<Record<string, unknown>>;
    byDay: Array<Record<string, unknown>>;
  };
}

interface FetchLeadsErr {
  ok: false;
  error: string;
}

type FetchLeadsResult = FetchLeadsOk | FetchLeadsErr | string;

async function fetchLeads(
  action: string,
  period: string,
  city?: string,
  limit?: number
): Promise<FetchLeadsResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return { ok: false, error: "Bot token not configured" };

  const params = new URLSearchParams({ action, period });
  if (city) params.set("city", city);
  if (limit) params.set("limit", String(limit));

  try {
    const res = await fetch(`${SITE_URL}/api/leads?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return await res.json();
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/**
 * Получить CSV-экспорт заявок (текст, не JSON).
 * Возвращает null при ошибке.
 */
async function fetchLeadsCsv(period: string): Promise<string | null> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;

  const params = new URLSearchParams({ action: "export", period });
  try {
    const res = await fetch(`${SITE_URL}/api/leads?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
    logger.error({ err }, "Failed to fetch leads CSV");
    return null;
  }
}

// ─── Отправка сообщений ───

async function sendTelegramMessage(chatId: string, text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  try {
    await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch (err) {
    logger.error({ err, chatId }, "Failed to send Telegram message");
  }
}

/**
 * Отправить файл (документ) в чат через sendDocument.
 */
async function sendTelegramDocument(
  chatId: string,
  filename: string,
  content: string,
  mime: string
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return false;

  try {
    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("document", new Blob([content], { type: mime }), filename);
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendDocument`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) {
      logger.warn({ status: res.status, chatId }, "sendDocument failed");
    }
    return res.ok;
  } catch (err) {
    logger.error({ err, chatId }, "Failed to send Telegram document");
    return false;
  }
}

/**
 * Установить webhook URL (вызывать при деплое или вручную).
 */
export async function setWebhook(webhookUrl: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return false;

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ["message"],
      }),
    });
    const data = await res.json();
    logger.info({ ok: data.ok, webhookUrl }, "Webhook set");
    return data.ok;
  } catch (err) {
    logger.error({ err }, "Failed to set webhook");
    return false;
  }
}
