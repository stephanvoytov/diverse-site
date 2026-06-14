"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSocials } from "@/data/socials";

const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;

const contactSchema = z.object({
  name: z.string().min(2, "Введите имя").max(50, "Слишком длинное имя"),
  phone: z.string().regex(phoneRegex, "Введите корректный телефон"),
  message: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contacts() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
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
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <section id="section-contacts" data-header="light" className="min-h-screen bg-white">
      <div className="container-brand py-10 md:py-12">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Свяжитесь с нами
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            Контакты
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            Откройте магазин Diverse по франшизе или задайте любой вопрос
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* ——— Форма ——— */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-2">
                  Имя <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  {...register("name")}
                  className={`w-full px-4 py-3 text-sm bg-white border rounded-sm outline-none transition-colors placeholder:text-brand-gray-300 ${
                    errors.name
                      ? "border-brand-accent"
                      : "border-brand-gray-200 focus:border-brand-black"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-brand-accent">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-2">
                  Телефон <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  {...register("phone")}
                  className={`w-full px-4 py-3 text-sm bg-white border rounded-sm outline-none transition-colors placeholder:text-brand-gray-300 ${
                    errors.phone
                      ? "border-brand-accent"
                      : "border-brand-gray-200 focus:border-brand-black"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-brand-accent">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Какой формат интересует? Есть ли помещение?"
                  {...register("message")}
                  className="w-full px-4 py-3 text-sm bg-white border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300 resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-600 font-medium">
                  ✓ Спасибо! Мы свяжемся с вами.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-brand-accent">
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
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Отправка…" : submitStatus === "success" ? "Отправлено ✓" : "Отправить"}
              </button>
            </form>
          </div>

          {/* ——— Информация ——— */}
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-8">
              {/* Реквизиты */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-brand-gray-400 mb-4">
                  Реквизиты
                </p>
                <h3 className="text-xl font-bold text-brand-black mb-1">ООО «ХАУС»</h3>
                <p className="text-sm text-brand-gray-400 mb-0.5">ИНН 3907201307</p>
                <p className="text-sm text-brand-gray-400">
                  236022, Калининград, пл. Победы, 4, оф. 210
                </p>
              </div>

              {/* Email / Phone */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-brand-gray-400 mb-4">
                  Контакты
                </p>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="mailto:diverserussia@yandex.ru"
                      className="text-sm text-brand-black hover:text-brand-accent transition-colors font-medium"
                    >
                      diverserussia@yandex.ru
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+79062373561"
                      className="text-sm text-brand-black hover:text-brand-accent transition-colors font-medium"
                    >
                      +7 906 237 35 61
                    </a>
                  </li>
                </ul>
              </div>

              {/* Соцсети */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-brand-gray-400 mb-4">
                  Социальные сети
                </p>
                <div className="flex flex-wrap gap-3">
                  {contactSocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-11 h-11 rounded-sm border border-brand-gray-200 flex items-center justify-center text-brand-gray-400 hover:text-brand-accent hover:border-brand-accent transition-all duration-200"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Нижний блок — можно добавить карту или что-то ещё */}
            <p className="text-xs text-brand-gray-300 leading-relaxed">
              Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
