import { Statistic, Row, Col, Card } from 'antd';
import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/useLanguage';

export default function Statistics() {
  const { assets } = useCrypto();
  const { t } = useLanguage();
  const total = assets.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
  const profit = assets.reduce((sum, item) => sum + (item.totalProfit || 0), 0);
  const positive = assets.filter((item) => item.grow).length;
  const negative = assets.length - positive;

  return (
    <Row gutter={[12, 12]}>
      <Col xs={12} sm={12}>
        <Card>
          <Statistic
            title={t('dashboard.totalPortfolio')}
            value={total}
            precision={2}
            suffix="$"
          />
        </Card>
      </Col>
      <Col xs={12} sm={12}>
        <Card>
          <Statistic
            title={t('dashboard.totalProfit')}
            value={profit}
            precision={2}
            suffix="$"
          />
        </Card>
      </Col>
      <Col xs={12} sm={12}>
        <Card>
          <Statistic title={t('dashboard.gainers')} value={positive} />
        </Card>
      </Col>
      <Col xs={12} sm={12}>
        <Card>
          <Statistic title={t('dashboard.losers')} value={negative} />
        </Card>
      </Col>
    </Row>
  );
}
