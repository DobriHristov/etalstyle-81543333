import { useState } from "react";
import cncHero from "@/assets/cnc-hero.jpg";
import cncMaterials from "@/assets/cnc-materials.jpg";
import cncWorkshop from "@/assets/cnc-workshop.jpg";
import cncGallery1 from "@/assets/cnc-gallery1.jpg";

/* ===== SHARED DATA ===== */
const NAV_ITEMS = ["Услуги", "За нас", "Партньори", "Галерия", "Контакти"];

const MATERIALS = [
  { id: "01", title: "Еталбонд", subtitle: "Aluminium Composite", desc: "Прецизно фрезоване и разкрой на композитни панели за вентилируеми архитектурни фасади. V-образни канали за сгъване без нарушаване на лицевия слой.", specs: ["Дебелина: 2-6mm", "Инструмент: V-Bit 90°"] },
  { id: "02", title: "HPL Панели", subtitle: "High-Pressure Laminate", desc: "Обработка на високоустойчиви плоскости за екстериор и интериор. Чист срез без обгаряне на ръбовете, дори при висока плътност на материала.", specs: ["Дебелина: 4-12mm", "Скорост: 18m/min"] },
  { id: "03", title: "MDF & Шперплат", subtitle: "Wood Fiber & Veneer", desc: "Комплексно 2.5D и 3D фрезоване на детайли за мебелната индустрия. Нестинг разкрой за максимална оптимизация.", specs: ["Оптимизация: Nesting", "Аспирация: Активна"] },
  { id: "04", title: "Керамика", subtitle: "Porcelain & Tile", desc: "Диамантено рязане на широкоформатен гранитогрес и керамични плочи. Водно охлаждане за перфектен ръб без микропукнатини.", specs: ["Рязане: Диамант", "Охлаждане: Водно"] },
];

const PARTNERS = ["Етем", "Алукобонд", "Кроношпан", "Egger", "Fundermax", "Trespa"];

const GALLERY_IMAGES = [cncHero, cncMaterials, cncWorkshop, cncGallery1];

/* ===== INQUIRY FORM ===== */
const InquiryForm = ({ accentClass, bgClass, borderClass, textClass }: { accentClass: string; bgClass: string; borderClass: string; textClass: string }) => {
  const [sent, setSent] = useState(false);
  return (
    <div id="inquiry" className="scroll-mt-24">
      {sent ? (
        <div className="text-center py-20 animate-scale-in">
          <div className={`text-4xl mb-4 ${accentClass}`}>✓</div>
          <p className="text-xl">Запитването е изпратено успешно!</p>
          <p className={`mt-2 ${textClass}`}>Ще се свържем с вас скоро.</p>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <input placeholder="Вашето име" required className={`${bgClass} ${borderClass} border px-4 py-3 focus:outline-none focus:ring-1 ${accentClass.replace('text-', 'focus:ring-')}`} />
          <input type="email" placeholder="Имейл" required className={`${bgClass} ${borderClass} border px-4 py-3 focus:outline-none focus:ring-1 ${accentClass.replace('text-', 'focus:ring-')}`} />
          <input placeholder="Телефон" className={`${bgClass} ${borderClass} border px-4 py-3 focus:outline-none focus:ring-1`} />
          <select className={`${bgClass} ${borderClass} border px-4 py-3 focus:outline-none`}>
            <option>Изберете материал</option>
            <option>Еталбонд</option>
            <option>HPL</option>
            <option>MDF / Шперплат</option>
            <option>Керамика / Ламинат</option>
            <option>Друго</option>
          </select>
          <textarea placeholder="Опишете вашето запитване..." rows={4} required className={`${bgClass} ${borderClass} border px-4 py-3 focus:outline-none md:col-span-2`} />
          <button type="submit" className={`md:col-span-2 ${accentClass.replace('text-', 'bg-')} text-black font-bold py-4 uppercase tracking-wider hover:opacity-90 transition-opacity`}>
            Изпрати запитване
          </button>
        </form>
      )}
    </div>
  );
};

