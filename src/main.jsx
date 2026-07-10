import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CryptoProvider from './context/CryptoProvider';
import SettingsProvider from './context/SettingsProvider';
import './index.css';
createRoot(document.getElementById('root')).render(
  <SettingsProvider>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </SettingsProvider>,
);
