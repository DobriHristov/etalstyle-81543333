interface FooterProps {
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
  borderColor: string;
  textDimColor: string;
  fontClass: string;
}

const Footer = ({ accentColor, bgColor, surfaceColor, borderColor, textDimColor, fontClass }: FooterProps) => (
  <footer className={`${fontClass} border-t`} style={{ background: bgColor, borderColor }}>
    {/* Map */}
    <div className="w-full h-[350px] relative overflow-hidden">
      <iframe
        title="Etalsyle Plovdiv"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47272.93218684474!2d24.710768!3d42.1497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd108bf68cfc3%3A0x398099a9003c550c!2sPlovdiv%2C%20Bulgaria!5e0!3m2!1sen!2s!4v1"
        className="w-full h-full border-0 grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        loading="lazy"
        allowFullScreen
      />
      <div className="absolute top-4 left-4 px-4 py-2 text-xs font-bold uppercase tracking-wider z-10" style={{ background: accentColor, color: bgColor }}>
        📍 Пловдив, България
      </div>
    </div>

    {/* Footer content */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8 lg:p-16" style={{ borderTop: `1px solid ${borderColor}` }}>
      {/* Brand */}
      <div className="md:col-span-1">
        <h3 className="text-2xl font-bold tracking-tighter uppercase mb-4">ETALSYLE</h3>
        <p className="text-sm leading-relaxed mb-6" style={{ color: textDimColor }}>
          Прецизна CNC обработка на материали. Вашият доверен партньор за индустриални решения в Пловдив.
        </p>
        <div className="flex gap-3">
          {["facebook", "instagram", "linkedin"].map(social => (
            <a key={social} href="#" className="size-10 flex items-center justify-center border rounded-lg transition-colors hover:opacity-80" style={{ borderColor, color: textDimColor }}>
              {social[0].toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>Навигация</h4>
        <ul className="space-y-3">
          {["Услуги", "За нас", "Партньори", "Галерия", "Контакти"].map(item => (
            <li key={item}>
              <a href={`#${item}`} className="text-sm transition-colors hover:opacity-80" style={{ color: textDimColor }}>{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Services */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>Услуги</h4>
        <ul className="space-y-3 text-sm" style={{ color: textDimColor }}>
          <li>CNC Фрезоване</li>
          <li>CNC Рязане</li>
          <li>V-образно фрезоване</li>
          <li>Нестинг разкрой</li>
          <li>Диамантено рязане</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: accentColor }}>Контакти</h4>
        <ul className="space-y-4 text-sm" style={{ color: textDimColor }}>
          <li className="flex items-start gap-3">
            <span>📍</span>
            <span>бул. Пещерско шосе 150<br />Пловдив 4000, България</span>
          </li>
          <li className="flex items-center gap-3">
            <span>📞</span>
            <a href="tel:+359888123456" className="hover:opacity-80 transition-opacity">+359 888 123 456</a>
          </li>
          <li className="flex items-center gap-3">
            <span>✉️</span>
            <a href="mailto:info@etalsyle.bg" className="hover:opacity-80 transition-opacity">info@etalsyle.bg</a>
          </li>
          <li className="flex items-center gap-3">
            <span>🕐</span>
            <span>Пон-Пет: 08:00 - 18:00</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="flex flex-col md:flex-row justify-between items-center px-8 lg:px-16 py-6 text-xs uppercase tracking-widest" style={{ color: textDimColor, borderTop: `1px solid ${borderColor}` }}>
      <span>© 2026 Etalsyle — CNC Router Solutions</span>
      <div className="flex gap-6 mt-2 md:mt-0">
        <a href="#" className="hover:opacity-80">Поверителност</a>
        <a href="#" className="hover:opacity-80">Условия</a>
        <a href="#" className="hover:opacity-80">Бисквитки</a>
      </div>
    </div>
  </footer>
);

export default Footer;
