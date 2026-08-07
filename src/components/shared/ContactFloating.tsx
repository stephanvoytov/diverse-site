"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CONTACTS } from "@/config/site";
import { formatPhone } from "@/lib/phone";
import { useUserCity } from "@/lib/user-city-context";
import { flushQueue } from "@/lib/lead-queue";
import { useLeadSubmit } from "@/lib/use-lead-submit";

export default function ContactFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [phone, setPhone] = useState<string | undefined>();
  const { submit, isSubmitting, status } = useLeadSubmit();
  const [hasScrolled, setHasScrolled] = useState(false);
  const { city } = useUserCity();

  // Show FAB after first scroll
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setIsOpen(false); setCallbackOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Попытка доставить офлайн-заявки (localStorage) при загрузке страницы
  useEffect(() => {
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";
    void flushQueue(endpoint);
  }, []);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 5) return;
    await submit({
      name: "Заказ звонка",
      phone,
      city: city || undefined,
      source: "callback",
    });
    if (status === "success") {
      setTimeout(() => { setCallbackOpen(false); setPhone(undefined); }, 2000);
    }
  };

  return (
    <>
      {/* FAB trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-5 bottom-5 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-brand-accent text-white shadow-lg hover:shadow-xl active:scale-95 transition-shadow duration-200 cursor-pointer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={hasScrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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
            {/* Phone */}
            <a
              href={`tel:${CONTACTS.phoneRaw}`}
              className="flex items-center gap-3 px-5 py-4 hover:bg-brand-gray-100 transition-colors group border-b border-brand-gray-100"
            >
              <span className="w-9 h-9 rounded-full bg-brand-accent/10 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-black group-hover:text-brand-accent transition-colors">
                  Позвонить
                </p>
                <p className="text-xs text-brand-gray-400 mt-0.5">
                  {formatPhone()}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto shrink-0 text-brand-gray-300 group-hover:text-brand-accent transition-colors">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 hover:bg-brand-gray-100 transition-colors group border-b border-brand-gray-100"
            >
              <span className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-black group-hover:text-brand-accent transition-colors">
                  WhatsApp
                </p>
                <p className="text-xs text-brand-gray-400 mt-0.5">
                  Написать в чат
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-auto shrink-0 text-brand-gray-300 group-hover:text-brand-accent transition-colors">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

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

            {/* Email */}
            <a
              href={`mailto:${CONTACTS.email}`}
              className="flex items-center gap-3 px-5 py-4 hover:bg-brand-gray-100 transition-colors group border-b border-brand-gray-100"
            >
              <span className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-black)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-brand-black group-hover:text-brand-accent transition-colors">
                  Email
                </p>
                <p className="text-xs text-brand-gray-400 mt-0.5">
                  {CONTACTS.email}
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

                      <p className="text-[10px] text-brand-gray-300 text-center leading-relaxed">
                        Нажимая «Перезвоните», вы соглашаетесь на обработку персональных данных и с{" "}
                        <Link href="/privacy/" className="underline hover:no-underline">
                          политикой конфиденциальности
                        </Link>
                      </p>
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
