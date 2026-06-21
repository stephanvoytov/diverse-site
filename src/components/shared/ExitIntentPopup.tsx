"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/lib/modal-context";
import { useUserCity } from "@/lib/user-city-context";

const STORAGE_KEY = "exit-intent-dismissed";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const { open: openModal } = useModal();
  const { city: detectedCity, loading } = useUserCity();

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // storage unavailable
    }
  }, []);

  useEffect(() => {
    // Не показываем, если уже закрыли в этой сессии
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // storage unavailable
    }

    let mounted = true;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      if (!mounted) return;
      setShow(true);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      mounted = false;
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleCTA = useCallback(() => {
    dismiss();
    openModal();
  }, [dismiss, openModal]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={dismiss}
        >
          <motion.div
            className="bg-white rounded-sm max-w-md w-full relative max-h-screen overflow-y-auto"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent top bar */}
            <div className="h-1 bg-brand-accent w-full" />

            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-brand-gray-400 hover:text-brand-black transition-colors z-10"
              aria-label="Закрыть"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="px-8 md:px-10 pt-8 pb-8">
              {/* Header icon */}
              <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D12026" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-brand-black mb-2 leading-[1.2]">
                {!loading && detectedCity
                  ? `Уже уходите? Откройте Diverse в ${detectedCity}!`
                  : "Уже уходите?"}
              </h3>
              <p className="text-sm text-brand-gray-400 mb-6 leading-relaxed">
                {!loading && detectedCity
                  ? `Мы бесплатно проконсультируем вас по открытию магазина Diverse в ${detectedCity}.`
                  : "Не упустите возможность. Мы бесплатно проконсультируем вас по открытию магазина Diverse."}
              </p>

              {/* Value props */}
              <div className="space-y-2.5 mb-6">
                {[
                  "Паушальный взнос 0 ₽ · Роялти 0%",
                  "11 магазинов уже работают в РФ и Казахстане",
                  "Поможем с помещением, дизайном и запуском",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-[7px] shrink-0" />
                    <span className="text-xs text-brand-gray-500 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCTA}
                className="w-full py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors"
              >
                Получить консультацию
              </button>

              <p className="text-xs text-brand-gray-300 text-center mt-4">
                <button onClick={dismiss} className="underline hover:no-underline cursor-pointer">
                  Нет, спасибо
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
