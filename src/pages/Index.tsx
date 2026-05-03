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

/* ===== LANGUAGE SWITCHER ===== */
const LanguageSwitcher = ({ borderColor = "rgba(255,255,255,0.2)" }: { borderColor?: string }) => {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === "bg" ? "en" : "bg")}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border hover:bg-white/10 transition-all shrink-0"
      style={{ borderColor }}
    >
      <span className="text-base leading-none">{lang === "bg" ? "🇬🇧" : "🇧🇬"}</span>
      {lang === "bg" ? "EN" : "BG"}
    </button>
  );
};

const NAV_ITEMS = ["Услуги", "За нас", "Партньори", "Галерия", "Контакти"];
const PHONE = "+359888123456";

const MATERIALS = [
  { id: "01", title: "Еталбонд", subtitle: "Aluminium Composite", desc: "Прецизно фрезоване и разкрой на композитни панели за вентилируеми архитектурни фасади. V-образни канали за сгъване без нарушаване на лицевия слой.", specs: ["Дебелина: 2-6mm", "V-Bit 90°"], img: facadeProject },
  { id: "02", title: "HPL Панели", subtitle: "High-Pressure Laminate", desc: "Обработка на високоустойчиви плоскости за екстериор и интериор. Чист срез без обгаряне на ръбовете, дори при висока плътност.", specs: ["Дебелина: 4-12mm", "18m/min"], img: hplPanels },
  { id: "03", title: "MDF & Шперплат", subtitle: "Wood Fiber & Veneer", desc: "Комплексно 2.5D и 3D фрезоване на детайли за мебелната индустрия. Нестинг разкрой за максимална оптимизация.", specs: ["Nesting", "3D фрезоване"], img: plywoodCnc },
  { id: "04", title: "Керамика", subtitle: "Porcelain & Tile", desc: "Диамантено рязане на широкоформатен гранитогрес и керамични плочи. Водно охлаждане за перфектен ръб без микропукнатини.", specs: ["Диамант", "Водно охл."], img: ceramicCut },
];

const PARTNERS = ["Етем", "Алукобонд", "Кроношпан", "Egger", "Fundermax", "Trespa"];
const GALLERY_IMAGES = [cncHero, cncMaterials, cncWorkshop, cncGallery1, facadeProject, ceramicCut, plywoodCnc, hplPanels];
const STATS = [
  { value: "500+", label: "Проекти" },
  { value: "±0.01mm", label: "Точност" },
  { value: "15+", label: "Години опит" },
  { value: "24/7", label: "Поддръжка" },
];

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
const InquiryForm = ({ accentColor, bgColor, borderColor, textDimColor }: { accentColor: string; bgColor: string; borderColor: string; textDimColor: string }) => {
  const [sent, setSent] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const { t } = useLanguage();
  const inputStyle = { background: bgColor, border: `1px solid ${borderColor}`, color: "#fff" };
  return (
    <div id="inquiry" className="scroll-mt-24">
      {sent ? (
        <div className="text-center py-20 animate-scale-in">
          <div className="text-6xl mb-4">✓</div>
          <p className="text-2xl font-bold">{t.sent}</p>
          <p className="mt-2" style={{ color: textDimColor }}>{t.sentSub}</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (accepted) setSent(true); }} className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <input placeholder={t.name} required className="px-5 py-4 text-sm focus:outline-none focus:ring-2 transition-shadow" style={inputStyle} />
          <input type="email" placeholder={t.email} required className="px-5 py-4 text-sm focus:outline-none" style={inputStyle} />
          <input placeholder={t.phone} className="px-5 py-4 text-sm focus:outline-none" style={inputStyle} />
          <select className="px-5 py-4 text-sm focus:outline-none" style={inputStyle}>
            <option>{t.selectMaterial}</option>
            <option>{t.etalbond}</option>
            <option>HPL</option>
            <option>MDF / Шперплат</option>
            <option>{t.ceramics}</option>
            <option>{t.other}</option>
          </select>
          <textarea placeholder={t.describe} rows={5} required className="px-5 py-4 text-sm focus:outline-none md:col-span-2 resize-none" style={inputStyle} />
          <label className="md:col-span-2 flex items-start gap-3 cursor-pointer select-none group">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 size-5 accent-current shrink-0 cursor-pointer" style={{ accentColor }} required />
            <span className="text-xs leading-relaxed" style={{ color: textDimColor }}>
              {t.accept} — <Link to="/terms" className="underline hover:opacity-70" style={{ color: accentColor }}>{t.terms}</Link> & <Link to="/privacy" className="underline hover:opacity-70" style={{ color: accentColor }}>{t.privacy}</Link>
            </span>
          </label>
          <button type="submit" className="md:col-span-2 py-4 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100" disabled={!accepted} style={{ background: accentColor, color: bgColor }}>
            ✉ {t.sendInquiry}
          </button>
        </form>
      )}
    </div>
  );
};

