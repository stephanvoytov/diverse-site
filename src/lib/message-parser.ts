/**
 * Парсинг структурированных сообщений вида "Формат: ... Город: ..."
 * Используется в mail.ts и telegram.ts.
 */

/**
 * Пытается разобрать сообщение как пары ключ: значение.
 * Возвращает массив пар [key, val] или null, если сообщение неструктурированное.
 */
export function parseMessagePairs(msg: string): [string, string][] | null {
  if (!msg) return null;

  const parts = msg.split(".").map((p) => p.trim()).filter(Boolean);
  const pairs: [string, string][] = [];

  for (const part of parts) {
    const idx = part.indexOf(":");
    if (idx === -1) return null;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    if (!val) return null;
    pairs.push([key, val]);
  }

  return pairs.length > 0 ? pairs : null;
}
