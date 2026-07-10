import { useCrypto } from '../../../context/crypto-context';
import { useSettings } from '../../../context/settings-context';
import { Typography, List, Avatar } from 'antd';

const { Title, Text } = Typography;

export default function CoinInfo() {
  const { crypto } = useCrypto();
  const { showMarketPrices } = useSettings();
  const topCoins = crypto.slice(0, 5);

  if (!showMarketPrices) {
    return (
      <div>
        <Title level={5}>Top coins</Title>
        <Text type="secondary">
          Market prices are hidden. Enable in Settings.
        </Text>
      </div>
    );
  }

  return (
    <div>
      <Title level={5}>Top coins</Title>
      <List
        itemLayout="horizontal"
        dataSource={topCoins}
        renderItem={(coin) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={coin.icon} />}
              title={coin.name}
              description={
                <Text type="secondary">${coin.price.toFixed(2)}</Text>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
