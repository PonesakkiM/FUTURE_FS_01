const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ── Validation ────────────────────────────────────────────────────────────────
function validate({ name, email, subject, message }) {
  if (!name    || name.trim().length    < 2)  return 'Name must be at least 2 characters.';
  if (!email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address.';
  if (!subject || subject.trim().length < 3)  return 'Subject must be at least 3 characters.';
  if (!message || message.trim().length < 10) return 'Message must be at least 10 characters.';
  return null;
}

// ── Transporter ───────────────────────────────────────────────────────────────
function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const err = validate({ name, email, subject, message });
  if (err) return res.status(400).json({ success: false, error: err });

  const now       = new Date();
  const timeStr   = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });

  try {
    const transporter = createTransporter();

    // ── 1. NOTIFICATION EMAIL TO YOU (with alert styling) ──────────────────
    await transporter.sendMail({
      from:    `"Portfolio Alert 🔔" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_USER,
      replyTo: `"${name}" <${email}>`,          // ← reply goes directly to sender
      subject: `🔔 NEW MESSAGE from ${name} — "${subject}"`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Alert Banner -->
  <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 32px;text-align:center;">
    <div style="font-size:36px;margin-bottom:8px;">🔔</div>
    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;letter-spacing:0.5px;">
      New Message on Your Portfolio!
    </h1>
    <p style="color:#c7d2fe;margin:6px 0 0;font-size:14px;">${timeStr} (IST)</p>
  </div>

  <!-- Card -->
  <div style="max-width:600px;margin:24px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(79,70,229,0.12);">

    <!-- Sender Info -->
    <div style="padding:28px 32px 0;">
      <h2 style="margin:0 0 20px;color:#1e1b4b;font-size:18px;">📋 Sender Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid #e8eaf6;">
          <td style="padding:12px 0;color:#6b7280;font-size:13px;width:90px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Name</td>
          <td style="padding:12px 0;color:#1e1b4b;font-size:15px;font-weight:700;">${name}</td>
        </tr>
        <tr style="border-bottom:1px solid #e8eaf6;">
          <td style="padding:12px 0;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
          <td style="padding:12px 0;">
            <a href="mailto:${email}" style="color:#4f46e5;font-size:15px;font-weight:600;text-decoration:none;">${email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#6b7280;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Subject</td>
          <td style="padding:12px 0;color:#1e1b4b;font-size:15px;font-weight:600;">${subject}</td>
        </tr>
      </table>
    </div>

    <!-- Message Body -->
    <div style="padding:24px 32px;">
      <h2 style="margin:0 0 12px;color:#1e1b4b;font-size:18px;">💬 Message</h2>
      <div style="background:#f5f3ff;border-left:4px solid #4f46e5;border-radius:8px;padding:20px 24px;">
        <p style="margin:0;color:#374151;font-size:15px;line-height:1.8;white-space:pre-wrap;">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
      </div>
    </div>

    <!-- Reply Button -->
    <div style="padding:0 32px 28px;text-align:center;">
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
         style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;
                text-decoration:none;padding:14px 36px;border-radius:50px;font-size:15px;
                font-weight:700;letter-spacing:0.5px;box-shadow:0 4px 16px rgba(79,70,229,0.35);">
        ↩️ Reply to ${name}
      </a>
    </div>

    <!-- Footer -->
    <div style="background:#f5f3ff;padding:16px 32px;text-align:center;border-top:1px solid #e8eaf6;">
      <p style="margin:0;color:#9ca3af;font-size:12px;">
        📌 Sent from <strong style="color:#4f46e5;">Ponesakki M's Portfolio</strong> contact form
      </p>
    </div>
  </div>

</body>
</html>
      `,
    });

    // ── 2. AUTO-REPLY TO SENDER ────────────────────────────────────────────
    await transporter.sendMail({
      from:    `"Ponesakki M" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: `✅ Got your message, ${name}! I'll get back to you soon.`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f0f4ff;font-family:'Segoe UI',Arial,sans-serif;">

  <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px 32px;text-align:center;">
    <div style="font-size:36px;margin-bottom:8px;">✅</div>
    <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;">Message Received!</h1>
  </div>

  <div style="max-width:600px;margin:24px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(79,70,229,0.12);">
    <div style="padding:32px;">
      <h2 style="color:#1e1b4b;margin:0 0 16px;">Hi ${name}! 👋</h2>
      <p style="color:#4b5563;line-height:1.8;margin:0 0 20px;">
        Thanks for reaching out through my portfolio! I've received your message and will
        get back to you as soon as possible — usually within <strong>24–48 hours</strong>.
      </p>

      <div style="background:#f5f3ff;border-left:4px solid #4f46e5;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
        <p style="margin:0 0 8px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Your message:</p>
        <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</p>
      </div>

      <p style="color:#4b5563;line-height:1.8;margin:0 0 24px;">
        In the meantime, feel free to check out my work on
        <a href="https://github.com/PonesakkiM" style="color:#4f46e5;font-weight:600;">GitHub</a> or connect on
        <a href="https://www.linkedin.com/in/ponesakki-m" style="color:#4f46e5;font-weight:600;">LinkedIn</a>.
      </p>

      <p style="color:#4b5563;margin:0;">
        Best regards,<br/>
        <strong style="color:#1e1b4b;font-size:16px;">Ponesakki M</strong>
      </p>
    </div>
  </div>

</body>
</html>
      `,
    });

    console.log(`✅ Contact email sent — From: ${name} <${email}> | Subject: ${subject}`);
    res.json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('❌ Email error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
