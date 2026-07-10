import { ConfigProvider, theme } from 'antd';
import AppLayout from './components/Layout/AppLayout';
import { useSettings } from './context/settings-context';
import { WalletProvider } from './context/WalletContext';

function App() {
  const { darkMode } = useSettings();

  return (
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
  );
}

export default App;
