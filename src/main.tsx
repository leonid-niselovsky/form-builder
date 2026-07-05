import { createRoot } from 'react-dom/client';
import { App as AntApp } from 'antd';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AuthGate from './components/AuthGate';
import { ThemeProvider } from './theme/ThemeProvider';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <AntApp>
        <AuthGate>
          <App />
        </AuthGate>
      </AntApp>
    </ThemeProvider>
  </Provider>
);
