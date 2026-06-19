"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useModal } from "@/lib/modal-context";
import PartnerTicker from "@/components/blocks/PartnerTicker";
import CountUp from "@/components/ui/CountUp";

/* ——— Timeline data ——— */

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

const milestones: Milestone[] = [
  { year: "1993", title: "Основание бренда", desc: "Diverse создан в Гданьске, Польша. Название отражает разнообразие стилей — от спорта до urban-классики. Вдохновение — культура и стиль жизни Нью-Йорка." },
  { year: "2007", title: "Выход на международный рынок", desc: "Начало экспансии в Центральную и Восточную Европу. Diverse появляется в крупнейших торговых центрах региона." },
  { year: "2010–2020", title: "Рост сети", desc: "Сеть вырастает до 400+ магазинов в 9 странах. Diverse входит в тройку крупнейших fashion-брендов Польши по товарообороту." },
  { year: "~2003", title: "Запуск DEXT", desc: "Дочерний бренд DEXT создан для спортивной одежды и экстремальных видов спорта. Спустя 17 лет станет техническим партнёром Dakar Rally." },
  { year: "2020", title: "Партнёр Dakar Rally", desc: "Diverse становится официальным техническим партнёром ралли «Дакар» — первый польский бренд одежды в статусе технического партнёра легендарной гонки." },
  { year: "2023", title: "30 лет на рынке", desc: "Подтверждение лидерства. Diverse Extreme Team расширяет партнёрства: 24h Le Mans, официальные коллекции, DEXT TECH." },
];

