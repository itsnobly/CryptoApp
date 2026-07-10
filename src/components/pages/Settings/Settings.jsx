import { Card, Typography, Space, Switch } from 'antd';
import { useSettings } from '../../../context/settings-context';

const { Title, Text } = Typography;

export default function Settings() {
  const { darkMode, showMarketPrices, setDarkMode, setShowMarketPrices } =
    useSettings();

  return (
    <div className="page-container">
      <Title level={3}>Settings</Title>
      <Card>
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
          <div className="settings-row">
            <Text>Dark mode</Text>
            <Switch checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="settings-row">
            <Text>Show market prices</Text>
            <Switch
              checked={showMarketPrices}
              onChange={setShowMarketPrices}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
}
