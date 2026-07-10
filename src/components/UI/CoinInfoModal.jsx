import { Modal, Descriptions, Button, Space, Typography } from 'antd';
import { formatCurrency, formatNumber, formatPercent } from '../../utils';
import { useSettings } from '../../context/settings-context';

const { Text } = Typography;

export default function CoinInfoModal({ coin, open, onOk, onCancel }) {
  const { showMarketPrices } = useSettings();

  if (!coin) return null;

  return (
    <Modal
      title={`${coin.name} (${coin.symbol})`}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={700}>
      <Space orientation="vertical" style={{ width: '100%' }} size="large">
        <div style={{ textAlign: 'center' }}>
          <img src={coin.icon} alt={coin.name} width={80} height={80} />
        </div>

        {!showMarketPrices ? (
          <Text type="secondary">
            Market prices are hidden. Enable &quot;Show market prices&quot; in
            Settings to see details.
          </Text>
        ) : (
          <Descriptions column={{ xs: 1, sm: 2 }} bordered>
            <Descriptions.Item label="Current price">
              {formatCurrency(coin.price)}
            </Descriptions.Item>
            <Descriptions.Item label="Change 1h">
              <span
                style={{
                  color: coin.priceChange1h > 0 ? '#52c41a' : '#f5222d',
                }}>
                {formatPercent(coin.priceChange1h)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Change 24h">
              <span
                style={{
                  color: coin.priceChange1d > 0 ? '#52c41a' : '#f5222d',
                }}>
                {formatPercent(coin.priceChange1d)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Change 7d">
              <span
                style={{
                  color: coin.priceChange1w > 0 ? '#52c41a' : '#f5222d',
                }}>
                {formatPercent(coin.priceChange1w)}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Market Cap">
              {formatCurrency(coin.marketCap)}
            </Descriptions.Item>
            <Descriptions.Item label="Volume 24h">
              {formatCurrency(coin.volume)}
            </Descriptions.Item>
            <Descriptions.Item label="Available Supply">
              {formatNumber(coin.availableSupply)}
            </Descriptions.Item>
            <Descriptions.Item label="Total Supply">
              {formatNumber(coin.totalSupply)}
            </Descriptions.Item>
            <Descriptions.Item label="Rank">{coin.rank}</Descriptions.Item>
            <Descriptions.Item label="Symbol">{coin.symbol}</Descriptions.Item>
          </Descriptions>
        )}

        {coin.websiteUrl && (
          <div>
            <Button
              type="primary"
              href={coin.websiteUrl}
              target="_blank"
              rel="noopener noreferrer">
              Official website
            </Button>
          </div>
        )}
      </Space>
    </Modal>
  );
}
