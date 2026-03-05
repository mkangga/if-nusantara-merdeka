import { useState, useEffect, useRef } from "react";

const batikPattern = `
  <svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'>
    <circle cx='30' cy='30' r='12' fill='none' stroke='rgba(212,175,55,0.12)' stroke-width='1.5'/>
    <circle cx='30' cy='30' r='6' fill='none' stroke='rgba(212,175,55,0.08)' stroke-width='1'/>
    <circle cx='0' cy='0' r='12' fill='none' stroke='rgba(212,175,55,0.12)' stroke-width='1.5'/>
    <circle cx='60' cy='0' r='12' fill='none' stroke='rgba(212,175,55,0.12)' stroke-width='1.5'/>
    <circle cx='0' cy='60' r='12' fill='none' stroke='rgba(212,175,55,0.12)' stroke-width='1.5'/>
    <circle cx='60' cy='60' r='12' fill='none' stroke='rgba(212,175,55,0.12)' stroke-width='1.5'/>
    <line x1='0' y1='30' x2='60' y2='30' stroke='rgba(212,175,55,0.06)' stroke-width='0.5'/>
    <line x1='30' y1='0' x2='30' y2='60' stroke='rgba(212,175,55,0.06)' stroke-width='0.5'/>
  </svg>
`;

