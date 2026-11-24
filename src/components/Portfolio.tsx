"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  fotoGaleri,
  karyaDesain,
  keahlian,
  pendidikan,
  profil,
  proyek,
  videoKarya,
} from "@/data/konten";

const menu = [
  ["beranda", "Beranda"],
  ["tentang", "Tentang"],
  ["pendidikan", "Pendidikan"],
  ["desain", "Desain"],
  ["fotografi", "Fotografi"],
  ["video", "Video"],
  ["proyek", "Proyek"],
  ["kontak", "Kontak"],
] as const;

type GalleryItem = {
  judul: string;
  gambar: string;
  deskripsi: string;
};

function SectionHeading({
  nomor,
  judul,
  deskripsi,
  terang = false,
}: {
  nomor: string;
  judul: string;
  deskripsi?: string;
  terang?: boolean;
}) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4 }}
    >
      <span className={terang ? "heading-number light" : "heading-number"}>
        {nomor}
      </span>
      <h2 className={terang ? "heading-title light" : "heading-title"}>
        {judul}
      </h2>
      {deskripsi ? (
        <p className={terang ? "heading-copy light" : "heading-copy"}>
          {deskripsi}
        </p>
      ) : null}
    </motion.div>
  );
}

function Placeholder({ label, small = false }: { label: string; small?: boolean }) {
  return (
    <div className={small ? "placeholder small" : "placeholder"} aria-label={label}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="7" y="9" width="34" height="30" rx="5" />
        <circle cx="17" cy="19" r="3" />
        <path d="m12 34 8-8 6 5 5-7 5 10" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

function PillButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: ReactNode;
  primary?: boolean;
}) {
  const handleRipple = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientX - rect.left < 0 ? 0 : event.clientY - rect.top}px`;
    button.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 450);
  };

  return (
    <motion.a
      href={href}
      className={primary ? "pill-button primary" : "pill-button outline"}
      whileTap={{ scale: 0.95 }}
      onClick={handleRipple}
    >
      {children}
    </motion.a>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skillOpen, setSkillOpen] = useState<number | null>(null);
  const [educationOpen, setEducationOpen] = useState<number | null>(0);
  const [designFilter, setDesignFilter] = useState<"semua" | "umum" | "hmti">(
    "semua",
  );
  const [lightbox, setLightbox] = useState<{
    items: GalleryItem[];
    index: number;
  } | null>(null);
  const [profileImage, setProfileImage] = useState(true);
  const [copied, setCopied] = useState(false);
  const [videoOpen, setVideoOpen] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);

      let current = "beranda";
      menu.forEach(([id]) => {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= 160) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight")
        setLightbox((current) =>
          current
            ? {
                ...current,
                index: (current.index + 1) % current.items.length,
              }
            : null,
        );
      if (event.key === "ArrowLeft")
        setLightbox((current) =>
          current
            ? {
                ...current,
                index:
                  (current.index - 1 + current.items.length) %
                  current.items.length,
              }
            : null,
        );
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const closeMenu = () => setMenuOpen(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profil.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const filteredDesign =
    designFilter === "semua"
      ? karyaDesain
      : karyaDesain.filter((item) => item.kategori === designFilter);

  const openGallery = (items: GalleryItem[], index: number) =>
    setLightbox({ items, index });

  const navigateLightbox = (direction: number) => {
    setLightbox((current) =>
      current
        ? {
            ...current,
            index:
              (current.index + direction + current.items.length) %
              current.items.length,
          }
        : null,
    );
  };

  const handleHeroMove = (event: ReactMouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    heroRef.current?.style.setProperty("--pointer-x", `${x}px`);
    heroRef.current?.style.setProperty("--pointer-y", `${y}px`);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <header className="navbar">
        <nav className="nav-inner" aria-label="Navigasi utama">
          <a className="brand" href="#beranda" onClick={closeMenu}>
            Dandy<span>.</span>
          </a>
          <LayoutGroup>
            <div className="nav-links">
              {menu.map(([id, label]) => (
                <a
                  href={`#${id}`}
                  key={id}
                  className={activeSection === id ? "nav-link active" : "nav-link"}
                  onClick={closeMenu}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  {activeSection === id ? (
                    <motion.span
                      className="active-pill"
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <span className="nav-label">{label}</span>
                </a>
              ))}
            </div>
          </LayoutGroup>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </nav>
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
            >
              {menu.map(([id, label]) => (
                <a
                  href={`#${id}`}
                  key={id}
                  className={activeSection === id ? "active" : ""}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="beranda"
          ref={heroRef}
          className="hero section"
          onMouseMove={handleHeroMove}
        >
          <div className="hero-grid" aria-hidden="true" />
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.span
              className="hero-kicker"
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              Desain &amp; Pengembangan
            </motion.span>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
            >
              <span>PORTOFOLIO</span>
              <strong>{profil.nama}</strong>
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              {profil.intro}
            </motion.p>
            <motion.div
              className="hero-actions"
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              <PillButton href="#desain" primary>
                Lihat Karya
              </PillButton>
              <PillButton href="#kontak">Hubungi Saya</PillButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            <motion.div
              className="hero-blob"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="hero-ring"
              animate={{ rotate: [0, 4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.button
              type="button"
              className="hero-chip chip-one"
              whileTap={{ scale: 0.9, rotate: 8 }}
            >
              UI/UX
            </motion.button>
            <motion.button
              type="button"
              className="hero-chip chip-two"
              whileTap={{ scale: 0.9, rotate: -8 }}
            >
              Front-End
            </motion.button>
            {profileImage ? (
              <Image
                className="profile-image"
                src="/images/foto-profil.png"
                alt="Foto profil Dandy Prasetyo Nugroho"
                fill
                priority
                sizes="(max-width: 768px) 78vw, 38vw"
                onError={() => setProfileImage(false)}
              />
            ) : (
              <div className="profile-silhouette" role="img" aria-label="Placeholder foto Dandy">
                <div className="silhouette-head" />
                <div className="silhouette-body" />
              </div>
            )}
          </motion.div>
          <a className="scroll-cue" href="#tentang" aria-label="Gulir ke Tentang Saya">
            <span>Gulir ke bawah</span>
            <b>↓</b>
          </a>
        </section>

        <section id="tentang" className="section about-section">
          <div className="container">
            <SectionHeading nomor="01" judul="Tentang Saya" />
            <div className="about-layout">
              <motion.p
                className="about-copy"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {profil.tentang}
              </motion.p>
              <div className="skill-grid">
                {keahlian.map((item, index) => (
                  <motion.button
                    type="button"
                    className={skillOpen === index ? "skill-card open" : "skill-card"}
                    key={item.nama}
                    onClick={() => setSkillOpen(skillOpen === index ? null : index)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="skill-index">0{index + 1}</span>
                    <strong>{item.nama}</strong>
                    <AnimatePresence initial={false}>
                      {skillOpen === index ? (
                        <motion.span
                          className="skill-detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          {item.detail}
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pendidikan" className="section education-section">
          <div className="container">
            <SectionHeading nomor="02" judul="Pendidikan" />
            <div className="timeline">
              {pendidikan.map((item, index) => (
                <motion.button
                  type="button"
                  className={educationOpen === index ? "timeline-item open" : "timeline-item"}
                  key={item.institusi}
                  onClick={() => setEducationOpen(educationOpen === index ? null : index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <span className="timeline-dot" />
                  <span className="timeline-year">{item.tahun}</span>
                  <span className="timeline-text">
                    <strong>{item.institusi}</strong>
                    <small>{item.jenjang}</small>
                  </span>
                  <span className="timeline-plus">{educationOpen === index ? "−" : "+"}</span>
                  <AnimatePresence initial={false}>
                    {educationOpen === index ? (
                      <motion.span
                        className="timeline-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        {item.detail}
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section id="desain" className="section design-section">
          <div className="container">
            <SectionHeading
              nomor="03"
              judul="Desain"
              deskripsi="Pilihan karya visual umum dan kontribusi desain untuk organisasi."
            />
            <div className="filter-tabs" role="tablist" aria-label="Kategori desain">
              {(["semua", "umum", "hmti"] as const).map((filter) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={designFilter === filter}
                  key={filter}
                  onClick={() => setDesignFilter(filter)}
                  className={designFilter === filter ? "active" : ""}
                >
                  {designFilter === filter ? (
                    <motion.span
                      className="filter-pill"
                      layoutId="design-filter"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  ) : null}
                  <span>
                    {filter === "semua"
                      ? "Semua"
                      : filter === "umum"
                        ? "Desain Umum"
                        : "Desain HMTI UDINUS"}
                  </span>
                </button>
              ))}
            </div>
            <LayoutGroup>
              <motion.div className="design-grid" layout>
                <AnimatePresence mode="popLayout">
                  {filteredDesign.map((item, index) => (
                    <motion.button
                      type="button"
                      className="gallery-card design-card"
                      key={item.judul}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                      onClick={() =>
                        openGallery(filteredDesign, index)
                      }
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="gallery-frame">
                        <Image
                          src={item.gambar}
                          alt={`Placeholder karya ${item.judul}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                        <Placeholder label="Karya akan ditambahkan" />
                        <span className="card-shade" />
                      </div>
                      <strong>{item.judul}</strong>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
            <div className="hmti-note">
              <span>HMTI</span>
              <p>
                <strong>Desain di HMTI UDINUS</strong>
                <br />
                Ruang untuk menampilkan karya desain dan publikasi yang mendukung kegiatan HMTI UDINUS.
              </p>
            </div>
          </div>
        </section>

        <section id="fotografi" className="section photo-section">
          <div className="container">
            <SectionHeading nomor="04" judul="Fotografi" deskripsi="Galeri dokumentasi visual dan eksperimen komposisi." />
            <div className="photo-grid">
              {fotoGaleri.map((item, index) => (
                <motion.button
                  type="button"
                  className={`photo-card photo-${(index % 5) + 1}`}
                  key={item.judul}
                  onClick={() => openGallery(fotoGaleri, index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 3) * 0.07 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="gallery-frame">
                    <Image
                      src={item.gambar}
                      alt={`Placeholder fotografi ${item.judul}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <Placeholder label="Foto akan ditambahkan" />
                    <span className="photo-overlay">{item.judul}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section id="video" className="section video-section dark-section">
          <div className="container">
            <SectionHeading
              nomor="05"
              judul="Video"
              deskripsi="Karya penyuntingan video dan dokumentasi bergerak."
              terang
            />
            <div className="video-grid">
              {videoKarya.map((item, index) => (
                <motion.article
                  className="video-card"
                  key={item.judul}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  {videoOpen === index ? (
                    item.sumber === "youtube" && item.url ? (
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${item.url}`}
                        title={item.judul}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : item.sumber === "lokal" ? (
                      <video src={item.url} controls preload="metadata">
                        Browser tidak mendukung pemutar video.
                      </video>
                    ) : (
                      <div className="video-placeholder">Video akan ditambahkan</div>
                    )
                  ) : (
                    <button
                      type="button"
                      className="video-thumbnail"
                      onClick={() => setVideoOpen(index)}
                      aria-label={`Putar ${item.judul}`}
                    >
                      <Placeholder label="Thumbnail video" small />
                      <span className="play-button" aria-hidden="true">▶</span>
                    </button>
                  )}
                  <div className="video-copy">
                    <strong>{item.judul}</strong>
                    <p>{item.deskripsi}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="proyek" className="section project-section">
          <div className="container">
            <SectionHeading nomor="06" judul="Proyek" deskripsi="Beberapa proyek pengembangan yang telah atau sedang disiapkan." />
            <div className="project-grid">
              {proyek.map((item, index) => (
                <motion.article
                  className="project-card"
                  key={item.nama}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileTap={{ scale: 0.985 }}
                >
                  <span className="project-number">0{index + 1}</span>
                  <h3>{item.nama}</h3>
                  <p>{item.deskripsi}</p>
                  <div className="tech-tags">
                    {item.teknologi.map((teknologi) => (
                      <span key={teknologi}>{teknologi}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {item.kode ? (
                      <a href={item.kode} target="_blank" rel="noopener noreferrer">
                        Lihat Kode
                      </a>
                    ) : (
                      <span className="placeholder-link">Kode akan ditambahkan</span>
                    )}
                    {item.demo ? (
                      <a href={item.demo} target="_blank" rel="noopener noreferrer">
                        Demo
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="kontak" className="section contact-section">
          <div className="container">
            <SectionHeading nomor="07" judul="Data Diri dan Kontak" />
            <div className="contact-layout">
              <div className="contact-card">
                <div><span>Nama</span><strong>{profil.nama}</strong></div>
                <div><span>Domisili</span><strong>{profil.domisili}</strong></div>
                <div><span>Email</span><a href={`mailto:${profil.email}`}>{profil.email}</a></div>
              </div>
              <div className="social-card">
                <a href={profil.instagram} target="_blank" rel="noopener noreferrer">
                  <span>IG</span><strong>Instagram</strong><b>↗</b>
                </a>
                <a href={profil.github} target="_blank" rel="noopener noreferrer">
                  <span>GH</span><strong>GitHub</strong><b>↗</b>
                </a>
                <a href={profil.linkedin} target="_blank" rel="noopener noreferrer">
                  <span>IN</span><strong>LinkedIn</strong><b>↗</b>
                </a>
              </div>
            </div>
            <div className="contact-actions">
              <PillButton href={`mailto:${profil.email}`} primary>Kirim Email</PillButton>
              <button type="button" className="pill-button outline" onClick={copyEmail}>
                Salin Email
              </button>
            </div>
          </div>
          <AnimatePresence>
            {copied ? (
              <motion.div
                className="toast"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                role="status"
              >
                Email berhasil disalin
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <p>© 2026 {profil.nama}</p>
          <a href="#beranda" aria-label="Kembali ke atas">↑</a>
        </div>
      </footer>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Pratinjau ${lightbox.items[lightbox.index].judul}`}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Tutup pratinjau"
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-arrow previous"
              onClick={() => navigateLightbox(-1)}
              aria-label="Gambar sebelumnya"
            >
              ←
            </button>
            <motion.div
              className="lightbox-content"
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
            >
              <div className="lightbox-image">
                <Image
                  src={lightbox.items[lightbox.index].gambar}
                  alt={lightbox.items[lightbox.index].judul}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <Placeholder label="Karya akan ditambahkan" />
              </div>
              <div className="lightbox-copy">
                <strong>{lightbox.items[lightbox.index].judul}</strong>
                <p>{lightbox.items[lightbox.index].deskripsi}</p>
              </div>
            </motion.div>
            <button
              type="button"
              className="lightbox-arrow next"
              onClick={() => navigateLightbox(1)}
              aria-label="Gambar berikutnya"
            >
              →
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
