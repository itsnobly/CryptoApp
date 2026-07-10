import { Row, Col, Card, Typography, Empty } from 'antd';
import CardContent from '../../Layout/CardContent';
import Chart from './Chart';
import Statistics from './Statistics';
import Cards from './Cards';
import { useCrypto } from '../../../context/crypto-context';

const { Title } = Typography;

export default function Dashboard() {
  const { assets, loading } = useCrypto();

  if (loading) {
    return (
      <div className="page-container">
        <Title level={3}>Dashboard</Title>
        <Card loading />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="page-container">
        <Title level={3}>Dashboard</Title>
        <Card>
          <Empty
            description="No assets in portfolio"
            style={{ padding: '40px 0' }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Title level={3}>Dashboard</Title>
      <Cards />
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
