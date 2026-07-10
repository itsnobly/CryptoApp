import { useEffect, useState } from 'react';
import { SettingsContext } from './settings-context';

const STORAGE_KEY = 'crypto-tracker-settings';

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    /* ignore */
  }
  return { darkMode: false, showMarketPrices: true };
}

export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.setAttribute(
      'data-theme',
      settings.darkMode ? 'dark' : 'light',
    );
  }, [settings]);

  const setDarkMode = (darkMode) => {
    setSettings((prev) => ({ ...prev, darkMode }));
  };

  const setShowMarketPrices = (showMarketPrices) => {
    setSettings((prev) => ({ ...prev, showMarketPrices }));
  };

  const value = {
    darkMode: settings.darkMode,
    showMarketPrices: settings.showMarketPrices,
    setDarkMode,
    setShowMarketPrices,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
