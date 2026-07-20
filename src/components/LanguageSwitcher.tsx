import { Select, Tooltip } from 'antd';
import { useTranslation } from '../i18n/localeContext';
import { LOCALES, type Locale } from '../i18n/locales';

function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <Tooltip title={t('language.label')}>
      <Select
        className="lang-select"
        value={locale}
        onChange={(value: Locale) => setLocale(value)}
        options={LOCALES}
        style={{ width: 68 }}
        aria-label={t('language.label')}
      />
    </Tooltip>
  );
}

export default LanguageSwitcher;
