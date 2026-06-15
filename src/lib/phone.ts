import { CONTACTS } from "@/config/site";

/** Отформатировать телефон для отображения: +7 (906) 237-35-61 */
export function formatPhone(raw: string = CONTACTS.phoneRaw): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11) {
    const code = digits.slice(1, 4);
    const a = digits.slice(4, 7);
    const b = digits.slice(7, 9);
    const c = digits.slice(9, 11);
    return `+7 (${code}) ${a}-${b}-${c}`;
  }
  // Если формат неожиданный — возвращаем как есть
  return raw;
}
