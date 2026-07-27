import { NextRequest, NextResponse } from "next/server";
import {
  ensureSchema,
  getRecentLeads,
  getLeadStats,
  exportLeadsCsv,
} from "@/lib/turso";
import logger from "@/lib/logger";

// Простая защита: только бот может обращаться к этому API
function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) return false;
  // Bearer token = TELEGRAM_BOT_TOKEN
  return authHeader === `Bearer ${botToken}`;
}

/**
 * GET /api/leads
 *
 * Query params:
 *   - action: "list" | "stats" | "export" (default: "list")
 *   - period: "today" | "week" | "month" | "all" (default: "week")
 *   - city: фильтр по городу (только для stats)
 *   - limit: количество лидов (только для list, default: 10)
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureSchema();

    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "list";
    const period = searchParams.get("period") || "week";

    // Вычисляем даты
    const now = new Date();
    let startDate: string | undefined;
    let endDate: string | undefined;

    switch (period) {
      case "today": {
        const today = now.toISOString().split("T")[0];
        startDate = `${today}T00:00:00.000Z`;
        endDate = `${today}T23:59:59.999Z`;
        break;
      }
      case "week": {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        startDate = weekAgo.toISOString();
        endDate = now.toISOString();
        break;
      }
      case "month": {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        startDate = monthAgo.toISOString();
        endDate = now.toISOString();
        break;
      }
      case "all":
      default:
        // Без фильтра по дате
        break;
    }

    switch (action) {
      case "stats": {
        const stats = await getLeadStats(startDate, endDate);
        return NextResponse.json({ ok: true, period, stats });
      }

      case "export": {
        const csv = await exportLeadsCsv(startDate, endDate);
        return new NextResponse(csv, {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="leads-${period}.csv"`,
          },
        });
      }

      case "list":
      default: {
        const limit = Math.min(Number(searchParams.get("limit")) || 10, 50);
        const leads = await getRecentLeads(limit);
        return NextResponse.json({ ok: true, leads });
      }
    }
  } catch (err) {
    logger.error({ err }, "Leads API error");
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
