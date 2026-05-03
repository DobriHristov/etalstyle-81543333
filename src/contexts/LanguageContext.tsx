import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "bg" | "en";

const translations = {
  bg: {
    services: "Услуги",
    about: "За нас",
    partners: "Партньори",
    gallery: "Галерия",
    contacts: "Контакти",
    sendInquiry: "Изпрати запитване",
    privacy: "Поверителност",
    terms: "Условия",
    cookies: "Бисквитки",
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
    notFoundTitle: "Страницата не е намерена",
    notFoundDesc: "Страницата, която търсите, не съществува.",
    backHome: "Към началото",
    privacyTitle: "Политика за поверителност",
    termsTitle: "Условия за ползване",
    cookiesTitle: "Политика за бисквитки",
    lastUpdated: "Последна актуализация: 01.05.2026",
    navigation: "Навигация",
    contactsFooter: "Контакти",
    servicesFooter: "Услуги",
    cncMilling: "CNC Фрезоване",
    cncCutting: "CNC Рязане",
    vGroove: "V-образно фрезоване",
    nesting: "Нестинг разкрой",
    diamondCut: "Диамантено рязане",
    cookieConsent: "Използваме бисквитки за подобряване на вашето потребителско изживяване. Продължавайки да използвате сайта, вие се съгласявате с нашата политика за бисквитки.",
    cookieAccept: "Приемам",
    cookieSettings: "Настройки",
  },
  en: {
    services: "Services",
    about: "About Us",
    partners: "Partners",
    gallery: "Gallery",
    contacts: "Contacts",
    sendInquiry: "Send Inquiry",
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookies",
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
    notFoundTitle: "Page Not Found",
    notFoundDesc: "The page you are looking for does not exist.",
    backHome: "Go Home",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Use",
    cookiesTitle: "Cookie Policy",
    lastUpdated: "Last updated: May 1, 2026",
    navigation: "Navigation",
    contactsFooter: "Contacts",
    servicesFooter: "Services",
    cncMilling: "CNC Milling",
    cncCutting: "CNC Cutting",
    vGroove: "V-groove milling",
    nesting: "Nesting layout",
    diamondCut: "Diamond cutting",
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
  const [lang, setLang] = useState<Lang>("bg");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
