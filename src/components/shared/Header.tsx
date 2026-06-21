"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { contactSocials } from "@/data/socials";
import { asset } from "@/lib/path";
import { useModal } from "@/lib/modal-context";
import { CONTACTS } from "@/config/site";
import { formatPhone } from "@/lib/phone";

export default function Header({ transparent }: { transparent?: boolean }) {
  const { open: openModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Определяем секцию в центре экрана и переключаем тему хедера
      const sections = document.querySelectorAll<HTMLElement>("[data-header]");
      const center = window.scrollY + window.innerHeight / 2;
      let dark = false;
      sections.forEach((el) => {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (center >= top && center < bottom) {
          dark = el.getAttribute("data-header") === "dark";
        }
      });
      setIsDarkBg(dark);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href.replace(/\/$/, ""));
  };

  const headerBg = transparent || !isScrolled
    ? "bg-transparent"
    : isDarkBg
      ? "bg-brand-black/95"
      : "bg-white/95 shadow-sm";
  const navColor = transparent || !isScrolled
    ? "text-white/80 hover:text-white"
    : isDarkBg
      ? "text-white/50 hover:text-white"
      : "text-brand-gray-400 hover:text-brand-black";
  const menuColor = transparent || !isScrolled
    ? "text-white"
    : isDarkBg
      ? "text-white"
      : "text-brand-black";
  const btnVariant = transparent ? "accent" : isDarkBg ? "outline-white" : "accent";

  const closeMenu = () => setIsMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-colors duration-300 ${headerBg}`}
    >
      <div className="container-brand flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative z-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(
              transparent || !isScrolled || isDarkBg
                ? "/brand/logo-light.svg"
                : "/brand/logo-dark.svg"
            )}
            alt="Diverse — логотип"
            width={120}
            height={20}
            fetchPriority="high"
            className="h-4 md:h-5 w-auto transition-opacity"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs label font-light transition-colors duration-300 ${navColor} ${
                isActive(link.href) ? "!text-brand-accent font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant={btnVariant}
            size="sm"
            onClick={openModal}
          >
            Оставить заявку
          </Button>
        </nav>

        {/* Mobile right side: contact + menu */}
        <div className="lg:hidden flex items-center gap-1 relative z-50">
          {/* Contact button */}
          <a
            href={`tel:${CONTACTS.phoneRaw}`}
            className="flex items-center justify-center w-10 h-10 transition-colors"
            aria-label="Позвонить"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={menuColor}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`flex flex-col items-center justify-center w-11 h-11 gap-1 transition-colors ${menuColor}`}
            aria-label={isMobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
          <span
            className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${
              isMobileOpen ? "rotate-45 translate-y-[5.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${
              isMobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-current transition-all duration-300 ${
              isMobileOpen ? "-rotate-45 -translate-y-[5.5px]" : ""
            }`}
          />
        </button>
        </div>
      </div>

      {/* Mobile Menu — side panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/40 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />

            {/* Panel */}
            <motion.div
              className="lg:hidden fixed inset-y-0 right-0 z-[61] w-full max-w-sm bg-white flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Top bar: logo + close */}
              <div className="flex items-center justify-between px-6 h-16 md:h-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset("/brand/logo-dark.svg")}
                  alt="Diverse — логотип"
                  width={100}
                  height={16}
                  className="h-4 md:h-5 w-auto"
                />
                <button
                  onClick={closeMenu}
                  className="p-2 text-brand-black"
                  aria-label="Закрыть меню"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-10 gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-2xl font-light transition-colors ${
                      isActive(link.href)
                        ? "text-brand-accent"
                        : "text-brand-black hover:text-brand-accent"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Contacts + socials */}
              <div className="px-10 py-8 text-sm text-brand-gray-400 space-y-5">
                <div className="space-y-1.5">
                  <a href={`tel:${CONTACTS.phoneRaw}`} className="block hover:text-brand-accent transition-colors">
                    {formatPhone()}
                  </a>
                  <a href={`mailto:${CONTACTS.email}`} className="block hover:text-brand-accent transition-colors">
                    {CONTACTS.email}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  {contactSocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-gray-400 hover:text-brand-accent transition-colors"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
