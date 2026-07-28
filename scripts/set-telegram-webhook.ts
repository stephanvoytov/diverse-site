/**
 * Скрипт установки Telegram webhook.
 *
 * Берёт URL сайта из NEXT_PUBLIC_SITE_URL (или fallback на diversebrand.vercel.app).
 * Запуск: npx tsx scripts/set-telegram-webhook.ts
 */

import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Загружаем .env.local (как Next.js)
config({ path: resolve(__dirname, "../.env.local") });

const TELEGRAM_API = "https://api.telegram.org";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://diversebrand.vercel.app";

async function main() {
  const webhookUrl = `${SITE_URL}/api/telegram/webhook`;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("TELEGRAM_BOT_TOKEN is not set");
    process.exit(1);
  }

  console.log(`Setting webhook to: ${webhookUrl}`);

  const res = await fetch(`${TELEGRAM_API}/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url: webhookUrl,
      allowed_updates: ["message"],
    }),
  });

  const data = await res.json();
  if (data.ok) {
    console.log("✅ Webhook set successfully!");
    console.log(`   URL: ${webhookUrl}`);
  } else {
    console.error("❌ Failed to set webhook:", data);
    process.exit(1);
  }

  // Проверяем статус
  const statusRes = await fetch(`${TELEGRAM_API}/bot${token}/getWebhookInfo`);
  const status = await statusRes.json();
  if (status.ok) {
    console.log("\nWebhook info:");
    console.log(`  URL: ${status.result.url}`);
    console.log(`  Pending updates: ${status.result.pending_update_count}`);
    if (status.result.last_error_date) {
      console.log(`  Last error: ${status.result.last_error_message}`);
    }
  }
}

main().catch(console.error);
