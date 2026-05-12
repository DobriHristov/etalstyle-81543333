import { useState, useEffect, useRef } from "react";
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
import cncCuttingVideo from "@/assets/cnc-cutting-video.mp4.asset.json";
import cncMillingVideo from "@/assets/cnc-milling-video.mp4.asset.json";
import CookieConsent from "@/components/CookieConsent";
import CallButton from "@/components/CallButton";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/* ===== INDUSTRIAL THEME ===== */
const C = {
  accent: "#D67A1A",
  bg: "#121212",
  surface: "#1E1E1E",
  border: "#2a2a2a",
  text: "#F0EAE1",
  textDim: "#9a9088",
};

const PARTNERS = ["Етем", "Алукобонд", "Кроношпан", "Egger", "Fundermax", "Trespa"];
const GALLERY_IMAGES = [cncHero, cncMaterials, cncWorkshop, cncGallery1, facadeProject, ceramicCut, plywoodCnc, hplPanels];

/* ===== INTERSECTION OBSERVER HOOK ===== */
const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const Reveal = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

/* ===== INQUIRY FORM ===== */
const InquiryForm = () => {
  const [sent, setSent] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { t } = useLanguage();
  const inputStyle = { background: C.bg, border: `1px solid ${C.border}`, color: "#fff" };
  return (
    <div id="inquiry" className="scroll-mt-24">
      {sent ? (
        <div className="text-center py-20 animate-scale-in">
          <div className="text-6xl mb-4">✓</div>
          <p className="text-2xl font-bold">{t.sent}</p>
          <p className="mt-2" style={{ color: C.textDim }}>{t.sentSub}</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (accepted) setSent(true); }} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <input placeholder={t.name} required className="px-5 py-4 text-sm focus:outline-none focus:ring-2" style={inputStyle} />
          <input type="email" placeholder={t.email} required className="px-5 py-4 text-sm focus:outline-none" style={inputStyle} />
          <input placeholder={t.phone} className="px-5 py-4 text-sm focus:outline-none" style={inputStyle} />
          <select className="px-5 py-4 text-sm focus:outline-none" style={inputStyle}>
            <option>{t.selectMaterial}</option>
            <option>{t.etalbond}</option>
            <option>HPL</option>
            <option>MDF</option>
            <option>{t.ceramics}</option>
            <option>{t.other}</option>
          </select>
          <textarea placeholder={t.describe} rows={5} required className="px-5 py-4 text-sm focus:outline-none md:col-span-2 resize-none" style={inputStyle} />
          <label className="md:col-span-2 flex items-start gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 size-5 shrink-0 cursor-pointer" style={{ accentColor: C.accent }} required />
            <span className="text-xs leading-relaxed" style={{ color: C.textDim }}>
              {t.accept} — <Link to="/terms" className="underline hover:opacity-70" style={{ color: C.accent }}>{t.terms}</Link> & <Link to="/privacy" className="underline hover:opacity-70" style={{ color: C.accent }}>{t.privacy}</Link>
            </span>
          </label>
          <button type="submit" className="md:col-span-2 py-4 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" disabled={!accepted} style={{ background: C.accent, color: C.bg }}>
            ✉ {t.sendInquiry}
          </button>
        </form>
      )}
    </div>
  );
};

/* ===== VIDEO SECTION ===== */
const VideoSection = () => {
  const { t } = useLanguage();
  return (
    <Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative overflow-hidden group" style={{ border: `1px solid ${C.border}` }}>
          <video src={cncCuttingVideo.url} autoPlay muted loop playsInline className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.accent }}>{t.cncCutting}</span>
            <p className="text-sm mt-1" style={{ color: C.textDim }}>{t.videoCuttingDesc}</p>
          </div>
        </div>
        <div className="relative overflow-hidden group" style={{ border: `1px solid ${C.border}` }}>
          <video src={cncMillingVideo.url} autoPlay muted loop playsInline className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: C.accent }}>{t.cncMilling}</span>
            <p className="text-sm mt-1" style={{ color: C.textDim }}>{t.videoMillingDesc}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ===== STATS BAR ===== */
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
          <div className="p-8 text-center" style={{ borderRight: i < 3 ? `1px solid ${C.border}` : "none", background: C.surface }}>
            <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: C.accent }}>{s.value}</div>
            <div className="text-xs uppercase tracking-widest opacity-60">{s.label}</div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

/* ===== GALLERY ===== */
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

