import { Card, Statistic, Spin, Typography, List, Tag } from 'antd';
import { useContext } from 'react';
import { CryptoContext } from '../../context/crypto-context';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
const { Text } = Typography;

export default function CardContent() {
  const { assets, loading } = useContext(CryptoContext);
  if (loading) {
    return (
      <div className="loader">
        <Spin fullscreen />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
      }}>
      {assets.map((asset) => (
        <Card key={asset.id} variant="borderless">
          <Statistic
            title={capitalize(asset.name)}
            value={asset.totalAmount}
            precision={2}
            styles={{
              content: {
                color: asset.grow ? '#3f8600' : '#cf1322',
              },
            }}
          />

          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: asset.totalProfit,
                withTag: true,
              },
              {
                title: 'Asset Amount',
                value: asset.amount,
                isPlain: true,
              },
              // {
              //   title: 'Difference',
              //   value: asset.growPercent,
              // },
            ]}
            renderItem={(item) => (
              <List.Item>
                <Text>{item.title}</Text>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {' '}
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {/* {item.isPlain && item.value} */}
                  {item.isPlain ? (
                    <Text type={asset.grow ? 'success' : 'danger'}>
                      {asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
                      {Number(item.value).toFixed(2)}
                    </Text>
                  ) : item.title === 'Difference' ? (
                    <Text type={asset.grow ? 'success' : 'danger'}>
                      {asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
                      {Number(item.value).toFixed(2)}%
                    </Text>
                  ) : (
                    <Text>{Number(item.value).toFixed(2)}$</Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
      <Card variant="borderless">
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          styles={{
            content: {
              color: '#cf1322',
            },
          }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </div>
  );
}
