import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
  borderColor: string;
  textDimColor: string;
  fontClass: string;
}

const Footer = ({ accentColor, bgColor, borderColor, textDimColor, fontClass }: FooterProps) => {
  const { t } = useLanguage();

  const navItems = [
    { id: "services", label: t.services },
    { id: "about", label: t.about },
    { id: "gallery", label: t.gallery },
    { id: "contacts", label: t.contacts },
  ];

  return (
    <footer className={`${fontClass} border-t`} style={{ background: bgColor, borderColor }}>
      {/* Map */}
      <div className="w-full h-[350px] relative overflow-hidden">
        <iframe
          title="Etalstyle Plovdiv"
          src="https://www.google.com/maps?q=%D0%B1%D1%83%D0%BB.+%D0%9A%D1%83%D0%BA%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%BE+%D1%88%D0%BE%D1%81%D0%B5+150%2C+%D0%9F%D0%BB%D0%BE%D0%B2%D0%B4%D0%B8%D0%B2+4004&output=embed"
          className="w-full h-full border-0 grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          loading="lazy"
          allowFullScreen
        />
        <div className="absolute top-4 left-4 px-4 py-2 text-xs font-bold uppercase tracking-wider z-10" style={{ background: accentColor, color: bgColor }}>
          📍 {t.mapLabel}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8 lg:p-16" style={{ borderTop: `1px solid ${borderColor}` }}>
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4">ETALSYLE</h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: textDimColor }}>{t.footerBrandDesc}</p>
          <div className="flex gap-3">
            {["facebook", "instagram", "linkedin"].map(social => (
              <a key={social} href="#" aria-label={social} className="size-10 flex items-center justify-center border rounded-lg transition-colors hover:opacity-80" style={{ borderColor, color: textDimColor }}>
                {social[0].toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>{t.navigation}</h4>
          <ul className="space-y-3">
            {navItems.map(item => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-sm transition-colors hover:opacity-80" style={{ color: textDimColor }}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>{t.services}</h4>
          <ul className="space-y-3 text-sm" style={{ color: textDimColor }}>
            <li>{t.cncMilling}</li>
            <li>{t.cncCutting}</li>
            <li>{t.vGroove}</li>
            <li>{t.nesting}</li>
            <li>{t.diamondCut}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>{t.contacts}</h4>
          <ul className="space-y-4 text-sm" style={{ color: textDimColor }}>
            <li className="flex items-start gap-3">
              <span>📍</span>
              <span>{t.addressLine1}<br />{t.addressLine2}</span>
            </li>
            <li className="flex items-center gap-3">
              <span>📞</span>
              <a href="tel:+359886313673" className="hover:opacity-80 transition-opacity">+359 886 31 36 73</a>
            </li>
            <li className="flex items-center gap-3">
              <span>✉️</span>
              <a href="mailto:etal.stylebg@gmail.com" className="hover:opacity-80 transition-opacity">etal.stylebg@gmail.com</a>
            </li>
            <li className="flex items-center gap-3">
              <span>🕐</span>
              <span>{t.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center px-8 lg:px-16 py-6 text-xs uppercase tracking-widest gap-3" style={{ color: textDimColor, borderTop: `1px solid ${borderColor}` }}>
        <span>{t.copyright}</span>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:opacity-80">{t.privacy}</Link>
          <Link to="/terms" className="hover:opacity-80">{t.terms}</Link>
          <Link to="/cookies" className="hover:opacity-80">{t.cookies}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
