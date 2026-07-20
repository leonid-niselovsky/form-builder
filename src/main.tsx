import { createRoot } from 'react-dom/client';
import { App as AntApp } from 'antd';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AuthGate from './components/AuthGate';
import { ThemeProvider } from './theme/ThemeProvider';
import { LocaleProvider } from './i18n/LocaleProvider';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <LocaleProvider>
      <ThemeProvider>
        <AntApp>
          <AuthGate>
            <App />
          </AuthGate>
        </AntApp>
      </ThemeProvider>
    </LocaleProvider>
  </Provider>
);
