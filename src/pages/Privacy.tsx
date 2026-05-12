import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Privacy = () => {
  const { t, lang, setLang } = useLanguage();

  const contentBg = (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">1. Събиране на информация</h2>
      <p className="mb-4 leading-relaxed opacity-80">Ние събираме информация, която вие доброволно ни предоставяте при попълване на формуляри на нашия уебсайт, включително име, имейл адрес, телефонен номер и детайли за вашето запитване.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">2. Използване на информацията</h2>
      <p className="mb-4 leading-relaxed opacity-80">Събраната информация се използва за обработка на вашите запитвания, предоставяне на услуги, подобряване на нашия уебсайт и комуникация с вас относно нашите продукти и услуги.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">3. Защита на данните</h2>
      <p className="mb-4 leading-relaxed opacity-80">Прилагаме подходящи технически и организационни мерки за защита на вашата лична информация срещу неоторизиран достъп, промяна, разкриване или унищожаване.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">4. Бисквитки</h2>
      <p className="mb-4 leading-relaxed opacity-80">Нашият уебсайт използва бисквитки за подобряване на потребителското изживяване. За повече информация, моля вижте нашата <Link to="/cookies" className="underline hover:opacity-70">Политика за бисквитки</Link>.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">5. Вашите права</h2>
      <p className="mb-4 leading-relaxed opacity-80">Имате право да поискате достъп, коригиране или изтриване на вашите лични данни. За упражняване на тези права, моля свържете се с нас на info@etalsyle.bg.</p>
    </>
  );

  const contentEn = (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">1. Information Collection</h2>
      <p className="mb-4 leading-relaxed opacity-80">We collect information that you voluntarily provide when filling out forms on our website, including name, email address, phone number, and details about your inquiry.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">2. Use of Information</h2>
      <p className="mb-4 leading-relaxed opacity-80">The collected information is used to process your inquiries, provide services, improve our website, and communicate with you about our products and services.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">3. Data Protection</h2>
      <p className="mb-4 leading-relaxed opacity-80">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">4. Cookies</h2>
      <p className="mb-4 leading-relaxed opacity-80">Our website uses cookies to improve user experience. For more information, please see our <Link to="/cookies" className="underline hover:opacity-70">Cookie Policy</Link>.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">5. Your Rights</h2>
      <p className="mb-4 leading-relaxed opacity-80">You have the right to request access, correction, or deletion of your personal data. To exercise these rights, please contact us at info@etalsyle.bg.</p>
    </>
  );

  return (
    <div className="min-h-screen" style={{ background: "#121212", color: "#f4f4f5" }}>
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16" style={{ background: "rgba(9,9,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #27272a" }}>
        <Link to="/" className="font-bold text-xl tracking-tighter uppercase">ETALSYLE<span style={{ color: "#D67A1A" }}>_</span></Link>
        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === "bg" ? "en" : "bg")} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border border-white/20 hover:bg-white/10 transition-colors">
            {lang === "bg" ? "EN" : "BG"}
          </button>
        </div>
      </nav>
      <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto animate-fade-in-up">
        <p className="text-xs uppercase tracking-widest mb-2 opacity-50">{t.lastUpdated}</p>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8" style={{ color: "#D67A1A" }}>{t.privacyTitle}</h1>
        {lang === "bg" ? contentBg : contentEn}
        <Link to="/" className="inline-block mt-12 px-6 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all" style={{ background: "#D67A1A", color: "#121212" }}>
          ← {t.backHome}
        </Link>
      </div>
    </div>
  );
};

export default Privacy;
