"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Faq from "@/components/blocks/Faq";
import { plans, benefits } from "@/data/franchise";

/* ——— Comparison table data ——— */

interface ComparisonRow {
  label: string;
  values: string[];
}

const comparisonRows: ComparisonRow[] = [
  { label: "Инвестиции", values: ["от 800 000 ₽", "от 1 500 000 ₽", "от 3 000 000 ₽"] },
  { label: "Площадь", values: ["от 12 м²", "Существующее помещение", "от 60 м²"] },
  { label: "Дизайн-проект", values: ["Базовый", "Переоборудование", "Полный от ETOS"] },
  { label: "Срок запуска", values: ["от 2 недель", "от 3 недель", "от 4 недель"] },
  { label: "Товарный запас", values: ["Стартовый", "Стартовый", "Максимальный"] },
  { label: "Роялти", values: ["0%", "0%", "0%"] },
  { label: "Паушальный взнос", values: ["0 ₽", "0 ₽", "0 ₽"] },
];

/* ——— Plans accordion (reused from main) ——— */

function PlansSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section data-header="light" className="bg-white py-20 md:py-28">
      <div className="container-brand">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">Варианты</p>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1] mb-4">
            Выберите свой <span className="text-brand-accent">формат</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            Три варианта сотрудничества под любой бюджет и локацию
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const isOpen = openId === plan.id;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-sm overflow-hidden transition-all duration-500 cursor-pointer ${
                  isOpen
                    ? "bg-white border-2 border-brand-accent/40 shadow-lg"
                    : "bg-brand-gray-100 border border-brand-gray-200 hover:border-brand-gray-300"
                }`}
                onClick={() => setOpenId(isOpen ? null : plan.id)}
              >
                <div className="p-6 md:p-8">
                  <p className="text-xs tracking-[0.2em] uppercase text-brand-accent mb-2">{plan.tagline}</p>
                  <h3 className="text-2xl font-bold text-brand-black mb-2">{plan.name}</h3>
                  <p className="text-sm text-brand-gray-400 leading-relaxed mb-4">{plan.desc}</p>
                  <p className="text-xl font-bold text-brand-accent mb-3">{plan.investment}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.15em] uppercase text-brand-gray-400">
                      {isOpen ? "Свернуть" : "Подробнее"}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
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
                      transition={{ duration: 0.35 }}
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
  return (
    <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
      <div className="container-brand">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">Сравнение</p>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1]">
            Что входит в каждый <span className="text-brand-accent">вариант</span>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left py-4 pr-6 text-xs tracking-[0.15em] uppercase text-brand-gray-400 font-medium w-[140px]">
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
      </div>
    </section>
  );
}

/* ——— Benefits ——— */

function BenefitsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-brand">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">Преимущества</p>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1] mb-4">
            Почему <span className="text-brand-accent">Diverse</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
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
  return (
    <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
      <div className="container-brand">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1] mb-4">
            Начните <span className="text-brand-accent">свой бизнес</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            Оставьте заявку — мы свяжемся в ближайшее время
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <form
            action="#"
            method="POST"
            className="bg-white p-8 md:p-10 rounded-sm shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
            }}
          >
            <div className="space-y-5">
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-2">
                  Имя <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-2">
                    Телефон <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 123-45-67"
                    className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-2">
                    Город
                  </label>
                  <input
                    type="text"
                    placeholder="Ваш город"
                    className="w-full px-4 py-3 text-sm bg-brand-gray-100 border border-brand-gray-200 rounded-sm outline-none focus:border-brand-black transition-colors placeholder:text-brand-gray-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors"
              >
                Отправить заявку
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
              className="text-xs tracking-[0.3em] uppercase text-brand-gray-300 mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Франшиза
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Откройте магазин <span className="text-brand-accent">Diverse</span>
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Культовый польский бренд. Партнёр Dakar Rally. Более 400 магазинов в мире.
            </motion.p>

            {/* Key numbers */}
            <motion.div
              className="flex justify-center gap-8 md:gap-16"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">0 ₽</p>
                <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">Взнос</p>
              </div>
              <div className="w-px bg-white/15" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white">0%</p>
                <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">Роялти</p>
              </div>
              <div className="w-px bg-white/15" />
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-brand-accent">11</p>
                <p className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1">Магазинов</p>
              </div>
            </motion.div>
          </div>
        </section>

        <PlansSection />
        <ComparisonTable />
        <BenefitsSection />
        <Faq />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
