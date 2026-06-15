"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "@/lib/modal-context";
import { useUserCity } from "@/lib/user-city-context";
import { queueLead, flushQueue } from "@/lib/lead-queue";
import { FORMAT_OPTIONS, CONTACTS } from "@/config/site";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

/* ——— Конфигурация шагов ——— */

type Format = "island" | "renovation" | "standard" | null;

type PremiseOption = "yes" | "no" | "search" | null;

/* ——— Progress Bar ——— */

function ProgressBar({ step }: { step: number }) {
  const pct = step === 1 ? 33 : step === 2 ? 66 : 100;
  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex-1 h-1 bg-brand-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[11px] font-semibold text-brand-gray-400 tabular-nums shrink-0">
        {step}/3
      </span>
    </div>
  );
}

/* ——— Step 1: Формат ——— */

function StepFormat({
  selected,
  onSelect,
}: {
  selected: Format;
  onSelect: (f: Format) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-xs tracking-[0.2em] uppercase text-brand-gray-400 mb-1">
        Шаг 1 из 3
      </p>
      <h3 className="text-lg font-bold text-brand-black mb-4">
        Какой формат вас интересует?
      </h3>

      <div className="space-y-2.5">
        {FORMAT_OPTIONS.map((opt) => {
          const isActive = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`w-full text-left px-4 py-3.5 rounded-sm border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-brand-accent bg-brand-accent/[0.04] shadow-sm"
                  : "border-brand-gray-200 bg-white hover:border-brand-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className={`text-sm font-semibold ${
                      isActive ? "text-brand-accent" : "text-brand-black"
                    }`}
                  >
                    {opt.label}
                  </span>
                  <p className="text-xs text-brand-gray-400 mt-0.5">
                    {opt.desc}
                  </p>
                </div>
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? "border-brand-accent bg-brand-accent"
                      : "border-brand-gray-300"
                  }`}
                >
                  {isActive && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 5l2 2 4-4" />
                    </svg>
                  )}
                </span>
              </div>
            </button>
          );
        })}

        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left px-4 py-3 rounded-sm border transition-all duration-200 cursor-pointer ${
            selected === null
              ? "border-brand-accent bg-brand-accent/[0.04] shadow-sm"
              : "border-brand-gray-200 bg-white hover:border-brand-gray-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-sm ${
                selected === null ? "text-brand-accent font-semibold" : "text-brand-gray-400"
              }`}
            >
              Жатрудняюсь ответить / нужна консультация
            </span>
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                selected === null
                  ? "border-brand-accent bg-brand-accent"
                  : "border-brand-gray-300"
              }`}
            >
              {selected === null && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 5l2 2 4-4" />
                </svg>
              )}
            </span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

/* ——— Step 2: Город + Помещение ——— */