/* ===== DESIGN 1: Industrial Precision (Cyan) ===== */
const Design1 = () => (
  <div className="min-h-screen font-display text-[hsl(var(--d1-text))] uppercase" style={{ background: 'hsl(var(--d1-bg))' }}>
    {/* Nav */}
    <nav className="fixed top-0 w-full z-50 border-b border-[hsl(var(--d1-border))]" style={{ background: 'hsl(var(--d1-bg) / 0.92)', backdropFilter: 'blur(12px)' }}>
      <div className="flex items-stretch h-16">
        <div className="flex items-center px-6 lg:px-8 border-r border-[hsl(var(--d1-border))] shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-2 bg-[hsl(var(--d1-accent))] animate-pulse-glow text-[hsl(var(--d1-accent))]" />
            <span className="font-mono-jb font-extrabold text-xl tracking-tighter">ETALSYLE<span className="text-[hsl(var(--d1-accent))]">_</span></span>
          </div>
        </div>
        <div className="flex-1 items-center justify-center gap-8 px-8 hidden lg:flex font-mono-jb text-xs font-medium tracking-widest text-[hsl(var(--d1-text-dim))]">
          {NAV_ITEMS.map(item => (
            <a key={item} href={`#${item}`} className="hover:text-[hsl(var(--d1-accent))] transition-colors">{item}</a>
          ))}
        </div>
        <a href="#inquiry" className="shrink-0 flex items-center justify-center px-6 lg:px-8 bg-[hsl(var(--d1-accent))] text-black font-mono-jb text-sm font-bold tracking-wider hover:opacity-90 transition-opacity">
          Изпрати запитване
        </a>
      </div>
    </nav>

    {/* Hero */}
    <section className="pt-16 min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col justify-center p-10 lg:p-20 border-r border-[hsl(var(--d1-border))] relative">
        <div className="absolute top-10 left-10 w-4 h-px bg-[hsl(var(--d1-border))]" />
        <div className="absolute top-10 left-10 w-px h-4 bg-[hsl(var(--d1-border))]" />
        <div className="font-mono-jb text-xs text-[hsl(var(--d1-accent))] mb-6 flex items-center gap-4 animate-fade-in">
          <span>SYS.STATUS: <span className="text-[hsl(var(--d1-text))]">ONLINE</span></span>
          <span className="w-8 h-px bg-[hsl(var(--d1-border))]" />
          <span className="tabular-nums">COORD: X.294 Y.881 Z.000</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 animate-fade-in-up">
          Рязане и Фрезоване<br />
          <span className="text-[hsl(var(--d1-accent))]">с CNC Router</span>
        </h1>
        <p className="font-mono-jb text-sm text-[hsl(var(--d1-text-dim))] max-w-[55ch] leading-relaxed mb-12 lowercase animate-fade-in-up delay-200">
          <span className="uppercase text-[hsl(var(--d1-accent))]">//</span> Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.
        </p>
        <div className="grid grid-cols-3 gap-px bg-[hsl(var(--d1-border))] w-max animate-fade-in-up delay-400">
          {[["ТОЛЕРАНС", "±0.01mm"], ["ШПИНДЕЛ", "24,000 RPM"], ["МАСИВ", "3×2m"]].map(([label, val]) => (
            <div key={label} className="p-4 flex flex-col gap-1" style={{ background: 'hsl(var(--d1-bg))' }}>
              <span className="font-mono-jb text-[10px] text-[hsl(var(--d1-text-dim))]">{label}</span>
              <span className="font-mono-jb text-lg tabular-nums">{val}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 relative overflow-hidden" style={{ background: 'hsl(var(--d1-surface))' }}>
        <div className="absolute inset-0 bg-[hsl(var(--d1-accent))] mix-blend-overlay opacity-15 z-10 pointer-events-none" />
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--d1-bg) / 0.7))' }} />
        <img src={cncHero} alt="CNC Router" className="w-full h-full object-cover mix-blend-luminosity contrast-125" />
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="w-full h-px bg-[hsl(var(--d1-accent)/0.3)] absolute top-1/2" />
          <div className="h-full w-px bg-[hsl(var(--d1-accent)/0.3)] absolute left-1/2" />
          <div className="size-12 border border-[hsl(var(--d1-accent)/0.5)] flex items-center justify-center">
            <div className="size-1 bg-[hsl(var(--d1-accent))]" />
          </div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section id="Услуги" className="border-t border-[hsl(var(--d1-border))]" style={{ background: 'hsl(var(--d1-surface))' }}>
      <div className="flex items-center justify-between px-8 py-4 border-b border-[hsl(var(--d1-border))]" style={{ background: 'hsl(var(--d1-bg))' }}>
        <h2 className="font-mono-jb text-sm font-bold tracking-widest">ОБРАБОТВАЕМИ МАТЕРИАЛИ</h2>
        <span className="font-mono-jb text-[10px] text-[hsl(var(--d1-accent))]">[ IDX_01.MAT ]</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {MATERIALS.map((m, i) => (
          <div key={m.id} className={`group p-8 relative hover:bg-[hsl(var(--d1-bg))] transition-colors border-b border-r border-[hsl(var(--d1-border))] animate-fade-in-up delay-${(i + 1) * 100}`}>
            <div className="absolute top-0 left-0 w-full h-px bg-[hsl(var(--d1-accent))] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">{m.title}<br /><span className="text-sm font-mono-jb text-[hsl(var(--d1-text-dim))] font-normal mt-2 block">[ {m.subtitle.toUpperCase()} ]</span></h3>
              <span className="font-mono-jb text-xs text-[hsl(var(--d1-accent))] border border-[hsl(var(--d1-accent)/0.3)] px-2 py-1">{m.id}</span>
            </div>
            <p className="font-mono-jb text-sm text-[hsl(var(--d1-text-dim))] lowercase max-w-[45ch] mb-6">{m.desc}</p>
            <div className="flex gap-4 font-mono-jb text-[10px] text-[hsl(var(--d1-text-dim))]">
              {m.specs.map(s => <span key={s} className="px-2 py-1" style={{ background: 'hsl(var(--d1-bg))' }}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* About */}
    <section id="За нас" className="p-10 lg:p-20 border-t border-[hsl(var(--d1-border))]" style={{ background: 'hsl(var(--d1-bg))' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-6 animate-fade-in-up">За нас</h2>
          <p className="font-mono-jb text-sm text-[hsl(var(--d1-text-dim))] leading-relaxed lowercase">
            Etalsyle е водеща компания в CNC обработката на материали в България. С модерно оборудване и екип от опитни специалисти, ние гарантираме най-високо качество на всяка поръчка. Работим с индустриални стандарти за прецизност и повторяемост.
          </p>
        </div>
        <img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover mix-blend-luminosity contrast-110 animate-fade-in delay-300" />
      </div>
    </section>

    {/* Partners */}
    <section id="Партньори" className="p-10 lg:p-16 border-t border-[hsl(var(--d1-border))]" style={{ background: 'hsl(var(--d1-surface))' }}>
      <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Партньори</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {PARTNERS.map((p, i) => (
          <div key={p} className={`font-mono-jb text-lg text-[hsl(var(--d1-text-dim))] px-8 py-4 border border-[hsl(var(--d1-border))] hover:text-[hsl(var(--d1-accent))] hover:border-[hsl(var(--d1-accent))] transition-colors animate-fade-in-up delay-${(i + 1) * 100}`}>{p}</div>
        ))}
      </div>
    </section>

    {/* Gallery */}
    <section id="Галерия" className="p-10 lg:p-16 border-t border-[hsl(var(--d1-border))]" style={{ background: 'hsl(var(--d1-bg))' }}>
      <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Галерия</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className="overflow-hidden group">
            <img src={img} alt={`Gallery ${i+1}`} loading="lazy" className="w-full aspect-square object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </section>

    {/* Contact & Form */}
    <section id="Контакти" className="p-10 lg:p-20 border-t border-[hsl(var(--d1-border))]" style={{ background: 'hsl(var(--d1-surface))' }}>
      <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Контакти & Запитване</h2>
      <InquiryForm accentClass="text-[hsl(var(--d1-accent))]" bgClass="bg-[hsl(var(--d1-bg))]" borderClass="border-[hsl(var(--d1-border))]" textClass="text-[hsl(var(--d1-text-dim))]" />
    </section>

    <footer className="border-t border-[hsl(var(--d1-border))] p-8 text-center font-mono-jb text-xs text-[hsl(var(--d1-text-dim))]">
      © 2026 Etalsyle — CNC Router Solutions. Всички права запазени.
    </footer>
  </div>
);

/* ===== DESIGN 2: Heavy Industrial (Amber) ===== */
const Design2 = () => (
  <div className="min-h-screen font-manrope text-[hsl(var(--d2-text))]" style={{ background: 'hsl(var(--d2-bg))' }}>
    {/* Nav */}
    <header className="border-b-4 border-[hsl(var(--d2-border))] flex flex-wrap justify-between items-center px-8 py-6 sticky top-0 z-50" style={{ background: 'hsl(var(--d2-bg))' }}>
      <div className="font-oswald text-4xl tracking-tighter uppercase font-bold">Etalsyle</div>
      <nav className="hidden lg:flex gap-10 text-sm font-semibold tracking-widest uppercase text-[hsl(var(--d2-text-dim))]">
        {NAV_ITEMS.map(item => (
          <a key={item} href={`#${item}`} className="hover:text-[hsl(var(--d2-accent))] transition-colors">{item}</a>
        ))}
      </nav>
      <a href="#inquiry" className="bg-[hsl(var(--d2-accent))] text-[hsl(var(--d2-bg))] font-oswald text-lg px-8 py-3 uppercase tracking-wider font-bold hover:opacity-90 transition-opacity">
        Изпрати запитване
      </a>
    </header>

    {/* Hero */}
    <section className="flex flex-col lg:flex-row min-h-[85vh]">
      <div className="flex-1 p-10 lg:p-24 flex flex-col justify-center gap-6 border-r-4 border-[hsl(var(--d2-border))]">
        <div className="flex gap-4 items-center animate-fade-in">
          <div className="size-3 bg-[hsl(var(--d2-accent))]" />
          <span className="font-oswald uppercase tracking-[0.2em] text-sm text-[hsl(var(--d2-text-dim))]">Индустриален стандарт</span>
        </div>
        <h1 className="font-oswald text-6xl lg:text-8xl xl:text-9xl leading-[0.85] uppercase animate-fade-in-up">
          Рязане и<br />Фрезоване<br /><span className="text-[hsl(var(--d2-accent))]">с CNC</span>
        </h1>
        <p className="text-lg text-[hsl(var(--d2-text-dim))] max-w-[48ch] font-medium leading-relaxed mt-4 animate-fade-in-up delay-200">
          Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.
        </p>
      </div>
      <div className="flex-1 p-8 lg:p-16 flex items-center justify-center" style={{ background: 'hsl(var(--d2-surface))' }}>
        <div className="relative w-full aspect-[4/3] border-l-8 border-b-8 border-[hsl(var(--d2-accent))] p-4 animate-scale-in delay-300" style={{ background: 'hsl(var(--d2-bg))' }}>
          <img src={cncHero} alt="CNC" className="w-full h-full object-cover grayscale contrast-125 brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
        </div>
      </div>
    </section>

    {/* Services */}
    <section id="Услуги" className="border-t-4 border-[hsl(var(--d2-border))] p-10 lg:p-20" style={{ background: 'hsl(var(--d2-bg))' }}>
      <div className="flex justify-between items-end border-b-4 border-[hsl(var(--d2-border))] pb-8 mb-16">
        <h2 className="font-oswald text-5xl lg:text-7xl uppercase leading-none">Материали</h2>
        <p className="font-oswald text-xl text-[hsl(var(--d2-accent))] uppercase tracking-widest hidden md:block">0.01mm Толеранс</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {MATERIALS.map((m, i) => (
          <div key={m.id} className={`group border-2 border-[hsl(var(--d2-border))] p-8 flex flex-col gap-10 hover:border-[hsl(var(--d2-accent))] transition-colors duration-300 animate-fade-in-up delay-${(i + 1) * 100}`} style={{ background: 'hsl(var(--d2-surface) / 0.3)' }}>
            <div className="flex justify-between items-start font-oswald">
              <span className="text-4xl text-[hsl(var(--d2-accent))] tabular-nums">{m.id}</span>
              <span className="text-sm tracking-widest text-[hsl(var(--d2-text-dim))] uppercase">Обработка</span>
            </div>
            <div>
              <h3 className="font-oswald text-2xl uppercase mb-4 group-hover:text-[hsl(var(--d2-accent))] transition-colors">{m.title}</h3>
              <p className="text-sm text-[hsl(var(--d2-text-dim))] leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* About */}
    <section id="За нас" className="p-10 lg:p-20 border-t-4 border-[hsl(var(--d2-border))]" style={{ background: 'hsl(var(--d2-surface))' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover border-l-8 border-b-8 border-[hsl(var(--d2-accent))] animate-slide-in-left" />
        <div className="animate-slide-in-right">
          <h2 className="font-oswald text-5xl uppercase mb-6">За нас</h2>
          <p className="text-[hsl(var(--d2-text-dim))] leading-relaxed text-lg">
            Etalsyle е водеща компания в CNC обработката на материали. С модерно оборудване и екип от опитни специалисти, гарантираме най-високо качество. Нашата мисия е да предоставим индустриална прецизност за всеки проект.
          </p>
        </div>
      </div>
    </section>

    {/* Partners */}
    <section id="Партньори" className="p-10 lg:p-16 border-t-4 border-[hsl(var(--d2-border))]" style={{ background: 'hsl(var(--d2-bg))' }}>
      <h2 className="font-oswald text-4xl uppercase text-center mb-12">Партньори</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {PARTNERS.map(p => (
          <div key={p} className="font-oswald text-xl text-[hsl(var(--d2-text-dim))] px-10 py-5 border-2 border-[hsl(var(--d2-border))] hover:border-[hsl(var(--d2-accent))] hover:text-[hsl(var(--d2-accent))] transition-colors uppercase">{p}</div>
        ))}
      </div>
    </section>

    {/* Gallery */}
    <section id="Галерия" className="p-10 lg:p-16 border-t-4 border-[hsl(var(--d2-border))]" style={{ background: 'hsl(var(--d2-surface))' }}>
      <h2 className="font-oswald text-4xl uppercase text-center mb-12">Галерия</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className="overflow-hidden group border-2 border-[hsl(var(--d2-border))]">
            <img src={img} alt={`Gallery ${i+1}`} loading="lazy" className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
          </div>
        ))}
      </div>
    </section>

    {/* Contact & Form */}
    <section id="Контакти" className="p-10 lg:p-20 border-t-4 border-[hsl(var(--d2-border))]" style={{ background: 'hsl(var(--d2-bg))' }}>
      <h2 className="font-oswald text-4xl uppercase text-center mb-12">Контакти & Запитване</h2>
      <InquiryForm accentClass="text-[hsl(var(--d2-accent))]" bgClass="bg-[hsl(var(--d2-surface))]" borderClass="border-[hsl(var(--d2-border))]" textClass="text-[hsl(var(--d2-text-dim))]" />
    </section>

    <footer className="border-t-4 border-[hsl(var(--d2-border))] p-8 text-center font-oswald text-sm text-[hsl(var(--d2-text-dim))] uppercase tracking-widest">
      © 2026 Etalsyle — CNC Router Solutions
    </footer>
  </div>
);

/* ===== DESIGN 3: Neon Brutalism (Orange) ===== */
const Design3 = () => (
  <div className="min-h-screen font-mono-jb text-[hsl(var(--d3-text))] antialiased" style={{ background: 'hsl(var(--d3-bg))' }}>
    {/* Nav */}
    <header className="border-b border-[hsl(var(--d3-accent)/0.2)] flex items-center justify-between px-6 lg:px-12 py-5 sticky top-0 z-50" style={{ background: 'hsl(var(--d3-bg) / 0.85)', backdropFilter: 'blur(16px)' }}>
      <div className="text-3xl font-display font-bold tracking-tighter uppercase">Etalsyle</div>
      <nav className="hidden lg:flex gap-10 text-[0.65rem] uppercase tracking-[0.2em] text-[hsl(var(--d3-text-dim))]">
        {NAV_ITEMS.map(item => (
          <a key={item} href={`#${item}`} className="hover:text-[hsl(var(--d3-accent))] transition-colors">{item}</a>
        ))}
      </nav>
      <a href="#inquiry" className="bg-[hsl(var(--d3-accent))] text-[hsl(var(--d3-bg))] text-[0.65rem] uppercase tracking-[0.15em] font-bold px-8 py-4 hover:opacity-90 transition-opacity">
        Изпрати запитване
      </a>
    </header>

    {/* Hero */}
    <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-48 px-6 lg:px-12 border-b border-[hsl(var(--d3-accent)/0.2)] overflow-hidden">
      <div className="absolute right-[33%] top-0 w-px h-full bg-[hsl(var(--d3-accent)/0.1)] hidden lg:block" />
      <div className="absolute right-[10%] top-0 w-px h-full bg-[hsl(var(--d3-accent)/0.1)] hidden lg:block" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end relative z-10">
        <div className="lg:col-span-8">
          <div className="text-[0.65rem] text-[hsl(var(--d3-accent))] uppercase tracking-[0.2em] mb-8 flex items-center gap-4 animate-fade-in">
            <span className="w-12 h-px bg-[hsl(var(--d3-accent))]" /> Индустриална прецизност
          </div>
          <h1 className="text-[12vw] lg:text-[7vw] leading-[0.85] font-display font-bold tracking-tighter uppercase mb-12 animate-fade-in-up">
            Рязане и<br /><span className="text-[hsl(var(--d3-accent))]">Фрезоване</span>
          </h1>
          <p className="text-[hsl(var(--d3-text-dim))] text-sm max-w-[50ch] leading-relaxed uppercase tracking-wider border-l-2 border-[hsl(var(--d3-accent))] pl-6 animate-fade-in-up delay-200">
            Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.
          </p>
        </div>
        <div className="lg:col-span-4 flex justify-end">
          <div className="w-full aspect-square border border-[hsl(var(--d3-accent)/0.2)] p-2 relative group animate-scale-in delay-300" style={{ background: 'hsl(var(--d3-surface))' }}>
            <div className="absolute inset-0 bg-[hsl(var(--d3-accent)/0.05)] group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
            <img src={cncHero} alt="CNC" className="w-full h-full object-cover mix-blend-luminosity opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-[hsl(var(--d3-accent)/0.5)] z-20 flex items-center justify-center pointer-events-none">
              <div className="w-1 h-1 bg-[hsl(var(--d3-accent))]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section id="Услуги" className="px-6 lg:px-12 py-24" style={{ background: 'hsl(var(--d3-surface) / 0.3)' }}>
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b border-[hsl(var(--d3-accent)/0.2)] pb-8 gap-8">
        <h2 className="text-3xl lg:text-5xl font-display font-bold tracking-tighter uppercase">Спецификация<br />на материалите</h2>
        <span className="text-[0.65rem] text-[hsl(var(--d3-accent))] uppercase tracking-[0.2em]">[ Индекс 01 — 04 ]</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-20">
        {MATERIALS.map((m, i) => (
          <div key={m.id} className={`group pt-8 border-t border-[hsl(var(--d3-text-dim)/0.2)] hover:border-[hsl(var(--d3-accent))] transition-colors duration-500 ${i % 2 === 1 ? 'lg:mt-32' : ''}`}>
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="text-2xl lg:text-3xl font-display uppercase tracking-tight">{m.title}</h3>
              <span className="text-[hsl(var(--d3-accent))] text-sm tabular-nums">{m.id}</span>
            </div>
            <p className="text-[hsl(var(--d3-text-dim))] text-xs leading-relaxed uppercase tracking-widest max-w-[50ch] mb-8">{m.desc}</p>
            <div className="overflow-hidden" style={{ background: 'hsl(var(--d3-bg))' }}>
              <img src={GALLERY_IMAGES[i]} alt={m.title} loading="lazy" className="w-full aspect-[16/9] object-cover mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" />
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* About */}
    <section id="За нас" className="px-6 lg:px-12 py-24 border-t border-[hsl(var(--d3-accent)/0.2)]" style={{ background: 'hsl(var(--d3-bg))' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tighter uppercase mb-8">За нас</h2>
          <p className="text-[hsl(var(--d3-text-dim))] text-xs uppercase tracking-widest leading-relaxed border-l-2 border-[hsl(var(--d3-accent))] pl-6">
            Etalsyle е водеща компания в CNC обработката на материали в България. С модерно оборудване и екип от опитни специалисти, ние гарантираме най-високо качество на всяка поръчка. Работим за архитектура, интериор и индустрия.
          </p>
        </div>
        <div className="border border-[hsl(var(--d3-accent)/0.2)] p-2 overflow-hidden group" style={{ background: 'hsl(var(--d3-surface))' }}>
          <img src={cncWorkshop} alt="Workshop" loading="lazy" className="w-full aspect-video object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" />
        </div>
      </div>
    </section>

    {/* Partners */}
    <section id="Партньори" className="px-6 lg:px-12 py-20 border-t border-[hsl(var(--d3-accent)/0.2)]" style={{ background: 'hsl(var(--d3-surface) / 0.3)' }}>
      <h2 className="text-3xl font-display font-bold tracking-tighter uppercase text-center mb-12">Партньори</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {PARTNERS.map(p => (
          <div key={p} className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--d3-text-dim))] px-8 py-4 border border-[hsl(var(--d3-accent)/0.2)] hover:border-[hsl(var(--d3-accent))] hover:text-[hsl(var(--d3-accent))] transition-colors">{p}</div>
        ))}
      </div>
    </section>

    {/* Gallery */}
    <section id="Галерия" className="px-6 lg:px-12 py-20 border-t border-[hsl(var(--d3-accent)/0.2)]" style={{ background: 'hsl(var(--d3-bg))' }}>
      <h2 className="text-3xl font-display font-bold tracking-tighter uppercase text-center mb-12">Галерия</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {GALLERY_IMAGES.map((img, i) => (
          <div key={i} className="overflow-hidden group border border-[hsl(var(--d3-accent)/0.1)]">
            <img src={img} alt={`Gallery ${i+1}`} loading="lazy" className="w-full aspect-square object-cover mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700" />
          </div>
        ))}
      </div>
    </section>

    {/* Contact & Form */}
    <section id="Контакти" className="px-6 lg:px-12 py-24 border-t border-[hsl(var(--d3-accent)/0.2)]" style={{ background: 'hsl(var(--d3-surface) / 0.3)' }}>
      <h2 className="text-3xl font-display font-bold tracking-tighter uppercase text-center mb-12">Контакти & Запитване</h2>
      <InquiryForm accentClass="text-[hsl(var(--d3-accent))]" bgClass="bg-[hsl(var(--d3-surface))]" borderClass="border-[hsl(var(--d3-accent)/0.2)]" textClass="text-[hsl(var(--d3-text-dim))]" />
    </section>

    <footer className="border-t border-[hsl(var(--d3-accent)/0.2)] p-8 text-center text-[0.65rem] text-[hsl(var(--d3-text-dim))] uppercase tracking-[0.2em]">
      © 2026 Etalsyle — CNC Router Solutions
    </footer>
  </div>
);

/* ===== DESIGN SWITCHER ===== */
const DESIGNS = [
  { id: 1, label: "Industrial Precision", color: "#00e5ff", component: Design1 },
  { id: 2, label: "Heavy Industrial", color: "#D67A1A", component: Design2 },
  { id: 3, label: "Neon Brutalism", color: "#FF4500", component: Design3 },
];

const Index = () => {
  const [activeDesign, setActiveDesign] = useState(0);
  const ActiveComponent = DESIGNS[activeDesign].component;

  return (
    <div className="relative">
      {/* Design Switcher */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex gap-2 p-2 rounded-full shadow-2xl" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)' }}>
        {DESIGNS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setActiveDesign(i)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeDesign === i ? 'scale-105 shadow-lg' : 'opacity-60 hover:opacity-100'
            }`}
            style={{
              background: activeDesign === i ? d.color : 'transparent',
              color: activeDesign === i ? '#000' : '#fff',
            }}
          >
            <span className="size-2 rounded-full" style={{ background: d.color }} />
            {d.label}
          </button>
        ))}
      </div>

      {/* Active Design */}
      <div key={activeDesign} className="animate-fade-in">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Index;