/* ===== MAIN PAGE ===== */
const Index = () => {
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { id: "services", label: t.services },
    { id: "about", label: t.about },
    { id: "partners", label: t.partners },
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

      <div className="min-h-screen font-manrope" style={{ background: C.bg, color: C.text }}>
        <header className="flex flex-wrap justify-between items-center px-6 lg:px-8 py-5 sticky top-0 z-50 gap-4" style={{ background: C.bg, borderBottom: `4px solid ${C.border}` }}>
          <div className="font-oswald text-3xl lg:text-4xl tracking-tighter uppercase font-bold">Etalsyle</div>
          <nav className="hidden lg:flex gap-10 text-sm font-semibold tracking-widest uppercase" style={{ color: C.textDim }}>
            {NAV_ITEMS.map(item => <a key={item.id} href={`#${item.id}`} className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = C.accent)} onMouseLeave={e => (e.currentTarget.style.color = C.textDim)}>{item.label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher accentColor={C.accent} bgColor={C.bg} borderColor={C.border} textDimColor={C.textDim} />
            <a href="#inquiry" className="font-oswald text-base lg:text-lg px-6 lg:px-8 py-3 uppercase tracking-wider font-bold hover:opacity-90 transition-opacity" style={{ background: C.accent, color: C.bg }}>{t.sendInquiry}</a>
          </div>
        </header>

        <section className="flex flex-col lg:flex-row min-h-[85vh]">
          <div className="flex-1 p-10 lg:p-24 flex flex-col justify-center gap-6" style={{ borderRight: `4px solid ${C.border}` }}>
            <div className="flex gap-4 items-center animate-fade-in">
              <div className="size-3" style={{ background: C.accent }} />
              <span className="font-oswald uppercase tracking-[0.2em] text-sm" style={{ color: C.textDim }}>{t.industrialStandard}</span>
            </div>
            <h1 className="font-oswald text-6xl lg:text-8xl xl:text-9xl leading-[0.85] uppercase animate-fade-in-up">
              {t.heroLine1}<br />{t.heroLine2}<br /><span style={{ color: C.accent }}>{t.heroLine3}</span>
            </h1>
            <p className="text-lg max-w-[48ch] font-medium leading-relaxed mt-4 animate-fade-in-up delay-200" style={{ color: C.textDim }}>{t.heroDesc}</p>
          </div>
          <div className="flex-1 p-8 lg:p-16 flex items-center justify-center" style={{ background: C.surface }}>
            <div className="relative w-full animate-scale-in delay-300" style={{ background: C.bg, borderLeft: `8px solid ${C.accent}`, borderBottom: `8px solid ${C.accent}`, padding: "1rem" }}>
              <video src={cncCuttingVideo.url} autoPlay muted loop playsInline className="w-full aspect-[4/3] object-cover grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
            </div>
          </div>
        </section>

        <StatsBar />

        <section id="services" className="p-10 lg:p-20" style={{ background: C.bg, borderTop: `4px solid ${C.border}` }}>
          <div className="flex justify-between items-end pb-8 mb-16" style={{ borderBottom: `4px solid ${C.border}` }}>
            <h2 className="font-oswald text-5xl lg:text-7xl uppercase leading-none">{t.materialsTitle}</h2>
            <p className="font-oswald text-xl uppercase tracking-widest hidden md:block" style={{ color: C.accent }}>{t.tolerance}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {MATERIALS.map(m => (
              <Reveal key={m.id}>
                <div className="group flex flex-col gap-6 hover:scale-[1.02] transition-all duration-300 cursor-default" style={{ border: `2px solid ${C.border}`, background: `${C.surface}50`, padding: "1.5rem" }} onMouseEnter={e => (e.currentTarget.style.borderColor = C.accent)} onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                  <img src={m.img} alt={m.title} loading="lazy" className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="flex justify-between items-start font-oswald"><span className="text-4xl tabular-nums" style={{ color: C.accent }}>{m.id}</span></div>
                  <div>
                    <h3 className="font-oswald text-2xl uppercase mb-1">{m.title}</h3>
                    <p className="text-xs uppercase tracking-widest mb-3" style={{ color: C.accent }}>{m.subtitle}</p>
                    <p className="text-sm leading-relaxed" style={{ color: C.textDim }}>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="p-10 lg:p-20" style={{ background: C.surface, borderTop: `4px solid ${C.border}` }}>
          <Reveal><h2 className="font-oswald text-4xl uppercase mb-10">{t.videoTitle}</h2></Reveal>
          <VideoSection />
        </section>

        <section id="about" className="p-10 lg:p-20" style={{ background: C.bg, borderTop: `4px solid ${C.border}` }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal><img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover" style={{ borderLeft: `8px solid ${C.accent}`, borderBottom: `8px solid ${C.accent}` }} /></Reveal>
            <Reveal>
              <div>
                <h2 className="font-oswald text-5xl uppercase mb-6">{t.aboutTitle}</h2>
                <p className="text-lg leading-relaxed" style={{ color: C.textDim }}>{t.aboutDesc}</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="partners" className="p-10 lg:p-16" style={{ background: C.surface, borderTop: `4px solid ${C.border}` }}>
          <Reveal><h2 className="font-oswald text-4xl uppercase text-center mb-12">{t.partnersTitle}</h2></Reveal>
          <div className="flex flex-wrap justify-center gap-6">
            {PARTNERS.map(p => <Reveal key={p}><div className="font-oswald text-xl px-10 py-5 uppercase hover:scale-105 transition-all" style={{ color: C.textDim, border: `2px solid ${C.border}` }} onMouseEnter={e => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = C.accent; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim; }}>{p}</div></Reveal>)}
          </div>
        </section>

        <section id="gallery" className="p-10 lg:p-16" style={{ background: C.bg, borderTop: `4px solid ${C.border}` }}>
          <Reveal><h2 className="font-oswald text-4xl uppercase text-center mb-12">{t.galleryTitle}</h2></Reveal>
          <GallerySection />
        </section>

        <section id="contacts" className="p-10 lg:p-20" style={{ background: C.surface, borderTop: `4px solid ${C.border}` }}>
          <Reveal><h2 className="font-oswald text-4xl uppercase text-center mb-12">{t.contactsTitle}</h2></Reveal>
          <InquiryForm />
        </section>

        <Footer accentColor={C.accent} bgColor={C.bg} surfaceColor={C.surface} borderColor={C.border} textDimColor={C.textDim} fontClass="font-oswald" />
      </div>
    </div>
  );
};

export default Index;
