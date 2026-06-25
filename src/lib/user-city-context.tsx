"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const CITY_STORAGE_KEY = "user_city";

interface UserCityContextValue {
  city: string | null;
  lat: number | null;
  lon: number | null;
  loading: boolean;
}

const UserCityContext = createContext<UserCityContextValue>({
  city: null,
  lat: null,
  lon: null,
  loading: true,
});

// session-флаг — один fetch на всю сессию, даже если layout перемонтируется (dev HMR)
let geoDone = false;

export function UserCityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Кэш из localStorage для мгновенного показа
    try {
      const cached = localStorage.getItem(CITY_STORAGE_KEY);
      if (cached) {
        setCity(cached);
      }
    } catch { /* */ }

    // Один запрос на сессию — дедупликация при ремаунтах
    if (!geoDone) {
      geoDone = true;
      fetch("/api/geo/city")
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return;
          if (data?.city) {
            setCity(data.city);
            setLat(data.lat ?? null);
            setLon(data.lon ?? null);
            try { localStorage.setItem(CITY_STORAGE_KEY, data.city); } catch { /* */ }
          }
        })
        .catch(() => { /* */ })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => { cancelled = true; };
  }, []);

  return (
    <UserCityContext.Provider value={{ city, lat, lon, loading }}>
      {children}
    </UserCityContext.Provider>
  );
}

export function useUserCity() {
  return useContext(UserCityContext);
}
