"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSocials } from "@/data/socials";

const contactSchema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(5, "Введите телефон"),
  email: z.string().email("Неверный email").or(z.literal("")),
  message: z.string().min(5, "Напишите пару слов"),
});

type ContactForm = z.infer<typeof contactSchema>;



export default function Contacts() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactForm) => {
    // TODO: connect to backend
    await new Promise((r) => setTimeout(r, 1000));
    reset();
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
  };

  return (
    <section id="section-contacts" data-header="light" className="min-h-screen bg-white">
      <div className="container-brand py-10 md:py-12">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  <label htmlFor="email" className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="mail@example.com"
                    {...register("email")}
                    className={`w-full px-4 py-3 text-sm bg-white border rounded-sm outline-none transition-colors placeholder:text-brand-gray-300 ${
                      errors.email
                        ? "border-brand-accent"
                        : "border-brand-gray-200 focus:border-brand-black"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-brand-accent">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs tracking-[0.15em] uppercase text-brand-gray-500 mb-2">
                  Сообщение <span className="text-brand-accent">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Ваше сообщение..."
                  {...register("message")}
                  className={`w-full px-4 py-3 text-sm bg-white border rounded-sm outline-none transition-colors placeholder:text-brand-gray-300 resize-none ${
                    errors.message
                      ? "border-brand-accent"
                      : "border-brand-gray-200 focus:border-brand-black"
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-brand-accent">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Отправка…" : "Отправить"}
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
