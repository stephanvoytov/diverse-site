"use client";

import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { tinaField } from "tinacms/dist/react";
import SectionHeader from "@/components/shared/SectionHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Faq from "@/components/blocks/Faq";
import StoreGallery, { type GalleryImage } from "@/components/blocks/StoreGallery";
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

/* ——— Types ——— */

interface TinaResult {
  data: Record<string, unknown>;
  query: string;
  variables: Record<string, unknown>;
}

const EMPTY: TinaResult = { data: {}, query: "", variables: {} };

/* ——— Plans accordion (reused from main) ——— */

function PlansSection({ plans, plansEyebrow, plansDesc, plansHeading, plansCollapse, plansDetails, plansDisclaimer, plansMeta }: {
  plans: Array<{ id: string; tagline: string; name: string; desc: string; details: string[] }>;
  plansEyebrow?: string;
  plansDesc?: string;
  plansHeading?: string;
  plansCollapse?: string;
  plansDetails?: string;
  plansDisclaimer?: string;
  plansMeta?: { plansDisclaimer?: string };
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section data-header="light" className="bg-white py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          eyebrow={plansEyebrow || "Варианты"}
          desc={plansDesc || "Пять вариантов сотрудничества под любой бюджет и локацию"}
        >
          <span dangerouslySetInnerHTML={{ __html: plansHeading || 'Выберите свой <span class="text-brand-accent">формат</span>' }} />
        </SectionHeader>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {plans.map((plan) => {
            const isOpen = openId === plan.id;
            return (              <motion.div
                key={plan.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
                }}
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
                  <p className="text-xs tracking-[0.2em] uppercase text-brand-accent mb-2" data-tina-field={tinaField(plan, "tagline")}>{plan.tagline}</p>
                  <h3 className="text-2xl font-bold text-brand-black mb-2" data-tina-field={tinaField(plan, "name")}>{plan.name}</h3>
                  <p className="text-sm text-brand-gray-400 leading-relaxed mb-4" data-tina-field={tinaField(plan, "desc")}>{plan.desc}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs label text-brand-gray-400">
                      {isOpen ? (plansCollapse || "Свернуть") : (plansDetails || "Подробнее")}
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
                        <ul className="space-y-2.5" data-tina-field={tinaField(plan, "details")}>
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
        </motion.div>

        <p className="text-center text-[10px] text-brand-gray-300 mt-4 md:mt-6 max-w-2xl mx-auto" data-tina-field={plansMeta ? tinaField(plansMeta, "plansDisclaimer") : undefined}>
          {plansDisclaimer || "* Все цифры — оценочные, точный расчёт под ваш формат и локацию — на консультации"}
        </p>
      </div>
    </section>
  );
}

/* ——— Comparison table ——— */

function ComparisonTable({ comparisonRows, plans, comparisonMeta }: { comparisonRows: Array<{ label: string; values: string[] }>; plans: Array<{ id: string; name: string }>; comparisonMeta?: { comparisonEyebrow?: string; comparisonHeading?: string; comparisonParamLabel?: string } }) {
  const [activeTab, setActiveTab] = useState(0);
  const eyebrow = (comparisonMeta?.comparisonEyebrow as string) || "Сравнение";
  const heading = (comparisonMeta?.comparisonHeading as string) || 'Что входит в каждый <span class="text-brand-accent">вариант</span>';
  const paramLabel = (comparisonMeta?.comparisonParamLabel as string) || "Параметр";

  return (
    <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          eyebrow={eyebrow}
          eyebrowField={comparisonMeta ? tinaField(comparisonMeta, "comparisonEyebrow") : undefined}
        >
          <span data-tina-field={comparisonMeta ? tinaField(comparisonMeta, "comparisonHeading") : undefined} dangerouslySetInnerHTML={{ __html: heading }} />
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
            <caption className="sr-only">Сравнение форматов франшизы Diverse: POP-UP STORE, MULTI BRAND STORE, Реновация, DIVERSE Man / Women, DIVERSE Brand Store</caption>
            <thead>
              <tr>
                <th className="text-left py-4 pr-6 text-xs label text-brand-gray-400 font-medium w-[140px]">
                  {paramLabel}
                </th>
                {plans.map((p) => (
                  <th key={p.id} className="text-center py-4 px-4 font-bold text-brand-black min-w-[160px]">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
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
              <caption className="sr-only">Параметры выбранного формата франшизы</caption>
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

function FinancialModel({ s }: { s: Record<string, unknown> }) {
  return (
    <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          eyebrow={s.financialEyebrow as string}
          desc={s.financialDesc as string}
          descClassName="body-text text-brand-gray-400 max-w-2xl mx-auto"
          eyebrowField={tinaField(s, "financialEyebrow")}
          descField={tinaField(s, "financialDesc")}
        >
          <span data-tina-field={tinaField(s, "financialHeading")} dangerouslySetInnerHTML={{ __html: (s.financialHeading as string) || "" }} />
        </SectionHeader>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
          <motion.div
            className="bg-white border border-brand-gray-200 rounded-sm overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
            }}
          >
            {/* Table */}
            <div className="divide-y divide-brand-gray-100">
              {((s.financialRows as Array<{ label?: string; value?: string; detail?: string; accent?: boolean }>) || []).map((row, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between gap-4 px-6 md:px-8 py-4 ${
                    row.accent ? "bg-brand-accent/[0.04]" : ""
                  }`}
                >
                  <div>
                    <span className={`text-sm md:text-base ${
                      row.accent ? "font-semibold text-brand-black" : "text-brand-gray-400"
                    }`} data-tina-field={tinaField(row, "label")}>
                      {row.label}
                    </span>
                    {row.detail && (
                      <span className="block text-xs text-brand-gray-300 mt-0.5" data-tina-field={tinaField(row, "detail")}>{row.detail}</span>
                    )}
                  </div>
                  <span className={`text-sm md:text-base font-bold whitespace-nowrap ${
                    row.accent ? "text-brand-accent" : "text-brand-black"
                  }`} data-tina-field={tinaField(row, "value")}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-6 flex items-start gap-3 text-sm text-brand-gray-400 leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 mt-0.5 text-brand-accent">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p data-tina-field={tinaField(s, "seasonalityNote")} dangerouslySetInnerHTML={{ __html: (s.seasonalityNote as string) || "" }} />
          </motion.div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ——— Benefits ——— */

function BenefitsSection({ s }: { s: Record<string, unknown> }) {
  const benefitsItems = (s.benefitsItems || []) as string[];
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          eyebrow={s.benefitsEyebrow as string}
          eyebrowField={tinaField(s, "benefitsEyebrow")}
        >
          <span data-tina-field={tinaField(s, "benefitsHeading")} dangerouslySetInnerHTML={{ __html: (s.benefitsHeading as string) || "" }} />
        </SectionHeader>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {benefitsItems.map((b) => (
            <motion.div
              key={b}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
              }}
              className="flex items-start gap-4 p-5 bg-brand-gray-100 rounded-sm"
            >
              <span className="w-2 h-2 rounded-full bg-brand-accent mt-2 shrink-0" />
              <span className="text-sm md:text-base text-brand-black font-medium">{b}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ——— Contact form section ——— */

function ContactSection({ contactData }: { contactData?: { contactHeading?: string; contactDesc?: string; formLabels?: Record<string, string> } }) {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const f = contactData?.formLabels || {};
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
      const formatLabel = data.format
        ? FORMAT_OPTIONS.find((o) => o.id === data.format)?.label ?? data.format
        : "";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          format: data.format || "",
          city: detectedCity,
          message: data.city
            ? `Хочу открыть магазин в городе: ${data.city}${formatLabel ? `, формат: ${formatLabel}` : ""}${data.message ? `. ${data.message}` : ""}`
            : data.message || (formatLabel ? `Хочу открыть магазин по франшизе, формат: ${formatLabel}` : "Хочу открыть магазин по франшизе"),
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitStatus("success");
      reset();
    } catch {
      const formatLabel = data.format
        ? FORMAT_OPTIONS.find((o) => o.id === data.format)?.label ?? data.format
        : "";
      queueLead({
        name: data.name,
        phone: data.phone,
        message: data.city
          ? `Хочу открыть магазин в городе: ${data.city}${formatLabel ? `, формат: ${formatLabel}` : ""}${data.message ? `. ${data.message}` : ""}`
          : data.message || (formatLabel ? `Хочу открыть магазин по франшизе, формат: ${formatLabel}` : "Хочу открыть магазин по франшизе"),
        createdAt: Date.now(),
      });
      setSubmitStatus("error");
    }
  };

  return (
    <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
      <div className="container-brand">
        <SectionHeader
          desc={contactData?.contactDesc || "Оставьте заявку — мы ответим на все вопросы"}
        >
          <span dangerouslySetInnerHTML={{ __html: contactData?.contactHeading || 'Начните <span class="text-brand-accent">свой бизнес</span>' }} />
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
                  {f.name || "Имя"} <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="franchise-name"
                  type="text"
                  placeholder={f.namePlaceholder || "Ваше имя"}
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
                    {f.phone || "Телефон"} <span className="text-brand-accent">*</span>
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
                    {f.format || "Формат"}
                  </label>
                  <select
                    id="franchise-format"
                    {...register("format")}
                    defaultValue=""
                    className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors appearance-none select-arrow-dark"
                  >
                    <option value="" disabled>{f.formatPlaceholder || "Выберите формат"}</option>
                    {FORMAT_OPTIONS.map((f) => (
                      <option key={f.id} value={f.id}>{f.label} — {f.desc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="franchise-city" className="block text-xs label text-brand-gray-500 mb-2">
                  {f.city || "Город"}
                </label>
                <input
                  id="franchise-city"
                  type="text"
                  placeholder={f.cityPlaceholder || "Ваш город"}
                  {...register("city")}
                  className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300"
                />
              </div>

              <div>
                <label htmlFor="franchise-message" className="block text-xs label text-brand-gray-500 mb-2">
                  {f.message || "Комментарий"}
                </label>
                <textarea
                  id="franchise-message"
                  rows={3}
                  placeholder={f.messagePlaceholder || "Какой формат интересует? Есть ли помещение?"}
                  {...register("message")}
                  className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300 resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-600 font-medium text-center">
                  {f.success || "✓ Спасибо! Мы получили заявку."}
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-brand-accent text-center">
                  {f.error || "✕ Ошибка отправки. Напишите нам в"}{" "}
                  <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-semibold">{f.telegram || "Telegram"}</a>
                  {" "}{f.or || "или на"}{" "}
                  <a href={`mailto:${CONTACTS.email}`} className="underline hover:no-underline">{f.mail || "почту"}</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="w-full py-4 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (f.submitting || "Отправка…") : submitStatus === "success" ? (f.submitted || "Отправлено ✓") : (f.submit || "Отправить заявку")}
              </button>

              <p className="text-xs text-brand-gray-300 text-center">
                {f.consent || "Нажимая «Отправить», вы соглашаетесь на обработку персональных данных и с"}{" "}
                <Link href="/privacy/" className="underline hover:no-underline">
                  {f.privacyLink || "политикой конфиденциальности"}
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

/* ——— Page ——— */

export default function FranchiseContent({
  hero,
  plans,
  comparison,
  financial,
  benefits,
  gallery,
  contact,
}: {
  hero: TinaResult | null;
  plans: TinaResult | null;
  comparison: TinaResult | null;
  financial: TinaResult | null;
  benefits: TinaResult | null;
  gallery: TinaResult | null;
  contact: TinaResult | null;
}) {
  const { data: heroData } = useTina(hero || EMPTY);
  const { data: plansData } = useTina(plans || EMPTY);
  const { data: comparisonData } = useTina(comparison || EMPTY);
  const { data: financialData } = useTina(financial || EMPTY);
  const { data: benefitsData } = useTina(benefits || EMPTY);

  const h = (heroData?.franchise || {}) as {
    heroEyebrow?: string;
    heroHeading?: string;
    heroDesc?: string;
    heroStats?: Array<{ value: string; label: string }>;
  };
  const plansList = ((plansData?.franchise as Record<string, unknown>)?.plansList || []) as Array<{ id: string; tagline: string; name: string; desc: string; investment: string; details: string[] }>;
  const comparisonRows = ((comparisonData?.franchise as Record<string, unknown>)?.comparisonRows || []) as Array<{ label: string; values: string[] }>;
  const fin = (financialData?.franchise || {}) as Record<string, unknown>;
  const ben = (benefitsData?.franchise || {}) as Record<string, unknown>;
  const plansMeta = (plansData?.franchise || {}) as {
    plansEyebrow?: string;
    plansDesc?: string;
    plansHeading?: string;
    plansCollapse?: string;
    plansDetails?: string;
    plansDisclaimer?: string;
  };
  const comparisonMeta = (comparisonData?.franchise || {}) as {
    comparisonEyebrow?: string;
    comparisonHeading?: string;
    comparisonParamLabel?: string;
  };
  const contactData = ((contact?.data as Record<string, unknown>)?.franchise || {}) as {
    contactHeading?: string;
    contactDesc?: string;
    formLabels?: Record<string, string>;
  };
  const galleryData = ((gallery?.data as Record<string, unknown>)?.franchise || {}) as {
    galleryEyebrow?: string;
    galleryDesc?: string;
    galleryHeading?: string;
    galleryImages?: GalleryImage[];
  };

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
              data-tina-field={tinaField(h, "heroEyebrow")}
            >
              {h.heroEyebrow}
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              data-tina-field={tinaField(h, "heroHeading")}
              dangerouslySetInnerHTML={{ __html: h.heroHeading || "" }}
            />
            <motion.p
              className="body-text text-white/60 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              data-tina-field={tinaField(h, "heroDesc")}
            >
              {h.heroDesc}
            </motion.p>

            {/* Key numbers */}
            <motion.div
              className="flex justify-center gap-8 md:gap-16"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {(h.heroStats && h.heroStats.length ? h.heroStats : [
                { value: "0 ₽", label: "Взнос" },
                { value: "0%", label: "Роялти" },
                { value: "11", label: "Магазинов" },
              ]).map((stat, i) => (
                <Fragment key={stat.label}>
                  {i > 0 && <div className="w-px bg-white/15" />}
                  <div className="text-center">
                    <p className={`text-3xl md:text-4xl font-bold ${i === 2 ? "text-brand-accent" : "text-white"}`} data-tina-field={h.heroStats?.[i] ? tinaField(h.heroStats[i], "value") : undefined}>
                      {stat.value}
                    </p>
                    <p className="text-xs label text-white/50 mt-1" data-tina-field={h.heroStats?.[i] ? tinaField(h.heroStats[i], "label") : undefined}>
                      {stat.label}
                    </p>
                  </div>
                </Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        <PlansSection
          plans={plansList}
          plansEyebrow={plansMeta.plansEyebrow}
          plansDesc={plansMeta.plansDesc}
          plansHeading={plansMeta.plansHeading}
          plansCollapse={plansMeta.plansCollapse}
          plansDetails={plansMeta.plansDetails}
          plansDisclaimer={plansMeta.plansDisclaimer}
          plansMeta={plansMeta}
        />
        <ComparisonTable comparisonRows={comparisonRows} plans={plansList} comparisonMeta={comparisonMeta} />
        <FinancialModel s={fin} />
        <BenefitsSection s={ben} />
        <div id="gallery"><StoreGallery data={galleryData} /></div>
        <Faq />
        <ContactSection contactData={contactData} />
      </main>
      <Footer />
    </>
  );
}