const events = [
  {
    year: "1293",
    era: "Fondasi Kekuasaan",
    title: "Kelahiran Majapahit",
    subtitle: "Benih Peradaban Agung",
    description:
      "Raden Wijaya mendirikan Kerajaan Majapahit. Tanpa ancaman penjajahan, kerajaan ini tumbuh menjadi pusat ilmu pengetahuan, seni, dan perdagangan maritim terbesar di Asia Tenggara — sebuah peradaban yang tak pernah terganggu.",
    detail:
      "Gajah Mada mengucapkan Sumpah Palapa: menyatukan seluruh Nusantara. Dalam linimasa ini, sumpah tersebut terwujud sepenuhnya — bukan hanya mimpi yang terpotong oleh waktu.",
    color: "#C0392B",
    icon: "⚡",
    impact: ["Persatuan 13.000+ pulau", "Sistem hukum Nusantara", "Armada laut tak tertandingi"],
  },
  {
    year: "1400s",
    era: "Zaman Emas Maritim",
    title: "Nusantara: Raja Jalur Rempah",
    subtitle: "Kendali Penuh Perdagangan Dunia",
    description:
      "Tanpa VOC dan monopoli asing, pelabuhan-pelabuhan Nusantara seperti Malaka, Tuban, dan Gresik menjadi pusat perdagangan global. Pedagang dari Arab, Cina, dan India datang atas syarat Nusantara — bukan sebaliknya.",
    detail:
      "Kapal-kapal jung Nusantara berlayar hingga Afrika Timur, India, dan Cina. Sistem barter rempah menghasilkan kekayaan yang mengalir balik ke kerajaan-kerajaan lokal.",
    color: "#D4AF37",
    icon: "⚓",
    impact: ["GDP terbesar Asia", "Jaringan diplomatik 40 negara", "Mata uang kepeng tersebar luas"],
  },
  {
    year: "1511",
    era: "Diplomasi, Bukan Peperangan",
    title: "Kedatangan Portugis Ditolak Damai",
    subtitle: "Nusantara Negosiasi dari Posisi Kuat",
    description:
      "Saat Portugis tiba, mereka tidak menemukan kerajaan yang lemah — melainkan konfederasi maritim yang kuat. Perjanjian perdagangan ditandatangani atas kesetaraan: Portugis boleh berdagang, tetapi tak boleh memiliki tanah.",
    detail:
      "Tidak ada Pertempuran Malaka. Tidak ada benteng asing. Kesultanan Malaka, didukung konfederasi Nusantara, berhasil mempertahankan kedaulatannya melalui negosiasi diplomatik yang cerdas.",
    color: "#2E86AB",
    icon: "🤝",
    impact: ["Diplomasi tanpa takluk", "Teknologi Eropa diserap", "Identitas budaya terjaga"],
  },
  {
    year: "1600s",
    era: "Era Konfederasi",
    title: "Lahirnya Konfederasi Nusantara",
    subtitle: "Persatuan Dalam Keberagaman",
    description:
      "Kerajaan-kerajaan besar — Mataram, Aceh, Makassar, Ternate — membentuk Dewan Nusantara: sebuah konfederasi longgar yang menjamin kedaulatan masing-masing sambil bersatu dalam pertahanan dan perdagangan.",
    detail:
      "Sistem ini mirip dengan Uni Eropa modern, tetapi lahir 400 tahun lebih awal. Bahasa Melayu menjadi lingua franca resmi, mengikat ratusan suku dan bahasa daerah.",
    color: "#27AE60",
    icon: "🏛️",
    impact: ["Sistem federal pertama di Asia", "Bahasa Melayu sebagai pemersatu", "Parlemen kerajaan pertama"],
  },
  {
    year: "1700s",
    era: "Revolusi Ilmu",
    title: "Universitas & Kebangkitan Sains Nusantara",
    subtitle: "Pengetahuan Sebagai Kekuatan",
    description:
      "Tanpa penjajahan yang memadamkan institusi lokal, perguruan tinggi berbasis tradisi Nusantara berkembang. Astronomi bahari, ilmu botani, dan matematika berkembang pesat — memadukan warisan India, Arab, dan Cina.",
    detail:
      "Observatorium di Jawa dibangun untuk navigasi laut. Perpustakaan Nusantara menyimpan lebih dari 500.000 manuskrip. Ilmuwan Nusantara koresponden dengan Newton dan Leibniz.",
    color: "#8E44AD",
    icon: "🔭",
    impact: ["50+ perguruan tinggi", "Industri kertas & cetak lokal", "Ekspedisi ilmiah Pasifik"],
  },
  {
    year: "1800s",
    era: "Industrialisasi Mandiri",
    title: "Revolusi Industri Nusantara",
    subtitle: "Modernisasi Atas Dasar Sendiri",
    description:
      "Sumber daya alam yang melimpah — timah, karet, minyak bumi — tidak diekspor mentah, tetapi diolah sendiri. Industri tekstil, galangan kapal, dan pengolahan rempah berkembang tanpa perlu modal asing.",
    detail:
      "Jalur kereta dari Aceh ke Papua mulai dibangun. Kapal uap buatan galangan Surabaya berlayar ke Eropa. Nusantara menjadi pemasok produk jadi, bukan bahan baku.",
    color: "#E67E22",
    icon: "⚙️",
    impact: ["Industri manufaktur mandiri", "Jaringan rel lintas pulau", "Ekspor produk bernilai tinggi"],
  },
  {
    year: "1900s",
    era: "Republik Modern",
    title: "Kelahiran Republik Nusantara",
    subtitle: "Demokrasi Tumbuh dari Dalam",
    description:
      "Bukan karena perjuangan melawan penjajah, melainkan melalui reformasi internal, konfederasi kerajaan berevolusi menjadi republik demokratis modern. Pemilu pertama diselenggarakan pada 1902.",
    detail:
      "Tidak ada trauma penjajahan. Tidak ada 'pemuda' yang harus berjuang dengan tangan kosong. Transisi ke republik berjalan damai — dipimpin oleh intelektual dan tokoh adat yang telah berpengalaman berpemerintahan selama berabad-abad.",
    color: "#C0392B",
    icon: "🗳️",
    impact: ["Demokrasi tanpa revolusi berdarah", "Konstitusi berbasis hukum adat", "Stabilitas politik 120+ tahun"],
  },
  {
    year: "1945",
    era: "Titik Perbedaan Terbesar",
    title: "Tak Ada 17 Agustus yang Perlu Diproklamasikan",
    subtitle: "Karena Kemerdekaan Tak Pernah Hilang",
    description:
      "Dalam sejarah nyata, 1945 adalah proklamasi kemerdekaan dari penjajahan. Di linimasa ini, 1945 adalah tahun Nusantara menjadi anggota pendiri PBB — sebagai salah satu negara paling kaya dan berpengaruh di dunia.",
    detail:
      "Nusantara hadir di meja negosiasi Perang Dunia II bukan sebagai korban atau koloni, melainkan sebagai mediator netral dengan kekuatan ekonomi dan militer yang disegani semua pihak.",
    color: "#D4AF37",
    icon: "🌏",
    impact: ["Anggota pendiri PBB", "Mediator perdamaian dunia", "GDP terbesar ke-3 dunia"],
  },
  {
    year: "2025",
    era: "Nusantara Hari Ini",
    title: "Adidaya Kepulauan Dunia",
    subtitle: "Warisan 700 Tahun Kedaulatan",
    description:
      "Dengan 300 juta penduduk yang terdidik, infrastruktur yang dibangun selama berabad-abad, dan identitas budaya yang utuh — Nusantara menjadi pusat peradaban global. Jakarta, Majapahit Baru, dan Makassar menjadi kota dunia setara London dan Tokyo.",
    detail:
      "Bahasa Melayu-Nusantara menjadi salah satu dari lima bahasa resmi PBB. Batik, gamelan, dan wayang dikenal di seluruh dunia bukan sebagai eksotisme, melainkan sebagai budaya mainstream global.",
    color: "#27AE60",
    icon: "✨",
    impact: ["GDP $12 triliun", "Bahasa resmi PBB ke-5", "Pemimpin gerakan iklim global"],
  },
];

