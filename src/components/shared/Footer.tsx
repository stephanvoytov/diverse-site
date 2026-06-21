"use client";

import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { footerSocials as socials } from "@/data/socials";
import Image from "next/image";
import { useModal } from "@/lib/modal-context";
import { asset } from "@/lib/path";
import { CONTACTS } from "@/config/site";
import { formatPhone } from "@/lib/phone";

export default function Footer() {
  const { open: openModal } = useModal();
  return (
    <footer data-header="dark" className="bg-brand-black">
      <div className="container-brand py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-6">
          {/* Logo + описание */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <Image
                src={asset("/brand/logo-light.svg")}
                alt="Diverse — логотип"
                width={120}
                height={20}
                className="h-4 md:h-5 w-auto"
              />
            </Link>
            <p className="text-sm text-white/55 leading-relaxed max-w-[260px]">
              Официальный дистрибьютор марки Diverse в&nbsp;России и&nbsp;СНГ
            </p>
          </div>

          {/* Навигация */}
          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-5">
              Навигация
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-5">
              Контакты
            </p>
            <ul className="space-y-3">
              <li>
                <p className="text-sm text-white/80 font-medium">ООО «ХАУС»</p>
                <p className="text-xs text-white/50 mt-0.5">ИНН 3907201307</p>
              </li>
              <li>
                <p className="text-sm text-white/50 leading-relaxed">
                  236022, Калининград,
                  <br />
                  пл. Победы, 4, оф. 210
                </p>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {CONTACTS.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACTS.phoneRaw}`}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {formatPhone()}
                </a>
              </li>
            </ul>
          </div>

          {/* Быстрая заявка + Соцсети */}
          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-4">
              Готовы начать?
            </p>
            <button
              onClick={openModal}
              className="w-full mb-5 px-5 py-3 bg-brand-accent text-white text-xs tracking-[0.2em] uppercase font-semibold rounded-sm hover:bg-brand-accent-hover transition-colors cursor-pointer"
            >
              Оставить заявку
            </button>

            <p className="text-[11px] tracking-[0.2em] uppercase text-white/50 mb-3">
              Соцсети
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя плашка */}
      <div className="border-t border-white/5">
        <div className="container-brand py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/45">
            &copy; {new Date().getFullYear()} ООО «ХАУС». Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy/"
              className="text-xs text-white/50 hover:text-white/60 transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <span className="text-xs text-white/35" aria-hidden="true">|</span>
            <span className="text-xs text-white/35">
              Diverse — официальный партнёр
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
