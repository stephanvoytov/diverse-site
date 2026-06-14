import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { footerSocials as socials } from "@/data/socials";

export default function Footer() {
  return (
    <footer className="bg-brand-black">
      <div className="container-brand py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-6">
          {/* Logo + описание */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-5">
              <img
                src="/brand/logo-light.svg"
                alt="Diverse"
                className="h-4 md:h-5 w-auto"
              />
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-[260px]">
              Официальный дистрибьютор марки Diverse в&nbsp;России и&nbsp;СНГ
            </p>
          </div>

          {/* Навигация */}
          <div className="md:col-span-2">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-5">
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
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-5">
              Контакты
            </p>
            <ul className="space-y-3">
              <li>
                <p className="text-sm text-white/80 font-medium">ООО «ХАУС»</p>
                <p className="text-xs text-white/40 mt-0.5">ИНН 3907201307</p>
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
                  href="mailto:diverserussia@yandex.ru"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  diverserussia@yandex.ru
                </a>
              </li>
              <li>
                <a
                  href="tel:+79062373561"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  +7 906 237 35 61
                </a>
              </li>
            </ul>
          </div>

          {/* Соцсети */}
          <div className="md:col-span-3">
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-5">
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
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} ООО «ХАУС». Все права защищены.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/20">
              Diverse — официальный партнёр
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