function StepCity({
  city,
  premise,
  onCityChange,
  onPremiseChange,
}: {
  city: string;
  premise: PremiseOption;
  onCityChange: (v: string) => void;
  onPremiseChange: (v: PremiseOption) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-xs tracking-[0.2em] uppercase text-brand-gray-400 mb-1">
        Шаг 2 из 3
      </p>
      <h3 className="text-lg font-bold text-brand-black mb-4">
        Где планируете открыть?
      </h3>

      <div className="space-y-4">
        <input
          type="text"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          placeholder="Ваш город"
          className="w-full px-4 py-3 text-sm bg-white border border-brand-gray-200 rounded-sm outline-none focus:border-brand-accent transition-colors placeholder:text-brand-gray-300"
        />

        <div>
          <p className="text-sm font-medium text-brand-black mb-2.5">
            Есть ли помещение?
          </p>
          <div className="flex gap-2">
            {([
              { id: "yes" as const, label: "Да" },
              { id: "no" as const, label: "Нет" },
              { id: "search" as const, label: "Подбираю" },
            ] as const).map((opt) => {
              const isActive = premise === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onPremiseChange(opt.id)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-sm border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-brand-accent bg-brand-accent/[0.04] text-brand-accent"
                      : "border-brand-gray-200 bg-white text-brand-gray-400 hover:border-brand-gray-300"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ——— Step 3: Имя + Телефон ——— */

function StepContact({
  name,
  phone,
  errors,
  onNameChange,
  onPhoneChange,
  onSubmit,
  isSubmitting,
}: {
  name: string;
  phone: string | undefined;
  errors: { name?: string; phone?: string };
  onNameChange: (v: string) => void;
  onPhoneChange: (v?: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-xs tracking-[0.2em] uppercase text-brand-gray-400 mb-1">
        Шаг 3 из 3
      </p>
      <h3 className="text-lg font-bold text-brand-black mb-1">
        Остался последний шаг
      </h3>
      <p className="text-sm text-brand-gray-400 mb-5">
        Оставьте контакты — мы пришлём расчёт под ваш формат
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ваше имя"
            className={`w-full px-4 py-3 text-sm bg-white border rounded-sm outline-none transition-colors placeholder:text-brand-gray-300 ${
              errors.name
                ? "border-brand-accent"
                : "border-brand-gray-200 focus:border-brand-accent"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-brand-accent">{errors.name}</p>
          )}
        </div>

        <div>
          <PhoneInput
            value={phone}
            onChange={onPhoneChange}
            defaultCountry="RU"
            placeholder="+7 (999) 123-45-67"
            className="phone-input-accent"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-brand-accent">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Отправка…" : "Получить расчёт"}
        </button>

        <p className="text-xs text-brand-gray-300 text-center leading-relaxed">
          Бесплатно · Без обязательств · Ответим за 15–30 мин
        </p>
      </form>
    </motion.div>
  );
}

/* ——— Главный компонент ——— */

export default function ContactModal() {
  const { isOpen, close } = useModal();
  const { city: detectedCity } = useUserCity();
  const overlayRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(1);

  // Step 1
  const [format, setFormat] = useState<Format>(null);

  // Step 2
  const [city, setCity] = useState("");
  const [premise, setPremise] = useState<PremiseOption>(null);

  // Step 3
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Автоподстановка города из контекста (по IP)
  useEffect(() => {
    if (isOpen && detectedCity && !city) {
      setCity(detectedCity);
    }
  }, [isOpen, detectedCity, city]);

  // Сброс при открытии/закрытии
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setFormat(null);
        setCity("");
        setPremise(null);
        setName("");
        setPhone(undefined);
        setErrors({});
        setSubmitStatus("idle");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Блокировка прокрутки
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  const handleStep1Next = (f: Format) => {
    setFormat(f);
    setStep(2);
  };

  const handleStep2Next = () => {
    setStep(3);
  };

  const validateStep3 = (): boolean => {
    const errs: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) errs.name = "Введите имя";
    if (!phone || phone.length < 5) errs.phone = "Введите корректный телефон";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formatLabel = format
      ? FORMAT_OPTIONS.find((o) => o.id === format)?.label ?? format
      : "Нужна консультация";

    const premiseLabel = premise
      ? premise === "yes" ? "Есть" : premise === "no" ? "Нет" : "Подбираю"
      : "Не указано";

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";
    // phone validated in validateStep3()
    const phoneValue: string = phone!;
    const payload = {
      name: name.trim(),
      phone: phoneValue,
      city: detectedCity || undefined,
      message: [
        `Формат: ${formatLabel}`,
        city ? `Город: ${city}` : "",
        `Помещение: ${premiseLabel}`,
      ].filter(Boolean).join(". "),
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitStatus("success");
      setTimeout(() => { close(); }, 2000);
    } catch {
      // Сохраняем лид локально, чтобы не потерять
      queueLead({ ...payload, createdAt: Date.now() });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
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
            className="relative w-full max-w-lg bg-white rounded-sm shadow-2xl my-auto"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-brand-gray-200 text-brand-gray-400 hover:text-brand-black hover:border-brand-gray-400 transition-colors bg-white z-10 cursor-pointer"
              aria-label="Жакрыть"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            {/* Content */}
            <div className="px-8 pt-8 pb-8">
              <h2 className="text-xl md:text-2xl font-bold text-brand-black mb-1">
                {step === 1 && "Рассчитайте прибыль"}
                {step === 2 && "Город и помещение"}
                {step === 3 && "Контакты"}
              </h2>
              <p className="text-xs text-brand-gray-400 mb-4">
                {step === 1 && "Выберите формат — подберём лучшие условия"}
                {step === 2 && "Подготовим расчёт под вашу локацию"}
                {step === 3 && "Результат пришлём на телефон"}
              </p>

              <ProgressBar step={step} />

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <StepFormat
                    key="step1"
                    selected={format}
                    onSelect={handleStep1Next}
                  />
                )}

                {step === 2 && (
                  <StepCity
                    key="step2"
                    city={city}
                    premise={premise}
                    onCityChange={setCity}
                    onPremiseChange={setPremise}
                  />
                )}

                {step === 3 && (
                  <StepContact
                    key="step3"
                    name={name}
                    phone={phone}
                    errors={errors}
                    onNameChange={setName}
                    onPhoneChange={setPhone}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <AnimatePresence>
                {step === 2 && (
                  <motion.div
                    className="flex gap-3 mt-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 text-sm font-medium text-brand-gray-400 border border-brand-gray-200 rounded-sm hover:bg-brand-gray-100 transition-colors cursor-pointer"
                    >
                      Назад
                    </button>
                    <button
                      onClick={handleStep2Next}
                      className="flex-[2] py-3 bg-brand-accent text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors cursor-pointer"
                    >
                      Далее
                    </button>
                  </motion.div>
                )}

                {step === 3 && submitStatus === "success" && (
                  <motion.p
                    className="mt-4 text-sm text-green-600 font-medium text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ✓ Спасибо! Мы получили заявку.
                  </motion.p>
                )}
                {step === 3 && submitStatus === "error" && (
                  <motion.div
                    className="mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-sm text-brand-accent mb-3">
                      ✕ Ошибка отправки. Попробуйте снова или напишите в{" "}
                      <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-semibold">Telegram</a>
                    </p>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="text-xs font-semibold text-brand-accent underline hover:no-underline cursor-pointer"
                    >
                      Попробовать снова →
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
