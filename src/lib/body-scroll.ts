/**
 * Счётчик блокировок прокрутки body.
 * Позволяет нескольким компонентам (модалка, мобильное меню)
 * одновременно блокировать скролл без конфликта.
 */

let lockCount = 0;

export function lockBody(): void {
  lockCount++;
  document.body.style.overflow = "hidden";
}

export function unlockBody(): void {
  lockCount--;
  if (lockCount <= 0) {
    lockCount = 0;
    document.body.style.overflow = "";
  }
}

/** Полностью сбросить блокировку (cleanup) */
export function resetBodyScroll(): void {
  lockCount = 0;
  document.body.style.overflow = "";
}
