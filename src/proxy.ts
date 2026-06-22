import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Разрешённые origin-ы для CORS.
 * Совпадает по смыслу с SITE.url из site.ts, но дублируется здесь,
 * чтобы middleware оставался изолированным от остального кода.
 */
const ALLOWED_ORIGINS = [
  "https://diversebrand.ru",
  "https://diversebrand.vercel.app",
  "https://www.diversebrand.ru",
  "http://localhost:3000",
];

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const allowed = ALLOWED_ORIGINS.includes(origin);

  // ---- CORS для API-маршрутов ----
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Если origin разрешён — устанавливаем Access-Control-Allow-Origin
    if (allowed) {
      const corsHeaders: Record<string, string> = {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      };

      // Preflight (OPTIONS) — отвечаем сразу, без выполнения роута
      if (request.method === "OPTIONS") {
        return new NextResponse(null, { status: 204, headers: corsHeaders });
      }

      // Обычный запрос — добавляем CORS-заголовки к ответу
      const response = NextResponse.next();
      for (const [key, value] of Object.entries(corsHeaders)) {
        response.headers.set(key, value);
      }
      setSecurityHeaders(response);
      return response;
    }

    // Неизвестный origin — не пропускаем
    if (origin && !allowed) {
      return new NextResponse(null, { status: 403 });
    }
  }

  // ---- Не-API запросы ----
  const response = NextResponse.next();
  setSecurityHeaders(response);
  return response;
}

/** Общие security-заголовки для всех ответов. */
function setSecurityHeaders(response: NextResponse): void {
  response.headers.set(
    "Permissions-Policy",
    [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "magnetometer=()",
      "accelerometer=()",
      "gyroscope=()",
      "midi=()",
      "sync-xhr=()",
      "xr-spatial-tracking=()",
      "interest-cohort=()",
    ].join(", "),
  );

  // Server-заголовок маскируем («Vercel» без номера версии).
  // На Vercel это значение устанавливается инфраструктурой Vercel и не перебивается.
  // Для self-hosted окружений — заглушка.
  response.headers.set("Server", "Vercel");
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)"],
};
