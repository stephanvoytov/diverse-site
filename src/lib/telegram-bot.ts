/**
 * Telegram Bot — обработка команд.
 *
 * Команды:
 *   /start   — приветствие
 *   /leads   — последние 10 заявок
 *   /stats   — статистика за неделю
 *   /today   — статистика за сегодня
 *   /month   — статистика за месяц
 *   /city    — топ городов
 *   /export  — CSV-экспорт за месяц
 *   /help    — список команд
 */

import { escapeHtml } from "@/lib/html";
import { SITE_URL } from "@/config/site";
import logger from "@/lib/logger";

const TELEGRAM_API = "https://api.telegram.org";
const DIVIDER = "───────────────";

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

  // Только разрешённые чаты (посторонних молча игнорируем)
  const rawChatIds = process.env.TELEGRAM_CHAT_ID || "";
  const allowedChatIds = rawChatIds.split(",").map((id) => id.trim()).filter(Boolean);
  if (!allowedChatIds.includes(chatId)) return;

  const ctx: BotContext = { chatId, text };
  const command = text.split(" ")[0].toLowerCase().split("@")[0]; // /leads@bot_name → /leads

  try {
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
  } catch (err) {
    logger.error({ err, chatId, command }, "Bot command error");
    await sendTelegramMessage(ctx.chatId, "⚠️ Внутренняя ошибка. Попробуйте ещё раз.");
  }
}

// ─── Команды ───

async function handleStart(ctx: BotContext): Promise<void> {
  await sendTelegramMessage(
    ctx.chatId,
    `🤖 <b>Diverse Bot</b>\n\n` +
    `Привет! Отслеживаю заявки с сайта и отвечаю на команды.\n\n` +
    `<b>Команды:</b>\n` +
    `📋 /leads — последние заявки\n` +
    `📊 /stats — за неделю\n` +
    `📈 /today — за сегодня\n` +
    `📅 /month — за месяц\n` +
    `🏙 /city — топ городов\n` +
    `📥 /export — CSV за месяц\n` +
    `❓ /help — справка`
  );
}

async function handleLeads(ctx: BotContext): Promise<void> {
  const result = await fetchLeads("list", "all", undefined, 10);
  if (!result.ok) {
    await sendTelegramMessage(ctx.chatId, `⚠️ Ошибка: ${result.error}`);
    return;
  }

  const leads = result.leads;
  if (!leads || leads.length === 0) {
    await sendTelegramMessage(ctx.chatId, `📭 Заявок пока нет`);
    return;
  }

  const sourceNames: Record<string, string> = {
    form: "📩 Новая заявка",
    callback: "📞 Обратный звонок",
    franchise: "🏪 Франшиза",
  };

  const blocks = leads.map((lead, i) => {
    const source = sourceNames[String(lead.source)] ?? "📩 Заявка";
    const lines = [
      `${i + 1}. ${source}`,
      `👤 ${escapeHtml(String(lead.name))}`,
      `📞 ${escapeHtml(String(lead.phone))}`,
    ];
    if (lead.city) lines.push(`📍 ${escapeHtml(String(lead.city))}`);
    lines.push(`🕒 ${formatDate(String(lead.created_at))}`);
    return lines.join("\n");
  });

  await sendTelegramMessage(
    ctx.chatId,
    `📋 <b>Последние заявки</b>\n\n${blocks.join(`\n${DIVIDER}\n`)}`
  );
}

async function handleStats(ctx: BotContext, period: string): Promise<void> {
  const result = await fetchLeads("stats", period);
  if (!result.ok) {
    await sendTelegramMessage(ctx.chatId, `⚠️ Ошибка: ${result.error}`);
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
      msg += `   ${formatDay(String(day.date))} — ${day.count}\n`;
    }
  }

  if (stats.bySource && stats.bySource.length > 0) {
    const sourceNames: Record<string, string> = {
      form: "📩 Форма",
      callback: "📞 Обратный звонок",
      franchise: "🏪 Франшиза",
    };
    msg += `\n🔗 <b>По источникам:</b>\n`;
    for (const src of stats.bySource) {
      msg += `   ${sourceNames[String(src.source)] || String(src.source)} — ${src.count}\n`;
    }
  }

  await sendTelegramMessage(ctx.chatId, msg);
}

async function handleCity(ctx: BotContext): Promise<void> {
  const result = await fetchLeads("stats", "all");
  if (!result.ok) {
    await sendTelegramMessage(ctx.chatId, `⚠️ Ошибка: ${result.error}`);
    return;
  }

  const stats = result.stats;
  if (!stats || !stats.byCity || stats.byCity.length === 0) {
    await sendTelegramMessage(ctx.chatId, `📭 Данных о городах пока нет`);
    return;
  }

  const medals = ["🥇", "🥈", "🥉"];
  const lines = stats.byCity.map((c, i) => {
    const medal = medals[i] ?? "   ";
    return `${medal} <b>${escapeHtml(String(c.city))}</b> — ${c.count}`;
  });

  await sendTelegramMessage(
    ctx.chatId,
    `🏙 <b>Топ городов (за всё время)</b>\n\n${lines.join("\n")}`
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
    `🤖 <b>Diverse Bot — команды</b>\n\n` +
    `📋 /leads — последние 10 заявок\n` +
    `📊 /stats — статистика за неделю\n` +
    `📈 /today — за сегодня\n` +
    `📅 /month — за месяц\n` +
    `🏙 /city — топ городов\n` +
    `📥 /export — CSV за месяц\n` +
    `❓ /help — эта справка`
  );
}

// ─── Форматирование ───

/** "2026-08-07T14:30:00.000Z" → "07.08.2026, 14:30" (Калининград, UTC+2) */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Kaliningrad",
  });
}

/** "2026-08-07" → "07.08" */
function formatDay(dateStr: string): string {
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return dateStr;
  return `${m[3]}.${m[2]}`;
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

type FetchLeadsResult = FetchLeadsOk | FetchLeadsErr;

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
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      logger.warn({ status: res.status, chatId, body }, "sendMessage failed");
    }
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