export default function NusantaraTimeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Simple media query hook
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.index || "0");
            setVisibleItems((prev) => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.15 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const encodedSvg = encodeURIComponent(batikPattern);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0A05",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
        backgroundRepeat: "repeat",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)",
      }} />

      {/* Header */}
      <div style={{
        textAlign: "center", padding: "72px 24px 48px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "inline-block",
          border: "1px solid rgba(212,175,55,0.4)",
          padding: "6px 20px",
          marginBottom: "20px",
          letterSpacing: "0.25em",
          fontSize: "11px",
          color: "#D4AF37",
          textTransform: "uppercase",
        }}>
          Sejarah Alternatif · Spekulasi Historis
        </div>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 64px)",
          fontWeight: "400",
          color: "#F5E6C8",
          margin: "0 0 12px",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}>
          Nusantara Merdeka
        </h1>
        <p style={{
          fontSize: "clamp(14px, 2vw, 18px)",
          color: "rgba(212,175,55,0.7)",
          margin: "0 0 8px",
          fontStyle: "italic",
          letterSpacing: "0.05em",
        }}>
          Bagaimana jika Indonesia tidak pernah dijajah?
        </p>
        <p style={{
          fontSize: "13px", color: "rgba(245,230,200,0.35)",
          letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "16px",
        }}>
          Klik setiap era untuk menggali lebih dalam
        </p>
      </div>

      {/* Vertical spine */}
      <div style={{
        position: "absolute",
        left: isMobile ? "36px" : "50%",
        top: "220px",
        bottom: "80px",
        width: "1px",
        background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.3) 5%, rgba(212,175,55,0.3) 95%, transparent)",
        transform: "translateX(-50%)",
        zIndex: 1,
        transition: "left 0.5s ease",
      }} />

      {/* Timeline */}
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "0 24px 100px",
        position: "relative",
        zIndex: 2,
      }}>
        {events.map((event, i) => {
          const isLeft = i % 2 === 0;
          const isVisible = visibleItems.includes(i);
          const isActive = activeIndex === i;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={i}
              data-index={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              onClick={() => setActiveIndex(isActive ? null : i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: "flex",
                flexDirection: isMobile ? "row-reverse" : (isLeft ? "row" : "row-reverse"),
                alignItems: "flex-start",
                marginBottom: isMobile ? "32px" : "4px",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0)"
                  : isMobile 
                    ? "translateY(30px)" 
                    : (isLeft ? "translateX(-30px)" : "translateX(30px)"),
                transition: `opacity 0.7s ease ${i * 0.07}s, transform 0.7s ease ${i * 0.07}s`,
                cursor: "pointer",
                position: "relative",
                justifyContent: isMobile ? "flex-end" : "center",
              }}
            >
              {/* Content card */}
              <div style={{
                width: isMobile ? "calc(100% - 60px)" : "calc(50% - 48px)",
                background: isActive
                  ? "rgba(212,175,55,0.08)"
                  : isHovered
                  ? "rgba(212,175,55,0.05)"
                  : "rgba(20,15,8,0.7)",
                border: `1px solid ${isActive ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.15)"}`,
                padding: "24px",
                transition: "all 0.3s ease",
                backdropFilter: "blur(8px)",
                marginLeft: isMobile ? "12px" : "0",
                marginRight: isMobile ? "0" : "0",
              }}>
                {/* Era label */}
                <div style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: event.color,
                  marginBottom: "8px",
                  opacity: 0.8,
                }}>
                  {event.era}
                </div>

                {/* Year */}
                <div style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: "700",
                  color: event.color,
                  lineHeight: 1,
                  marginBottom: "10px",
                  fontVariantNumeric: "tabular-nums",
                }}>
                  {event.year}
                </div>

                {/* Title */}
                <div style={{
                  fontSize: "clamp(14px, 1.8vw, 17px)",
                  fontWeight: "600",
                  color: "#F5E6C8",
                  marginBottom: "4px",
                  lineHeight: 1.3,
                }}>
                  {event.title}
                </div>

                {/* Subtitle */}
                <div style={{
                  fontSize: "12px",
                  color: "rgba(212,175,55,0.6)",
                  fontStyle: "italic",
                  marginBottom: "12px",
                }}>
                  {event.subtitle}
                </div>

                {/* Description */}
                <p style={{
                  fontSize: "13px",
                  color: "rgba(245,230,200,0.7)",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {event.description}
                </p>

                {/* Expanded content */}
                <div style={{
                  maxHeight: isActive ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.5s ease",
                }}>
                  <div style={{
                    marginTop: "16px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(212,175,55,0.2)",
                  }}>
                    <p style={{
                      fontSize: "13px",
                      color: "rgba(245,230,200,0.6)",
                      lineHeight: 1.7,
                      marginBottom: "16px",
                      fontStyle: "italic",
                    }}>
                      {event.detail}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{
                        fontSize: "10px", letterSpacing: "0.15em",
                        textTransform: "uppercase", color: event.color,
                        marginBottom: "4px",
                      }}>
                        Dampak Utama
                      </div>
                      {event.impact.map((imp, j) => (
                        <div key={j} style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          fontSize: "12px", color: "rgba(245,230,200,0.7)",
                        }}>
                          <div style={{
                            width: "4px", height: "4px", borderRadius: "50%",
                            background: event.color, flexShrink: 0,
                          }} />
                          {imp}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expand indicator */}
                <div style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "rgba(212,175,55,0.4)",
                  letterSpacing: "0.1em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}>
                  <span style={{
                    display: "inline-block",
                    transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}>▾</span>
                  {isActive ? "Tutup" : "Selengkapnya"}
                </div>
              </div>

              {/* Center node */}
              <div style={{
                width: isMobile ? "48px" : "96px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: isMobile ? "0" : "20px",
                flexShrink: 0,
                position: "relative",
              }}>
                <div style={{
                  width: isActive || isHovered ? "48px" : "40px",
                  height: isActive || isHovered ? "48px" : "40px",
                  borderRadius: "50%",
                  background: isActive
                    ? event.color
                    : `rgba(${parseInt(event.color.slice(1,3),16)},${parseInt(event.color.slice(3,5),16)},${parseInt(event.color.slice(5,7),16)},0.15)`,
                  border: `1.5px solid ${event.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isActive || isHovered ? "22px" : "18px",
                  transition: "all 0.3s ease",
                  boxShadow: isActive
                    ? `0 0 20px ${event.color}55, 0 0 40px ${event.color}22`
                    : "none",
                  zIndex: 2,
                  position: "relative",
                }}>
                  {event.icon}
                </div>
              </div>

              {/* Spacer for opposite side */}
              {!isMobile && <div style={{ width: "calc(50% - 48px)" }} />}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "40px 24px",
        borderTop: "1px solid rgba(212,175,55,0.1)",
        position: "relative",
        zIndex: 2,
      }}>
        <p style={{
          fontSize: "12px",
          color: "rgba(212,175,55,0.3)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          margin: 0,
        }}>
          Spekulasi Historis · Bukan Fakta Sejarah · Dibuat untuk Eksplorasi Ide
        </p>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0D0A05; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}
