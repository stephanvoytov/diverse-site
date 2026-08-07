import logger from "@/lib/logger";
import { escapeHtml } from "@/lib/html";
import { parseMessagePairs } from "@/lib/message-parser";

const TELEGRAM_API = "https://api.telegram.org";

export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  /** Может содержать: "Обратный звонок" или "Формат: ... Город: ..." */
  message: string;
  /** Предположительный город (из dadata) */
  city?: string;
  /** Источник заявки: "form" | "callback" | "franchise" */
  source?: string;
  /** ID сохранённого лида в Turso (для поиска в CSV) */
  leadId?: string;
  /** IANA-таймзона отправителя (напр. "Europe/Moscow") — для локального времени */
  timezone?: string;
}

/** Отправить заявку в Telegram-чат(ы) администратора */
export async function sendLeadToTelegram(data: LeadData): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const rawChatIds = process.env.TELEGRAM_CHAT_ID || "";

  if (!token || !rawChatIds) {
    throw new Error("Telegram Bot not configured: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
  }

  const chatIds = rawChatIds
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (chatIds.length === 0) {
    throw new Error("TELEGRAM_CHAT_ID is empty");
  }

  const isCallback = data.message === "Обратный звонок";
  const text = buildMessage(data, isCallback);

  const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
  const errors: string[] = [];
  let successCount = 0;

  for (const chatId of chatIds) {
    try {
      const res = await fetch(url, {
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
        errors.push(`chat ${chatId}: ${res.status} ${body}`);
      } else {
        successCount++;
      }
    } catch (e) {
      errors.push(`chat ${chatId}: ${e}`);
    }
  }

  // Считаем успехом, если хотя бы один чат получил сообщение
  if (successCount === 0 && errors.length > 0) {
    throw new Error(`Telegram send errors: ${errors.join("; ")}`);
  }
  if (errors.length > 0) {
    logger.warn({ errors: errors.join("; ") }, "Telegram partial failures");
  }
}

function buildMessage(data: LeadData, isCallback: boolean): string {
  const lines: string[] = [];

  if (isCallback) {
    lines.push(`📞 <b>Обратный звонок</b>`);
    lines.push(`📞 ${escapeHtml(data.phone)}${data.city ? ` · 📍 ${escapeHtml(data.city)} <i>(предп.)</i>` : ""}`);
  } else {
    lines.push(`📩 <b>Новая заявка</b>`);
    const name = data.name && data.name !== "Заказ звонка" ? `👤 ${escapeHtml(data.name)} · ` : "";
    lines.push(`${name}📞 ${escapeHtml(data.phone)}`);
    if (data.email) lines.push(`📧 ${escapeHtml(data.email)}`);
    if (data.city) lines.push(`📍 ${escapeHtml(data.city)} <i>(предп.)</i>`);

    const details = buildDetails(data.message);
    if (details) lines.push(details);
  }

  const times = buildTimes(data.timezone);
  if (times) lines.push(times);

  if (data.leadId) {
    lines.push(`<i>ID: ${escapeHtml(data.leadId)}</i>`);
  }

  return lines.join("\n");
}

/** Детали заявки: пары "Формат: ... Город: ..." → одна строка, иначе свободный текст */
function buildDetails(message: string): string | null {
  if (!message || message === "Обратный звонок") return null;

  const iconMap: Record<string, string> = {
    "Формат": "📋",
    "Город": "🏙",
    "Помещение": "🏠",
    "Комментарий": "💬",
  };

  const pairs = parseMessagePairs(message);
  if (pairs && pairs.length > 0) {
    return pairs
      .map(([key, val]) => {
        const icon = iconMap[key] ?? "•";
        return `${icon} ${escapeHtml(key)}: ${escapeHtml(val)}`;
      })
      .join(" · ");
  }

  // Свободный текст (из FranchiseContent, Контакты)
  return `💬 ${escapeHtml(message)}`;
}

/** Два времени с пометками: локальное (таймзона отправителя) и КЛД (Калининград, UTC+2) */
function buildTimes(userTimezone?: string): string {
  const now = new Date();
  const parts: string[] = [];

  const local = userTimezone ? formatTime(now, userTimezone) : null;
  if (local) parts.push(`🕒 ${local} <i>(лок.)</i>`);

  const kld = formatTime(now, "Europe/Kaliningrad");
  if (kld) parts.push(`🕐 ${kld} <i>(КЛД)</i>`);

  return parts.join(" · ");
}

/** Время в заданной таймзоне: "07.08.2026, 14:30". null при невалидной таймзоне */
function formatTime(date: Date, timeZone: string): string | null {
  try {
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });
  } catch {
    return null;
  }
}
