import { Card, Typography, Space, Switch, Select } from 'antd';
import { useSettings } from '../../../context/settings-context';
import { useLanguage } from '../../../context/useLanguage';

const { Title, Text } = Typography;

export default function Settings() {
  const { darkMode, showMarketPrices, setDarkMode, setShowMarketPrices } =
    useSettings();
  const { language, changeLanguage, t } = useLanguage();

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Русский', value: 'ru' },
  ];

  return (
    <div className="page-container">
      <Title level={3}>{t('settings.title')}</Title>
      <Card>
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
          <div className="settings-row">
            <Text>{t('settings.darkMode')}</Text>
            <Switch checked={darkMode} onChange={setDarkMode} />
          </div>
          <div className="settings-row">
            <Text>{t('settings.showMarketPrices')}</Text>
            <Switch checked={showMarketPrices} onChange={setShowMarketPrices} />
          </div>
          <div className="settings-row">
            <Text>{t('settings.language')}</Text>
            <Select
              value={language}
              onChange={changeLanguage}
              options={languageOptions}
              style={{ width: 120 }}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
}
