import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { ThemeContext, type ThemeMode } from './themeContext';

const STORAGE_KEY = 'form-builder-theme-mode';

function getInitialMode(): ThemeMode {
  return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(() => ({ mode, toggleMode }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: mode === 'dark' ? { colorBgContainer: '#242424', colorBgElevated: '#2a2a2a' } : {},
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
