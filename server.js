require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting: maks 5 pesan per 15 menit per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Terlalu banyak permintaan. Coba lagi dalam 15 menit.' }
});

// ── Email Transporter ───────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // Gunakan App Password Gmail
  },
});

// ── Routes ──────────────────────────────────────────────────

// Kirim Email
app.post('/api/send-email', limiter, async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validasi input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'Semua field harus diisi.' });
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Format email tidak valid.' });
  }

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `[CV Contact] ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f5f0e8; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1a1a2e 0%, #C0392B 100%); color: white; padding: 30px; text-align: center; }
          .header h2 { margin: 0; font-size: 24px; letter-spacing: 2px; }
          .header p { margin: 5px 0 0; opacity: 0.8; font-size: 14px; }
          .body { padding: 30px; }
          .field { margin-bottom: 20px; border-left: 3px solid #C0392B; padding-left: 15px; }
          .field label { display: block; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
          .field p { margin: 0; color: #333; font-size: 15px; }
          .message-box { background: #f9f9f9; border-radius: 6px; padding: 20px; margin-top: 10px; color: #333; line-height: 1.7; }
          .footer { background: #1a1a2e; color: #888; text-align: center; padding: 15px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>⛩ Pesan Baru</h2>
            <p>Dari CV Portfolio</p>
          </div>
          <div class="body">
            <div class="field">
              <label>Nama Pengirim</label>
              <p>${name}</p>
            </div>
            <div class="field">
              <label>Email Pengirim</label>
              <p>${email}</p>
            </div>
            <div class="field">
              <label>Subjek</label>
              <p>${subject}</p>
            </div>
            <div class="field">
              <label>Pesan</label>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            Pesan dikirim melalui CV Portfolio Website
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✉️  Email terkirim dari: ${email}`);
    res.json({ success: true, message: 'Pesan berhasil dikirim! Saya akan segera membalas.' });
  } catch (error) {
    console.error('❌ Email error:', error.message);
    res.status(500).json({ success: false, message: 'Gagal mengirim email. Coba lagi nanti.' });
  }
});

// WhatsApp redirect (generate URL)
app.post('/api/whatsapp', (req, res) => {
  const { name, message } = req.body;
  const waNumber = process.env.WA_NUMBER;
  const text = encodeURIComponent(`Halo! Saya ${name}.\n\n${message}`);
  const waUrl = `https://wa.me/${waNumber}?text=${text}`;
  res.json({ success: true, url: waUrl });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Semua route lain → index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌸 CV Japan Template berjalan di: http://localhost:${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER || '(belum dikonfigurasi)'}`);
  console.log(`💬 WhatsApp: ${process.env.WA_NUMBER || '(belum dikonfigurasi)'}\n`);
});
