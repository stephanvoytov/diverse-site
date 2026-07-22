import net from "node:net";
import tls from "node:tls";
import { escapeHtml } from "@/lib/html";
import { parseMessagePairs } from "@/lib/message-parser";

export interface LeadData {
  name: string;
  phone: string;
  email?: string;
  message: string;
  /** Предположительный город (из dadata) */
  city?: string;
}

function base64(s: string): string {
  return Buffer.from(s).toString("base64");
}

async function smtpSend(
  host: string,
  port: number,
  secure: boolean,
  user: string,
  pass: string,
  to: string,
  subject: string,
  html: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const lines: string[] = [];
    let step = 0;

    const from = user;

    const raw =
      `From: ${from}\r\n` +
      `To: ${to}\r\n` +
      `Subject: ${subject}\r\n` +
      `MIME-Version: 1.0\r\n` +
      `Content-Type: text/html; charset="utf-8"\r\n` +
      `Content-Transfer-Encoding: 8bit\r\n` +
      `\r\n` +
      `${html}`;

    const commands: (() => void)[] = [
      () => socket.write(`EHLO client\r\n`),
      () => socket.write(`AUTH LOGIN\r\n`),
      () => socket.write(`${base64(user)}\r\n`),
      () => socket.write(`${base64(pass)}\r\n`),
      () => socket.write(`MAIL FROM:<${from}>\r\n`),
      () => socket.write(`RCPT TO:<${to}>\r\n`),
      () => socket.write(`DATA\r\n`),
      () => socket.write(`${raw}\r\n.\r\n`),
      () => socket.write(`QUIT\r\n`),
    ];

    const socket = secure
      ? tls.connect(port, host, { rejectUnauthorized: false })
      : net.createConnection(port, host);

    socket.setTimeout(10000);

    socket.on("connect", () => {
      // wait for greeting
    });

    socket.on("data", (chunk) => {
      const reply = chunk.toString();
      lines.push(reply);

      if (reply.startsWith("220") || reply.startsWith("250") || reply.startsWith("235") || reply.startsWith("334") || reply.startsWith("354")) {
        step++;
        if (step <= commands.length) {
          commands[step - 1]();
        }
        if (step > commands.length) {
          socket.end();
          resolve();
        }
      } else if (reply.startsWith("5") || reply.startsWith("4")) {
        socket.destroy();
        reject(new Error(`SMTP error: ${reply}`));
      }
    });

    socket.on("error", reject);
    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("SMTP timeout"));
    });
  });
}

/**
 * Разбирает message в HTML для письма.
 *
 * "Формат: ... Город: ..." → строки в виде пар
 * Свободный текст           → просто текст
 */
function formatDetails(msg: string): string {
  if (!msg) return "";
  const pairs = parseMessagePairs(msg);
  if (pairs) {
    return pairs.map(([k, v]) => `${escapeHtml(k)}: ${escapeHtml(v)}`).join("<br>");
  }
  return escapeHtml(msg);
}

export async function sendLead(data: LeadData): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_TO } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    throw new Error("SMTP not configured");
  }

  const isCallback = data.message === "Обратный звонок";

  const subject = isCallback
    ? `📞 Обратный звонок — ${data.phone}`
    : `📩 Новая заявка — ${data.name} — ${data.phone}`;

  const detailsHtml = formatDetails(data.message);

  const html = `
    <table style="border-collapse:collapse;width:100%;max-width:480px;font-family:Arial,sans-serif;font-size:14px">
      ${isCallback ? `
        <tr><td style="padding:10px 0;color:#888">Тип</td><td style="padding:10px 0;font-weight:bold">📞 Обратный звонок</td></tr>
        ${data.city ? `<tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Город</td><td style="padding:10px 0;border-top:1px solid #eee;font-weight:bold">${escapeHtml(data.city)}</td></tr>` : ""}
        <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Телефон</td><td style="padding:10px 0;border-top:1px solid #eee;font-weight:bold">${data.phone}</td></tr>
      ` : `
        <tr><td style="padding:10px 0;color:#888">Имя</td><td style="padding:10px 0;font-weight:bold">${data.name}</td></tr>
        <tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Телефон</td><td style="padding:10px 0;border-top:1px solid #eee;font-weight:bold">${data.phone}</td></tr>
        ${data.email ? `<tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Email</td><td style="padding:10px 0;border-top:1px solid #eee;font-weight:bold">${data.email}</td></tr>` : ""}
        ${data.city ? `<tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888">Город (предп.)</td><td style="padding:10px 0;border-top:1px solid #eee;font-weight:bold">${escapeHtml(data.city)}</td></tr>` : ""}
        ${detailsHtml ? `<tr><td style="padding:10px 0;border-top:1px solid #eee;color:#888;vertical-align:top">Детали</td><td style="padding:10px 0;border-top:1px solid #eee">${detailsHtml}</td></tr>` : ""}
      `}
    </table>
    <p style="color:#aaa;font-size:12px;margin-top:20px">Отправлено с diversebrand.ru</p>
  `;

  await smtpSend(
    SMTP_HOST,
    Number(SMTP_PORT) || 465,
    SMTP_SECURE !== "false",
    SMTP_USER,
    SMTP_PASS,
    MAIL_TO,
    subject,
    html
  );
}
