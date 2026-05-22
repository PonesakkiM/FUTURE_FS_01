const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// Input validation helper
function validateContactInput({ name, email, subject, message }) {
  if (!name || typeof name !== 'string' || name.trim().length < 2) return 'Name must be at least 2 characters.';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address.';
  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) return 'Subject must be at least 3 characters.';
  if (!message || typeof message !== 'string' || message.trim().length < 10) return 'Message must be at least 10 characters.';
  return null;
}

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const validationError = validateContactInput({ name, email, subject, message });
  if (validationError) {
    return res.status(400).json({ success: false, error: validationError });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to portfolio owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f0ff; padding: 2rem; border-radius: 16px; border: 1px solid #222;">
          <h2 style="color: #4f8ef7; margin-bottom: 1.5rem;">📬 New Portfolio Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 0.5rem 0; color: #a0a0b8; width: 100px;">From:</td><td style="padding: 0.5rem 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 0.5rem 0; color: #a0a0b8;">Email:</td><td style="padding: 0.5rem 0;"><a href="mailto:${email}" style="color: #4f8ef7;">${email}</a></td></tr>
            <tr><td style="padding: 0.5rem 0; color: #a0a0b8;">Subject:</td><td style="padding: 0.5rem 0;">${subject}</td></tr>
          </table>
          <hr style="border: 1px solid #222; margin: 1.5rem 0;" />
          <h3 style="color: #a0a0b8; margin-bottom: 0.75rem;">Message:</h3>
          <p style="line-height: 1.7; color: #f0f0ff;">${message.replace(/\n/g, '<br>')}</p>
          <hr style="border: 1px solid #222; margin: 1.5rem 0;" />
          <p style="color: #606078; font-size: 0.8rem;">Sent from Ponesakki M's Portfolio Website</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Ponesakki M" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}! 👋`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f0ff; padding: 2rem; border-radius: 16px; border: 1px solid #222;">
          <h2 style="color: #4f8ef7;">Hi ${name}! 👋</h2>
          <p style="line-height: 1.7; color: #a0a0b8;">
            Thanks for reaching out through my portfolio! I've received your message and will get back to you as soon as possible — usually within 24–48 hours.
          </p>
          <div style="background: #16161f; border-radius: 12px; padding: 1.25rem; margin: 1.5rem 0; border: 1px solid #222;">
            <p style="color: #606078; font-size: 0.85rem; margin-bottom: 0.5rem;">Your message:</p>
            <p style="color: #f0f0ff; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #a0a0b8;">Best regards,<br/><strong style="color: #f0f0ff;">Ponesakki M</strong><br/>B.Tech AI & Data Science</p>
        </div>
      `,
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
