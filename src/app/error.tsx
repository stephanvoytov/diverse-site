"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-md">
        <h1 className="text-6xl md:text-7xl font-bold text-brand-accent leading-none mb-4">
          Ошибка
        </h1>
        <p className="text-lg text-white/60 mb-2 leading-relaxed">
          Что-то пошло не так
        </p>
        {error.digest && (
          <p className="text-xs text-white/30 mb-8 font-mono">
            {error.digest}
          </p>
        )}
        <button onClick={reset} className="btn-accent">
          Попробовать снова
        </button>
      </div>
    </main>
  );
}
