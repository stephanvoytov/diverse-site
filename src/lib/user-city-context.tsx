"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const CITY_STORAGE_KEY = "user_city";

interface UserCityContextValue {
  /** Название города пользователя (по-русски, определено через dadata) */
  city: string | null;
  /** True пока идёт определение */
  loading: boolean;
}

const UserCityContext = createContext<UserCityContextValue>({
  city: null,
  loading: true,
});

export function UserCityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Сначала показываем кэшированный город (быстрый рендер)
    try {
      const cached = localStorage.getItem(CITY_STORAGE_KEY);
      if (cached) {
        setCity(cached);
      }
    } catch {
      // localStorage недоступен — игнорируем
    }

    // Всегда свежий запрос к DaData (перезатрёт кэш, если он устарел)
    fetch("/api/geo/city")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.city) {
          setCity(data.city);
          try {
            localStorage.setItem(CITY_STORAGE_KEY, data.city);
          } catch {
            // тихо
          }
        }
      })
      .catch(() => {
        // dadata недоступен — просто без города
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <UserCityContext.Provider value={{ city, loading }}>
      {children}
    </UserCityContext.Provider>
  );
}

export function useUserCity() {
  return useContext(UserCityContext);
}
