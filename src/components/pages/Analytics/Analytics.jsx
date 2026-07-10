import { Row, Col, Card, Statistic, Typography, Table, Tag } from 'antd';
import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/useLanguage';
import { formatCurrency, formatPercent } from '../../../utils';

const { Title } = Typography;

export default function Analytics() {
  const { assets, transactions } = useCrypto();
  const { t } = useLanguage();

  const totalInvested = assets.reduce(
    (sum, asset) => sum + (asset.amount * asset.price || 0),
    0,
  );
  const totalValue = assets.reduce(
    (sum, asset) => sum + (asset.totalAmount || 0),
    0,
  );
  const totalProfit = assets.reduce(
    (sum, asset) => sum + (asset.totalProfit || 0),
    0,
  );

  // Calculate realized profit from SELL transactions
  const realizedProfit = transactions
    .filter((tx) => tx.type === 'SELL')
    .reduce((sum, tx) => sum + (tx.profit || 0), 0);

  // Unrealized profit is current portfolio profit
  const unrealizedProfit = totalProfit;

  // Total profit includes both realized and unrealized
  const overallProfit = realizedProfit + unrealizedProfit;

  const roi =
    totalInvested > 0
      ? ((totalValue - totalInvested) / totalInvested) * 100
      : 0;

  const bestPerformer =
    assets.length > 0
      ? assets.reduce((best, asset) =>
          (asset.growPercent || 0) > (best.growPercent || 0) ? asset : best,
        )
      : null;

  const worstPerformer =
    assets.length > 0
      ? assets.reduce((worst, asset) =>
          (asset.growPercent || 0) < (worst.growPercent || 0) ? asset : worst,
        )
      : null;

  const performanceColumns = [
    {
      title: t('common.coin'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('dashboard.roi'),
      dataIndex: 'growPercent',
      key: 'growPercent',
      render: (value) => (
        <Tag color={value >= 0 ? 'success' : 'error'}>
          {formatPercent(value)}
        </Tag>
      ),
    },
    {
      title: t('common.profit'),
      dataIndex: 'totalProfit',
      key: 'totalProfit',
      render: (value) => formatCurrency(value),
    },
  ];

  const performanceData = assets
    .map((asset) => ({
      key: asset.id,
      name: asset.name,
      growPercent: asset.growPercent || 0,
      totalProfit: asset.totalProfit || 0,
    }))
    .sort((a, b) => b.growPercent - a.growPercent);

  if (assets.length === 0) {
    return (
      <div className="page-container">
        <Title level={3}>{t('dashboard.analytics')}</Title>
        <Card>
          <p style={{ textAlign: 'center', color: '#999' }}>
            {t('assets.noAssets')}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Title level={3}>{t('dashboard.analytics')}</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('dashboard.totalInvested')}
              value={totalInvested}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('dashboard.currentValue')}
              value={totalValue}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('dashboard.realizedProfit')}
              value={realizedProfit}
              precision={2}
              prefix="$"
              styles={{
                content: { color: realizedProfit >= 0 ? '#3f8600' : '#cf1322' },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title={t('dashboard.unrealizedProfit')}
              value={unrealizedProfit}
              precision={2}
              prefix="$"
              styles={{
                content: {
                  color: unrealizedProfit >= 0 ? '#3f8600' : '#cf1322',
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title={t('dashboard.overallProfit')}
              value={overallProfit}
              precision={2}
              prefix="$"
              styles={{
                content: {
                  color: overallProfit >= 0 ? '#3f8600' : '#cf1322',
                  fontSize: '28px',
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic
              title={t('dashboard.roi')}
              value={roi}
              precision={2}
              suffix="%"
              styles={{
                content: {
                  color: roi >= 0 ? '#3f8600' : '#cf1322',
                  fontSize: '28px',
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title={t('dashboard.bestPerformer')}>
            {bestPerformer ? (
              <div>
                <Title level={4}>{bestPerformer.name}</Title>
                <Statistic
                  value={bestPerformer.growPercent || 0}
                  precision={2}
                  suffix="%"
                  styles={{
                    content: { color: '#3f8600', fontSize: '32px' },
                  }}
                />
              </div>
            ) : (
              <p style={{ color: '#999' }}>{t('common.loading')}</p>
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={t('dashboard.worstPerformer')}>
            {worstPerformer ? (
              <div>
                <Title level={4}>{worstPerformer.name}</Title>
                <Statistic
                  value={worstPerformer.growPercent || 0}
                  precision={2}
                  suffix="%"
                  styles={{
                    content: { color: '#cf1322', fontSize: '32px' },
                  }}
                />
              </div>
            ) : (
              <p style={{ color: '#999' }}>{t('common.loading')}</p>
            )}
          </Card>
        </Col>
      </Row>

      <Card title={t('dashboard.performanceByAsset')}>
        <Table
          columns={performanceColumns}
          dataSource={performanceData}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
}
