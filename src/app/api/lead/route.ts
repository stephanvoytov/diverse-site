import { NextRequest, NextResponse } from "next/server";
import { sendLead } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, message } = body;

    // Валидация
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
    }
    if (!phone || phone.length < 5) {
      return NextResponse.json({ error: "Укажите телефон" }, { status: 400 });
    }
    if (!message || message.length < 5) {
      return NextResponse.json({ error: "Напишите сообщение" }, { status: 400 });
    }

    await sendLead({ name, phone, email, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { error: "Ошибка отправки. Попробуйте позже." },
      { status: 500 }
    );
  }
}
