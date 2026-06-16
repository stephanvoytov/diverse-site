"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { asset } from "@/lib/path";

interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
}

export default function StoreGallery({ images }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const next = useCallback(() => {
    if (selected === null) return;
    setSelected((selected + 1) % images.length);
  }, [selected, images.length]);
  const prev = useCallback(() => {
    if (selected === null) return;
    setSelected((selected - 1 + images.length) % images.length);
  }, [selected, images.length]);

  if (!images.length) return null;

  return (
    <>
      <section data-header="light" className="bg-white py-20 md:py-28">
        <div className="container-brand">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-brand-gray-400 mb-4">
              Галерея
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-black leading-[1.1] mb-4">
              Как выглядят магазины <span className="text-brand-accent">Diverse</span>
            </h2>
            <p className="text-base md:text-lg text-brand-gray-400 max-w-xl mx-auto">
              Реальные фото магазина в ТЦ «Мега Уфа»
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            <motion.button
              onClick={() => setSelected(0)}
              className="relative overflow-hidden rounded-sm group cursor-pointer text-left col-span-2 row-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] md:aspect-auto md:absolute md:inset-0 relative">
                <Image
                  src={asset(images[0].src)}
                  alt={images[0].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 object-[30%_50%]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </motion.button>

            <motion.button
              onClick={() => setSelected(1)}
              className="relative overflow-hidden rounded-sm group cursor-pointer text-left col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.07 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={asset(images[1].src)}
                  alt={images[1].alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </motion.button>

            {images.slice(2).map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setSelected(i + 2)}
                className="relative overflow-hidden rounded-sm group cursor-pointer text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={asset(img.src)}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white z-10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white z-10"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === selected ? "bg-white" : "bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <motion.div
              key={selected}
              className="relative max-w-4xl w-full max-h-[85vh]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={asset(images[selected].src)}
                  alt={images[selected].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
