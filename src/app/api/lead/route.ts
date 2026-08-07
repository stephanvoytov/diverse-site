import { NextRequest, NextResponse } from "next/server";
import { sendLead } from "@/lib/mail";
import { sendLeadToTelegram } from "@/lib/telegram";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { saveLead, ensureSchema } from "@/lib/turso";
import logger from "@/lib/logger";

// Инициализация схемы при первом запросе
let schemaReady = false;

export async function POST(req: NextRequest) {
  try {
    // Origin / Referer check (CSRF-защита)
    const origin = req.headers.get("origin") || "";
    const referer = req.headers.get("referer") || "";
    const allowedOrigins = [
      "https://diversebrand.ru",
      "https://www.diversebrand.ru",
      "https://diversebrand.vercel.app",
      "http://localhost:3000",
    ];
    const allowed = allowedOrigins.some(
      (a) => origin.startsWith(a) || referer.startsWith(a)
    );
    if (origin && !allowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Rate limiting by IP (forwarded for or fallback)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rl = checkRateLimit(ip, 5, 60_000);
    if (!rl.allowed) {
      return rateLimitResponse(rl);
    }

    const body = await req.json();
    const { name, phone, email, message, city, format, source, timezone } = body;

    // Валидация
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
    }
    if (!phone || phone.length < 5) {
      return NextResponse.json({ error: "Укажите телефон" }, { status: 400 });
    }
    // message — опциональное поле, проверка не требуется

    // Единый формат сообщения: API сам собирает строку из полей
    const isCallback = source === "callback" || message === "Обратный звонок";
    const leadMessage = isCallback
      ? "Обратный звонок"
      : [format ? `Формат: ${format}` : "", city ? `Город: ${city}` : "", message || ""]
          .filter(Boolean)
          .join(". ") || "Нужна консультация";

    const leadData = {
      name,
      phone,
      email: email || null,
      message: leadMessage,
      city: city || null,
      source: source || "form",
    };

    // ─── 1. Сохраняем в Turso (гарантированно) ───
    if (!schemaReady) {
      await ensureSchema();
      schemaReady = true;
    }

    let savedLead;
    try {
      savedLead = await saveLead(leadData);
      logger.info({ leadId: savedLead.id }, "Lead saved to Turso");
    } catch (dbErr) {
      // Если Turso упал — логируем, но не блокируем отправку
      logger.error({ err: dbErr }, "Turso save failed, continuing with notifications");
    }

    // ─── 2. Уведомления параллельно (Telegram + SMTP) ───
    const notificationData = {
      name,
      phone,
      email,
      message: leadData.message,
      city,
      source: leadData.source,
      leadId: savedLead?.id,
      timezone: typeof timezone === "string" && timezone.length <= 64 ? timezone : undefined,
    };    const [smtpRes, tgRes] = await Promise.allSettled([
      sendLead(notificationData),
      sendLeadToTelegram(notificationData),
    ]);

    const smtpOk = smtpRes.status === "fulfilled";
    const tgOk = tgRes.status === "fulfilled";

    if (!smtpOk) {
      logger.warn({ err: (smtpRes as PromiseRejectedResult).reason }, "SMTP error");
    }
    if (!tgOk) {
      logger.warn({ err: (tgRes as PromiseRejectedResult).reason }, "Telegram error");
    }

    // ─── 3. Результат ───
    // Лид сохранён = успех, даже если уведомления упали
    if (savedLead) {
      return NextResponse.json({
        ok: true,
        leadId: savedLead.id,
        notifications: { smtp: smtpOk, telegram: tgOk },
      });
    }

    // Turso упал, но уведомления ушли — тоже ок
    if (smtpOk || tgOk) {
      return NextResponse.json({
        ok: true,
        notifications: { smtp: smtpOk, telegram: tgOk },
        warning: "Lead not persisted (database unavailable)",
      });
    }

    // Всё упало
    logger.error("All channels failed: Turso, SMTP, Telegram");
    return NextResponse.json(
      { error: "Ошибка отправки. Попробуйте позже." },
      { status: 500 }
    );
  } catch (err) {
    logger.error({ err }, "Lead API error");
    return NextResponse.json(
      { error: "Ошибка отправки. Попробуйте позже." },
      { status: 500 }
    );
  }
}
