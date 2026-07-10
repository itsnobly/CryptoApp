import { Card, Statistic, Typography, Tag, Pagination } from 'antd';
import { useContext, useState, useEffect } from 'react';
import { CryptoContext } from '../../context/crypto-context';
import { useLanguage } from '../../context/useLanguage';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';

const { Text, Title } = Typography;
const PAGE_SIZE = 6;

export default function CardContent() {
  const { assets } = useContext(CryptoContext);
  const { t } = useLanguage();
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(assets.length / PAGE_SIZE);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) setPage(totalPages);
  }, [assets.length, page, totalPages]);

  const paginatedAssets = assets.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  if (assets.length === 0) {
    return (
      <Card variant="borderless">
        <Text type="secondary">{t('assets.noAssets')}</Text>
      </Card>
    );
  }

  return (
    <div className="asset-cards-section">
      <div className="asset-cards-header">
        <Title level={4} style={{ margin: 0 }}>
          {t('dashboard.yourAssets')}
        </Title>
        <Text type="secondary">
          {assets.length} {t('dashboard.total')}
        </Text>
      </div>

      <div className="asset-cards-grid">
        {paginatedAssets.map((asset) => (
          <Card key={asset.id} variant="borderless">
            <Statistic
              title={capitalize(asset.name)}
              value={asset.totalAmount}
              precision={2}
              styles={{
                content: { color: asset.grow ? '#3f8600' : '#cf1322' },
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '12px',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">{t('dashboard.totalProfit')}</Text>
                <span>
                  <Tag color={asset.grow ? 'green' : 'red'}>
                    {Number(asset.growPercent).toFixed(2)}%
                  </Tag>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">{t('dashboard.assetAmount')}</Text>
                <Text type={asset.grow ? 'success' : 'danger'}>
                  {asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
                  {Number(asset.amount).toFixed(2)}
                </Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">{t('dashboard.difference')}</Text>
                <Text type={asset.grow ? 'success' : 'danger'}>
                  {asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
                  {Number(asset.growPercent).toFixed(2)}%
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="asset-cards-pagination">
          <Pagination
            current={page}
            total={assets.length}
            pageSize={PAGE_SIZE}
            onChange={setPage}
            showSizeChanger={false}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
          />
        </div>
      )}
    </div>
  );
}
