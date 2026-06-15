const QUEUE_KEY = "lead_queue";

interface QueuedLead {
  name: string;
  phone: string;
  message: string;
  createdAt: number;
}

/** Сохранить лид в очередь (при ошибке отправки) */
export function queueLead(data: QueuedLead): void {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    const queue: QueuedLead[] = raw ? JSON.parse(raw) : [];
    queue.push(data);
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

/** Очистить отосланные лиды из очереди */
export function clearQueuedLeads(ids: number[]): void {
  try {
    const queue = getQueuedLeads();
    const remaining = queue.filter((_, i) => !ids.includes(i));
    if (remaining.length === 0) {
      localStorage.removeItem(QUEUE_KEY);
    } else {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
    }
  } catch {
    // тихо падаем
  }
}

/** Попытаться отправить все накопившиеся лиды */
export async function flushQueue(endpoint: string): Promise<{ sent: number; failed: number }> {
  const queue = getQueuedLeads();
  if (queue.length === 0) return { sent: 0, failed: 0 };

  let sent = 0;
  let failed = 0;
  const sentIndices: number[] = [];

  for (let i = 0; i < queue.length; i++) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(queue[i]),
      });
      if (res.ok) {
        sent++;
        sentIndices.push(i);
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
  }

  if (sentIndices.length > 0) {
    clearQueuedLeads(sentIndices);
  }

  return { sent, failed };
}
