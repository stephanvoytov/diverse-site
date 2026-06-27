"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

const GEO_STORAGE_KEY = "user_geo";

interface GeoCache {
  city: string;
  lat: number | null;
  lon: number | null;
}

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

function readGeoCache(): GeoCache | null {
  try {
    const raw = localStorage.getItem(GEO_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GeoCache;
  } catch {
    return null;
  }
}

function writeGeoCache(city: string, lat: number | null, lon: number | null) {
  try {
    localStorage.setItem(GEO_STORAGE_KEY, JSON.stringify({ city, lat, lon }));
  } catch { /* */ }
}

export function UserCityProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // Кэш из localStorage для мгновенного показа
    const cached = readGeoCache();
    if (cached) {
      setCity(cached.city);
      if (cached.lat) setLat(cached.lat);
      if (cached.lon) setLon(cached.lon);
    }

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
            writeGeoCache(data.city, data.lat ?? null, data.lon ?? null);
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
