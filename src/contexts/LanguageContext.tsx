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
    aboutDesc: "Ние сме специализирана фирма за CNC рязане и фрезоване на еталбонд, HPL, MDF, PVC, плексиглас и други листови материали. Предлагаме рязане на керамични фасадни панели (ламинам), интериорния дизайн и фасадните облицовки. Работим с модерно оборудване и висок стандарт на изработка, което гарантира точност, качество и бързи срокове на изпълнение.",
    aboutServicesTitle: "Нашите услуги:",
    aboutServices: [
      "CNC рязане и фрезоване",
      "Разкрой на еталбонд, HPL и MDF",
      "Декоративни панели и интериорни решения",
      "Подготовка на файлове във формати DXF, DWG, AL PDF и др.",
    ],
    aboutWhyTitle: "Защо да изберете нас:",
    aboutWhy: [
      "Висока прецизност на рязане",
      "Индивидуален подход към всеки проект",
      "Кратки срокове за изпълнение",
      "Конкурентни цени",
      "Възможност за единични и серийни поръчки",
      "Професионална консултация и подготовка на проект",
    ],
    aboutGoal: "Нашата цел е да предоставяме надеждни и качествени решения, съобразени с нуждите на клиента — от единични детайли до цялостни интериорни и рекламни проекти. Работим с внимание към всеки детайл и се стремим към дългосрочни партньорства, основани на доверие и професионализъм.",
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
    matMdfDesc: "Комплексно 2D фрезоване на детайли за мебелната индустрия. Нестинг разкрой за максимална оптимизация.",
    matCeramicTitle: "Керамика",
    matCeramicSub: "Porcelain & Tile",
    matCeramicDesc: "Диамантено рязане на широкоформатен гранитогрес и керамични плочи. Водно охлаждане за перфектен ръб без микропукнатини.",

    // video labels
    videoCuttingDesc: "Прецизно рязане на алуминиеви композитни панели",
    videoMillingDesc: "2D фрезоване на MDF детайли",

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
    addressLine1: "ЕТАЛСТИЛ ООД",
    addressLine2: "Южна промишлена зона Южен, 4000 Пловдив",
    workingHours: "Пон-Пет: 08:00 - 18:00",
    mapLabel: "ЕТАЛСТИЛ ООД, Южна промишлена зона Южен, 4000 Пловдив",
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
    aboutDesc: "We are a specialized company for CNC cutting and milling of etalbond, HPL, MDF, PVC, plexiglass and other sheet materials. We offer cutting of ceramic facade panels (laminate), interior design and facade claddings. We work with modern equipment and high manufacturing standards, guaranteeing precision, quality and fast turnaround times.",
    aboutServicesTitle: "Our services:",
    aboutServices: [
      "CNC cutting and milling",
      "Cutting of etalbond, HPL and MDF",
      "Decorative panels and interior solutions",
      "File preparation in DXF, DWG, AL PDF and other formats",
    ],
    aboutWhyTitle: "Why choose us:",
    aboutWhy: [
      "High cutting precision",
      "Individual approach to each project",
      "Short turnaround times",
      "Competitive prices",
      "Single and series orders available",
      "Professional consultation and project preparation",
    ],
    aboutGoal: "Our goal is to provide reliable and high-quality solutions tailored to the client's needs — from individual parts to complete interior and advertising projects. We work with attention to every detail and strive for long-term partnerships built on trust and professionalism.",
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
    matMdfDesc: "Complex 2D milling of furniture-industry parts. Nesting layouts for maximum material optimization.",
    matCeramicTitle: "Ceramics",
    matCeramicSub: "Porcelain & Tile",
    matCeramicDesc: "Diamond cutting of large-format porcelain and ceramic tiles. Water cooling for a perfect edge without micro-cracks.",

    videoCuttingDesc: "Precision cutting of aluminium composite panels",
    videoMillingDesc: "2D milling of MDF parts",

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
    addressLine1: "ETALSTYLE LTD",
    addressLine2: "South Industrial Zone Yuzhen, 4000 Plovdiv",
    workingHours: "Mon-Fri: 08:00 - 18:00",
    mapLabel: "ETALSTYLE LTD, South Industrial Zone Yuzhen, 4000 Plovdiv",
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
