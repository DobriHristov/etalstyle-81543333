import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Terms = () => {
  const { t, lang, setLang } = useLanguage();

  const contentBg = (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">1. Общи условия</h2>
      <p className="mb-4 leading-relaxed opacity-80">С достъпа до уебсайта на Etalsyle, вие се съгласявате с настоящите условия за ползване. Ако не сте съгласни с някое от условията, моля не използвайте сайта.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">2. Услуги</h2>
      <p className="mb-4 leading-relaxed opacity-80">Etalsyle предоставя CNC рязане и фрезоване на различни материали. Всички поръчки подлежат на потвърждение и се изпълняват според договорените спецификации.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">3. Интелектуална собственост</h2>
      <p className="mb-4 leading-relaxed opacity-80">Всички материали на този уебсайт, включително текст, изображения, лога и дизайн, са собственост на Etalsyle и са защитени от закона за авторското право.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">4. Ограничение на отговорността</h2>
      <p className="mb-4 leading-relaxed opacity-80">Etalsyle не носи отговорност за щети, произтичащи от използването на уебсайта или невъзможността за достъп до него.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">5. Приложимо право</h2>
      <p className="mb-4 leading-relaxed opacity-80">Тези условия се уреждат от законодателството на Република България. Всички спорове се решават от компетентния съд в гр. Пловдив.</p>
    </>
  );

  const contentEn = (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">1. General Terms</h2>
      <p className="mb-4 leading-relaxed opacity-80">By accessing the Etalsyle website, you agree to these terms of use. If you do not agree with any of the terms, please do not use the site.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">2. Services</h2>
      <p className="mb-4 leading-relaxed opacity-80">Etalsyle provides CNC cutting and milling of various materials. All orders are subject to confirmation and are executed according to agreed specifications.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">3. Intellectual Property</h2>
      <p className="mb-4 leading-relaxed opacity-80">All materials on this website, including text, images, logos, and design, are the property of Etalsyle and are protected by copyright law.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
      <p className="mb-4 leading-relaxed opacity-80">Etalsyle is not liable for damages arising from the use of the website or the inability to access it.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">5. Applicable Law</h2>
      <p className="mb-4 leading-relaxed opacity-80">These terms are governed by the laws of the Republic of Bulgaria. All disputes shall be resolved by the competent court in Plovdiv.</p>
    </>
  );

  return (
    <div className="min-h-screen" style={{ background: "#09090a", color: "#f4f4f5" }}>
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16" style={{ background: "rgba(9,9,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #27272a" }}>
        <Link to="/" className="font-bold text-xl tracking-tighter uppercase">ETALSYLE<span style={{ color: "#00e5ff" }}>_</span></Link>
        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === "bg" ? "en" : "bg")} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-white/20 hover:bg-white/10 transition-colors">
            {lang === "bg" ? "EN" : "BG"}
          </button>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto animate-fade-in-up">
        <p className="text-xs uppercase tracking-widest mb-2 opacity-50">{t.lastUpdated}</p>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8" style={{ color: "#00e5ff" }}>{t.termsTitle}</h1>
        {lang === "bg" ? contentBg : contentEn}
        <Link to="/" className="inline-block mt-12 px-6 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all" style={{ background: "#00e5ff", color: "#09090a" }}>
          ← {t.backHome}
        </Link>
      </div>
    </div>
  );
};

export default Terms;
