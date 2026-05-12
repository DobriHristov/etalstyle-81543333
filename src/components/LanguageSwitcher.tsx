import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  accentColor?: string;
  bgColor?: string;
  borderColor?: string;
  textDimColor?: string;
}

const LanguageSwitcher = ({
  accentColor = "#D67A1A",
  bgColor = "#121212",
  borderColor = "#2a2a2a",
  textDimColor = "#9a9088",
}: LanguageSwitcherProps) => {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="relative inline-flex items-center p-1 rounded-full text-[11px] font-bold uppercase tracking-widest select-none transition-all"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      {/* Sliding indicator */}
      <span
        aria-hidden
        className="absolute top-1 bottom-1 w-[44px] rounded-full transition-transform duration-300 ease-out"
        style={{
          background: accentColor,
          transform: lang === "bg" ? "translateX(0)" : "translateX(44px)",
          left: 4,
        }}
      />
      {(["bg", "en"] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={code === "bg" ? "Български" : "English"}
            className="relative z-10 w-[44px] h-7 flex items-center justify-center gap-1 rounded-full transition-colors"
            style={{ color: active ? bgColor : textDimColor }}
          >
            <span className="text-[13px] leading-none">{code === "bg" ? "🇧🇬" : "🇬🇧"}</span>
            <span>{code.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
