import { Row, Col, Card, Statistic } from 'antd';
import { useCrypto } from '../../../context/crypto-context';

export default function Cards() {
  const { assets } = useCrypto();
  const totalAmount = assets.reduce(
    (sum, asset) => sum + (asset.totalAmount || 0),
    0,
  );
  const totalProfit = assets.reduce(
    (sum, asset) => sum + (asset.totalProfit || 0),
    0,
  );
  const totalCount = assets.length;

  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ borderRadius: '12px' }}>
          <Statistic
            title="Assets"
            value={totalCount}
            valueStyle={{ fontSize: '24px' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ borderRadius: '12px' }}>
          <Statistic
            title="Total Value"
            value={totalAmount}
            precision={2}
            suffix="$"
            valueStyle={{ fontSize: '24px' }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card style={{ borderRadius: '12px' }}>
          <Statistic
            title="Profit"
            value={totalProfit}
            precision={2}
            suffix="$"
            valueStyle={{
              fontSize: '24px',
              color: totalProfit >= 0 ? '#3f8600' : '#cf1322',
            }}
          />
        </Card>
      </Col>
    </Row>
  );
}
