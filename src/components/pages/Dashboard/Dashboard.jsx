import { Row, Col, Card, Typography } from 'antd';
import CardContent from '../../Layout/CardContent';
import Chart from './Chart';
import Statistics from './Statistics';
import Cards from './Cards';

const { Title } = Typography;

export default function Dashboard() {
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
