import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/path";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-md">
        {/* Logo */}
        <Image
          src={asset("/brand/logo-light.svg")}
          alt="Diverse — логотип"
          width={160}
          height={28}
          className="h-6 md:h-7 w-auto mx-auto mb-8"
        />

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-bold text-brand-accent leading-none mb-4">
          404
        </h1>
        <p className="text-lg text-white/60 mb-8 leading-relaxed">
          Страница не найдена
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.2em] uppercase font-semibold bg-brand-accent text-white hover:bg-brand-accent-hover transition-colors rounded-sm"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
