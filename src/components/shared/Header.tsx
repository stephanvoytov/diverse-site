"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import { navLinks } from "@/data/navigation";
import { asset } from "@/lib/path";
import { useModal } from "@/lib/modal-context";

export default function Header() {
  const { open: openModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const themeRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Hysteresis: only switch header theme when viewport center
      // is in the middle 50% (25%–75%) of a section.
      // Edge zones keep the previous theme — avoids flicker at boundaries.
      const sections = document.querySelectorAll<HTMLElement>("[data-header]");
      const center = window.scrollY + window.innerHeight / 2;
      let dark = themeRef.current;
      sections.forEach((el) => {
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        const progress = (center - top) / el.offsetHeight;
        if (center >= top && center < bottom && progress > 0.25 && progress < 0.75) {
          dark = el.getAttribute("data-header") === "dark";
        }
      });
      themeRef.current = dark;
      setIsDarkBg(dark);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${headerBg}`}
    >
      <div className="container-brand flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
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
              className={`text-xs tracking-[0.15em] uppercase font-light transition-colors duration-300 ${navColor}`}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`lg:hidden flex flex-col gap-1.5 p-2 transition-colors ${menuColor}`}
          aria-label="Меню"
        >
          <span
            className={`block w-6 h-px bg-current transition-transform ${
              isMobileOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-current transition-opacity ${
              isMobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-current transition-transform ${
              isMobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-500 ${
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg uppercase tracking-[0.15em] font-light text-brand-black hover:text-brand-accent transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="accent"
            size="lg"
            onClick={() => { openModal(); setIsMobileOpen(false); }}
          >
            Оставить заявку
          </Button>
        </div>
      </div>
    </header>
  );
}
