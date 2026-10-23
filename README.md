# Property Cahaya Alif Medal - Website Penjualan Properti CAM

[![Netlify Status](https://api.netlify.com/api/v1/badges/e2758c00-fb88-4fdd-9f3e-8da38b3f16c4/deploy-status)](https://app.netlify.com/projects/cahayaalifmedal/deploys)

> Website statis untuk menampilkan pilihan properti Cahaya Alif Medal (CAM), foto dan denah rumah, harga, serta kontak marketing WhatsApp.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Launch](https://img.shields.io/badge/launch-2026-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📖 Deskripsi

**Property Cahaya Alif Medal (CAM)** adalah website one-page untuk informasi dan pemasaran properti di Cupu Mekar Indah, Bahuan Mekar Indah, dan Limus Lestari. Website ini dirancang dengan konsep **modern, elegan, dan minimalis** menggunakan palet warna hijau tua (#1A3C34 / #243B36).

Tujuan utama: memudahkan calon pembeli melihat tipe properti, denah, foto, harga, dan langsung menghubungi marketing via WhatsApp.

### Highlight Konten
- **NEW LAUNCH 2026** - Cupu Mekar Indah, Bahuan Mekar Indah, Limus Lestari
- Denah rumah Cupu Mekar Indah, foto interior, dan pilihan tipe properti
- Lokasi: Cupu Rancamanyar, Kota Baru Parahyangan

---

## ✨ Fitur Utama

### 1. Header / Navigasi
- `position: sticky` dengan `backdrop-filter: blur(12px)` transparan
- Logo + navigasi (Beranda, Denah & Foto, Tipe Properti, Kontak)
- CTA Button "Hubungi Marketing"
- Responsive: nav-links hidden di mobile <768px

### 2. Hero Section (`#beranda`)
- Background warna `#243B36` (dark green)
- Badge "NEW LAUNCH — 2026"
- Heading besar menggunakan font **Fraunces** dengan aksen italic warna emas `#F0C86A`
- **Product Card** utama:
  - Grid 1.2fr / 0.8fr (denah + info)
  - Denah: `Denah rumah cupu.jpg` di dalam frame hijau
  - Info Box: Tipe Cupu Mekar Indah `25/30 | LT 30 m² / LB 25 m²` dan DP mulai `50%`
  - 3 Foto interior: dapur, ruang tamu, dan kamar tidur
  - Tags: ✓ AJB, ✓ Siap Bangun, ✓ Hook & Standard

### 3. Animasi Reveal on Scroll
Di-handle di `main.js`:
```js
IntersectionObserver -> class .is-visible
```
- Elemen dengan `.reveal-on-scroll` akan fade-in, blur 8px -> 0, dan translateY(28px) -> 0
- Support `reveal-delay` dan animasi khusus untuk `<em>`
- Fallback jika browser tidak support IntersectionObserver
- Menghormati `prefers-reduced-motion: reduce`

### 4. Section Tipe Rumah (`#tipe-properti`)
- Judul: "Cahaya Alif Medal - Tatar Hunian Kavling"
- 3 Card Grid:
  - **Tipe 25 x 30 - CUPU MI** - LT 30 / LB 25 - Rp 100 Jt
  - **Tipe 25 x 40 - Bahuan MI** - LT 40 / LB 25 - Rp 165 Jt
  - **Tipe 30 x 50 - Limus Lestari** - LT 50 / LB 30 - Rp 215 Jt
- Card design: border, radius 20px, image 200px
- Disclaimer ukuran/tipe lain dengan tombol menuju formulir WhatsApp

### 5. Section Kontak (`#kontak`)
- Form: Nama, No WhatsApp, pilihan minat properti, dan pilihan agen marketing
- **Integrasi WhatsApp langsung** via `main.js`:
  ```js
  handleSubmit(e) => wa.me/{number}?text=Halo CAM, saya {nama} (WA: {wa}) berminat {minat}
  ```
  - Pengunjung memilih salah satu dari tiga agen WhatsApp; tautan WhatsApp dibuat otomatis dengan pesan yang sudah disiapkan untuk nomor agen tersebut
  - Pesan tidak terkirim otomatis: pengunjung perlu menekan tombol **Kirim** di WhatsApp
  - Tombol WhatsApp pada informasi tipe properti dan tombol WhatsApp mengambang juga membuka pilihan agen dengan pesan awal yang sesuai
  - Tombol kirim menampilkan ikon WhatsApp bulat
- Smooth scroll untuk semua anchor `a[href^="#"]`

### 6. Footer
- Background `#0F1A17` (black-green)
- Nama perusahaan + Copyright 2026 PT Cahaya Alif Medal

---

## 🎨 Design System

Dari `css/style.css`:

```css
:root{
  --green:#1A3C34;
  --green-light:#2A5A4A;
  --green-bg:#E8F0EE;
  --black:#0F1A17;
  --gray:#F6F7F5;
  --white:#FFFFFF;
}
```

- **Font Heading**: `Fraunces` (serif, 400/700/800) - untuk kesan elegan/premium
- **Font Body**: `Plus Jakarta Sans` + `Inter` (400/500/600/700)
- **Radius**: Kartu besar 24px, info box 14px, button 999px (pill)
- **Shadow**: Product card `0 20px 60px rgba(0,0,0,0.3)`
- **Layout**: `.container` max 1200px

---

## 📁 Struktur File

```
/
├── index.html          # Halaman utama (landing page)
├── css/
│   └── style.css       # Semua styling
├── js/
│   └── main.js         # Logic WhatsApp + smooth scroll + reveal animation
├── images/
│   ├── Logo staff properti.png
│   ├── Denah rumah cupu.jpg
│   ├── CUPU ruang tamu.jpg
│   ├── Cupu mekar indah dapur.jpg
│   ├── Cupu mekar indah kamar.jpg
│   ├── Cupu mekar indah.jpeg
│   ├── Bahuan mekar indah.jpeg
│   ├── Limus Lestari 2.jpeg
│   └── Limus Lestari 3.jpeg
└── netlify.toml        # Konfigurasi publish situs statis di Netlify
```

---

## 🚀 Cara Menjalankan

Tidak butuh build tools, npm, atau `package.json`. Ini adalah situs statis. `index.html` memuat `css/style.css`, `js/main.js`, dan aset pada `images/` menggunakan path relatif.

1. Clone / download folder
2. Pastikan struktur folder seperti di atas
3. Buka `index.html` dengan Live Server / double-click

```bash
# dengan python simple server
python -m http.server 8000
# atau
npx serve .
```

Buka `http://localhost:8000`

### Deploy ke Netlify melalui GitHub

1. Upload seluruh isi folder proyek ke repository GitHub, termasuk folder `css/`, `js/`, `images/`, serta `netlify.toml`.
2. Di Netlify, pilih **Add new site → Import an existing project** dan hubungkan repository tersebut.
3. Gunakan root repository sebagai **Publish directory**. Build command tidak diperlukan.
4. Deploy. Pastikan nama dan kapitalisasi file di `images/` tidak diubah karena path aset harus cocok persis.

`netlify.toml` menetapkan publish directory ke root proyek. Tidak diperlukan file JSON khusus untuk deploy situs statis ini.

### Publikasi melalui GitHub Pages

1. Buat repository GitHub dan upload seluruh file proyek ke root repository.
2. Buka **Settings → Pages** pada repository.
3. Pada **Build and deployment**, pilih **Deploy from a branch**, lalu pilih branch `main` dan folder `/(root)`.
4. Klik **Save** dan tunggu proses deployment selesai. URL situs akan tampil di halaman Pages.

Tidak diperlukan build command. Pastikan path dan kapitalisasi nama file aset tetap sama seperti yang digunakan di `index.html`.

---

## ⚙️ Kustomisasi Cepat

**Ganti nomor WhatsApp marketing:**
Edit nomor pada pilihan `name="agent"` di `index.html`:
```html
<option value="6282120776124">Agen 1</option>
```

**Ganti harga / tipe:**
Edit langsung di Section `#tipe-properti` -> `.card-body`

**Ganti denah / foto:**
Ganti `src` di `.denah img` dan `.photos img`.

**Ganti warna tema:**
Edit `:root` di `css/style.css`

---

## 📱 Responsive

- Breakpoint: `@media(max-width:768px)`
  - `.grid-top` jadi 1 kolom
  - `.photos` jadi 1 kolom
  - `.cards` jadi 1 kolom
  - `.nav-links` disembunyikan
  - Hero min-height 100vh

---

## 🔧 Teknologi

- HTML5 Semantic
- CSS3 (Grid, Flex, Variables, Backdrop Filter, Clamp)
- Vanilla JavaScript (no framework)
- Google Fonts
- WhatsApp API (`wa.me`)

---

## 📌 Catatan sebelum publikasi

- Pastikan harga, DP, status AJB/siap bangun, dan nomor marketing masih berlaku.
- Validasi format nomor WhatsApp calon pembeli dapat ditambahkan jika dibutuhkan.
- OG image, favicon, dan lightbox denah adalah peningkatan opsional.

---

## 👤 Author

**Property Cahaya Alif Medal (CAM)**
Marketing Gallery PT Cahaya Alif Medal
© 2026

Dibuat untuk kebutuhan pemasaran kavling Cupu Rancamanyar.
