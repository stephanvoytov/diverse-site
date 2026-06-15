/**
 * Утилиты форматирования чисел для финансовых показателей.
 */

/**
 * Форматирует большое число в сокращённый вид:
 * ~2 500 000 ₽/мес → ~2.5 млн ₽/мес
 * ~450 000 ₽/мес → ~450 тыс ₽/мес
 */
export function formatBig(n: string): string {
  const prefix = n.startsWith("~") ? "~" : "";
  const digits = n.replace(/\D/g, "");
  const suffix = n.includes("₽/мес") ? " ₽/мес" : "";
  if (digits.length >= 7) return prefix + digits.slice(0, -6) + " млн" + suffix;
  if (digits.length >= 4) return prefix + digits.slice(0, -3) + " тыс" + suffix;
  return n;
}

/** Алиас для formatBig (семантически — окупаемость) */
export function formatPayoff(n: string): string {
  return formatBig(n);
}
