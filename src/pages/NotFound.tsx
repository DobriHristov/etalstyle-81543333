import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { t, lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#09090a", color: "#f4f4f5" }}>
      <div className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16" style={{ background: "rgba(9,9,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #27272a" }}>
        <Link to="/" className="font-bold text-xl tracking-tighter uppercase">ETALSYLE<span style={{ color: "#00e5ff" }}>_</span></Link>
        <button onClick={() => setLang(lang === "bg" ? "en" : "bg")} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-white/20 hover:bg-white/10 transition-colors">
          {lang === "bg" ? "EN" : "BG"}
        </button>
      </div>
      <div className="text-center animate-fade-in-up">
        <div className="text-[120px] font-bold leading-none tracking-tighter" style={{ color: "#00e5ff" }}>404</div>
        <h1 className="text-2xl font-bold mt-4 mb-2">{t.notFoundTitle}</h1>
        <p className="text-sm opacity-60 mb-8">{t.notFoundDesc}</p>
        <Link to="/" className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all" style={{ background: "#00e5ff", color: "#09090a" }}>
          ← {t.backHome}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