/* ===== VIDEO SECTION ===== */
const VideoSection = ({ accentColor, borderColor, textDimColor }: { accentColor: string; borderColor: string; textDimColor: string }) => (
  <Reveal>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="relative overflow-hidden group" style={{ border: `1px solid ${borderColor}` }}>
        <video src={cncCuttingVideo.url} autoPlay muted loop playsInline className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>CNC Рязане</span>
          <p className="text-sm mt-1" style={{ color: textDimColor }}>Прецизно рязане на алуминиеви композитни панели</p>
        </div>
      </div>
      <div className="relative overflow-hidden group" style={{ border: `1px solid ${borderColor}` }}>
        <video src={cncMillingVideo.url} autoPlay muted loop playsInline className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>CNC Фрезоване</span>
          <p className="text-sm mt-1" style={{ color: textDimColor }}>3D фрезоване на MDF детайли</p>
        </div>
      </div>
    </div>
  </Reveal>
);

/* ===== STATS BAR ===== */
const StatsBar = ({ accentColor, borderColor, bgColor }: { accentColor: string; borderColor: string; bgColor: string }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}` }}>
    {STATS.map((s, i) => (
      <Reveal key={s.label}>
        <div className="p-8 text-center" style={{ borderRight: i < 3 ? `1px solid ${borderColor}` : "none", background: bgColor }}>
          <div className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: accentColor }}>{s.value}</div>
          <div className="text-xs uppercase tracking-widest opacity-60">{s.label}</div>
        </div>
      </Reveal>
    ))}
  </div>
);

/* ===== GALLERY ===== */
const GallerySection = ({ borderColor }: { borderColor: string }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
    {GALLERY_IMAGES.map((img, i) => (
      <Reveal key={i}>
        <div className="overflow-hidden group cursor-pointer" style={{ border: `1px solid ${borderColor}` }}>
          <img src={img} alt={`Проект ${i + 1}`} loading="lazy" className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
        </div>
      </Reveal>
    ))}
  </div>
);

/* ===== DESIGN 1: Industrial Precision (Cyan) ===== */
const Design1 = () => {
  const c = { accent: "#00e5ff", bg: "#09090a", surface: "#121214", border: "#27272a", text: "#f4f4f5", textDim: "#8b8b93" };
  return (
    <div className="min-h-screen font-display uppercase" style={{ background: c.bg, color: c.text }}>
      <nav className="fixed top-0 w-full z-50" style={{ background: "rgba(9,9,10,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-stretch h-16">
          <div className="flex items-center px-6 lg:px-8 shrink-0" style={{ borderRight: `1px solid ${c.border}` }}>
            <div className="flex items-center gap-3">
              <div className="size-2 animate-pulse-glow" style={{ background: c.accent, color: c.accent }} />
              <span className="font-mono-jb font-extrabold text-xl tracking-tighter">ETALSYLE<span style={{ color: c.accent }}>_</span></span>
            </div>
          </div>
          <div className="flex-1 items-center justify-center gap-8 px-8 hidden lg:flex font-mono-jb text-xs font-medium tracking-widest" style={{ color: c.textDim }}>
            {NAV_ITEMS.map(item => <a key={item} href={`#${item}`} className="hover:opacity-100 transition-colors" onMouseEnter={e => (e.currentTarget.style.color = c.accent)} onMouseLeave={e => (e.currentTarget.style.color = c.textDim)}>{item}</a>)}
          </div>
          <div className="flex items-center shrink-0" style={{ borderLeft: `1px solid ${c.border}` }}>
            <div className="px-4"><LanguageSwitcher borderColor={c.border} /></div>
            <a href="#inquiry" className="shrink-0 flex items-center px-6 lg:px-8 h-full font-mono-jb text-sm font-bold tracking-wider hover:opacity-90 transition-opacity" style={{ background: c.accent, color: c.bg }}>Изпрати запитване</a>
          </div>
        </div>
      </nav>

      <section className="pt-16 min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col justify-center p-10 lg:p-20 relative" style={{ borderRight: `1px solid ${c.border}` }}>
          <div className="font-mono-jb text-xs mb-6 flex items-center gap-4 animate-fade-in" style={{ color: c.accent }}>
            <span>SYS.STATUS: <span style={{ color: c.text }}>ONLINE</span></span>
            <span className="w-8 h-px" style={{ background: c.border }} />
            <span className="tabular-nums">COORD: X.294 Y.881</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 animate-fade-in-up">
            Рязане и Фрезоване<br /><span style={{ color: c.accent }}>с CNC Router</span>
          </h1>
          <p className="font-mono-jb text-sm max-w-[55ch] leading-relaxed mb-12 lowercase animate-fade-in-up delay-200" style={{ color: c.textDim }}>
            <span className="uppercase" style={{ color: c.accent }}>//</span> Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.
          </p>
          <div className="grid grid-cols-3 gap-px w-max animate-fade-in-up delay-400" style={{ background: c.border }}>
            {[["ТОЛЕРАНС", "±0.01mm"], ["ШПИНДЕЛ", "24,000 RPM"], ["МАСИВ", "3×2m"]].map(([l, v]) => (
              <div key={l} className="p-4 flex flex-col gap-1" style={{ background: c.bg }}>
                <span className="font-mono-jb text-[10px]" style={{ color: c.textDim }}>{l}</span>
                <span className="font-mono-jb text-lg tabular-nums">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden" style={{ background: c.surface }}>
          <video src={cncCuttingVideo.url} autoPlay muted loop playsInline className="w-full h-full object-cover mix-blend-luminosity contrast-125 opacity-80" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${c.bg}cc)` }} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px absolute top-1/2" style={{ background: `${c.accent}40` }} />
            <div className="h-full w-px absolute left-1/2" style={{ background: `${c.accent}40` }} />
            <div className="size-12 flex items-center justify-center" style={{ border: `1px solid ${c.accent}80` }}>
              <div className="size-1" style={{ background: c.accent }} />
            </div>
          </div>
        </div>
      </section>

      <StatsBar accentColor={c.accent} borderColor={c.border} bgColor={c.surface} />

      <section id="Услуги" style={{ background: c.surface }}>
        <div className="flex items-center justify-between px-8 py-4" style={{ background: c.bg, borderBottom: `1px solid ${c.border}` }}>
          <h2 className="font-mono-jb text-sm font-bold tracking-widest">ОБРАБОТВАЕМИ МАТЕРИАЛИ</h2>
          <span className="font-mono-jb text-[10px]" style={{ color: c.accent }}>[ IDX_01.MAT ]</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {MATERIALS.map(m => (
            <Reveal key={m.id}>
              <div className="group p-8 relative hover:bg-black/30 transition-colors" style={{ borderBottom: `1px solid ${c.border}`, borderRight: `1px solid ${c.border}` }}>
                <div className="absolute top-0 left-0 w-full h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ background: c.accent }} />
                <div className="flex gap-6">
                  <img src={m.img} alt={m.title} loading="lazy" className="w-32 h-32 object-cover shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold tracking-tight">{m.title}<br /><span className="text-sm font-mono-jb font-normal mt-1 block" style={{ color: c.textDim }}>[ {m.subtitle.toUpperCase()} ]</span></h3>
                      <span className="font-mono-jb text-xs px-2 py-1" style={{ color: c.accent, border: `1px solid ${c.accent}40` }}>{m.id}</span>
                    </div>
                    <p className="font-mono-jb text-sm lowercase max-w-[45ch] mb-4" style={{ color: c.textDim }}>{m.desc}</p>
                    <div className="flex gap-3 font-mono-jb text-[10px]" style={{ color: c.textDim }}>
                      {m.specs.map(s => <span key={s} className="px-2 py-1" style={{ background: c.bg }}>{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="p-10 lg:p-20" style={{ background: c.bg }}>
        <Reveal><h2 className="font-mono-jb text-sm font-bold tracking-widest mb-10">ВИДЕО ПОРТФОЛИО</h2></Reveal>
        <VideoSection accentColor={c.accent} borderColor={c.border} textDimColor={c.textDim} />
      </section>

      <section id="За нас" className="p-10 lg:p-20" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-6">За нас</h2>
              <p className="font-mono-jb text-sm leading-relaxed lowercase" style={{ color: c.textDim }}>
                Etalsyle е водеща компания в CNC обработката на материали в Пловдив, България. С модерно оборудване и екип от опитни специалисти, ние гарантираме най-високо качество. Работим с индустриални стандарти за прецизност и повторяемост. Над 15 години опит в обработката на еталбонд, HPL, MDF и керамика.
              </p>
            </div>
          </Reveal>
          <Reveal><img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover mix-blend-luminosity contrast-110 hover:mix-blend-normal transition-all duration-700" /></Reveal>
        </div>
      </section>

      <section id="Партньори" className="p-10 lg:p-16" style={{ background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Партньори</h2></Reveal>
        <div className="flex flex-wrap justify-center gap-6">
          {PARTNERS.map(p => <Reveal key={p}><div className="font-mono-jb text-lg px-8 py-4 hover:scale-105 transition-all cursor-default" style={{ color: c.textDim, border: `1px solid ${c.border}` }} onMouseEnter={e => { e.currentTarget.style.color = c.accent; e.currentTarget.style.borderColor = c.accent; }} onMouseLeave={e => { e.currentTarget.style.color = c.textDim; e.currentTarget.style.borderColor = c.border; }}>{p}</div></Reveal>)}
        </div>
      </section>

      <section id="Галерия" className="p-10 lg:p-16" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Галерия</h2></Reveal>
        <GallerySection borderColor={c.border} />
      </section>

      <section id="Контакти" className="p-10 lg:p-20" style={{ background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Контакти & Запитване</h2></Reveal>
        <InquiryForm accentColor={c.accent} bgColor={c.surface} borderColor={c.border} textDimColor={c.textDim} />
      </section>

      <Footer accentColor={c.accent} bgColor={c.bg} surfaceColor={c.surface} borderColor={c.border} textDimColor={c.textDim} fontClass="font-mono-jb" />
    </div>
  );
};

/* ===== DESIGN 2: Heavy Industrial (Amber) ===== */
const Design2 = () => {
  const c = { accent: "#D67A1A", bg: "#121212", surface: "#1E1E1E", border: "#2a2a2a", text: "#F0EAE1", textDim: "#9a9088" };
  return (
    <div className="min-h-screen font-manrope" style={{ background: c.bg, color: c.text }}>
      <header className="flex flex-wrap justify-between items-center px-8 py-6 sticky top-0 z-50" style={{ background: c.bg, borderBottom: `4px solid ${c.border}` }}>
        <div className="font-oswald text-4xl tracking-tighter uppercase font-bold">Etalsyle</div>
        <nav className="hidden lg:flex gap-10 text-sm font-semibold tracking-widest uppercase" style={{ color: c.textDim }}>
          {NAV_ITEMS.map(item => <a key={item} href={`#${item}`} className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = c.accent)} onMouseLeave={e => (e.currentTarget.style.color = c.textDim)}>{item}</a>)}
        </nav>
        <a href="#inquiry" className="font-oswald text-lg px-8 py-3 uppercase tracking-wider font-bold hover:opacity-90 transition-opacity" style={{ background: c.accent, color: c.bg }}>Изпрати запитване</a>
      </header>

      <section className="flex flex-col lg:flex-row min-h-[85vh]">
        <div className="flex-1 p-10 lg:p-24 flex flex-col justify-center gap-6" style={{ borderRight: `4px solid ${c.border}` }}>
          <div className="flex gap-4 items-center animate-fade-in"><div className="size-3" style={{ background: c.accent }} /><span className="font-oswald uppercase tracking-[0.2em] text-sm" style={{ color: c.textDim }}>Индустриален стандарт</span></div>
          <h1 className="font-oswald text-6xl lg:text-8xl xl:text-9xl leading-[0.85] uppercase animate-fade-in-up">Рязане и<br />Фрезоване<br /><span style={{ color: c.accent }}>с CNC</span></h1>
          <p className="text-lg max-w-[48ch] font-medium leading-relaxed mt-4 animate-fade-in-up delay-200" style={{ color: c.textDim }}>Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.</p>
        </div>
        <div className="flex-1 p-8 lg:p-16 flex items-center justify-center" style={{ background: c.surface }}>
          <div className="relative w-full animate-scale-in delay-300" style={{ background: c.bg, borderLeft: `8px solid ${c.accent}`, borderBottom: `8px solid ${c.accent}`, padding: "1rem" }}>
            <video src={cncCuttingVideo.url} autoPlay muted loop playsInline className="w-full aspect-[4/3] object-cover grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
          </div>
        </div>
      </section>

      <StatsBar accentColor={c.accent} borderColor={c.border} bgColor={c.surface} />

      <section id="Услуги" className="p-10 lg:p-20" style={{ background: c.bg, borderTop: `4px solid ${c.border}` }}>
        <div className="flex justify-between items-end pb-8 mb-16" style={{ borderBottom: `4px solid ${c.border}` }}>
          <h2 className="font-oswald text-5xl lg:text-7xl uppercase leading-none">Материали</h2>
          <p className="font-oswald text-xl uppercase tracking-widest hidden md:block" style={{ color: c.accent }}>0.01mm Толеранс</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {MATERIALS.map(m => (
            <Reveal key={m.id}>
              <div className="group flex flex-col gap-6 hover:scale-[1.02] transition-all duration-300 cursor-default" style={{ border: `2px solid ${c.border}`, background: `${c.surface}50`, padding: "1.5rem" }} onMouseEnter={e => (e.currentTarget.style.borderColor = c.accent)} onMouseLeave={e => (e.currentTarget.style.borderColor = c.border)}>
                <img src={m.img} alt={m.title} loading="lazy" className="w-full aspect-[4/3] object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="flex justify-between items-start font-oswald"><span className="text-4xl tabular-nums" style={{ color: c.accent }}>{m.id}</span></div>
                <div>
                  <h3 className="font-oswald text-2xl uppercase mb-3">{m.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: c.textDim }}>{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="p-10 lg:p-20" style={{ background: c.surface, borderTop: `4px solid ${c.border}` }}>
        <Reveal><h2 className="font-oswald text-4xl uppercase mb-10">Видео</h2></Reveal>
        <VideoSection accentColor={c.accent} borderColor={c.border} textDimColor={c.textDim} />
      </section>

      <section id="За нас" className="p-10 lg:p-20" style={{ background: c.bg, borderTop: `4px solid ${c.border}` }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal><img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover" style={{ borderLeft: `8px solid ${c.accent}`, borderBottom: `8px solid ${c.accent}` }} /></Reveal>
          <Reveal>
            <div>
              <h2 className="font-oswald text-5xl uppercase mb-6">За нас</h2>
              <p className="text-lg leading-relaxed" style={{ color: c.textDim }}>Etalsyle е водеща компания в CNC обработката на материали в Пловдив. С модерно оборудване и екип от опитни специалисти, гарантираме най-високо качество. Нашата мисия е индустриална прецизност за всеки проект.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="Партньори" className="p-10 lg:p-16" style={{ background: c.surface, borderTop: `4px solid ${c.border}` }}>
        <Reveal><h2 className="font-oswald text-4xl uppercase text-center mb-12">Партньори</h2></Reveal>
        <div className="flex flex-wrap justify-center gap-6">
          {PARTNERS.map(p => <Reveal key={p}><div className="font-oswald text-xl px-10 py-5 uppercase hover:scale-105 transition-all" style={{ color: c.textDim, border: `2px solid ${c.border}` }} onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }} onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textDim; }}>{p}</div></Reveal>)}
        </div>
      </section>

      <section id="Галерия" className="p-10 lg:p-16" style={{ background: c.bg, borderTop: `4px solid ${c.border}` }}>
        <Reveal><h2 className="font-oswald text-4xl uppercase text-center mb-12">Галерия</h2></Reveal>
        <GallerySection borderColor={c.border} />
      </section>

      <section id="Контакти" className="p-10 lg:p-20" style={{ background: c.surface, borderTop: `4px solid ${c.border}` }}>
        <Reveal><h2 className="font-oswald text-4xl uppercase text-center mb-12">Контакти & Запитване</h2></Reveal>
        <InquiryForm accentColor={c.accent} bgColor={c.bg} borderColor={c.border} textDimColor={c.textDim} />
      </section>

      <Footer accentColor={c.accent} bgColor={c.bg} surfaceColor={c.surface} borderColor={c.border} textDimColor={c.textDim} fontClass="font-oswald" />
    </div>
  );
};

