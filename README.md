# 🌸 CV Japan Template

Template CV portfolio bertema Jepang dengan dark/light mode, musik latar, kirim email & WhatsApp.

---

## 🚀 Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Buat file `.env`
```bash
cp .env.example .env
```
Lalu buka `.env` dan isi konfigurasi kamu (lihat bagian Konfigurasi di bawah).

### 3. Jalankan Server
```bash
# Mode development (auto-restart)
npm run dev

# Mode production
npm start
```

### 4. Buka Browser
```
http://localhost:3000
```

---

## ✏️ PANDUAN CARA MENGUBAH KONTEN

### 📋 File `public/index.html` — Isi Konten Utama

---

### 👤 1. Ubah Nama & Identitas

Cari dan ganti teks berikut:

| Cari | Ganti Dengan |
|------|------|
| `Tanaka Yuki` | Nama kamu (Latin) |
| `田中 雪` | Nama kamu (huruf Jepang, atau hapus saja) |
| `TANAKA YUKI` | Nama kamu kapital |
| `yuki@example.com` | Email kamu |
| `+62 812-3456-7890` | Nomor WA kamu |
| `linkedin.com/in/yuki` | LinkedIn kamu |

---

### 🖼️ 2. Ganti Foto Profil

Di section `tentang`, cari elemen `.photo-placeholder`:
```html
<!-- SEBELUM (placeholder) -->
<div class="photo-placeholder">
  <div class="photo-initial">田</div>
</div>

<!-- SESUDAH (foto kamu) -->
<div class="photo-placeholder">
  <img src="images/foto-saya.jpg" alt="Foto Saya" />
</div>
```
Taruh file foto kamu di folder `public/images/`.

---

### 📝 3. Ubah Bio / Tentang Saya

Cari section `id="tentang"` dan ubah:
- **Kutipan Jepang**: ubah `.about-quote` dan `.about-quote-trans`
- **Paragraf bio**: ubah teks di `.about-body`
- **Informasi detail**: ubah `.detail-value` (lokasi, email, bahasa)
- **Tag keahlian**: ubah isi `.about-tags` > `.tag`

---

### 📊 4. Ubah Skill/Keahlian

Untuk setiap skill bar, ubah:
```html
<div class="skill-item">
  <div class="skill-header">
    <span class="skill-name">Nama Skill</span>  <!-- Ubah nama -->
    <span class="skill-pct">90%</span>          <!-- Ubah persentase -->
  </div>
  <div class="skill-bar">
    <div class="skill-fill" data-w="90"></div>  <!-- Ubah angka data-w -->
  </div>
</div>
```
⚠️ Pastikan `data-w` dan `skill-pct` angkanya sama.

---

### 🗂️ 5. Ubah Portfolio

Untuk setiap kartu portfolio:
```html
<div class="portfolio-card" data-category="web">  <!-- design / web / mobile -->
  <div class="card-thumb web-thumb">              <!-- design-thumb / web-thumb / mobile-thumb -->
    <span class="thumb-icon">💻</span>            <!-- Emoji icon -->
  </div>
  <div class="card-body">
    <span class="card-cat">Kategori</span>
    <h3 class="card-title">Judul Proyek</h3>
    <p class="card-desc">Deskripsi singkat proyek kamu.</p>
    <div class="card-tags">
      <span>Tag1</span><span>Tag2</span>
    </div>
  </div>
  <div class="card-footer">
    <a href="LINK_PROYEK" class="card-link">Lihat Detail →</a>
  </div>
</div>
```

---

### 💼 6. Ubah Pengalaman Kerja

Untuk setiap item timeline:
```html
<div class="timeline-item">
  <div class="timeline-dot"></div>
  <div class="timeline-content">
    <div class="timeline-period">2022 — Sekarang</div>   <!-- Periode -->
    <h4 class="timeline-role">Nama Jabatan</h4>          <!-- Jabatan -->
    <div class="timeline-company">Nama Perusahaan · Kota</div>
    <p class="timeline-desc">Deskripsi pekerjaan kamu.</p>
  </div>
</div>
```
- Untuk **pengalaman kerja**: gunakan `timeline-dot` (merah)
- Untuk **pendidikan**: gunakan `timeline-dot edu-dot` (emas)

---

### 🎯 7. Ubah Stats di Hero

```html
<div class="stat-item">
  <div class="stat-number">5+</div>    <!-- Ubah angka -->
  <div class="stat-label">Tahun</div>  <!-- Ubah label -->
</div>
```

---

