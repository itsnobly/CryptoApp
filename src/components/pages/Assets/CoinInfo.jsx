import { useCrypto } from '../../../context/crypto-context';
import { useSettings } from '../../../context/settings-context';
import { useLanguage } from '../../../context/LanguageContext';
import { Typography, Avatar } from 'antd';

const { Title, Text } = Typography;

export default function CoinInfo() {
  const { crypto } = useCrypto();
  const { showMarketPrices } = useSettings();
  const { t } = useLanguage();
  const topCoins = crypto.slice(0, 5);

  if (!showMarketPrices) {
    return (
      <div>
        <Title level={5}>{t('common.topCoins')}</Title>
        <Text type="secondary">
          {t('common.marketPricesHidden')}
        </Text>
      </div>
    );
  }

  return (
    <div>
      <Title level={5}>{t('common.topCoins')}</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {topCoins.map((coin) => (
          <div
            key={coin.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 0',
            }}>
            <Avatar src={coin.icon} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{coin.name}</div>
              <Text type="secondary">${coin.price.toFixed(2)}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
