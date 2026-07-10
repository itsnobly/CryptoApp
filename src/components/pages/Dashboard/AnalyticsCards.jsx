import { Card, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/LanguageContext';

export default function AnalyticsCards() {
  const { assets } = useCrypto();
  const { t } = useLanguage();

  // Calculate total portfolio value
  const totalPortfolioValue = assets.reduce((sum, asset) => sum + (asset.totalAmount || 0), 0);

  // Calculate 24h change (simplified - using current profit as proxy since we don't have historical data)
  const totalProfit = assets.reduce((sum, asset) => sum + (asset.totalProfit || 0), 0);
  const totalInvested = assets.reduce((sum, asset) => sum + (asset.amount * asset.price || 0), 0);
  const dailyChangePercent = totalInvested > 0 ? ((totalPortfolioValue - totalInvested) / totalInvested) * 100 : 0;
  const dailyChangeAmount = totalPortfolioValue - totalInvested;

  // 24h P&L (same as total profit for now)
  const pnl24h = totalProfit;

  // Find best performer (highest growth percent)
  const bestPerformer = assets.reduce((best, asset) => {
    if (!best || (asset.growPercent || 0) > (best.growPercent || 0)) {
      return asset;
    }
    return best;
  }, null);

  // Find worst performer (lowest growth percent or highest loss)
  const worstPerformer = assets.reduce((worst, asset) => {
    if (!worst || (asset.growPercent || 0) < (worst.growPercent || 0)) {
      return asset;
    }
    return worst;
  }, null);

  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title={t('dashboard.dailyChange')}
            value={dailyChangePercent}
            precision={2}
            suffix="%"
            styles={{ content: { color: dailyChangePercent >= 0 ? '#3f8600' : '#cf1322' } }}
            prefix={dailyChangePercent >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          />
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            {dailyChangeAmount >= 0 ? '+' : ''}${dailyChangeAmount.toFixed(2)}
          </div>
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title={t('dashboard.pnl24h')}
            value={pnl24h}
            precision={2}
            prefix="$"
            styles={{ content: { color: pnl24h >= 0 ? '#3f8600' : '#cf1322' } }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title={t('dashboard.bestPerformer')}
            value={bestPerformer?.growPercent || 0}
            precision={2}
            suffix="%"
            styles={{ content: { color: (bestPerformer?.growPercent || 0) >= 0 ? '#3f8600' : '#cf1322' } }}
          />
          {bestPerformer && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {bestPerformer.name}
            </div>
          )}
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title={t('dashboard.worstPerformer')}
            value={worstPerformer?.growPercent || 0}
            precision={2}
            suffix="%"
            styles={{ content: { color: (worstPerformer?.growPercent || 0) >= 0 ? '#3f8600' : '#cf1322' } }}
          />
          {worstPerformer && (
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {worstPerformer.name}
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
}
