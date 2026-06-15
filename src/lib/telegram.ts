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
      }
    } catch (e) {
      errors.push(`chat ${chatId}: ${e}`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Telegram send errors: ${errors.join("; ")}`);
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
 * Если сообщение похоже на "Формат: ... Город: ..." (структурированное,
 * все части содержат ":") — парсит в пары ключ-значение.
 * Иначе — возвращает сырой текст как один блок.
 */
function parseMessage(msg: string): { type: "pairs"; data: [string, string][] } | { type: "raw"; data: string } {
  if (!msg) return { type: "raw", data: "" };

  const parts = msg.split(".").map((p) => p.trim()).filter(Boolean);

  // Пробуем распарсить как ключ: значение
  const pairs: [string, string][] = [];
  let allStructured = true;

  for (const part of parts) {
    const idx = part.indexOf(":");
    if (idx === -1) {
      allStructured = false;
      break;
    }
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (!val) {
      allStructured = false;
      break;
    }
    pairs.push([key, val]);
  }

  if (allStructured && pairs.length > 0) {
    return { type: "pairs", data: pairs } as const;
  }

  // Сырой текст — показываем как есть
  return { type: "raw", data: msg } as const;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
