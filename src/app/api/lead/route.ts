import { NextRequest, NextResponse } from "next/server";
import { sendLead } from "@/lib/mail";
import { sendLeadToTelegram } from "@/lib/telegram";
import { checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";
import logger from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
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
    const { name, phone, email, message, city } = body;

    // Валидация
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
    }
    if (!phone || phone.length < 5) {
      return NextResponse.json({ error: "Укажите телефон" }, { status: 400 });
    }
    // message — опциональное поле, проверка не требуется

    const lead = { name, phone, email, message: message ?? "Нужна консультация", city };

    // Дублируем на оба канала одновременно
    const [smtpRes, tgRes] = await Promise.allSettled([
      sendLead(lead),
      sendLeadToTelegram(lead),
    ]);

    const smtpOk = smtpRes.status === "fulfilled";
    const tgOk = tgRes.status === "fulfilled";

    if (!smtpOk) {
      logger.warn({ err: (smtpRes as PromiseRejectedResult).reason }, "SMTP error");
    }
    if (!tgOk) {
      logger.warn({ err: (tgRes as PromiseRejectedResult).reason }, "Telegram error");
    }

    if (!smtpOk && !tgOk) {
      logger.error("Both SMTP and Telegram failed");
      return NextResponse.json(
        { error: "Ошибка отправки. Каналы недоступны." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Lead API error");
    return NextResponse.json(
      { error: "Ошибка отправки. Попробуйте позже." },
      { status: 500 }
    );
  }
}
