import { Row, Col, Typography, Card, Empty } from 'antd';
import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/LanguageContext';
import Portfolio from './Portfolio';
import CoinInfo from './CoinInfo';

const { Title } = Typography;

export default function Assets() {
  const { assets } = useCrypto();
  const { t } = useLanguage();
  const totalValue = assets.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0,
  );
  const profit = assets.reduce((sum, item) => sum + (item.totalProfit || 0), 0);
  const assetCount = assets.length;

  if (assets.length === 0) {
    return (
      <div className="page-container">
        <Title level={3}>{t('assets.title')}</Title>
        <Card>
          <Empty
            description={t('assets.noAssets')}
            style={{ padding: '40px 0' }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Title level={3}>{t('assets.title')}</Title>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {t('assets.title')}
            </Typography.Text>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {assetCount}
            </Typography.Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {t('dashboard.totalPortfolio')}
            </Typography.Text>
            <Typography.Title level={4} style={{ margin: 0 }}>
              ${totalValue.toFixed(2)}
            </Typography.Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {t('dashboard.totalProfit')}
            </Typography.Text>
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                color: profit >= 0 ? '#3f8600' : '#cf1322',
              }}>
              ${profit.toFixed(2)}
            </Typography.Title>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Portfolio />
        </Col>
        <Col xs={24} lg={8}>
          <Card className="dashboard-card">
            <CoinInfo />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
