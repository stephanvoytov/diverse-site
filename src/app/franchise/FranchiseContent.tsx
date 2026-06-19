"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Faq from "@/components/blocks/Faq";
import StoreGallery from "@/components/blocks/StoreGallery";
import { plans, benefitsFull as benefits } from "@/data/franchise";
import { comparisonRows } from "@/data/formats";
import { CONTACTS, FORMAT_OPTIONS } from "@/config/site";
import { useUserCity } from "@/lib/user-city-context";
import { queueLead } from "@/lib/lead-queue";
import PhoneInput from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";

const franchiseFormSchema = z.object({
  name: z.string().min(2, "Введите имя").max(50, "Слишком длинное имя"),
  phone: z.string().min(5, "Введите корректный телефон"),
  format: z.string().optional(),
  city: z.string().optional(),
  message: z.string().min(5, "Напишите пару слов").max(500, "Слишком длинное сообщение").optional().or(z.literal("")),
});

type FranchiseForm = z.infer<typeof franchiseFormSchema>;

/* ——— Plans accordion (reused from main) ——— */

function PlansSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section data-header="light" className="bg-white py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          eyebrow="Варианты"
          desc="Три варианта сотрудничества под любой бюджет и локацию"
        >
          Выберите свой <span className="text-brand-accent">формат</span>
        </SectionHeader>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const isOpen = openId === plan.id;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className={`rounded-sm overflow-hidden transition-[background-color,border-color,box-shadow] duration-500 ${
                  isOpen
                    ? "bg-white border-2 border-brand-accent/40 shadow-lg"
                    : "bg-brand-gray-100 border border-brand-gray-200 hover:border-brand-gray-300 cursor-pointer"
                }`}
                onClick={() => setOpenId(isOpen ? null : plan.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenId(isOpen ? null : plan.id); } }}
              >
                <div className="p-6 md:p-8">
                  <p className="text-xs tracking-[0.2em] uppercase text-brand-accent mb-2">{plan.tagline}</p>
                  <h3 className="text-2xl font-bold text-brand-black mb-2">{plan.name}</h3>
                  <p className="text-sm text-brand-gray-400 leading-relaxed mb-4">{plan.desc}</p>
                  <p className="text-xl font-bold text-brand-accent mb-3">{plan.investment}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs label text-brand-gray-400">
                      {isOpen ? "Свернуть" : "Подробнее"}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-6 h-6 rounded-full border flex items-center justify-center text-sm"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 1v10M1 6h10" />
                      </svg>
                    </motion.span>
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-brand-gray-200 pt-5">
                        <ul className="space-y-2.5">
                          {plan.details.map((d) => (
                            <li key={d} className="flex items-start gap-3 text-sm text-brand-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-[7px] shrink-0" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ——— Comparison table ——— */

function ComparisonTable() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          eyebrow="Сравнение"
        >
          Что входит в каждый <span className="text-brand-accent">вариант</span>
        </SectionHeader>

        {/* Desktop: полноценная таблица */}
          <motion.div
            className="hidden md:block max-w-4xl mx-auto overflow-x-auto"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left py-4 pr-6 text-xs label text-brand-gray-400 font-medium w-[140px]">
                  Параметр
                </th>
                {plans.map((p) => (
                  <th key={p.id} className="text-center py-4 px-4 font-bold text-brand-black min-w-[160px]">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.label} className="border-t border-brand-gray-200">
                  <td className="py-4 pr-6 text-brand-gray-500 font-medium">{row.label}</td>
                  {row.values.map((val, vi) => (
                    <td key={vi} className={`text-center py-4 px-4 ${
                      vi === 0 ? "text-brand-black" : "text-brand-gray-400"
                    }`}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile: табы + карточка */}
        <div className="md:hidden max-w-lg mx-auto">
          {/* Табы форматов */}
          <div className="flex rounded-sm overflow-hidden mb-6">
            {plans.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-3 text-xs font-semibold tracking-[0.1em] uppercase transition-all duration-200 ${
                  idx === activeTab
                    ? "bg-brand-accent text-white"
                    : "bg-white text-brand-gray-400 border border-brand-gray-200 hover:border-brand-gray-300"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Карточка параметров */}
          <div className="bg-white rounded-sm overflow-hidden border border-brand-gray-200">
            <table className="w-full text-sm">
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="border-b border-brand-gray-100 last:border-b-0">
                    <td className="py-3.5 px-4 text-brand-gray-500 font-medium w-1/2">{row.label}</td>
                    <td className="py-3.5 px-4 text-brand-black font-semibold text-right">
                      {row.values[activeTab]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ——— Financial model ——— */

function FinancialModel() {
  return (
    <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          eyebrow="Экономика"
          desc="Пример расчёта для формата с готовым помещением. Цифры — оценочные, точный расчёт под вашу локацию — на консультации."
          descClassName="body-text text-brand-gray-400 max-w-2xl mx-auto"
        >
          Финансовая модель <span className="text-brand-accent">«Реновация»</span>
        </SectionHeader>

        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white border border-brand-gray-200 rounded-sm overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Table */}
            <div className="divide-y divide-brand-gray-100">
              {[
                { label: "Выручка / мес", value: "~1 000 000 ₽", accent: false },
                { label: "Себестоимость товара (COGS)", value: "~500 000 ₽", detail: "Маржа ~50%", accent: false },
                { label: "Аренда + коммунальные", value: "~150 000 ₽", accent: false },
                { label: "ФОТ (2–3 сотрудника)", value: "~150 000 ₽", accent: false },
                { label: "Маркетинг / прочие", value: "~50 000 ₽", accent: false },
                { label: "Операционная прибыль / мес", value: "~150 000 ₽", accent: true },
                { label: "Инвестиции (вход)", value: "от 1,5 млн ₽", accent: false },
                { label: "Точка безубыточности", value: "~700 000 ₽/мес", detail: "Порог выручки для покрытия всех расходов", accent: false },
                { label: "Срок окупаемости", value: "~12–14 мес", detail: "С учётом сезонности", accent: false },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-4 px-6 md:px-8 py-4 ${
                    row.accent ? "bg-brand-accent/[0.04]" : ""
                  }`}
                >
                  <div>
                    <span className={`text-sm md:text-base ${
                      row.accent ? "font-semibold text-brand-black" : "text-brand-gray-400"
                    }`}>
                      {row.label}
                    </span>
                    {row.detail && (
                      <span className="block text-xs text-brand-gray-300 mt-0.5">{row.detail}</span>
                    )}
                  </div>
                  <span className={`text-sm md:text-base font-bold whitespace-nowrap ${
                    row.accent ? "text-brand-accent" : "text-brand-black"
                  }`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/*
          <motion.div
            className="bg-white border border-brand-gray-200 rounded-sm overflow-hidden mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="px-6 md:px-8 py-5 border-b border-brand-gray-100">
              <h3 className="text-base font-bold text-brand-black">
                Из чего складываются инвестиции
              </h3>
            </div>
            <div className="divide-y divide-brand-gray-100">
              {[
                { label: "Стартовый товарный запас", value: "~800 000 ₽" },
                { label: "Торговое оборудование + свет", value: "~350 000 ₽" },
                { label: "Дизайн-проект + брендирование", value: "~200 000 ₽" },
                { label: "Прочее (обучение, запуск)", value: "~150 000 ₽" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 px-6 md:px-8 py-3.5"
                >
                  <span className="text-sm text-brand-gray-400">{row.label}</span>
                  <span className="text-sm font-bold text-brand-black">{row.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 px-6 md:px-8 py-3.5 bg-brand-accent/[0.04]">
                <span className="text-sm font-semibold text-brand-black">Итого</span>
                <span className="text-sm font-bold text-brand-accent">от 1,5 млн ₽</span>
              </div>
            </div>
          </motion.div>
          */}

          {/* Seasonality note */}
          <motion.div
            className="mt-6 flex items-start gap-3 text-sm text-brand-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 mt-0.5 text-brand-accent">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p>
              <strong className="text-brand-black">Сезонность:</strong> пик продаж — осень (сентябрь–ноябрь) и весна (март–май). Спад — январь–февраль. 
              В расчёте точки безубыточности учитывается неравномерность спроса в течение года.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ——— Benefits ——— */

function BenefitsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          eyebrow="Преимущества"
        >
          Почему <span className="text-brand-accent">Diverse</span>
        </SectionHeader>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-start gap-4 p-5 bg-brand-gray-100 rounded-sm"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
              <span className="text-sm md:text-base text-brand-black font-medium">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ——— Contact form section ——— */

function ContactSection() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { city: detectedCity } = useUserCity();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FranchiseForm>({
    resolver: zodResolver(franchiseFormSchema),
  });

  const onSubmit = async (data: FranchiseForm) => {
    setSubmitStatus("idle");
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          format: data.format || "",
          city: detectedCity,
          message: data.city
            ? `Хочу открыть магазин в городе: ${data.city}${data.format ? `, формат: ${data.format}` : ""}${data.message ? `. ${data.message}` : ""}`
            : data.message || (data.format ? `Хочу открыть магазин по франшизе, формат: ${data.format}` : "Хочу открыть магазин по франшизе"),
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitStatus("success");
      reset();
    } catch {
      // Сохраняем лид локально, чтобы не потерять при ошибке сети/сервера
      queueLead({
        name: data.name,
        phone: data.phone,
        message: data.city
          ? `Хочу открыть магазин в городе: ${data.city}${data.format ? `, формат: ${data.format}` : ""}${data.message ? `. ${data.message}` : ""}`
          : data.message || (data.format ? `Хочу открыть магазин по франшизе, формат: ${data.format}` : "Хочу открыть магазин по франшизе"),
        createdAt: Date.now(),
      });
      setSubmitStatus("error");
    }
  };

  return (
    <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          desc="Оставьте заявку — мы ответим на все вопросы"
        >
          Начните <span className="text-brand-accent">свой бизнес</span>
        </SectionHeader>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-white p-8 md:p-10 rounded-sm shadow-sm"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="franchise-name" className="block text-xs label text-brand-gray-500 mb-2">
                  Имя <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="franchise-name"
                  type="text"
                  placeholder="Ваше имя"
                  {...register("name")}
                  className={`w-full px-4 py-3 text-sm bg-brand-gray-100 border rounded-sm outline-none transition-colors placeholder:text-brand-gray-300 ${
                    errors.name
                      ? "border-brand-accent"
                      : "border-brand-gray-200 focus:border-brand-black"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-brand-accent">{errors.name.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="franchise-phone" className="block text-xs label text-brand-gray-500 mb-2">
                    Телефон <span className="text-brand-accent">*</span>
                  </label>
                  <PhoneInput
                    name="phone"
                    control={control}
                    defaultCountry="RU"
                    countries={["RU", "KZ", "BY"]}
                    placeholder="+7 (999) 123-45-67"
                    className=""
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-brand-accent">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="franchise-format" className="block text-xs label text-brand-gray-500 mb-2">
                    Формат
                  </label>
                  <select
                    id="franchise-format"
                    {...register("format")}
                    defaultValue=""
                    className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors appearance-none"
                  >
                    <option value="" disabled>Выберите формат</option>
                    {FORMAT_OPTIONS.map((f) => (
                      <option key={f.id} value={f.id}>{f.label} — {f.desc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="franchise-city" className="block text-xs label text-brand-gray-500 mb-2">
                  Город
                </label>
                <input
                  id="franchise-city"
                  type="text"
                  placeholder="Ваш город"
                  {...register("city")}
                  className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300"
                />
              </div>

              <div>
                <label htmlFor="franchise-message" className="block text-xs label text-brand-gray-500 mb-2">
                  Комментарий
                </label>
                <textarea
                  id="franchise-message"
                  rows={3}
                  placeholder="Какой формат интересует? Есть ли помещение?"
                  {...register("message")}
                  className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300 resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-600 font-medium text-center">
                  ✓ Спасибо! Мы получили заявку.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-brand-accent text-center">
                  ✕ Ошибка отправки. Напишите нам в{" "}
                  <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-semibold">Telegram</a>
                  {" "}или на{" "}
                  <a href={`mailto:${CONTACTS.email}`} className="underline hover:no-underline">почту</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="w-full py-4 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Отправка…" : submitStatus === "success" ? "Отправлено ✓" : "Отправить заявку"}
              </button>

              <p className="text-xs text-brand-gray-300 text-center">
                Нажимая «Отправить», вы соглашаетесь на обработку персональных данных
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ——— Page ——— */

const galleryImages = [
  { src: "/images/franchise/gallery/gallery-1.jpg", alt: "Витрина магазина Diverse в ТЦ Мега Уфа" },
  { src: "/images/franchise/gallery/gallery-2.jpg", alt: "Кассовая зона Diverse" },
  { src: "/images/franchise/gallery/gallery-3.jpg", alt: "Манекены и одежда Diverse" },
  { src: "/images/franchise/gallery/gallery-4.jpg", alt: "Одежда Diverse в магазине" },
  { src: "/images/franchise/gallery/gallery-5.jpg", alt: "Одежда Diverse на вешалках" },
  { src: "/images/franchise/gallery/gallery-6.jpg", alt: "Интерьер магазина Diverse" },
];

export default function FranchiseContent() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section data-header="dark" className="relative bg-brand-black pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container-brand relative z-10 text-center">
            <motion.p
              className="text-xs eyebrow text-brand-gray-300 mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Франшиза
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Откройте магазин <span className="text-brand-accent">Diverse</span>
            </motion.h1>
            <motion.p
              className="body-text text-white/60 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Культовый польский бренд: сотни магазинов по всему миру. В России и Казахстане — пока единицы. Рынок почти свободен.
            </motion.p>

            {/* Key numbers */}
            <motion.div
              className="flex justify-center gap-8 md:gap-16"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">0 ₽</p>
                <p className="text-xs label text-white/50 mt-1">Взнос</p>
              </div>
              <div className="w-px bg-white/15" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">0%</p>
                <p className="text-xs label text-white/50 mt-1">Роялти</p>
              </div>
              <div className="w-px bg-white/15" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-brand-accent">11</p>
                <p className="text-xs label text-white/50 mt-1">Магазинов</p>
              </div>
            </motion.div>
          </div>
        </section>

        <PlansSection />
        <ComparisonTable />
        <FinancialModel />
        <BenefitsSection />
        <div id="gallery"><StoreGallery images={galleryImages} /></div>
        <Faq />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
