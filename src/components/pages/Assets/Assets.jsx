import { Row, Col, Typography, Card } from 'antd';
import { useCrypto } from '../../../context/crypto-context';
import Portfolio from './Portfolio';
import CoinInfo from './CoinInfo';

const { Title } = Typography;

export default function Assets() {
  const { assets } = useCrypto();
  const totalValue = assets.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0,
  );
  const profit = assets.reduce((sum, item) => sum + (item.totalProfit || 0), 0);
  const assetCount = assets.length;

  return (
    <div className="page-container">
      <Title level={3}>Assets</Title>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Assets
            </Typography.Text>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {assetCount}
            </Typography.Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Total value
            </Typography.Text>
            <Typography.Title level={4} style={{ margin: 0 }}>
              ${totalValue.toFixed(2)}
            </Typography.Title>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Total profit
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
