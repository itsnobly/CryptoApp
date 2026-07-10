import { Card, Table, Button, Typography, Input, Tag } from 'antd';

import { StarOutlined, StarFilled, SearchOutlined } from '@ant-design/icons';

import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/useLanguage';

import { formatMoney, formatNumber } from '../../../utils/format';

import { useState } from 'react';

const { Title } = Typography;

export default function Watchlist() {
  const { crypto } = useCrypto();

  const { t } = useLanguage();

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('cryptoWatchlist');

    return saved ? JSON.parse(saved) : [];
  });

  const [searchText, setSearchText] = useState('');

  const toggleWatchlist = (coinId) => {
    setWatchlist((prev) => {
      const newWatchlist = prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId];

      localStorage.setItem('cryptoWatchlist', JSON.stringify(newWatchlist));

      return newWatchlist;
    });
  };

  const filteredCrypto = crypto.filter(
    (coin) =>
      coin.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      coin.symbol?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const watchlistCoins = filteredCrypto.filter((coin) =>
    watchlist.includes(coin.id),
  );

  const columns = [
    {
      title: t('watchlist.coin'),

      dataIndex: 'name',

      key: 'name',

      render: (text, record) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
          <img src={record.icon} alt={text} width={24} height={24} />

          <span>{text}</span>
        </div>
      ),
    },

    {
      title: t('watchlist.symbol'),

      dataIndex: 'symbol',

      key: 'symbol',
    },

    {
      title: t('watchlist.price'),

      dataIndex: 'price',

      key: 'price',

      render: (value) => (value ? formatMoney(value) : '-'),
    },

    {
      title: t('watchlist.change24h'),

      dataIndex: 'priceChange1d',

      key: 'priceChange1d',

      render: (value) =>
        value !== null && value !== undefined ? (
          <Tag color={value >= 0 ? 'success' : 'error'}>
            {value >= 0 ? '+' : ''}
            {formatNumber(value)}%
          </Tag>
        ) : (
          '-'
        ),
    },

    {
      title: t('watchlist.addToWatchlist'),

      key: 'actions',

      render: (_, record) => (
        <Button
          type="text"
          icon={
            watchlist.includes(record.id) ? <StarFilled /> : <StarOutlined />
          }
          onClick={() => toggleWatchlist(record.id)}
          style={{
            color: watchlist.includes(record.id) ? '#faad14' : undefined,
          }}
        />
      ),
    },
  ];

  return (
    <div className="page-container">
      <Title level={3}>{t('watchlist.title')}</Title>

      <Card
        title={t('watchlist.yourWatchlist')}
        style={{
          marginBottom: 16,
        }}>
        {watchlistCoins.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: '#999',
              padding: '20px',
            }}>
            {t('watchlist.noCoins')}
          </p>
        ) : (
          <Table
            columns={columns}
            dataSource={watchlistCoins.map((coin) => ({
              ...coin,
              key: coin.id,
            }))}
            pagination={false}
            size="small"
          />
        )}
      </Card>

      <Card title={t('watchlist.allCoins')}>
        <Input
          placeholder={t('watchlist.searchCoins')}
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            marginBottom: 16,
          }}
        />

        <Table
          columns={columns}
          dataSource={filteredCrypto.map((coin) => ({
            ...coin,
            key: coin.id,
          }))}
          pagination={{
            pageSize: 10,

            showSizeChanger: true,

            pageSizeOptions: [10, 25, 50],

            placement: 'bottomCenter',
          }}
          scroll={{
            x: 600,
            y: 400,
          }}
          size="small"
        />
      </Card>
    </div>
  );
}
