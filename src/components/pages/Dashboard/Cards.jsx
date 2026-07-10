import { Row, Col, Card, Statistic } from 'antd';
import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/LanguageContext';

export default function Cards() {
  const { assets } = useCrypto();
  const { t } = useLanguage();
  const totalAmount = assets.reduce(
    (sum, asset) => sum + (asset.totalAmount || 0),
    0,
  );
  const totalInvested = assets.reduce(
    (sum, asset) => sum + (asset.amount * asset.price || 0),
    0,
  );
  const totalCount = assets.length;
  
  const roi = totalInvested > 0 ? ((totalAmount - totalInvested) / totalInvested) * 100 : 0;

  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} sm={12} md={6}>
        <Card style={{ borderRadius: '12px' }}>
          <Statistic
            title={t('assets.title')}
            value={totalCount}
            styles={{ content: { fontSize: '24px' } }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card style={{ borderRadius: '12px' }}>
          <Statistic
            title={t('dashboard.totalPortfolio')}
            value={totalAmount}
            precision={2}
            prefix="$"
            styles={{ content: { fontSize: '24px' } }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card style={{ borderRadius: '12px' }}>
          <Statistic
            title={t('dashboard.invested')}
            value={totalInvested}
            precision={2}
            prefix="$"
            styles={{ content: { fontSize: '24px' } }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card style={{ borderRadius: '12px' }}>
          <Statistic
            title={t('dashboard.roi')}
            value={roi}
            precision={2}
            suffix="%"
            styles={{
              content: {
                fontSize: '24px',
                color: roi >= 0 ? '#3f8600' : '#cf1322',
              }
            }}
          />
        </Card>
      </Col>
    </Row>
  );
}
