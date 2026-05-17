import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import cncHero from "@/assets/cnc-hero.jpg";
import cncMaterials from "@/assets/cnc-materials.jpg";
import cncWorkshop from "@/assets/cnc-workshop.jpg";
import cncGallery1 from "@/assets/cnc-gallery1.jpg";
import facadeProject from "@/assets/facade-project.jpg";
import ceramicCut from "@/assets/ceramic-cut.jpg";
import plywoodCnc from "@/assets/plywood-cnc.jpg";
import hplPanels from "@/assets/hpl-panels.jpg";
import cncCuttingVideo from "@/assets/cnc-cutting-video.mp4";
import cncMillingVideo from "@/assets/cnc-milling-video.mp4";
import CookieConsent from "@/components/CookieConsent";
import CallButton from "@/components/CallButton";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const C = {
  accent: "#D67A1A",
  bg: "#121212",
  surface: "#1E1E1E",
  border: "#2a2a2a",
  text: "#F0EAE1",
  textDim: "#9a9088",
};

const GALLERY_IMAGES = [cncHero, cncMaterials, cncWorkshop, cncGallery1, facadeProject, ceramicCut, plywoodCnc, hplPanels];

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const InquiryForm = () => {
  const [sent, setSent] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const inputStyle = { background: C.bg, border: `1px solid ${C.border}`, color: "#fff" };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accepted || loading) return;
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch(`${API_URL}/api/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          material: fd.get("material"),
          message: fd.get("message"),
          website: fd.get("website"), // honeypot
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="inquiry" className="scroll-mt-24">
      {sent ? (
        <div className="text-center py-20 animate-scale-in">
          <div className="text-6xl mb-4">✓</div>
          <p className="text-2xl font-bold">{t.sent}</p>
          <p className="mt-2" style={{ color: C.textDim }}>{t.sentSub}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto">
          <input name="name" placeholder={t.name} required className="px-4 sm:px-5 py-3 sm:py-4 text-sm focus:outline-none focus:ring-2" style={inputStyle} />
          <input name="email" type="email" placeholder={t.email} required className="px-4 sm:px-5 py-3 sm:py-4 text-sm focus:outline-none" style={inputStyle} />
          <input name="phone" placeholder={t.phone} className="px-4 sm:px-5 py-3 sm:py-4 text-sm focus:outline-none" style={inputStyle} />
          <select name="material" className="px-4 sm:px-5 py-3 sm:py-4 text-sm focus:outline-none" style={inputStyle}>
            <option>{t.selectMaterial}</option>
            <option>{t.etalbond}</option>
            <option>HPL</option>
            <option>MDF</option>
            <option>{t.ceramics}</option>
            <option>{t.other}</option>
          </select>
          <textarea name="message" placeholder={t.describe} rows={5} required className="px-4 sm:px-5 py-3 sm:py-4 text-sm focus:outline-none md:col-span-2 resize-none" style={inputStyle} />
          {/* Honeypot — hidden from users, bots fill it */}
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <label className="md:col-span-2 flex items-start gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 size-5 shrink-0 cursor-pointer" style={{ accentColor: C.accent }} required />
            <span className="text-xs leading-relaxed" style={{ color: C.textDim }}>
              {t.accept} — <Link to="/terms" className="underline hover:opacity-70" style={{ color: C.accent }}>{t.terms}</Link> & <Link to="/privacy" className="underline hover:opacity-70" style={{ color: C.accent }}>{t.privacy}</Link>
            </span>
          </label>
          {error && <p className="md:col-span-2 text-sm text-red-400">⚠ {error}</p>}
          <button type="submit" className="md:col-span-2 py-4 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" disabled={!accepted || loading} style={{ background: C.accent, color: C.bg }}>
            {loading ? "..." : `✉ ${t.sendInquiry}`}
          </button>
        </form>
      )}
    </div>
  );
};

const VideoSection = () => {
  const { t } = useLanguage();
  return (
    <Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {[{ src: cncCuttingVideo, title: t.cncCutting, desc: t.videoCuttingDesc },
          { src: cncMillingVideo, title: t.cncMilling, desc: t.videoMillingDesc }].map((v, i) => (
          <div key={i} className="relative overflow-hidden group" style={{ border: `1px solid ${C.border}` }}>
            <video src={v.src} autoPlay muted loop playsInline className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.85))" }}>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.accent }}>{v.title}</span>
              <p className="text-xs sm:text-sm mt-1" style={{ color: C.textDim }}>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
};

const StatsBar = () => {
  const { t } = useLanguage();
  const stats = [
    { value: "500+", label: t.statProjects },
    { value: "±0.01mm", label: t.statPrecision },
    { value: "15+", label: t.statYears },
    { value: "24/7", label: t.statSupport },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      {stats.map((s, i) => (
        <Reveal key={s.label}>
          <div className="p-6 sm:p-8 text-center h-full" style={{ borderRight: i < 3 ? `1px solid ${C.border}` : "none", background: C.surface }}>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: C.accent }}>{s.value}</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-widest opacity-60">{s.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

const GallerySection = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    {GALLERY_IMAGES.map((img, i) => (
      <Reveal key={i}>
        <div className="overflow-hidden group cursor-pointer" style={{ border: `1px solid ${C.border}` }}>
          <img src={img} alt={`Project ${i + 1}`} loading="lazy" className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
        </div>
      </Reveal>
    ))}
  </div>
);

const Index = () => {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { id: "services", label: t.services },
    { id: "about", label: t.about },
    { id: "gallery", label: t.gallery },
    { id: "contacts", label: t.contacts },
  ];

  const MATERIALS = [
    { id: "01", title: t.matEtalbondTitle, subtitle: t.matEtalbondSub, desc: t.matEtalbondDesc, img: facadeProject },
    { id: "02", title: t.matHplTitle, subtitle: t.matHplSub, desc: t.matHplDesc, img: hplPanels },
    { id: "03", title: t.matMdfTitle, subtitle: t.matMdfSub, desc: t.matMdfDesc, img: plywoodCnc },
    { id: "04", title: t.matCeramicTitle, subtitle: t.matCeramicSub, desc: t.matCeramicDesc, img: ceramicCut },
  ];

  return (
    <div className="relative">
      <CookieConsent />
      <CallButton />

      <div className="min-h-screen font-manrope overflow-x-hidden" style={{ background: C.bg, color: C.text }}>
        <header className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-5 sticky top-0 z-50 gap-3" style={{ background: C.bg, borderBottom: `4px solid ${C.border}` }}>
          <div className="font-oswald text-2xl sm:text-3xl lg:text-4xl tracking-tighter uppercase font-bold">Etalstyle</div>
          <nav className="hidden lg:flex gap-8 xl:gap-10 text-sm font-semibold tracking-widest uppercase" style={{ color: C.textDim }}>
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`} className="transition-colors"
                onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textDim)}>{item.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher accentColor={C.accent} bgColor={C.bg} borderColor={C.border} textDimColor={C.textDim} />
            <a href="#inquiry" className="hidden sm:inline-block font-oswald text-sm lg:text-lg px-4 lg:px-8 py-2.5 lg:py-3 uppercase tracking-wider font-bold hover:opacity-90 transition-opacity" style={{ background: C.accent, color: C.bg }}>{t.sendInquiry}</a>
            <button aria-label="menu" className="lg:hidden p-2" onClick={() => setMenuOpen(o => !o)} style={{ color: C.text }}>
              <div className="w-6 h-0.5 mb-1.5" style={{ background: C.text }} />
              <div className="w-6 h-0.5 mb-1.5" style={{ background: C.text }} />
              <div className="w-6 h-0.5" style={{ background: C.text }} />
            </button>
          </div>
        </header>

        {menuOpen && (
          <div className="lg:hidden fixed inset-0 top-[68px] z-40 p-6 flex flex-col gap-5" style={{ background: C.bg }}>
            {NAV_ITEMS.map(item => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)} className="font-oswald text-2xl uppercase tracking-wider" style={{ color: C.text }}>{item.label}</a>
            ))}
            <a href="#inquiry" onClick={() => setMenuOpen(false)} className="mt-4 font-oswald text-base px-6 py-3 uppercase tracking-wider font-bold text-center" style={{ background: C.accent, color: C.bg }}>{t.sendInquiry}</a>
          </div>
        )}

        <section className="flex flex-col lg:flex-row min-h-[80vh]">
          <div className="flex-1 p-6 sm:p-10 lg:p-24 flex flex-col justify-center gap-5 sm:gap-6" style={{ borderRight: `4px solid ${C.border}` }}>
            <div className="flex gap-4 items-center animate-fade-in">
              <div className="size-3" style={{ background: C.accent }} />
              <span className="font-oswald uppercase tracking-[0.2em] text-xs sm:text-sm" style={{ color: C.textDim }}>{t.industrialStandard}</span>
            </div>
            <h1 className="font-oswald text-5xl sm:text-6xl lg:text-8xl xl:text-9xl leading-[0.85] uppercase animate-fade-in-up">
              {t.heroLine1}<br />{t.heroLine2}<br /><span style={{ color: C.accent }}>{t.heroLine3}</span>
            </h1>
            <p className="text-base sm:text-lg max-w-[48ch] font-medium leading-relaxed mt-2 sm:mt-4 animate-fade-in-up delay-200" style={{ color: C.textDim }}>{t.heroDesc}</p>
          </div>
          <div className="flex-1 p-6 sm:p-8 lg:p-16 flex items-center justify-center" style={{ background: C.surface }}>
            <div className="relative w-full animate-scale-in delay-300" style={{ background: C.bg, borderLeft: `8px solid ${C.accent}`, borderBottom: `8px solid ${C.accent}`, padding: "1rem" }}>
              <video src={cncCuttingVideo} autoPlay muted loop playsInline className="w-full aspect-[4/3] object-cover grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
            </div>
          </div>
        </section>

        <StatsBar />

        <section id="services" className="p-6 sm:p-10 lg:p-20" style={{ background: C.bg, borderTop: `4px solid ${C.border}` }}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end pb-6 sm:pb-8 mb-10 sm:mb-16 gap-3" style={{ borderBottom: `4px solid ${C.border}` }}>
            <h2 className="font-oswald text-4xl sm:text-5xl lg:text-7xl uppercase leading-none">{t.materialsTitle}</h2>
            <p className="font-oswald text-base sm:text-xl uppercase tracking-widest" style={{ color: C.accent }}>{t.tolerance}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {MATERIALS.map(m => (
              <Reveal key={m.id}>
                <div className="group flex flex-col gap-4 sm:gap-6 hover:scale-[1.02] transition-all duration-300 cursor-default h-full"
                  style={{ border: `2px solid ${C.border}`, background: `${C.surface}50`, padding: "1.25rem" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = C.accent)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                  <img src={m.img} alt={m.title} loading="lazy" className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="flex justify-between items-start font-oswald"><span className="text-3xl sm:text-4xl tabular-nums" style={{ color: C.accent }}>{m.id}</span></div>
                  <div>
                    <h3 className="font-oswald text-xl sm:text-2xl uppercase mb-1">{m.title}</h3>
                    <p className="text-xs uppercase tracking-widest mb-3" style={{ color: C.accent }}>{m.subtitle}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.textDim }}>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="p-6 sm:p-10 lg:p-20" style={{ background: C.surface, borderTop: `4px solid ${C.border}` }}>
          <Reveal><h2 className="font-oswald text-3xl sm:text-4xl uppercase mb-8 sm:mb-10">{t.videoTitle}</h2></Reveal>
          <VideoSection />
        </section>

        <section id="about" className="p-6 sm:p-10 lg:p-20" style={{ background: C.bg, borderTop: `4px solid ${C.border}` }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Reveal><img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover" style={{ borderLeft: `8px solid ${C.accent}`, borderBottom: `8px solid ${C.accent}` }} /></Reveal>
            <Reveal>
              <div>
                <h2 className="font-oswald text-4xl sm:text-5xl uppercase mb-4 sm:mb-6">{t.aboutTitle}</h2>
                <p className="text-base sm:text-lg leading-relaxed" style={{ color: C.textDim }}>{t.aboutDesc}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="gallery" className="p-6 sm:p-10 lg:p-16" style={{ background: C.bg, borderTop: `4px solid ${C.border}` }}>
          <Reveal><h2 className="font-oswald text-3xl sm:text-4xl uppercase text-center mb-8 sm:mb-12">{t.galleryTitle}</h2></Reveal>
          <GallerySection />
        </section>

        <section id="contacts" className="p-6 sm:p-10 lg:p-20" style={{ background: C.surface, borderTop: `4px solid ${C.border}` }}>
          <Reveal><h2 className="font-oswald text-3xl sm:text-4xl uppercase text-center mb-8 sm:mb-12">{t.contactsTitle}</h2></Reveal>
          <InquiryForm />
        </section>

        <Footer accentColor={C.accent} bgColor={C.bg} surfaceColor={C.surface} borderColor={C.border} textDimColor={C.textDim} fontClass="font-oswald" />
      </div>
    </div>
  );
};

export default Index;
