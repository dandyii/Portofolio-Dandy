# Portofolio Dandy Prasetyo Nugroho

Website portofolio satu halaman untuk Dandy Prasetyo Nugroho. Dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, dan Framer Motion.

## Menjalankan proyek

Persyaratan: Node.js versi 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Untuk memeriksa kualitas dan menghasilkan versi produksi:

```bash
npm run lint
npm run build
npm run start
```

## Mengubah teks dan data

Semua teks profil utama dan data karya berada di:

- `src/data/konten.ts`
- `src/components/Portfolio.tsx` untuk struktur section
- `src/app/globals.css` untuk token warna dan tampilan

Keputusan konten: nama kampus dan riwayat sekolah ditampilkan hanya pada section Pendidikan; beranda tetap berfokus pada posisi dan domisili singkat. Video dan proyek yang belum memiliki sumber asli ditandai sebagai placeholder.

## Menambah foto profil

Letakkan foto Dandy tanpa latar belakang pada:

```text
public/images/foto-profil.png
```

Komponen akan menampilkan siluet sementara jika foto belum tersedia. Jangan membuat atau mengarang latar belakang melalui kode.

## Menambah karya desain

Masukkan file pada:

```text
public/images/desain/umum/
public/images/desain/hmti/
```

Lalu ubah jalur `gambar` pada array `karyaDesain` di `src/data/konten.ts`, misalnya `/images/desain/umum/karya-01.jpg`.

## Menambah fotografi

Letakkan gambar pada `public/images/foto/`, lalu ubah data `fotoGaleri`. Penamaan yang disiapkan adalah `foto-01.jpg` sampai `foto-09.jpg`.

## Menambah video

Untuk YouTube, ubah elemen pada array `videoKarya` dengan `sumber: "youtube"` dan isi `url` dengan ID video YouTube. Untuk video lokal, letakkan file pada `public/video/`, lalu gunakan `sumber: "lokal"` dan `url: "/video/nama-file.mp4"`. Embed hanya dimuat setelah tombol putar ditekan.

## Mengubah proyek GitHub

Ubah array `proyek` di `src/data/konten.ts`. Hanya masukkan tautan repositori atau demo yang benar-benar tersedia. Nilai `kode: null` atau `demo: null` menyembunyikan tombol yang tidak ada.

## Deploy ke Vercel lewat GitHub

1. Unggah proyek ke repositori GitHub.
2. Masuk ke Vercel dengan akun GitHub.
3. Pilih **Add New Project**, lalu pilih repositori `Portofolio-Dandy`.
4. Pertahankan deteksi Next.js dan perintah build bawaan.
5. Klik **Deploy**.
6. Setiap perubahan pada branch utama dapat dipush agar Vercel memperbarui deployment.
