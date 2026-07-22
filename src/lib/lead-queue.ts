const QUEUE_KEY = "lead_queue";

interface QueuedLead {
  id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: number;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Сохранить лид в очередь (при ошибке отправки) */
export function queueLead(data: Omit<QueuedLead, "id">): void {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    const queue: QueuedLead[] = raw ? JSON.parse(raw) : [];
    queue.push({ ...data, id: generateId() });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // localStorage недоступен — тихо падаем
  }
}

/** Получить все неотправленные лиды */
export function getQueuedLeads(): QueuedLead[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Очистить отосланные лиды из очереди по id */
export function clearQueuedLeads(ids: string[]): void {
  try {
    const queue = getQueuedLeads();
    const idSet = new Set(ids);
    const remaining = queue.filter((lead) => !idSet.has(lead.id));
    if (remaining.length === 0) {
      localStorage.removeItem(QUEUE_KEY);
    } else {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
    }
  } catch {
    // тихо падаем
  }
}

/** Попытаться отправить все накопившиеся лиды (параллельно) */
export async function flushQueue(endpoint: string): Promise<{ sent: number; failed: number }> {
  const queue = getQueuedLeads();
  if (queue.length === 0) return { sent: 0, failed: 0 };

  const sentIds: string[] = [];
  let failed = 0;

  const results = await Promise.allSettled(
    queue.map((lead) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).then((res) => {
        if (res.ok) {
          sentIds.push(lead.id);
        } else {
          failed++;
        }
      }).catch(() => {
        failed++;
      })
    )
  );

  // Считаем упавшие промисы как ошибки
  for (const r of results) {
    if (r.status === "rejected") failed++;
  }

  if (sentIds.length > 0) {
    clearQueuedLeads(sentIds);
  }

  return { sent: sentIds.length, failed };
}
