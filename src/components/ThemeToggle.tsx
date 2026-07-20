import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useThemeMode } from '../theme/themeContext';
import { useTranslation } from '../i18n/localeContext';

function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();
  const { t } = useTranslation();

  return (
    <Tooltip title={mode === 'dark' ? t('theme.toLight') : t('theme.toDark')}>
      <Button
        type="text"
        icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleMode}
      />
    </Tooltip>
  );
}

export default ThemeToggle;
