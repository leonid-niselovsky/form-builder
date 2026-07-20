import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { LocaleContext } from './localeContext';
import { antdLocales, translations, type Locale, type TranslationKey } from './locales';

const STORAGE_KEY = 'form-builder-locale';

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'ru' || stored === 'kk' || stored === 'en' ? stored : 'en';
}

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) => {
      let text = translations[locale][key] ?? translations.en[key];

      if (params) {
        for (const [name, value] of Object.entries(params)) {
          text = text.replace(`{${name}}`, String(value));
        }
      }

      return text;
    },
    [locale]
  );

  const contextValue = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return (
    <LocaleContext.Provider value={contextValue}>
      <ConfigProvider locale={antdLocales[locale]}>{children}</ConfigProvider>
    </LocaleContext.Provider>
  );
}