### 🎨 8. Ubah Warna Tema

Buka `public/css/style.css` dan cari bagian `:root` (light mode):

```css
:root {
  --accent: #C0392B;        /* Warna aksen utama (merah torii) */
  --accent-gold: #C9A84C;   /* Warna aksen emas */
  --accent-green: #8B9467;  /* Warna aksen hijau bambu */
  --bg-primary: #F5F0E8;    /* Background utama */
  --bg-secondary: #EDE6D6;  /* Background alternatif */
}
```

Dan `[data-theme="dark"]` untuk dark mode:
```css
[data-theme="dark"] {
  --accent: #e05045;
  --bg-primary: #0f0f1a;
  /* dst... */
}
```

---

### 🎵 9. Tambah Musik Latar

#### Cara A — File Lokal
1. Taruh file `.mp3` di folder `public/music/`
2. Buka `index.html`, cari elemen `<audio id="bgMusic">`
3. Tambahkan tag source:
```html
<audio id="bgMusic" loop preload="none">
  <source src="music/nama-file.mp3" type="audio/mpeg" />
</audio>
```

#### Cara B — URL Online (pastikan CORS diizinkan)
```html
<audio id="bgMusic" loop preload="none">
  <source src="https://url-ke-file-musik.mp3" type="audio/mpeg" />
</audio>
```

> 💡 **Rekomendasi musik bebas royalti bertema Jepang:**
> - [Pixabay](https://pixabay.com/music/search/japanese/)
> - [Free Music Archive](https://freemusicarchive.org)
> - [Musescore Free](https://musescore.com)

---

### 🔗 10. Ubah Link Sosial Media

Di section kontak, ubah link kartu:
```html
<!-- Email -->
<a href="mailto:EMAILKAMU@gmail.com" class="contact-card">

<!-- LinkedIn -->
<a href="https://linkedin.com/in/USERNAME_KAMU" target="_blank" class="contact-card">
```

---

## ⚙️ Konfigurasi Server (`.env`)

```env
# Email Gmail
EMAIL_USER=emailkamu@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx   # App Password Gmail (bukan password biasa!)
EMAIL_TO=email_penerima@gmail.com

# WhatsApp (tanpa + dan spasi)
WA_NUMBER=6281234567890

# Port server
PORT=3000
```

### 📧 Cara Buat App Password Gmail:
1. Buka [myaccount.google.com](https://myaccount.google.com)
2. **Security** → **2-Step Verification** (aktifkan dulu jika belum)
3. **Security** → **App passwords**
4. Pilih app: **Mail**, device: **Other** → tulis "CV Template"
5. Salin password 16 karakter yang diberikan → masukkan ke `EMAIL_PASS`

### 💬 Format Nomor WhatsApp:
- Format: `62` + nomor tanpa `0` di depan
- Contoh: `+62 812-3456-7890` → `6281234567890`

---

## 📁 Struktur File

```
cv-japan/
├── server.js              ← Server Node.js
├── package.json
├── .env                   ← Konfigurasi (buat dari .env.example)
├── .env.example
└── public/
    ├── index.html         ← Halaman utama (UBAH KONTEN DI SINI)
    ├── css/
    │   └── style.css      ← Tampilan & warna (UBAH TEMA DI SINI)
    ├── js/
    │   └── main.js        ← Logika interaksi
    ├── images/            ← Taruh foto profil di sini
    └── music/             ← Taruh file musik di sini
```

---

## 🌐 Deploy ke Internet

### Opsi 1: Railway (Gratis)
1. Push kode ke GitHub
2. Buka [railway.app](https://railway.app)
3. New Project → Deploy from GitHub
4. Set variabel environment di panel Railway

### Opsi 2: Render (Gratis)
1. Push ke GitHub
2. Buka [render.com](https://render.com)
3. New → Web Service → pilih repo
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Set environment variables

### Opsi 3: VPS (Nginx + PM2)
```bash
npm install -g pm2
pm2 start server.js --name cv-japan
pm2 save
```

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Email tidak terkirim | Periksa App Password Gmail, pastikan 2FA aktif |
| WA tidak terbuka | Pastikan format nomor benar (tanpa + atau spasi) |
| Musik tidak bermain | Browser memerlukan interaksi user dahulu (klik tombol musik) |
| Port sudah digunakan | Ubah `PORT=3001` di `.env` |
| Sakura tidak muncul | Canvas butuh JavaScript aktif di browser |

---

**Dibuat dengan 🌸 — Template CV Tema Jepang**
