"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CONTACTS } from "@/config/site";
import { useUserCity } from "@/lib/user-city-context";

export default function ContactFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [phone, setPhone] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { city } = useUserCity();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setIsOpen(false); setCallbackOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
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
      setTimeout(() => { setCallbackOpen(false); setStatus("idle"); setPhone(undefined); }, 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* FAB trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-5 bottom-5 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-brand-accent text-white shadow-lg hover:shadow-xl active:scale-95 transition-shadow duration-200 cursor-pointer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.4, ease: "easeOut" }}
        aria-label="Связаться"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isOpen ? "rotate-45" : ""}
          style={{ transition: "transform 0.2s" }}
        >
          {isOpen ? (
            <>
              <path d="M6 18L18 6M6 6l12 12" />
            </>
          ) : (
            <>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </>
          )}
        </svg>
      </motion.button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-5 bottom-20 z-50 w-64 bg-white rounded-sm shadow-2xl border border-brand-gray-200 overflow-hidden"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Telegram */}
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 hover:bg-brand-gray-100 transition-colors group border-b border-brand-gray-100"
            >
              <span className="w-9 h-9 rounded-full bg-[#24A1DE] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.5.5 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-black group-hover:text-brand-accent transition-colors">
                  Telegram
                </p>
                <p className="text-xs text-brand-gray-400 mt-0.5">
                  Быстрый ответ
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto shrink-0 text-brand-gray-300 group-hover:text-brand-accent transition-colors">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Callback */}
            <div className="px-5 py-4">
              <button
                onClick={() => setCallbackOpen(!callbackOpen)}
                className="flex items-center gap-3 w-full text-left group"
              >
                <span className="w-9 h-9 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D12026" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-brand-black group-hover:text-brand-accent transition-colors">
                    Перезвоните мне
                  </p>
                  <p className="text-xs text-brand-gray-400 mt-0.5">
                    {callbackOpen ? "Свернуть" : "Оставьте номер"}
                  </p>
                </div>
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  animate={{ rotate: callbackOpen ? 180 : 0 }}
                  className="shrink-0 text-brand-gray-300"
                >
                  <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </button>

              <AnimatePresence>
                {callbackOpen && (
                  <motion.form
                    onSubmit={handleCallbackSubmit}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-2.5">
                      <PhoneInput
                        value={phone}
                        onChange={setPhone}
                        defaultCountry="RU"
                        countries={["RU", "KZ", "BY"]}
                        placeholder="+7 (999) 123-45-67"
                        className="phone-input-accent"
                      />

                      {status === "success" && (
                        <p className="text-xs text-green-600 text-center">✓ Заявка отправлена</p>
                      )}
                      {status === "error" && (
                        <p className="text-xs text-brand-accent text-center">Ошибка. Напишите нам в <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Telegram</a>.</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "sending" || status === "success"}
                        className="w-full py-2.5 bg-brand-accent text-white text-xs label font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        {status === "sending" ? "Отправка…" : status === "success" ? "Отправлено ✓" : "Перезвоните"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
