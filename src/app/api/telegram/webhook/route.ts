import { NextRequest, NextResponse } from "next/server";
import { handleBotUpdate } from "@/lib/telegram-bot";
import logger from "@/lib/logger";

/**
 * POST /api/telegram/webhook
 *
 * Принимает обновления от Telegram Bot API.
 * Установка webhook: POST https://api.telegram.org/bot{TOKEN}/setWebhook
 *   body: { url: "https://your-domain.com/api/telegram/webhook" }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await handleBotUpdate(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Telegram webhook error");
    return NextResponse.json({ ok: true }); // Всегда 200, чтобы Telegram не повторял
  }
}

/**
 * GET /api/telegram/webhook — проверка статуса webhook'а.
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Telegram webhook endpoint is active",
  });
}
