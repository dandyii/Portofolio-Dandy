export const profil = {
  nama: "Dandy Prasetyo Nugroho",
  panggilan: "Dandy",
  domisili: "Semarang",
  email: "dandynugroho901@gmail.com",
  instagram: "https://www.instagram.com/dandyii_/",
  github: "https://github.com/dandyii",
  linkedin: "https://www.linkedin.com/in/dandyprasetyonugroho/",
  intro:
    "Mahasiswa Teknik Informatika semester 5 yang berdomisili di Semarang dan menyukai desain visual serta pengembangan web.",
  tentang:
    "Saya Dandy Prasetyo Nugroho, mahasiswa Teknik Informatika yang tertarik menjembatani ide visual dan implementasi web. Saya menikmati proses mengubah konsep menjadi antarmuka yang jelas, mudah digunakan, dan konsisten secara visual. Minat saya mencakup desain visual, UI/UX, fotografi, penyuntingan video, serta pengembangan web dasar.",
};

export const keahlian = [
  {
    nama: "Desain Visual",
    detail:
      "Menyusun komposisi, tipografi, warna, dan elemen visual agar pesan mudah dipahami.",
  },
  {
    nama: "UI/UX",
    detail:
      "Merancang alur dan antarmuka yang sederhana dengan mempertimbangkan kebutuhan pengguna.",
  },
  {
    nama: "Fotografi",
    detail:
      "Memotret komposisi, cahaya, dan momen untuk menghasilkan dokumentasi visual yang komunikatif.",
  },
  {
    nama: "Penyuntingan Video",
    detail:
      "Mengolah gambar bergerak, ritme, teks, dan audio menjadi video yang runtut.",
  },
  {
    nama: "Pengembangan Web Dasar",
    detail:
      "Membangun antarmuka responsif menggunakan HTML, CSS, serta pemahaman dasar JavaScript dan React.",
  },
];

export const pendidikan = [
  {
    institusi: "Universitas Dian Nuswantoro (UDINUS)",
    jenjang: "S1 Teknik Informatika",
    tahun: "2024 - sekarang",
    detail:
      "Menempuh pendidikan sarjana Teknik Informatika sekaligus mengembangkan minat pada antarmuka web dan desain.",
  },
  {
    institusi: "SMA Sultan Agung 1 Semarang",
    jenjang: "Sekolah Menengah Atas",
    tahun: "2021 - 2024",
    detail: "Menempuh pendidikan sekolah menengah atas di Semarang.",
  },
  {
    institusi: "SMP Negeri 8 Semarang",
    jenjang: "Sekolah Menengah Pertama",
    tahun: "2018 - 2021",
    detail: "Menempuh pendidikan sekolah menengah pertama di Semarang.",
  },
];

export type Karya = {
  judul: string;
  kategori: "umum" | "hmti";
  gambar: string;
  deskripsi: string;
};

export const karyaDesain: Karya[] = [
  {
    judul: "Poster Karya Visual 01",
    kategori: "umum",
    gambar: "/images/desain/umum/karya-01.jpg",
    deskripsi: "Ruang untuk poster desain umum yang akan ditambahkan pemilik.",
  },
  {
    judul: "Identitas Visual 02",
    kategori: "umum",
    gambar: "/images/desain/umum/karya-02.jpg",
    deskripsi: "Ruang untuk karya identitas visual yang akan ditambahkan pemilik.",
  },
  {
    judul: "Konten Media Sosial 03",
    kategori: "umum",
    gambar: "/images/desain/umum/karya-03.jpg",
    deskripsi: "Ruang untuk desain konten yang akan ditambahkan pemilik.",
  },
  {
    judul: "Publikasi HMTI 01",
    kategori: "hmti",
    gambar: "/images/desain/hmti/karya-01.jpg",
    deskripsi: "Ruang untuk publikasi HMTI UDINUS yang akan ditambahkan pemilik.",
  },
  {
    judul: "Visual Acara HMTI 02",
    kategori: "hmti",
    gambar: "/images/desain/hmti/karya-02.jpg",
    deskripsi: "Ruang untuk visual acara HMTI UDINUS yang akan ditambahkan pemilik.",
  },
  {
    judul: "Dokumentasi Kreatif HMTI 03",
    kategori: "hmti",
    gambar: "/images/desain/hmti/karya-03.jpg",
    deskripsi: "Ruang untuk dokumentasi kreatif HMTI UDINUS yang akan ditambahkan pemilik.",
  },
];

export const fotoGaleri = Array.from({ length: 9 }, (_, index) => ({
  judul: `Karya fotografi ${String(index + 1).padStart(2, "0")}`,
  gambar: `/images/foto/foto-${String(index + 1).padStart(2, "0")}.jpg`,
  deskripsi: "Potret fotografi yang akan ditambahkan pemilik.",
}));

export type VideoKarya = {
  judul: string;
  deskripsi: string;
  thumbnail: string;
  sumber: "youtube" | "lokal";
  url: string;
};

export const videoKarya: VideoKarya[] = [
  {
    judul: "Video Portofolio 01",
    deskripsi: "Slot video untuk embed YouTube atau karya yang akan ditambahkan.",
    thumbnail: "/video/thumbnail-01.jpg",
    sumber: "youtube",
    url: "",
  },
  {
    judul: "Video Portofolio 02",
    deskripsi: "Slot video untuk file lokal yang akan ditambahkan.",
    thumbnail: "/video/thumbnail-02.jpg",
    sumber: "lokal",
    url: "/video/karya-02.mp4",
  },
  {
    judul: "Video Portofolio 03",
    deskripsi: "Slot video untuk karya pendek yang akan ditambahkan.",
    thumbnail: "/video/thumbnail-03.jpg",
    sumber: "lokal",
    url: "/video/karya-03.mp4",
  },
];

export type Proyek = {
  nama: string;
  deskripsi: string;
  teknologi: string[];
  kode: string | null;
  demo: string | null;
};

// Ganti data placeholder ini dengan repositori asli setelah URL dan fitur tersedia.
export const proyek: Proyek[] = [
  {
    nama: "Proyek Portofolio",
    deskripsi: "Website portofolio pribadi yang sedang dikembangkan sebagai identitas profesional.",
    teknologi: ["Next.js", "TypeScript", "Tailwind"],
    kode: "https://github.com/dandyii/Portofolio-Dandy",
    demo: null,
  },
  {
    nama: "Proyek Aplikasi 02",
    deskripsi: "Placeholder repositori—ganti dengan nama dan deskripsi aplikasi asli.",
    teknologi: ["Belum ditentukan"],
    kode: null,
    demo: null,
  },
  {
    nama: "Proyek Aplikasi 03",
    deskripsi: "Placeholder repositori—ganti dengan nama dan deskripsi aplikasi asli.",
    teknologi: ["Belum ditentukan"],
    kode: null,
    demo: null,
  },
];
