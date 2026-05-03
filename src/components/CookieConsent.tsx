import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const accepted = localStorage.getItem("etalsyle-cookies");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("etalsyle-cookies", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center pointer-events-none">
      <div
        className="pointer-events-auto w-full max-w-2xl mx-4 mb-6 p-6 rounded-2xl border border-white/10 shadow-2xl animate-slide-up"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-1">🍪 {t.cookies}</p>
            <p className="text-xs text-white/60 leading-relaxed">{t.cookieConsent}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={accept} className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-white/90 transition-colors">
              {t.cookieAccept}
            </button>
            <button onClick={accept} className="px-4 py-2.5 border border-white/20 text-white/70 text-xs uppercase tracking-wider rounded-lg hover:bg-white/10 transition-colors">
              {t.cookieSettings}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