/* ===== DESIGN 3: Neon Brutalism (Orange) ===== */
const Design3 = () => {
  const c = { accent: "#FF4500", bg: "#030303", surface: "#0a0a0a", border: "#1a1a1a", text: "#ffffff", textDim: "#8A8A8C" };
  return (
    <div className="min-h-screen font-mono-jb antialiased" style={{ background: c.bg, color: c.text }}>
      <header className="flex items-center justify-between px-6 lg:px-12 py-5 sticky top-0 z-50" style={{ background: "rgba(3,3,3,0.85)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${c.accent}30` }}>
        <div className="text-3xl font-display font-bold tracking-tighter uppercase">Etalsyle</div>
        <nav className="hidden lg:flex gap-10 text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: c.textDim }}>
          {NAV_ITEMS.map(item => <a key={item} href={`#${item}`} className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = c.accent)} onMouseLeave={e => (e.currentTarget.style.color = c.textDim)}>{item}</a>)}
        </nav>
        <a href="#inquiry" className="text-[0.65rem] uppercase tracking-[0.15em] font-bold px-8 py-4 hover:opacity-90 transition-opacity" style={{ background: c.accent, color: c.bg }}>Изпрати запитване</a>
      </header>

      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48 px-6 lg:px-12 overflow-hidden" style={{ borderBottom: `1px solid ${c.accent}30` }}>
        <div className="absolute right-[33%] top-0 w-px h-full hidden lg:block" style={{ background: `${c.accent}15` }} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end relative z-10">
          <div className="lg:col-span-8">
            <div className="text-[0.65rem] uppercase tracking-[0.2em] mb-8 flex items-center gap-4 animate-fade-in" style={{ color: c.accent }}>
              <span className="w-12 h-px" style={{ background: c.accent }} /> Индустриална прецизност
            </div>
            <h1 className="text-[12vw] lg:text-[7vw] leading-[0.85] font-display font-bold tracking-tighter uppercase mb-12 animate-fade-in-up">
              Рязане и<br /><span style={{ color: c.accent }}>Фрезоване</span>
            </h1>
            <p className="text-sm max-w-[50ch] leading-relaxed uppercase tracking-wider pl-6 animate-fade-in-up delay-200" style={{ color: c.textDim, borderLeft: `2px solid ${c.accent}` }}>
              Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="w-full aspect-square p-2 relative group overflow-hidden animate-scale-in delay-300" style={{ background: c.surface, border: `1px solid ${c.accent}30` }}>
              <video src={cncMillingVideo.url} autoPlay muted loop playsInline className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center pointer-events-none" style={{ border: `1px solid ${c.accent}80` }}>
                <div className="w-1 h-1" style={{ background: c.accent }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsBar accentColor={c.accent} borderColor={`${c.accent}30`} bgColor={c.surface} />

      <section id="Услуги" className="px-6 lg:px-12 py-24" style={{ background: `${c.surface}50` }}>
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 pb-8 gap-8" style={{ borderBottom: `1px solid ${c.accent}30` }}>
          <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tighter uppercase">Спецификация<br />на материалите</h2>
          <span className="text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: c.accent }}>[ Индекс 01 — 04 ]</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-20">
          {MATERIALS.map((m, i) => (
            <Reveal key={m.id}>
              <div className={`group pt-8 transition-colors duration-500 ${i % 2 === 1 ? "lg:mt-32" : ""}`} style={{ borderTop: `1px solid ${c.textDim}30` }} onMouseEnter={e => (e.currentTarget.style.borderTopColor = c.accent)} onMouseLeave={e => (e.currentTarget.style.borderTopColor = `${c.textDim}30`)}>
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-2xl lg:text-3xl font-display uppercase tracking-tight">{m.title}</h3>
                  <span className="text-sm tabular-nums" style={{ color: c.accent }}>{m.id}</span>
                </div>
                <p className="text-xs leading-relaxed uppercase tracking-widest max-w-[50ch] mb-6" style={{ color: c.textDim }}>{m.desc}</p>
                <div className="overflow-hidden" style={{ background: c.bg }}>
                  <img src={m.img} alt={m.title} loading="lazy" className="w-full aspect-[16/9] object-cover mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-1000" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20" style={{ background: c.bg, borderTop: `1px solid ${c.accent}30` }}>
        <Reveal><h2 className="text-2xl font-display font-bold tracking-tighter uppercase mb-10">Видео процес</h2></Reveal>
        <VideoSection accentColor={c.accent} borderColor={`${c.accent}30`} textDimColor={c.textDim} />
      </section>

      <section id="За нас" className="px-6 lg:px-12 py-24" style={{ background: c.surface, borderTop: `1px solid ${c.accent}30` }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tighter uppercase mb-8">За нас</h2>
              <p className="text-xs uppercase tracking-widest leading-relaxed pl-6" style={{ color: c.textDim, borderLeft: `2px solid ${c.accent}` }}>
                Etalsyle е водеща компания в CNC обработката на материали в Пловдив, България. Над 15 години опит. С модерно оборудване и екип от опитни специалисти, ние гарантираме най-високо качество.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="p-2 overflow-hidden group" style={{ background: c.bg, border: `1px solid ${c.accent}30` }}>
              <img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="Партньори" className="px-6 lg:px-12 py-20" style={{ background: `${c.surface}50`, borderTop: `1px solid ${c.accent}30` }}>
        <Reveal><h2 className="text-3xl font-display font-bold tracking-tighter uppercase text-center mb-12">Партньори</h2></Reveal>
        <div className="flex flex-wrap justify-center gap-6">
          {PARTNERS.map(p => <Reveal key={p}><div className="text-xs uppercase tracking-[0.2em] px-8 py-4 transition-all hover:scale-105" style={{ color: c.textDim, border: `1px solid ${c.accent}30` }} onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }} onMouseLeave={e => { e.currentTarget.style.borderColor = `${c.accent}30`; e.currentTarget.style.color = c.textDim; }}>{p}</div></Reveal>)}
        </div>
      </section>

      <section id="Галерия" className="px-6 lg:px-12 py-20" style={{ background: c.bg, borderTop: `1px solid ${c.accent}30` }}>
        <Reveal><h2 className="text-3xl font-display font-bold tracking-tighter uppercase text-center mb-12">Галерия</h2></Reveal>
        <GallerySection borderColor={`${c.accent}20`} />
      </section>

      <section id="Контакти" className="px-6 lg:px-12 py-24" style={{ background: `${c.surface}50`, borderTop: `1px solid ${c.accent}30` }}>
        <Reveal><h2 className="text-3xl font-display font-bold tracking-tighter uppercase text-center mb-12">Контакти & Запитване</h2></Reveal>
        <InquiryForm accentColor={c.accent} bgColor={c.surface} borderColor={`${c.accent}30`} textDimColor={c.textDim} />
      </section>

      <Footer accentColor={c.accent} bgColor={c.bg} surfaceColor={c.surface} borderColor={`${c.accent}30`} textDimColor={c.textDim} fontClass="font-mono-jb" />
    </div>
  );
};

/* ===== DESIGN 4: Emerald Forge (Green) ===== */
const Design4 = () => {
  const c = { accent: "#10b981", bg: "#0a0f0d", surface: "#111916", border: "#1e2e27", text: "#e8f0ec", textDim: "#6b8578" };
  return (
    <div className="min-h-screen font-display" style={{ background: c.bg, color: c.text }}>
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 lg:px-12 h-16" style={{ background: "rgba(10,15,13,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${c.border}` }}>
        <div className="text-2xl font-bold tracking-tighter uppercase flex items-center gap-3">
          <div className="size-3 rounded-full animate-pulse" style={{ background: c.accent }} />
          ETALSYLE
        </div>
        <div className="hidden lg:flex items-center gap-10 text-xs font-medium tracking-widest uppercase" style={{ color: c.textDim }}>
          {NAV_ITEMS.map(item => <a key={item} href={`#${item}`} className="transition-colors" onMouseEnter={e => (e.currentTarget.style.color = c.accent)} onMouseLeave={e => (e.currentTarget.style.color = c.textDim)}>{item}</a>)}
        </div>
        <a href="#inquiry" className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-all" style={{ background: c.accent, color: c.bg }}>Изпрати запитване</a>
      </nav>

      <section className="pt-16 min-h-screen relative overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <video src={cncCuttingVideo.url} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.bg} 40%, transparent 100%)` }} />
        </div>
        <div className="relative z-10 px-6 lg:px-20 py-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <div className="w-16 h-px" style={{ background: c.accent }} />
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: c.accent }}>CNC Router Solutions</span>
          </div>
          <h1 className="text-5xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 animate-fade-in-up">
            Прецизност<br />от <span style={{ color: c.accent }}>природата</span><br />на машината
          </h1>
          <p className="text-lg max-w-[50ch] leading-relaxed mb-12 animate-fade-in-up delay-200" style={{ color: c.textDim }}>
            Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.
          </p>
          <div className="flex gap-4 animate-fade-in-up delay-400">
            <a href="#inquiry" className="px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-all" style={{ background: c.accent, color: c.bg }}>Запитване</a>
            <a href="#Услуги" className="px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-all" style={{ border: `2px solid ${c.accent}`, color: c.accent }}>Услуги →</a>
          </div>
        </div>
      </section>

      <StatsBar accentColor={c.accent} borderColor={c.border} bgColor={c.surface} />

      <section id="Услуги" className="p-10 lg:p-20" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-16">Материали & Услуги</h2></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MATERIALS.map(m => (
            <Reveal key={m.id}>
              <div className="group relative overflow-hidden rounded-2xl hover:scale-[1.02] transition-all duration-500 cursor-default" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                <div className="h-48 overflow-hidden">
                  <img src={m.img} alt={m.title} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute top-0 left-0 right-0 h-48" style={{ background: "linear-gradient(transparent 50%, rgba(0,0,0,0.8))" }} />
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-6 right-6 size-12 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: c.accent, color: c.bg }}>{m.id}</div>
                  <h3 className="text-xl font-bold mb-2">{m.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: c.textDim }}>{m.desc}</p>
                  <div className="flex gap-2 mt-4">
                    {m.specs.map(s => <span key={s} className="text-[10px] px-3 py-1 rounded-full uppercase" style={{ background: `${c.accent}20`, color: c.accent }}>{s}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="p-10 lg:p-20" style={{ background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter mb-10">Видео</h2></Reveal>
        <VideoSection accentColor={c.accent} borderColor={c.border} textDimColor={c.textDim} />
      </section>

      <section id="За нас" className="p-10 lg:p-20" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal><img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover rounded-2xl" /></Reveal>
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-6">За нас</h2>
              <p className="leading-relaxed" style={{ color: c.textDim }}>Etalsyle е водеща компания в CNC обработката в Пловдив. С над 15 години опит, модерно оборудване и екип от специалисти, гарантираме висококачествени решения за архитектура, интериор и индустрия.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="Партньори" className="p-10 lg:p-16" style={{ background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Партньори</h2></Reveal>
        <div className="flex flex-wrap justify-center gap-4">
          {PARTNERS.map(p => <Reveal key={p}><div className="text-sm px-8 py-4 rounded-full hover:scale-105 transition-all" style={{ color: c.textDim, border: `1px solid ${c.border}` }} onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }} onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textDim; }}>{p}</div></Reveal>)}
        </div>
      </section>

      <section id="Галерия" className="p-10 lg:p-16" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Галерия</h2></Reveal>
        <GallerySection borderColor={c.border} />
      </section>

      <section id="Контакти" className="p-10 lg:p-20" style={{ background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Контакти & Запитване</h2></Reveal>
        <InquiryForm accentColor={c.accent} bgColor={c.surface} borderColor={c.border} textDimColor={c.textDim} />
      </section>

      <Footer accentColor={c.accent} bgColor={c.bg} surfaceColor={c.surface} borderColor={c.border} textDimColor={c.textDim} fontClass="font-display" />
    </div>
  );
};

/* ===== DESIGN 5: Royal Steel (Gold & Navy) ===== */
const Design5 = () => {
  const c = { accent: "#eab308", bg: "#0c0e1a", surface: "#12152a", border: "#1e2245", text: "#e8e8f0", textDim: "#6b6d8a" };
  return (
    <div className="min-h-screen font-display" style={{ background: c.bg, color: c.text }}>
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 lg:px-12 h-20" style={{ background: "rgba(12,14,26,0.95)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center gap-4">
          <div className="size-8 rounded-sm flex items-center justify-center text-xs font-bold" style={{ background: c.accent, color: c.bg }}>E</div>
          <span className="text-xl font-bold tracking-tight uppercase">Etalsyle</span>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-xs font-medium tracking-widest uppercase" style={{ color: c.textDim }}>
          {NAV_ITEMS.map(item => <a key={item} href={`#${item}`} className="transition-colors relative group" onMouseEnter={e => (e.currentTarget.style.color = c.accent)} onMouseLeave={e => (e.currentTarget.style.color = c.textDim)}>{item}</a>)}
        </div>
        <a href="#inquiry" className="px-6 py-3 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg, ${c.accent}, #f59e0b)`, color: c.bg }}>Изпрати запитване</a>
      </nav>

      <section className="pt-20 min-h-screen flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-20 py-20">
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm" style={{ background: `${c.accent}20`, color: c.accent, border: `1px solid ${c.accent}40` }}>Premium CNC</div>
          </div>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 animate-fade-in-up">
            Кралска<br /><span style={{ color: c.accent }}>прецизност</span><br />в детайла
          </h1>
          <p className="text-lg max-w-[50ch] leading-relaxed mb-10 animate-fade-in-up delay-200" style={{ color: c.textDim }}>
            Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.
          </p>
          <div className="flex gap-4 animate-fade-in-up delay-400">
            <a href="#inquiry" className="px-8 py-4 text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all" style={{ background: `linear-gradient(135deg, ${c.accent}, #f59e0b)`, color: c.bg }}>Запитване →</a>
            <a href="tel:+359888123456" className="px-8 py-4 text-sm font-bold uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-2" style={{ border: `1px solid ${c.accent}60`, color: c.accent }}>📞 Обади се</a>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <video src={cncCuttingVideo.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${c.bg}, transparent 50%)` }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${c.bg}cc, transparent 60%)` }} />
          <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
            {STATS.slice(0, 3).map(s => (
              <div key={s.label} className="p-4 text-center rounded-lg" style={{ background: `${c.bg}cc`, backdropFilter: "blur(8px)", border: `1px solid ${c.border}` }}>
                <div className="text-2xl font-bold mb-1" style={{ color: c.accent }}>{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest" style={{ color: c.textDim }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="Услуги" className="p-10 lg:p-20" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter">Материали & Услуги</h2>
            <div className="h-px flex-1 mx-8 hidden md:block" style={{ background: `linear-gradient(to right, ${c.accent}40, transparent)` }} />
          </div>
        </Reveal>
        <div className="space-y-6">
          {MATERIALS.map((m, i) => (
            <Reveal key={m.id}>
              <div className={`group flex flex-col lg:flex-row ${i % 2 === 1 ? "lg:flex-row-reverse" : ""} gap-6 p-6 rounded-xl hover:scale-[1.01] transition-all duration-500`} style={{ background: c.bg, border: `1px solid ${c.border}` }} onMouseEnter={e => (e.currentTarget.style.borderColor = `${c.accent}60`)} onMouseLeave={e => (e.currentTarget.style.borderColor = c.border)}>
                <img src={m.img} alt={m.title} loading="lazy" className="w-full lg:w-80 aspect-[4/3] object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold tabular-nums" style={{ color: c.accent }}>{m.id}</span>
                    <div className="w-8 h-px" style={{ background: c.accent }} />
                    <span className="text-xs uppercase tracking-widest" style={{ color: c.textDim }}>{m.subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{m.title}</h3>
                  <p className="leading-relaxed" style={{ color: c.textDim }}>{m.desc}</p>
                  <div className="flex gap-2 mt-4">
                    {m.specs.map(s => <span key={s} className="text-[10px] px-3 py-1 rounded-sm uppercase font-bold" style={{ background: `${c.accent}15`, color: c.accent }}>{s}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="p-10 lg:p-20" style={{ background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter mb-10">Видео процес</h2></Reveal>
        <VideoSection accentColor={c.accent} borderColor={c.border} textDimColor={c.textDim} />
      </section>

      <section id="За нас" className="p-10 lg:p-20" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <h2 className="text-4xl font-bold tracking-tighter mb-6">За нас</h2>
              <p className="leading-relaxed" style={{ color: c.textDim }}>Etalsyle е водеща компания в CNC обработката в Пловдив. С над 15 години опит и премиум оборудване, гарантираме безкомпромисно качество за архитектурни фасади, интериорни решения и индустриални проекти.</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative rounded-xl overflow-hidden">
              <img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.accent}10, transparent)` }} />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="Партньори" className="p-10 lg:p-16" style={{ background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Партньори</h2></Reveal>
        <div className="flex flex-wrap justify-center gap-4">
          {PARTNERS.map(p => <Reveal key={p}><div className="text-sm px-8 py-4 rounded-lg hover:scale-105 transition-all" style={{ color: c.textDim, border: `1px solid ${c.border}` }} onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }} onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textDim; }}>{p}</div></Reveal>)}
        </div>
      </section>

      <section id="Галерия" className="p-10 lg:p-16" style={{ background: c.surface, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Галерия</h2></Reveal>
        <GallerySection borderColor={c.border} />
      </section>

      <section id="Контакти" className="p-10 lg:p-20" style={{ background: c.bg, borderTop: `1px solid ${c.border}` }}>
        <Reveal><h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Контакти & Запитване</h2></Reveal>
        <InquiryForm accentColor={c.accent} bgColor={c.surface} borderColor={c.border} textDimColor={c.textDim} />
      </section>

      <Footer accentColor={c.accent} bgColor={c.bg} surfaceColor={c.surface} borderColor={c.border} textDimColor={c.textDim} fontClass="font-display" />
    </div>
  );
};

/* ===== DESIGN SWITCHER ===== */
const DESIGNS = [
  { id: 1, label: "Precision", color: "#00e5ff", component: Design1 },
  { id: 2, label: "Industrial", color: "#D67A1A", component: Design2 },
  { id: 3, label: "Brutalism", color: "#FF4500", component: Design3 },
  { id: 4, label: "Emerald", color: "#10b981", component: Design4 },
  { id: 5, label: "Royal", color: "#eab308", component: Design5 },
];

const Index = () => {
  const [activeDesign, setActiveDesign] = useState(0);
  const ActiveComponent = DESIGNS[activeDesign].component;

  return (
    <div className="relative">
      <CookieConsent />
      <CallButton />

      {/* Design Switcher */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex gap-1.5 p-1.5 rounded-full shadow-2xl" style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
        {DESIGNS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => { setActiveDesign(i); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${activeDesign === i ? "scale-105 shadow-lg" : "opacity-50 hover:opacity-100"}`}
            style={{ background: activeDesign === i ? d.color : "transparent", color: activeDesign === i ? "#000" : "#fff" }}
          >
            <span className="size-1.5 rounded-full shrink-0" style={{ background: d.color }} />
            <span className="hidden sm:inline">{d.label}</span>
          </button>
        ))}
      </div>

      <div key={activeDesign} className="animate-fade-in">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Index;
