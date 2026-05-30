import nodemailer from "nodemailer";

const escape = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

// Rate limiting state (in-memory, resets on cold start)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimit.get(ip);
  
  if (!record || now - record.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { firstRequest: now, count: 1 });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "unknown";
    
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ ok: false, error: "Too many requests, please try again later." });
    }

    const { name, email, phone, material, message, website } = req.body || {};

    // Honeypot - bots fill hidden fields
    if (website) {
      return res.json({ ok: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }
    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }
    if (name.length > 120 || message.length > 5000) {
      return res.status(400).json({ ok: false, error: "Field too long" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: String(process.env.SMTP_SECURE) === "true",
      auth: { 
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS 
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#121212;color:#F0EAE1;padding:32px;border-left:6px solid #D67A1A;border-bottom:6px solid #D67A1A">
        <h2 style="color:#D67A1A;margin:0 0 24px;text-transform:uppercase;letter-spacing:2px">Запитване за CNC Router</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#9a9088;width:120px">Име:</td><td style="padding:8px 0"><strong>${escape(name)}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#9a9088">Имейл:</td><td style="padding:8px 0"><a href="mailto:${escape(email)}" style="color:#D67A1A">${escape(email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#9a9088">Телефон:</td><td style="padding:8px 0">${escape(phone || "—")}</td></tr>
          <tr><td style="padding:8px 0;color:#9a9088">Материал:</td><td style="padding:8px 0">${escape(material || "—")}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #2a2a2a;margin:24px 0"/>
        <p style="color:#9a9088;margin:0 0 8px;text-transform:uppercase;font-size:12px;letter-spacing:1px">Съобщение:</p>
        <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escape(message)}</p>
      </div>`;

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || "Etalstyle Website"}" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Etalstyle Запитване — ${name}`,
      html,
      text: `Име: ${name}\nИмейл: ${email}\nТелефон: ${phone || "-"}\nМатериал: ${material || "-"}\n\n${message}`,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("Send error:", err?.message, err?.code);
    return res.status(500).json({ ok: false, error: err?.message || "Failed to send" });
  }
}
