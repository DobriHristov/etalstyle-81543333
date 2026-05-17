import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "bg" | "en";

const translations = {
  bg: {
    // nav
    services: "Услуги",
    about: "За нас",
    partners: "Партньори",
    gallery: "Галерия",
    contacts: "Контакти",
    sendInquiry: "Изпрати запитване",
    privacy: "Поверителност",
    terms: "Условия",
    cookies: "Бисквитки",

    // hero
    industrialStandard: "Индустриален стандарт",
    heroLine1: "Рязане и",
    heroLine2: "Фрезоване с",
    heroLine3: "CNC ROUTER",
    heroDesc: "Специализирани в обработката на еталбонд, HPL, MDF, шперплат и други материали. Прецизно рязане на керамични и ламинат плочи с гарантирано качество.",

    // sections
    materialsTitle: "Материали",
    tolerance: "0.01mm Толеранс",
    videoTitle: "Видео",
    aboutTitle: "За нас",
    aboutDesc: "Etalstyle е водеща компания в CNC обработката на материали в Пловдив. С модерно оборудване и екип от опитни специалисти, гарантираме най-високо качество. Нашата мисия е индустриална прецизност за всеки проект.",
    partnersTitle: "Партньори",
    galleryTitle: "Галерия",
    contactsTitle: "Контакти & Запитване",

    // stats
    statProjects: "Проекти",
    statPrecision: "Точност",
    statYears: "Години опит",
    statSupport: "Поддръжка",

    // materials
    matEtalbondTitle: "Еталбонд",
    matEtalbondSub: "Aluminium Composite",
    matEtalbondDesc: "Прецизно фрезоване и разкрой на композитни панели за вентилируеми архитектурни фасади. V-образни канали за сгъване без нарушаване на лицевия слой.",
    matHplTitle: "HPL Панели",
    matHplSub: "High-Pressure Laminate",
    matHplDesc: "Обработка на високоустойчиви плоскости за екстериор и интериор. Чист срез без обгаряне на ръбовете, дори при висока плътност.",
    matMdfTitle: "MDF & Шперплат",
    matMdfSub: "Wood Fiber & Veneer",
    matMdfDesc: "Комплексно 2.5D и 3D фрезоване на детайли за мебелната индустрия. Нестинг разкрой за максимална оптимизация.",
    matCeramicTitle: "Керамика",
    matCeramicSub: "Porcelain & Tile",
    matCeramicDesc: "Диамантено рязане на широкоформатен гранитогрес и керамични плочи. Водно охлаждане за перфектен ръб без микропукнатини.",

    // video labels
    videoCuttingDesc: "Прецизно рязане на алуминиеви композитни панели",
    videoMillingDesc: "3D фрезоване на MDF детайли",

    // form
    name: "Вашето име *",
    email: "Имейл *",
    phone: "Телефон",
    selectMaterial: "Изберете материал",
    describe: "Опишете вашето запитване... *",
    accept: "Приемам условията за ползване и политиката за поверителност *",
    sent: "Запитването е изпратено!",
    sentSub: "Ще се свържем с вас в рамките на 24 часа.",
    other: "Друго",
    etalbond: "Еталбонд",
    ceramics: "Керамика / Ламинат",

    // footer
    footerBrandDesc: "Прецизна CNC обработка на материали. Вашият доверен партньор за индустриални решения в Пловдив.",
    addressLine1: "бул. Кукленско шосе №150",
    addressLine2: "Пловдив 4004, България",
    workingHours: "Пон-Пет: 08:00 - 18:00",
    mapLabel: "Пловдив, България",
    copyright: "© 2026 Etalstyle — CNC Router Solutions",
    navigation: "Навигация",

    // services list
    cncMilling: "CNC Фрезоване",
    cncCutting: "CNC Рязане",
    vGroove: "V-образно фрезоване",
    nesting: "Нестинг разкрой",
    diamondCut: "Диамантено рязане",

    // 404 / legal
    notFoundTitle: "Страницата не е намерена",
    notFoundDesc: "Страницата, която търсите, не съществува.",
    backHome: "Към началото",
    privacyTitle: "Политика за поверителност",
    termsTitle: "Условия за ползване",
    cookiesTitle: "Политика за бисквитки",
    lastUpdated: "Последна актуализация: 01.05.2026",

    // cookies
    cookieConsent: "Използваме бисквитки за подобряване на вашето потребителско изживяване. Продължавайки да използвате сайта, вие се съгласявате с нашата политика за бисквитки.",
    cookieAccept: "Приемам",
    cookieSettings: "Настройки",
  },
  en: {
    services: "Services",
    about: "About",
    partners: "Partners",
    gallery: "Gallery",
    contacts: "Contacts",
    sendInquiry: "Send Inquiry",
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookies",

    industrialStandard: "Industrial Standard",
    heroLine1: "Cutting &",
    heroLine2: "Milling",
    heroLine3: "with CNC",
    heroDesc: "Specialized in machining Etalbond, HPL, MDF, plywood and other materials. Precision cutting of ceramic and laminate sheets with guaranteed quality.",

    materialsTitle: "Materials",
    tolerance: "0.01mm Tolerance",
    videoTitle: "Video",
    aboutTitle: "About Us",
    aboutDesc: "Etalstyle is a leading CNC material processing company in Plovdiv. With modern equipment and a team of experienced specialists, we guarantee the highest quality. Our mission is industrial precision for every project.",
    partnersTitle: "Partners",
    galleryTitle: "Gallery",
    contactsTitle: "Contact & Inquiry",

    statProjects: "Projects",
    statPrecision: "Precision",
    statYears: "Years experience",
    statSupport: "Support",

    matEtalbondTitle: "Etalbond",
    matEtalbondSub: "Aluminium Composite",
    matEtalbondDesc: "Precise milling and cutting of composite panels for ventilated architectural facades. V-grooves for folding without damaging the face layer.",
    matHplTitle: "HPL Panels",
    matHplSub: "High-Pressure Laminate",
    matHplDesc: "Machining of high-strength sheets for exterior and interior. Clean edges with no burning, even at high density.",
    matMdfTitle: "MDF & Plywood",
    matMdfSub: "Wood Fiber & Veneer",
    matMdfDesc: "Complex 2.5D and 3D milling of furniture-industry parts. Nesting layouts for maximum material optimization.",
    matCeramicTitle: "Ceramics",
    matCeramicSub: "Porcelain & Tile",
    matCeramicDesc: "Diamond cutting of large-format porcelain and ceramic tiles. Water cooling for a perfect edge without micro-cracks.",

    videoCuttingDesc: "Precision cutting of aluminium composite panels",
    videoMillingDesc: "3D milling of MDF parts",

    name: "Your name *",
    email: "Email *",
    phone: "Phone",
    selectMaterial: "Select material",
    describe: "Describe your inquiry... *",
    accept: "I accept the Terms of Use and Privacy Policy *",
    sent: "Inquiry sent!",
    sentSub: "We will contact you within 24 hours.",
    other: "Other",
    etalbond: "Etalbond",
    ceramics: "Ceramics / Laminate",

    footerBrandDesc: "Precision CNC material processing. Your trusted partner for industrial solutions in Plovdiv.",
    addressLine1: "150 Peshtersko Shose Blvd",
    addressLine2: "Plovdiv 4000, Bulgaria",
    workingHours: "Mon-Fri: 08:00 - 18:00",
    mapLabel: "Plovdiv, Bulgaria",
    copyright: "© 2026 Etalstyle — CNC Router Solutions",
    navigation: "Navigation",

    cncMilling: "CNC Milling",
    cncCutting: "CNC Cutting",
    vGroove: "V-groove milling",
    nesting: "Nesting layout",
    diamondCut: "Diamond cutting",

    notFoundTitle: "Page Not Found",
    notFoundDesc: "The page you are looking for does not exist.",
    backHome: "Go Home",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Use",
    cookiesTitle: "Cookie Policy",
    lastUpdated: "Last updated: May 1, 2026",

    cookieConsent: "We use cookies to improve your experience. By continuing to use the site, you agree to our cookie policy.",
    cookieAccept: "Accept",
    cookieSettings: "Settings",
  },
};

type Translations = typeof translations.bg;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "bg",
  setLang: () => {},
  t: translations.bg,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "bg";
    const stored = localStorage.getItem("etalstyle-lang");
    return stored === "en" || stored === "bg" ? stored : "bg";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("etalstyle-lang", l); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