export default function AboutContent() {
  const { open: openModal } = useModal();
  return (
    <>
      <Header />
      <main>
        {/* ===== 1. Hero ===== */}
        <section data-header="dark" className="relative bg-brand-black pt-20 pb-16 md:pt-40 md:pb-32">
          <div className="container-brand text-center">
            <motion.p
              className="text-xs eyebrow text-brand-gray-300 mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              О бренде
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-brand-accent">30 лет</span> европейского качества
            </motion.h1>
            <motion.p
              className="body-text text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Польский бренд одежды для европейского стиля жизни
            </motion.p>
          </div>
        </section>

        {/* ===== 2. Stats — цифры сразу после Hero ===== */}
        <section data-header="light" className="bg-white py-16 md:py-20">
          <div className="container-brand">
            <div className="flex flex-nowrap justify-center gap-6 md:gap-20 text-center">
              {[
                { num: 30, suffix: "+", label: "Лет на рынке" },
                { num: 400, suffix: "+", label: "Магазинов в мире" },
                { num: 3, suffix: "", label: "Суббренда", accent: true },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <p className={`text-5xl md:text-6xl font-bold ${s.accent ? "text-brand-accent" : "text-brand-black"}`}>
                    <CountUp to={s.num} suffix={s.suffix} className="" />
                  </p>
                  <p className="text-[10px] md:text-xs label text-brand-gray-400 mt-1 md:mt-2">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 3. PartnerTicker ===== */}
        <PartnerTicker simple />

        {/* ===== 4. О бренде (бывшая Philosophy) ===== */}
        <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
          <div className="container-brand max-w-4xl">
            <SectionHeader
              eyebrow="О бренде"
            >
              Идеология <span className="text-brand-accent">Diverse</span>
            </SectionHeader>

            <div className="space-y-6 body-text text-brand-gray-400 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Diverse — один из крупнейших и наиболее динамично развивающихся брендов одежды в Польше. Бренд ежедневно работает над созданием сильного и последовательного имиджа, разрабатывая одежду в соответствии с последними мировыми трендами.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                На протяжении более 30 лет бренд страстно исследует мир моды, прислушиваясь к потребностям клиентов и отвечая на их меняющиеся ожидания. Продукция Diverse отличается инновационным подходом, функциональностью, прочностью и исключительным комфортом носки.
              </motion.p>
              {/* Divider */}
              <div className="py-4">
                <div className="w-12 h-0.5 bg-brand-accent/40 mx-auto" />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Diverse — бренд, вдохновлённый образом жизни городских жителей. Сегодня это один из самых узнаваемых брендов Польши. Руководствуясь концепцией «Generation to Generation», Diverse создаёт вневременную одежду, которая может служить долгие годы. Коллекции отличаются превосходным качеством исполнения, вниманием к деталям и высококачественными материалами.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ===== 5. Европейское качество — 3 колонки ===== */}
        <section data-header="light" className="bg-white py-20 md:py-28">
          <div className="container-brand">
            <SectionHeader
              eyebrow="Преимущества"
            >
              Европейское качество. <span className="text-brand-accent">Проверено годами</span>
            </SectionHeader>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "Польское происхождение",
                  desc: "Бренд основан в Гданьске в 1993 году. Лекала, дизайн и контроль качества — из Польши, по стандартам Европейского союза.",
                },
                {
                  title: "Собственная сеть",
                  desc: "Более 400 магазинов в Польше и Европе. Розничная сеть с 30-летней историей продаж.",
                },
                {
                  title: "Устойчивость к кризисам",
                  desc: "Бренд работает с 1993 года. Пережил кризисы 1998, 2008, 2014, 2020 годов. Доказал, что модель стабильна в любые времена.",
                },
              ].map((col, i) => (
                <motion.div
                  key={col.title}
                  className="border border-brand-gray-200 rounded-lg p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <h3 className="text-lg font-bold text-brand-black mb-3">{col.title}</h3>
                  <p className="text-sm text-brand-gray-400 leading-relaxed">{col.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 6. Timeline + Collections ===== */}
        <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
          <div className="container-brand">
            <SectionHeader
              eyebrow="История"
            >
              От Гданьска до <span className="text-brand-accent">мировых столиц</span>
            </SectionHeader>

            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-brand-gray-300 md:left-1/2 md:-translate-x-px" />

              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={m.year}
                    className={`relative flex items-start gap-6 pb-12 last:pb-0 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div className="w-[38px] h-[38px] rounded-full bg-white border-2 border-brand-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand-accent" />
                      </div>
                    </div>

                    <div className={`max-md:flex-1 md:flex-none md:w-[calc(50%-28px)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                      <span className="inline-block text-sm font-bold text-brand-accent mb-1">{m.year}</span>
                      <h3 className="text-xl font-bold text-brand-black mb-2">{m.title}</h3>
                      <p className="text-sm text-brand-gray-400 leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Collections link */}
            <motion.div
              className="text-center mt-16 pt-10 border-t border-brand-gray-200"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm text-brand-gray-400 mb-4">
                Узнайте больше о продукте
              </p>
              <a
                href="/collection/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors group"
              >
                Посмотреть коллекции
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ===== 7. Representative ===== */}
        <section data-header="light" className="bg-white py-20 md:py-28">
          <div className="container-brand max-w-4xl">
            <div className="relative border border-brand-gray-200 rounded-lg pt-10 pb-12 px-8 md:px-14">
              <div className="absolute top-0 left-8 right-8 h-1 bg-brand-accent rounded-t-lg" />

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-xs eyebrow text-brand-gray-400 mb-4">Представитель в России</p>
                <h2 className="section-title text-brand-black mb-6">
                  ООО «ХАУС» — официальный дистрибьютор
                </h2>
                <p className="body-text text-brand-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
                  Мы — официальные представители марки Diverse в России и странах СНГ. 
                  Запустили 11 магазинов в РФ и Казахстане. Наша задача — сделать европейское качество доступным для партнёров по всей стране.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-brand-gray-400">
                  <span className="w-2 h-2 rounded-full bg-brand-accent" />
                  ИНН 3907201307
                  <span className="w-2 h-2 rounded-full bg-brand-accent" />
                  Калининград, пл. Победы, 4
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== 8. CTA ===== */}
        <section data-header="dark" className="bg-brand-black py-16 md:py-20 text-center">
          <div className="container-brand">
            <motion.h2
              className="section-title text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Хотите стать партнёром <span className="text-brand-accent">Diverse</span>?
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <button
                onClick={openModal}
                className="btn-accent"
              >
                Стать партнёром
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
