"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * Информационное уведомление об использовании файлов cookie
 * и сервисов аналитики (Яндекс.Метрика, VK Pixel).
 *
 * Аналитика загружается сразу при открытии сайта; баннер лишь
 * информирует пользователя и закрывается кнопкой «Понятно».
 * Факт закрытия запоминается в localStorage (analytics-notice-dismissed-v1).
 */

const DISMISS_KEY = "analytics-notice-dismissed-v1";

const ymId = process.env.NEXT_PUBLIC_YM_ID || "";
const vkPixelId = process.env.NEXT_PUBLIC_VK_PIXEL_ID || "";

function isDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    // storage unavailable
  }
}

/** Загрузить Яндекс.Метрику (без webvisor — запись сессий отключена) */
function loadYandexMetrika() {
  if (!ymId) return;
  const existing = document.querySelector('script[src="https://mc.yandex.ru/metrika/tag.js"]');
  if (existing) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://mc.yandex.ru/metrika/tag.js";
  script.onload = () => {
    const w = window as unknown as Record<string, unknown>;
    const ym = w.ym as unknown as ((id: number, action: string, opts?: Record<string, unknown>) => void) | undefined;
    if (typeof ym === "function") {
      ym(Number(ymId), "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        // webvisor намеренно отключён: запись действий пользователя не используется.
      });
    }
  };
  document.head.appendChild(script);
}

/** Загрузить VK Pixel */
function loadVkPixel() {
  if (!vkPixelId) return;
  const existing = document.querySelector('script[src="https://vk.com/js/api/openapi.js?169"]');
  if (existing) return;

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://vk.com/js/api/openapi.js?169";
  script.onload = () => {
    const w = window as unknown as Record<string, unknown>;
    const vk = w.VK as { Retargeting?: { Init: (id: string) => void; Hit: () => void } } | undefined;
    if (vk?.Retargeting) {
      vk.Retargeting.Init(vkPixelId);
      vk.Retargeting.Hit();
    }
  };
  document.head.appendChild(script);
}

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Аналитика загружается сразу, без ожидания действий пользователя
    loadYandexMetrika();
    loadVkPixel();

    // Баннер-уведомление показываем, только если ещё не закрывали
    if (isDismissed()) return;
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    markDismissed();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[9000] px-4 pb-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          role="status"
          aria-label="Уведомление об использовании cookie"
        >
          <div className="mx-auto max-w-3xl bg-brand-black border border-white/10 rounded-sm shadow-2xl px-5 py-4 md:px-6 md:py-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-xs text-white/70 leading-relaxed flex-1">
                Мы используем файлы cookie и сервисы аналитики (Яндекс.Метрика, VK Pixel)
                для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь
                с{" "}
                <Link href="/privacy/" className="text-white underline hover:text-brand-accent transition-colors">
                  политикой конфиденциальности
                </Link>
                .
              </p>
              <button
                onClick={dismiss}
                className="px-5 py-2 text-xs font-semibold tracking-[0.1em] uppercase bg-brand-accent text-white rounded-sm hover:bg-brand-accent-hover transition-colors cursor-pointer shrink-0"
              >
                Понятно
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}