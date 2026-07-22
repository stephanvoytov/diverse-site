/**
 * Общие HTML-утилиты для экранирования и форматирования.
 */

/** Экранировать HTML-спецсимволы */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
