"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { navLinks } from "@/data/navigation";
import { asset } from "@/lib/path";
import { useModal } from "@/lib/modal-context";
import { CONTACTS } from "@/config/site";

export default function Header() {
  const { open: openModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

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

  const headerBg = !isScrolled
    ? "bg-transparent"
    : isDarkBg
      ? "bg-brand-black/95 backdrop-blur-md"
      : "bg-white/95 backdrop-blur-md shadow-sm";
  const navColor = !isScrolled
    ? "text-white/80 hover:text-white"
    : isDarkBg
      ? "text-white/50 hover:text-white"
      : "text-brand-gray-400 hover:text-brand-black";
  const menuColor = !isScrolled
    ? "text-white"
    : isDarkBg
      ? "text-white"
      : "text-brand-black";
  const btnVariant = isDarkBg ? "outline-white" : "accent";

  const closeMenu = () => setIsMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${headerBg}`}
    >
      <div className="container-brand flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex-shrink-0 relative z-50">
          <img
            src={asset(
              !isScrolled
                ? "/brand/logo-light.svg"
                : isDarkBg
                  ? "/brand/logo-light.svg"
                  : "/brand/logo-dark.svg"
            )}
            alt="Diverse"
            className="h-4 md:h-5 w-auto transition-opacity"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[0.15em] uppercase font-light transition-colors duration-300 ${navColor} ${
                isActive(link.href) ? "!text-brand-accent font-semibold" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button
            variant={btnVariant}
            size="sm"
            onClick={openModal}
          >
            Оставить заявку
          </Button>
        </nav>

        {/* Phone (mobile) — click-to-call */}
        <a
          href={`tel:${CONTACTS.phoneRaw}`}
          className="lg:hidden relative z-50 flex items-center justify-center w-10 h-10 mr-1 transition-colors"
          aria-label="Позвонить"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={menuColor}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>

        {/* Mobile Menu Button (hamburger) */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden relative z-50 flex flex-col gap-1.5 p-2 transition-colors ${menuColor}`}
          aria-label={isMobileOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 ${
              isMobileOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 ${
              isMobileOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-current transition-all duration-300 ${
              isMobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/40 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
            />

            {/* Panel */}
            <motion.div
              className="lg:hidden fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col justify-center min-h-full px-10 py-24">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={`relative text-2xl uppercase tracking-[0.15em] font-light transition-colors duration-300 ${
                        isActive(link.href)
                          ? "text-brand-accent"
                          : "text-brand-black hover:text-brand-accent"
                      }`}
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                    >
                      {isActive(link.href) && (
                        <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-accent rounded-full" />
                      )}
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                <div className="mt-12 pt-8 border-t border-brand-gray-200">
                  <Button
                    variant="accent"
                    size="lg"
                    className="w-full"
                    onClick={() => { openModal(); closeMenu(); }}
                  >
                    Оставить заявку
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
