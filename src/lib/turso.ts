/**
 * Turso (libSQL) клиент для хранения лидов.
 *
 * Схема создаётся автоматически при первом подключении.
 */

import { createClient, type Client } from "@libsql/client";

let _client: Client | null = null;

export function getTurso(): Client {
  if (_client) return _client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL is not set");
  }

  _client = createClient({
    url,
    authToken: authToken || undefined,
  });

  return _client;
}

/**
 * Тип записи лида в базе.
 */
export interface LeadRecord {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  city: string | null;
  source: string; // "form" | "callback" | "franchise"
  created_at: string; // ISO 8601
}

/**
 * Инициализация схемы (idempotent).
 */
export async function ensureSchema(): Promise<void> {
  const db = getTurso();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      message TEXT NOT NULL DEFAULT '',
      city TEXT,
      source TEXT NOT NULL DEFAULT 'form',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Индексы для частых запросов
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at)
  `);
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_leads_city ON leads(city)
  `);
  await db.execute(`
    CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source)
  `);
}

/**
 * Сохранить лид в базу.
 */
export async function saveLead(lead: Omit<LeadRecord, "id" | "created_at">): Promise<LeadRecord> {
  const db = getTurso();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await db.execute({
    sql: `INSERT INTO leads (id, name, phone, email, message, city, source, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [id, lead.name, lead.phone, lead.email ?? null, lead.message, lead.city ?? null, lead.source, now],
  });

  return { id, ...lead, email: lead.email ?? null, city: lead.city ?? null, created_at: now };
}

/**
 * Получить последние N лидов.
 */
export async function getRecentLeads(limit: number = 10): Promise<LeadRecord[]> {
  const db = getTurso();
  const result = await db.execute({
    sql: `SELECT * FROM leads ORDER BY created_at DESC LIMIT ?`,
    args: [limit],
  });
  return result.rows as unknown as LeadRecord[];
}

/**
 * Статистика за период.
 */
export interface LeadStats {
  total: number;
  byCity: Array<{ city: string; count: number }>;
  bySource: Array<{ source: string; count: number }>;
  byDay: Array<{ date: string; count: number }>;
}

export async function getLeadStats(
  startDate?: string,
  endDate?: string
): Promise<LeadStats> {
  const db = getTurso();

  const dateFilter = startDate && endDate
    ? `WHERE created_at >= ? AND created_at <= ?`
    : "";
  const args = startDate && endDate ? [startDate, endDate] : [];

  // Total
  const totalResult = await db.execute({
    sql: `SELECT COUNT(*) as total FROM leads ${dateFilter}`,
    args,
  });
  const total = Number(totalResult.rows[0]?.total ?? 0);

  // By city
  const cityResult = await db.execute({
    sql: `SELECT COALESCE(city, 'Неизвестно') as city, COUNT(*) as count
          FROM leads ${dateFilter}
          GROUP BY city ORDER BY count DESC LIMIT 10`,
    args,
  });
  const byCity = cityResult.rows.map((r) => ({
    city: String(r.city),
    count: Number(r.count),
  }));

  // By source
  const sourceResult = await db.execute({
    sql: `SELECT source, COUNT(*) as count
          FROM leads ${dateFilter}
          GROUP BY source ORDER BY count DESC`,
    args,
  });
  const bySource = sourceResult.rows.map((r) => ({
    source: String(r.source),
    count: Number(r.count),
  }));

  // By day (last 30 days or within date range)
  const dayResult = await db.execute({
    sql: `SELECT date(created_at) as date, COUNT(*) as count
          FROM leads ${dateFilter}
          GROUP BY date(created_at) ORDER BY date DESC LIMIT 30`,
    args,
  });
  const byDay = dayResult.rows.map((r) => ({
    date: String(r.date),
    count: Number(r.count),
  }));

  return { total, byCity, bySource, byDay };
}

/**
 * Экспорт лидов в CSV.
 */
export async function exportLeadsCsv(
  startDate?: string,
  endDate?: string
): Promise<string> {
  const db = getTurso();

  const dateFilter = startDate && endDate
    ? `WHERE created_at >= ? AND created_at <= ?`
    : "";
  const args = startDate && endDate ? [startDate, endDate] : [];

  const result = await db.execute({
    sql: `SELECT id, name, phone, email, message, city, source, created_at
          FROM leads ${dateFilter}
          ORDER BY created_at DESC`,
    args,
  });

  const header = "ID,Имя,Телефон,Email,Сообщение,Город,Источник,Дата\n";
  const rows = result.rows.map((r) => {
    const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    return [
      escape(r.id),
      escape(r.name),
      escape(r.phone),
      escape(r.email),
      escape(r.message),
      escape(r.city),
      escape(r.source),
      escape(r.created_at),
    ].join(",");
  });

  return header + rows.join("\n");
}
