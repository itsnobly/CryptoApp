import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CryptoContextProvider from './context/cryprto-context.jsx';
import './index.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </StrictMode>,
);
