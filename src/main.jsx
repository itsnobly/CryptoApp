import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import App from './App.jsx';

import CryptoProvider from './context/CryptoProvider';
import SettingsProvider from './context/SettingsProvider';
import { LanguageProvider } from './context/LanguageContext.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
  <ConfigProvider locale={ruRU}>
    <LanguageProvider>
      <SettingsProvider>
        <CryptoProvider>
          <App />
        </CryptoProvider>
      </SettingsProvider>
    </LanguageProvider>
  </ConfigProvider>,
);
