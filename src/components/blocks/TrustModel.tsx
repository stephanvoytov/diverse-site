"use client";

import { motion } from "framer-motion";

const trustPoints = [
  {
    title: "Вы платите только за товар",
    desc: "Никакого паушального взноса и роялти. Наша прибыль — с оборота поставок, поэтому мы заинтересованы в ваших продажах, а не в «входном билете».",
  },
  {
    title: "Ваша маржа — 50–55%",
    desc: "В закупочную цену уже заложены таможня, сертификация (ЕАС, «Честный Знак») и доставка до Калининграда. В рознице вы делаете стандартную наценку.",
  },
  {
    title: "Никаких обязательств по объёму",
    desc: "Нет минимальной суммы заказа и плана закупок. Вы заказываете ровно столько, сколько продаёте — хоть на 50 000 ₽ в месяц.",
  },
  {
    title: "Поставки раз в месяц из Гданьска",
    desc: "Личный кабинет в B2B-платформе. Выбираете товар со склада, мы собираем, таможим и отправляем EMS в любой город. Предзаказы коллекций — 6 раз в год.",
  },
];

export default function TrustModel() {
  return (
    <section data-header="light" className="bg-brand-gray-100 py-16 md:py-24">
      <div className="container-brand">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
            Как устроена модель
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-black leading-[1.1] mb-4">
            Прозрачная <span className="text-brand-accent">финансовая модель</span>
          </h2>
          <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
            Никаких скрытых платежей и минимальных объёмов
          </p>
        </motion.div>

        {/* Trust cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-brand-gray-200 rounded-sm p-6 md:p-8"
            >
              <h3 className="text-lg md:text-xl font-bold text-brand-black mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-brand-gray-400 leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
