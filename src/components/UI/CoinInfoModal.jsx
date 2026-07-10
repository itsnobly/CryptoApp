import { Modal, Descriptions, Button, Space } from 'antd';
import {
  formatCurrency,
  // formatNumber,
  formatPercent,
  formatCompactNumber,
} from '../../utils';
import { useLanguage } from '../../context/useLanguage';

export default function CoinInfoModal({ coin, open, onOk, onCancel }) {
  const { t } = useLanguage();

  if (!coin) {
    return null;
  }

  return (
    <Modal
      title={`${coin.name} (${coin.symbol})`}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={700}>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <div style={{ textAlign: 'center' }}>
          <img src={coin.icon} alt={coin.name} width={80} height={80} />
        </div>

        <Descriptions column={2} bordered>
          <Descriptions.Item label={t('coinInfo.currentPrice')}>
            {formatCurrency(coin.price)}
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.change1h')}>
            <span
              style={{
                color: coin.priceChange1h > 0 ? '#52c41a' : '#f5222d',
              }}>
              {formatPercent(coin.priceChange1h)}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.change24h')}>
            <span
              style={{
                color: coin.priceChange1d > 0 ? '#52c41a' : '#f5222d',
              }}>
              {formatPercent(coin.priceChange1d)}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.change7d')}>
            <span
              style={{
                color: coin.priceChange1w > 0 ? '#52c41a' : '#f5222d',
              }}>
              {formatPercent(coin.priceChange1w)}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.marketCap')}>
            ${formatCompactNumber(coin.marketCap)}
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.volume24h')}>
            ${formatCompactNumber(coin.volume)}
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.availableSupply')}>
            {formatCompactNumber(coin.availableSupply)}
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.totalSupply')}>
            {formatCompactNumber(coin.totalSupply)}
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.rank')}>
            {coin.rank}
          </Descriptions.Item>

          <Descriptions.Item label={t('coinInfo.symbol')}>
            {coin.symbol}
          </Descriptions.Item>
        </Descriptions>

        {coin.websiteUrl && (
          <div>
            <Button
              type="primary"
              href={coin.websiteUrl}
              target="_blank"
              rel="noopener noreferrer">
              {t('coinInfo.officialWebsite')}
            </Button>
          </div>
        )}
      </Space>
    </Modal>
  );
}
