import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";
import logger from "@/lib/logger";

/**
 * Прокси-рут для определения города по IP.
 * Вызывает dadata.ru, ключ хранится только на сервере.
 */
export async function GET(req: NextRequest) {
  // IP клиента: на Vercel пробрасывается через x-forwarded-for.
  // На localhost заголовка нет — пропускаем гео.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;

  if (!ip) {
    return NextResponse.json({ city: null, lat: null, lon: null, ip: null }, { status: 200 });
  }

  // Rate limiting by IP — 30 req/min (client calls on page load)
  const rl = checkRateLimit(`geo:${ip}`, 30, 60_000);
  if (!rl.allowed) {
    logger.warn({ ip }, "Geo rate limit hit");
    return rateLimitResponse(rl, "Слишком много запросов. Попробуйте позже.");
  }

  const token = process.env.DADATA_API_KEY;
  if (!token) {
    return NextResponse.json({ city: null, lat: null, lon: null, ip }, { status: 200 });
  }

  try {
    const res = await fetch(
      `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}`,
      {
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
        },
      }
    );
    const body = await res.json();
    const data = body?.location?.data;

    const city = data?.city ?? null;
    const lat = data?.geo_lat ? parseFloat(data.geo_lat) : null;
    const lon = data?.geo_lon ? parseFloat(data.geo_lon) : null;

    return NextResponse.json({ city, lat, lon, ip });
  } catch (err) {
    logger.warn({ err }, "DaData geolocation unavailable");
    return NextResponse.json({ city: null, lat: null, lon: null, ip }, { status: 200 });
  }
}
