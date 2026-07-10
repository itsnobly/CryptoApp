import { Card, Statistic, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { percentDifference } from '../../utils';
import { fakeFetchCrypto, fakeFetchAssets } from '../../api';

export default function CardContent() {
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      try {
        setLoading(true);

        const { result } = await fakeFetchCrypto();
        const assetsData = await fakeFetchAssets();

        setAssets(
          assetsData.map((asset) => {
            const coin = result.find((c) => c.id === asset.id);

            return {
              ...asset,
              name: coin?.name ?? 'Unknown',
              grow: coin ? asset.price < coin.price : false,
              growPercent: coin
                ? percentDifference(asset.price, coin.price)
                : 0,
              totalAmount: coin ? asset.amount * coin.price : 0,
              totalProfit: coin
                ? asset.amount * coin.price - asset.amount * asset.price
                : 0,
            };
          }),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    preload();
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {assets.map((asset) => (
        <Card key={asset.id} variant="borderless">
          <Statistic
            title={asset.name}
            value={asset.totalAmount}
            precision={2}
            styles={{
              content: {
                color: asset.grow ? '#3f8600' : '#cf1322',
              },
            }}
          />

          <ul className="asset-list">
            {[
              {
                title: 'Total Profit',
                value: asset.totalProfit.toFixed(2),
              },
              {
                title: 'Asset Amount',
                value: asset.amount,
              },
              {
                title: 'Difference',
                value: `${asset.growPercent}%`,
              },
            ].map((item) => (
              <li key={item.title} className="asset-list-item">
                <span>{item.title}</span>
                <span style={{ color: asset.grow ? '#3f8600' : '#cf1322' }}>
                  {asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}{' '}
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
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
    </>
  );
}
