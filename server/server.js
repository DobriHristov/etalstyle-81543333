import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "20kb" }));

// Rate limit: max 5 submissions / 10 min per IP
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many requests, please try again later." },
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: String(process.env.SMTP_SECURE) === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
   tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify().then(
  () => console.log("✓ SMTP ready"),
  (err) => console.error("✗ SMTP error:", err.message)
);

const escape = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/api/send", limiter, async (req, res) => {
  try {
    const { name, email, phone, material, message, website } = req.body || {};

    // Honeypot — bots fill hidden fields
    if (website) return res.json({ ok: true });

    if (!name || !email || !message)
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    if (!isEmail(email))
      return res.status(400).json({ ok: false, error: "Invalid email" });
    if (name.length > 120 || message.length > 5000)
      return res.status(400).json({ ok: false, error: "Field too long" });

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#121212;color:#F0EAE1;padding:32px;border-left:6px solid #D67A1A">
        <h2 style="color:#D67A1A;margin:0 0 24px;text-transform:uppercase;letter-spacing:2px">New CNC Inquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#9a9088;width:120px">Name:</td><td style="padding:8px 0"><strong>${escape(name)}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#9a9088">Email:</td><td style="padding:8px 0"><a href="mailto:${escape(email)}" style="color:#D67A1A">${escape(email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#9a9088">Phone:</td><td style="padding:8px 0">${escape(phone || "—")}</td></tr>
          <tr><td style="padding:8px 0;color:#9a9088">Material:</td><td style="padding:8px 0">${escape(material || "—")}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #2a2a2a;margin:24px 0"/>
        <p style="color:#9a9088;margin:0 0 8px;text-transform:uppercase;font-size:12px;letter-spacing:1px">Message:</p>
        <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escape(message)}</p>
      </div>`;

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || "Website"}" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `🔔 CNC Inquiry — ${name}`,
      html,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nMaterial: ${material || "-"}\n\n${message}`,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("✗ Send error:", err?.message, err?.code, err?.response);
    res.status(500).json({ ok: false, error: err?.message || "Failed to send" });
  }
});

app.listen(PORT, () => console.log(`✓ Email server running on http://localhost:${PORT}`));
