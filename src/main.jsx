import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CryptoProvider from './context/CryptoProvider';
import SettingsProvider from './context/SettingsProvider';
import './index.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <CryptoProvider>
        <App />
      </CryptoProvider>
    </SettingsProvider>
  </StrictMode>,
);
