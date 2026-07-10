import { ConfigProvider, theme } from 'antd';
import AppLayout from './components/Layout/AppLayout';
import { useSettings } from './context/settings-context';

function App() {
  const { darkMode } = useSettings();

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          borderRadius: 12,
        },
      }}>
      <AppLayout />
    </ConfigProvider>
  );
}

export default App;
