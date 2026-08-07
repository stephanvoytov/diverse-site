"use client";

import { useState, useCallback } from "react";
import { queueLead, flushQueue } from "@/lib/lead-queue";

export type SubmitStatus = "idle" | "sending" | "success" | "error";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  /** Предположительный город (из dadata) */
  city?: string;
  /** ID формата из FORMAT_OPTIONS */
  format?: string;
  /** Свободный текст (комментарий) */
  message?: string;
  /** Источник: "form" | "callback" | "franchise" */
  source?: string;
}

/**
 * Единая логика отправки заявки: POST /api/lead → офлайн-очередь при ошибке → flush.
 * Все формы сайта используют этот хук.
 */
export function useLeadSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const submit = useCallback(async (payload: LeadPayload): Promise<boolean> => {
    setStatus("sending");
    try {
      const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/lead";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      // Доставка накопленных офлайн-заявок (не блокирует UI)
      void flushQueue(endpoint);
      return true;
    } catch {
      // Сохраняем лид локально, чтобы не потерять при ошибке сети/сервера
      queueLead({
        name: payload.name,
        phone: payload.phone,
        message: payload.message || "Нужна консультация",
        createdAt: Date.now(),
      });
      setStatus("error");
      return false;
    }
  }, []);

  const reset = useCallback(() => setStatus("idle"), []);

  return {
    submit,
    reset,
    status,
    isSubmitting: status === "sending",
  };
}