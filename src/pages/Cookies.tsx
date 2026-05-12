import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Link } from "react-router-dom";

const Cookies = () => {
  const { t, lang } = useLanguage();

  const contentBg = (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">1. Какво са бисквитките?</h2>
      <p className="mb-4 leading-relaxed opacity-80">Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство при посещение на уебсайт. Те помагат за запомняне на вашите предпочитания и подобряване на потребителското изживяване.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">2. Видове бисквитки</h2>
      <p className="mb-4 leading-relaxed opacity-80"><strong>Необходими:</strong> Осигуряват основната функционалност на сайта. Без тях сайтът не може да работи правилно.</p>
      <p className="mb-4 leading-relaxed opacity-80"><strong>Аналитични:</strong> Помагат ни да разберем как посетителите използват сайта, за да го подобрим.</p>
      <p className="mb-4 leading-relaxed opacity-80"><strong>Функционални:</strong> Запомнят вашите предпочитания за по-персонализирано изживяване.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">3. Управление на бисквитките</h2>
      <p className="mb-4 leading-relaxed opacity-80">Можете да управлявате или изтриете бисквитките чрез настройките на вашия браузър. Имайте предвид, че деактивирането на бисквитки може да повлияе на функционалността на сайта.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">4. Промени</h2>
      <p className="mb-4 leading-relaxed opacity-80">Запазваме правото да актуализираме тази политика при необходимост. Препоръчваме да я преглеждате периодично.</p>
    </>
  );

  const contentEn = (
    <>
      <h2 className="text-xl font-bold mt-8 mb-4">1. What are cookies?</h2>
      <p className="mb-4 leading-relaxed opacity-80">Cookies are small text files stored on your device when you visit a website. They help remember your preferences and improve user experience.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">2. Types of cookies</h2>
      <p className="mb-4 leading-relaxed opacity-80"><strong>Necessary:</strong> Ensure basic site functionality. Without them, the site cannot work properly.</p>
      <p className="mb-4 leading-relaxed opacity-80"><strong>Analytics:</strong> Help us understand how visitors use the site so we can improve it.</p>
      <p className="mb-4 leading-relaxed opacity-80"><strong>Functional:</strong> Remember your preferences for a more personalized experience.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">3. Managing cookies</h2>
      <p className="mb-4 leading-relaxed opacity-80">You can manage or delete cookies through your browser settings. Note that disabling cookies may affect site functionality.</p>
      <h2 className="text-xl font-bold mt-8 mb-4">4. Changes</h2>
      <p className="mb-4 leading-relaxed opacity-80">We reserve the right to update this policy as needed. We recommend reviewing it periodically.</p>
    </>
  );

  return (
    <div className="min-h-screen" style={{ background: "#121212", color: "#f4f4f5" }}>
      <nav className="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16" style={{ background: "rgba(9,9,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #27272a" }}>
        <Link to="/" className="font-bold text-xl tracking-tighter uppercase">ETALSYLE<span style={{ color: "#D67A1A" }}>_</span></Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher accentColor="#D67A1A" bgColor="#121212" borderColor="#2a2a2a" textDimColor="#9a9088" />
        </div>
      </nav>
      <div className="pt-24 pb-16 px-6 max-w-3xl mx-auto animate-fade-in-up">
        <p className="text-xs uppercase tracking-widest mb-2 opacity-50">{t.lastUpdated}</p>
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8" style={{ color: "#D67A1A" }}>{t.cookiesTitle}</h1>
        {lang === "bg" ? contentBg : contentEn}
        <Link to="/" className="inline-block mt-12 px-6 py-3 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-all" style={{ background: "#D67A1A", color: "#121212" }}>
          ← {t.backHome}
        </Link>
      </div>
    </div>
  );
};

export default Cookies;
