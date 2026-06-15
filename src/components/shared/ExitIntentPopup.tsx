"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/lib/modal-context";

const STORAGE_KEY = "exit-intent-dismissed";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const { open: openModal } = useModal();

  const dismiss = useCallback(() => {
    setShow(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // storage unavailable — игнорируем
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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={dismiss}
        >
          <motion.div
            className="bg-white rounded-sm max-w-md w-full p-8 md:p-10 relative max-h-screen overflow-y-auto"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-brand-gray-400 hover:text-brand-black transition-colors"
              aria-label="Закрыть"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center mb-5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D12026" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-brand-black mb-2 leading-[1.2]">
              Уже уходите?
            </h3>
            <p className="text-sm text-brand-gray-400 mb-6 leading-relaxed">
              Оставьте заявку — мы бесплатно проконсультируем вас по открытию магазина Diverse.
              Паушальный взнос <strong className="text-brand-accent">0 ₽</strong>, роялти <strong className="text-brand-accent">0%</strong>.
            </p>

            <button
              onClick={handleCTA}
              className="w-full py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors"
            >
              Получить консультацию
            </button>

            <p className="text-xs text-brand-gray-300 text-center mt-4">
              <button onClick={dismiss} className="underline hover:no-underline">
                Нет, спасибо
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
