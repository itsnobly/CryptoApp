import { Row, Col, Card, Typography, Empty } from 'antd';
import CardContent from '../../Layout/CardContent';
import Chart from './Chart';
import Statistics from './Statistics';
import Cards from './Cards';
import AnalyticsCards from './AnalyticsCards';
import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/LanguageContext';

const { Title } = Typography;

export default function Dashboard() {
  const { assets, loading } = useCrypto();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="page-container">
        <Title level={3}>{t('sidebar.dashboard')}</Title>
        <Card loading />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="page-container">
        <Title level={3}>{t('sidebar.dashboard')}</Title>
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
      <Title level={3}>{t('sidebar.dashboard')}</Title>
      <Cards />
      <AnalyticsCards />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="dashboard-card">
            <Chart />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="dashboard-card">
            <Statistics />
          </Card>
        </Col>
      </Row>
      <CardContent />
    </div>
  );
}
