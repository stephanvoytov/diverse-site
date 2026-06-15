import { NextRequest, NextResponse } from "next/server";

/**
 * Прокси-рут для определения города по IP.
 * Вызывает dadata.ru, ключ хранится только на сервере.
 */
export async function GET(req: NextRequest) {
  const token = process.env.DADATA_API_KEY;
  if (!token) {
    return NextResponse.json({ city: null }, { status: 200 });
  }

  // IP клиента (X-Forwarded-For или реальный remote)
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "178.248.238.0";

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

    const city = body?.location?.data?.city ?? null;

    return NextResponse.json({ city });
  } catch {
    // dadata недоступен — возвращаем null
    return NextResponse.json({ city: null }, { status: 200 });
  }
}
