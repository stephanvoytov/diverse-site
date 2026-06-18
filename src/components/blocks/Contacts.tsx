"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSocials } from "@/data/socials";
import { CONTACTS, FORMAT_OPTIONS } from "@/config/site";
import { formatPhone } from "@/lib/phone";
import { useUserCity } from "@/lib/user-city-context";
import { queueLead } from "@/lib/lead-queue";
import PhoneInput from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";

const contactSchema = z.object({
  name: z.string().min(2, "Введите имя").max(50, "Слишком длинное имя"),
  phone: z.string().min(5, "Введите корректный телефон"),
  format: z.string().optional(),
  message: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contacts() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { city: detectedCity } = useUserCity();
  const {
    control,
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
        body: JSON.stringify({ ...data, city: detectedCity }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitStatus("success");
      reset();
    } catch {
      // Сохраняем лид локально, чтобы не потерять при ошибке сети/сервера
      queueLead({
        name: data.name,
        phone: data.phone,
        message: data.message || "Запрос с главной (секция Контакты)",
        createdAt: Date.now(),
      });
      setSubmitStatus("error");
    }
  };

  return (
    <section id="section-contacts" data-header="dark" className="min-h-screen bg-brand-black">
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
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-4">
            Свяжитесь с нами
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            Контакты
          </h2>
          <p className="text-base md:text-lg text-white/40 max-w-xl mx-auto">
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
                <label htmlFor="name" className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-2">
                  Имя <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  {...register("name")}
                  className={`w-full px-4 py-3 text-sm bg-white/10 border rounded-sm outline-none transition-colors text-white placeholder:text-white/30 ${
                    errors.name
                      ? "border-brand-accent"
                      : "border-white/20 focus:border-white"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-brand-accent">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-2">
                  Телефон <span className="text-brand-accent">*</span>
                </label>
                <PhoneInput
                  name="phone"
                  control={control}
                  defaultCountry="RU"
                  countries={["RU", "KZ", "BY"]}
                  placeholder="+7 (999) 123-45-67"
                  className="phone-input-dark"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-brand-accent">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contacts-format" className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-2">
                  Формат
                </label>
                <select
                  id="contacts-format"
                  {...register("format")}
                  defaultValue=""
                  className="w-full px-4 py-3 text-sm bg-white/10 border border-white/20 rounded-sm outline-none focus:border-white transition-colors text-white appearance-none"
                >
                  <option value="" disabled className="text-brand-gray-400">Выберите формат</option>
                  {FORMAT_OPTIONS.map((f) => (
                    <option key={f.id} value={f.id} className="text-brand-black">
                      {f.label} — {f.desc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-[0.15em] uppercase text-white/50 mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Какой формат интересует? Есть ли помещение?"
                  {...register("message")}
                  className="w-full px-4 py-3 text-sm bg-white/10 border border-white/20 rounded-sm outline-none focus:border-white transition-colors text-white placeholder:text-white/30 resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-400 font-medium">
                  ✓ Спасибо! Мы получили заявку.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-brand-accent">
                  ✕ Ошибка отправки.
                  Напишите нам в{" "}
                  <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-semibold">
                    Telegram
                  </a>
                  {" "}или на{" "}
                  <a href="mailto:diverserussia@yandex.ru" className="underline hover:no-underline">
                    почту
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
                <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4">
                  Реквизиты
                </p>
                <h3 className="text-xl font-bold text-white mb-1">ООО «ХАУС»</h3>
                <p className="text-sm text-white/40 mb-0.5">ИНН 3907201307</p>
                <p className="text-sm text-white/40">
                  236022, Калининград, пл. Победы, 4, оф. 210
                </p>
              </div>

              {/* Email / Phone */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4">
                  Контакты
                </p>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={`mailto:${CONTACTS.email}`}
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium"
                    >
                      {CONTACTS.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${CONTACTS.phoneRaw}`}
                      className="text-sm text-white/70 hover:text-white transition-colors font-medium"
                    >
                      {formatPhone()}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Соцсети */}
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-4">
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
                      className="w-11 h-11 rounded-sm border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all duration-200"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Нижний блок — можно добавить карту или что-то ещё */}
            <p className="text-xs text-white/40 leading-relaxed">
              Нажимая «Отправить», вы соглашаетесь на обработку персональных данных.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
