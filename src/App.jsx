import { ConfigProvider, theme } from 'antd';
import AppLayout from './components/Layout/AppLayout';
import { useSettings } from './context/settings-context';
import { WalletProvider } from './context/WalletContext';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const { darkMode } = useSettings();

  return (
    <LanguageProvider>
      <WalletProvider>
        <ConfigProvider
          theme={{
            algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              borderRadius: 12,
            },
          }}>
          <AppLayout />
        </ConfigProvider>
      </WalletProvider>
    </LanguageProvider>
  );
}

export default App;
