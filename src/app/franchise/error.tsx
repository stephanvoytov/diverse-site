"use client";

import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/path";

export default function FranchiseError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-md">
        <Image
          src={asset("/brand/logo-light.svg")}
          alt="Diverse — логотип"
          width={160}
          height={28}
          className="h-6 md:h-7 w-auto mx-auto mb-8"
        />

        <h1 className="text-6xl md:text-7xl font-bold text-brand-accent leading-none mb-4">
          Ошибка
        </h1>
        <p className="text-lg text-white/60 mb-2 leading-relaxed">
          Не удалось загрузить страницу «Франшиза»
        </p>
        {error.digest && (
          <p className="text-xs text-white/30 mb-8 font-mono">
            {error.digest}
          </p>
        )}

        <div className="flex items-center justify-center gap-4">
          <button onClick={reset} className="btn-accent">
            Попробовать снова
          </button>
          <Link href="/" className="btn-outline">
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
