import { NextRequest, NextResponse } from "next/server";

/**
 * Прокси-рут для определения города по IP.
 * Вызывает dadata.ru, ключ хранится только на сервере.
 */
export async function GET(req: NextRequest) {
  const token = process.env.DADATA_API_KEY;
  if (!token) {
    return NextResponse.json({ city: null, lat: null, lon: null, ip: null }, { status: 200 });
  }

  // IP клиента: на Vercel пробрасывается через x-forwarded-for.
  // На localhost заголовка нет — пропускаем гео.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!ip) {
    return NextResponse.json({ city: null, lat: null, lon: null, ip: null }, { status: 200 });
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
  } catch {
    // dadata недоступен — возвращаем null
    return NextResponse.json({ city: null, lat: null, lon: null, ip }, { status: 200 });
  }
}
