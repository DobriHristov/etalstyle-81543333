import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#121212", color: "#f4f4f5" }}>
      <div className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16" style={{ background: "rgba(9,9,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #27272a" }}>
        <Link to="/" className="font-bold text-xl tracking-tighter uppercase">ETALSYLE<span style={{ color: "#D67A1A" }}>_</span></Link>
        <button onClick={() => setLang(lang === "bg" ? "en" : "bg")} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-white/20 hover:bg-white/10 transition-colors">
          {lang === "bg" ? "EN" : "BG"}
        </button>
      </div>
      <div className="text-center animate-fade-in-up">
        <div className="text-[120px] font-bold leading-none tracking-tighter" style={{ color: "#D67A1A" }}>404</div>
        <h1 className="text-2xl font-bold mt-4 mb-2">{t.notFoundTitle}</h1>
        <p className="text-sm opacity-60 mb-8">{t.notFoundDesc}</p>
        <Link to="/" className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all" style={{ background: "#D67A1A", color: "#121212" }}>
          ← {t.backHome}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
