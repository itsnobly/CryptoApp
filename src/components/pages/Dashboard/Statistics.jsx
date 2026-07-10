import { Statistic, Row, Col, Card } from 'antd';
import { useCrypto } from '../../../context/crypto-context';

export default function Statistics() {
  const { assets } = useCrypto();
  const total = assets.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
  const profit = assets.reduce((sum, item) => sum + (item.totalProfit || 0), 0);
  const positive = assets.filter((item) => item.grow).length;
  const negative = assets.length - positive;

  return (
    <Row gutter={[12, 12]}>
      <Col xs={12} sm={12}>
        <Card>
          <Statistic title="Portfolio" value={total} precision={2} suffix="$" />
        </Card>
      </Col>
      <Col xs={12} sm={12}>
        <Card>
          <Statistic title="Profit" value={profit} precision={2} suffix="$" />
        </Card>
      </Col>
      <Col xs={12} sm={12}>
        <Card>
          <Statistic title="Gainers" value={positive} />
        </Card>
      </Col>
      <Col xs={12} sm={12}>
        <Card>
          <Statistic title="Losers" value={negative} />
        </Card>
      </Col>
    </Row>
  );
}
