import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useThemeMode } from '../theme/themeContext';

function ThemeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <Button
        type="text"
        icon={mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
        onClick={toggleMode}
      />
    </Tooltip>
  );
}

export default ThemeToggle;
