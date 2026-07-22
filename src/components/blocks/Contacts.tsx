"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSocials } from "@/data/socials";
import { CONTACTS, FORMAT_OPTIONS } from "@/config/site";
import { formatPhone } from "@/lib/phone";
import { useUserCity } from "@/lib/user-city-context";
import { queueLead } from "@/lib/lead-queue";
import PhoneInput from "react-phone-number-input/react-hook-form";
import { siteContent } from "@/data/site-content";
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
        message: data.message || siteContent.contacts.form.leadQueueFallback,
        createdAt: Date.now(),
      });
      setSubmitStatus("error");
    }
  };

  return (
    <section id="section-contacts" data-header="dark" className="min-h-screen bg-brand-black">
      <div className="container-brand py-10 md:py-12">
        {/* Заголовок */}
        <SectionHeader
          eyebrow={siteContent.contacts.eyebrow}
          desc={siteContent.contacts.desc}
          className="mb-10 md:mb-14"
          margin
          dark
        >
          {siteContent.contacts.heading}
        </SectionHeader>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* ——— Форма ——— */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs label text-white/50 mb-2">
                  {siteContent.contacts.form.name} <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={siteContent.contacts.form.namePlaceholder}
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
                <label htmlFor="phone" className="block text-xs label text-white/50 mb-2">
                  {siteContent.contacts.form.phone} <span className="text-brand-accent">*</span>
                </label>
                <PhoneInput
                  name="phone"
                  control={control}
                  defaultCountry="RU"
                  countries={["RU", "KZ", "BY"]}
                  placeholder={siteContent.contacts.form.phonePlaceholder}
                  className="phone-input-dark"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-brand-accent">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contacts-format" className="block text-xs label text-white/50 mb-2">
                  {siteContent.contacts.form.format}
                </label>
                <select
                  id="contacts-format"
                  {...register("format")}
                  defaultValue=""
                  className="w-full px-4 py-3 text-sm bg-white/10 border border-white/20 rounded-sm outline-none focus:border-white transition-colors text-white appearance-none select-arrow-light"
                >
                  <option value="" disabled className="text-brand-gray-400">{siteContent.contacts.form.formatPlaceholder}</option>
                  {FORMAT_OPTIONS.map((f) => (
                    <option key={f.id} value={f.id} className="text-brand-black">
                      {f.label} — {f.desc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs label text-white/50 mb-2">
                  {siteContent.contacts.form.message}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder={siteContent.contacts.form.messagePlaceholder}
                  {...register("message")}
                  className="w-full px-4 py-3 text-sm bg-white/10 border border-white/20 rounded-sm outline-none focus:border-white transition-colors text-white placeholder:text-white/30 resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-400 font-medium">
                  {siteContent.contacts.form.success}
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-brand-accent">
                  {siteContent.contacts.form.error}{" "}
                  <a href={CONTACTS.telegram} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-semibold">
                    {siteContent.contacts.form.telegram}
                  </a>
                  {" "}{siteContent.contacts.form.or}{" "}
                  <a href="mailto:diverserussia@yandex.ru" className="underline hover:no-underline">
                    {siteContent.contacts.form.mail}
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
              >
                {isSubmitting ? siteContent.contacts.form.submitting : submitStatus === "success" ? siteContent.contacts.form.submitted : siteContent.contacts.form.submit}
              </button>
            </form>
          </div>

          {/* ——— Информация ——— */}
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-8">
              {/* Реквизиты */}
              <div>
                <p className="text-xs label text-white/40 mb-4">
                  {siteContent.contacts.sections.details}
                </p>
                <h3 className="text-xl font-bold text-white mb-1">{siteContent.contacts.company.name}</h3>
                <p className="text-sm text-white/40 mb-0.5">{siteContent.contacts.company.inn}</p>
                <p className="text-sm text-white/40">
                  {siteContent.contacts.company.address}
                </p>
              </div>

              {/* Email / Phone */}
              <div>
                <p className="text-xs label text-white/40 mb-4">
                  {siteContent.contacts.sections.contacts}
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
                <p className="text-xs label text-white/40 mb-4">
                  {siteContent.contacts.sections.socials}
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
              {siteContent.contacts.privacy}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
