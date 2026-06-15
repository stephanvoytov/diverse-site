import { NextRequest, NextResponse } from "next/server";
import { sendLead } from "@/lib/mail";
import { sendLeadToTelegram } from "@/lib/telegram";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    // Rate limiting by IP (forwarded for or fallback)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip, 5, 60_000)) {
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуйте через минуту." },
        { status: 429 },
      );
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

    if (!smtpOk) console.warn("SMTP error:", (smtpRes as PromiseRejectedResult).reason);
    if (!tgOk) console.warn("Telegram error:", (tgRes as PromiseRejectedResult).reason);

    if (!smtpOk && !tgOk) {
      console.error("Both SMTP and Telegram failed");
      return NextResponse.json(
        { error: "Ошибка отправки. Каналы недоступны." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { error: "Ошибка отправки. Попробуйте позже." },
      { status: 500 }
    );
  }
}
