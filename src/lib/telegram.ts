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
  if (isCallback) {
    const callbackLines: string[] = [
      `📞 <b>Обратный звонок</b>`,
      ``,
    ];
    if (data.city) {
      callbackLines.push(`<b>Город (предп.):</b> ${escapeHtml(data.city)}`);
    }
    callbackLines.push(`<b>Телефон:</b> ${escapeHtml(data.phone)}`);
    callbackLines.push(``, `<i>Отправлено с diversebrand.ru</i>`);
    return callbackLines.join("\n");
  }

  const parsed = parseMessage(data.message);
  const lines: string[] = [`📩 <b>Новая заявка</b>`, ``];

  if (data.name && data.name !== "Заказ звонка") {
    lines.push(`<b>Имя:</b> ${escapeHtml(data.name)}`);
  }
  lines.push(`<b>Телефон:</b> ${escapeHtml(data.phone)}`);

  if (data.email) {
    lines.push(`<b>Email:</b> ${escapeHtml(data.email)}`);
  }

  if (data.city) {
    lines.push(`<b>Город (предп.):</b> ${escapeHtml(data.city)}`);
  }

  if (parsed.type === "pairs") {
    // Структурированные данные (из 3-шаговой формы)
    lines.push(``);
    for (const [key, val] of parsed.data) {
      lines.push(`${escapeHtml(key)}: ${escapeHtml(val)}`);
    }
  } else if (parsed.type === "raw") {
    // Свободный текст (из FranchiseContent, Контакты)
    lines.push(``);
    lines.push(escapeHtml(parsed.data));
  }

  lines.push(``, `<i>Отправлено с diversebrand.ru</i>`);

  return lines.join("\n");
}

/**
 * Разбирает message в детали.
 *
 * Если сообщение похоже на "Формат: ... Город: ..." (структурированное) —
 * парсит в пары ключ-значение.
 * Иначе — возвращает сырой текст как один блок.
 */
function parseMessage(msg: string): { type: "pairs"; data: [string, string][] } | { type: "raw"; data: string } {
  if (!msg) return { type: "raw", data: "" };
  const pairs = parseMessagePairs(msg);
  if (pairs) {
    return { type: "pairs" as const, data: pairs };
  }
  return { type: "raw" as const, data: msg };
}
