import { NextRequest, NextResponse } from "next/server";
import { sendLead } from "@/lib/mail";
import { sendLeadToTelegram } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message, city } = body;

    // Валидация
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
    }
    if (!phone || phone.length < 5) {
      return NextResponse.json({ error: "Укажите телефон" }, { status: 400 });
    }
    if (message && message.length < 5) {
      return NextResponse.json({ error: "Сообщение слишком короткое" }, { status: 400 });
    }

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
      throw new Error("Both SMTP and Telegram failed");
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
