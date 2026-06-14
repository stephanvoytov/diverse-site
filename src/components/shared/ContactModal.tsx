"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/lib/modal-context";

const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

const schema = z.object({
  name: z.string().min(2, "Введите имя").max(50, "Слишком длинное имя"),
  phone: z.string().regex(phoneRegex, "Введите корректный телефон"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactModal() {
  const { isOpen, close } = useModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: FormData) => {
    setSubmitStatus("idle");
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitStatus("success");
      reset();
      setTimeout(() => { setSubmitStatus("idle"); close(); }, 2000);
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === overlayRef.current) close(); }}
        >
          <motion.div
            className="relative w-full max-w-xl bg-white rounded-sm shadow-2xl my-auto"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-brand-gray-200 flex items-center justify-center text-brand-gray-400 hover:text-brand-black hover:border-brand-gray-400 transition-colors bg-white z-10"
              aria-label="Закрыть"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            {/* Header */}
            <div className="px-8 pt-8 pb-2">
              <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-2">
                Свяжитесь с нами
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-black">
                Оставьте заявку
              </h2>
              <p className="text-sm text-brand-gray-400 mt-2 leading-relaxed">
                Мы свяжемся с вами в ближайшее время и ответим на все вопросы
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="px-8 pb-8 pt-4 space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-1.5">
                  Имя <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  placeholder="Ваше имя"
                  {...register("name")}
                  className={`w-full px-4 py-3 text-sm bg-white border rounded-sm outline-none transition-colors placeholder:text-brand-gray-300 ${
                    errors.name ? "border-brand-accent" : "border-brand-gray-200 focus:border-brand-black"
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-brand-accent">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="modal-phone" className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-1.5">
                  Телефон <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  {...register("phone")}
                  className={`w-full px-4 py-3 text-sm bg-white border rounded-sm outline-none transition-colors placeholder:text-brand-gray-300 ${
                    errors.phone ? "border-brand-accent" : "border-brand-gray-200 focus:border-brand-black"
                  }`}
                />
                {errors.phone && <p className="mt-1 text-xs text-brand-accent">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="modal-message" className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-1.5">
                  Сообщение
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  placeholder="Какой формат интересует? Есть ли помещение?"
                  {...register("message")}
                  className="w-full px-4 py-3 text-sm bg-white border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300 resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-600 text-center font-medium">
                  ✓ Спасибо! Мы свяжемся с вами.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-brand-accent text-center">
                  ✕ Ошибка отправки.
                  Напишите нам в{" "}
                  <a href="https://wa.me/79062373561" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                    WhatsApp
                  </a>
                  {" "}или{" "}
                  <a href="mailto:diverserussia@yandex.ru" className="underline hover:no-underline">
                    на почту
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="w-full px-8 py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Отправка…" : submitStatus === "success" ? "Отправлено ✓" : "Отправить заявку"}
              </button>

              <p className="text-xs text-brand-gray-300 leading-relaxed text-center">
                Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
