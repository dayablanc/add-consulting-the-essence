import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, Currency } from './constants';
import { translations, Translations } from './translations';

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('add-lang');
    if (stored === 'es' || stored === 'en') return stored;
    return 'es';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = localStorage.getItem('add-currency');
    if (stored === 'CRC' || stored === 'USD') return stored;
    return 'CRC';
  });

  const [showLangBanner, setShowLangBanner] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('add-lang-banner-dismissed');
    if (!dismissed && lang === 'es') {
      const browserLang = navigator.language?.toLowerCase() || '';
      if (browserLang.startsWith('en')) {
        setShowLangBanner(true);
      }
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('add-lang', l);
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('add-currency', c);
  };

  const dismissBanner = () => {
    setShowLangBanner(false);
    localStorage.setItem('add-lang-banner-dismissed', 'true');
  };

  const switchFromBanner = () => {
    setLang('en');
    setShowLangBanner(false);
    localStorage.setItem('add-lang-banner-dismissed', 'true');
  };

  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, currency, setCurrency, t }}>
      {showLangBanner && (
        <div
          className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center gap-4 h-[40px]"
          style={{ backgroundColor: 'hsl(24, 33%, 52%)' }}
        >
          <p className="font-sans text-[12px] text-aesop-parchment">
            {t.langBanner.message}
          </p>
          <button
            onClick={switchFromBanner}
            className="font-sans text-[11px] font-medium text-aesop-parchment underline cursor-pointer"
          >
            {t.langBanner.switchBtn}
          </button>
          <button
            onClick={dismissBanner}
            className="font-sans text-[14px] text-aesop-parchment/70 hover:text-aesop-parchment cursor-pointer ml-2"
          >
            {t.langBanner.dismiss}
          </button>
        </div>
      )}
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
