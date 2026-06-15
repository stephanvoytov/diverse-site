"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CONTACTS } from "@/config/site";
import { formatPhone } from "@/lib/phone";
import { useUserCity } from "@/lib/user-city-context";

export default function CallbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [phone, setPhone] = useState<string | undefined>();
  const { city } = useUserCity();

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 5) return;

    setStatus("sending");
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Заказ звонка", phone, message: "Обратный звонок", city }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setTimeout(() => { setIsOpen(false); setStatus("idle"); setPhone(undefined); }, 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Кнопка-триггер */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brand-accent text-white shadow-xl hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.4, ease: "easeOut" }}
        aria-label="Заказать звонок"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </motion.button>

      {/* Всплывающая панель с формой */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-72 bg-white rounded-sm shadow-2xl border border-brand-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="px-5 pt-5 pb-1">
              <p className="text-sm font-bold text-brand-black">Заказать звонок</p>
              <p className="text-xs text-brand-gray-400 mt-0.5">
                Оставьте номер — мы ответим
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-5 pb-5 pt-3 space-y-3">
              <PhoneInput
                value={phone}
                onChange={setPhone}
                defaultCountry="RU"
                placeholder="+7 (999) 123-45-67"
                className="phone-input-accent"
              />

              {status === "success" && (
                <p className="text-xs text-green-600 text-center">✓ Заявка отправлена</p>
              )}
              {status === "error" && (
                <p className="text-xs text-brand-accent text-center">Ошибка. Попробуйте позже.</p>
              )}

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full py-2.5 bg-brand-accent text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
              >
                {status === "sending" ? "Отправка…" : status === "success" ? "Отправлено ✓" : "Перезвоните мне"}
              </button>

              <div className="relative">
                <div className="absolute inset-x-0 top-0 border-t border-brand-gray-200" />
                <a
                  href={`tel:${CONTACTS.phoneRaw}`}
                  className="mt-3 flex items-center justify-center gap-1.5 text-xs text-brand-gray-400 hover:text-brand-accent transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {formatPhone()}
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
