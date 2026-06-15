"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useModal } from "@/lib/modal-context";
import { asset } from "@/lib/path";
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
  { year: "2018", title: "Топ-3 fashion в Польше", desc: "Бренд закрепляется в лидерах рынка ЦВЕ. Запуск линии DEXT — спортивной одежды для экстремальных видов спорта." },
  { year: "2020", title: "Партнёр Dakar Rally", desc: "Diverse становится официальным техническим партнёром ралли «Дакар» — первый бренд одежды в истории легендарной гонки." },
  { year: "2023", title: "30 лет на рынке", desc: "Подтверждение лидерства. Diverse Extreme Team расширяет партнёрства: 24h Le Mans, официальные коллекции, DEXT TECH." },
];



/* ——— Representatives ——— */

export default function AboutContent() {
  const { open: openModal } = useModal();
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section data-header="dark" className="relative bg-brand-black pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={asset("/images/diverse.avif")}
              alt="Diverse — польский бренд одежды с 30-летней историей"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

          <div className="container-brand relative z-10 text-center">
            <motion.p
              className="text-xs tracking-[0.3em] uppercase text-brand-gray-300 mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              О бренде
            </motion.p>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Diverse<span className="whitespace-nowrap"> —{" "}<span className="text-brand-accent">30+ лет</span> истории</span>
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Польский бренд с 30-летней историей. 400+ магазинов в 20+ странах. Партнёр Dakar Rally и 24h Le Mans.
            </motion.p>
          </div>
        </section>

        {/* Partners — сразу после Hero */}
        <PartnerTicker simple />

        {/* Philosophy */}
        <section data-header="light" className="bg-white py-20 md:py-28">
          <div className="container-brand max-w-4xl">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">Философия</p>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1] mb-6">
                Для кого <span className="text-brand-accent">Diverse</span>
              </h2>
            </motion.div>

            <div className="space-y-6 text-base md:text-lg text-brand-gray-400 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Мы ежедневно работаем над созданием сильного и последовательного имиджа наших брендов, разрабатывая одежду в соответствии с последними мировыми трендами. Мы входим в число крупнейших и наиболее динамично развивающихся производителей одежды в Польше.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                На протяжении более 30 лет мы страстно исследуем мир моды, прислушиваясь к потребностям наших клиентов и отвечая на их меняющиеся ожидания. Наша продукция отличается инновационным подходом, функциональностью, прочностью и исключительным комфортом носки.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-brand-black">Diverse</span> — наш флагманский бренд, вдохновлённый образом жизни городских жителей. Сегодня это один из самых узнаваемых брендов Польши. Руководствуясь концепцией «Generation to Generation», мы создаём вневременную одежду, которая может служить долгие годы и передаваться из поколения в поколение. Коллекции Diverse отличаются превосходным качеством исполнения, вниманием к деталям и высококачественными материалами.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
          <div className="container-brand">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">История</p>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1]">
                От Гданьска до <span className="text-brand-accent">мировых столиц</span>
              </h2>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
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
                    {/* Dot */}
                    <div className="relative z-10 shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div className="w-[38px] h-[38px] rounded-full bg-white border-2 border-brand-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-brand-accent" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`max-md:flex-1 md:flex-none md:w-[calc(50%-28px)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                      <span className="inline-block text-sm font-bold text-brand-accent mb-1">{m.year}</span>
                      <h3 className="text-xl font-bold text-brand-black mb-2">{m.title}</h3>
                      <p className="text-sm text-brand-gray-400 leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Link to collections */}
        <motion.div
          className="text-center -mt-8 pb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <a
            href="/collection/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent-hover transition-colors group"
          >
            Посмотреть коллекции
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>

        {/* Stats */}
        <section data-header="light" className="bg-brand-gray-100 py-20 md:py-28">
          <div className="container-brand">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
              {[
                { num: 30, suffix: "+", label: "Лет на рынке" },
                { num: 400, suffix: "+", label: "Магазинов в мире" },
                { num: 20, suffix: "+", label: "Стран присутствия" },
                { num: 3, suffix: "", label: "Суббренда", accent: true },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <p className={`text-4xl md:text-5xl font-bold ${s.accent ? "text-brand-accent" : "text-brand-black"}`}>
                    <CountUp to={s.num} suffix={s.suffix} className="" />
                  </p>
                  <p className="text-xs tracking-[0.15em] uppercase text-brand-gray-400 mt-2">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Representative */}
        <section data-header="light" className="bg-white py-20 md:py-28">
          <div className="container-brand max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">Представитель в России</p>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1] mb-6">
                ООО «ХАУС» — официальный дистрибьютор
              </h2>
              <p className="text-base md:text-lg text-brand-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
                Мы являемся официальными представителями марки Diverse на территории России и стран СНГ. 
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
        </section>

        {/* CTA */}
        <section data-header="dark" className="bg-brand-black py-16 md:py-20 text-center">
          <div className="container-brand">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white leading-[1.1] mb-6"
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
                className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] font-semibold uppercase text-white bg-brand-accent hover:bg-brand-accent-hover transition-all duration-300 rounded-sm cursor-pointer"
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
