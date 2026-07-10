import { Card, Table, Button, Typography, Input, Tag } from 'antd';
import { StarOutlined, StarFilled, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useCrypto } from '../../../context/crypto-context';
import { useState } from 'react';

const { Title } = Typography;

export default function Watchlist() {
  const { crypto } = useCrypto();
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

  const watchlistCoins = filteredCrypto.filter((coin) => watchlist.includes(coin.id));

  const columns = [
    {
      title: 'Coin',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={record.icon} alt={text} width={24} height={24} />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: '24h Change',
      dataIndex: 'priceChange1d',
      key: 'priceChange1d',
      render: (value) => (
        <Tag color={value >= 0 ? 'success' : 'error'}>
          {value >= 0 ? '+' : ''}{value.toFixed(2)}%
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="text"
          icon={watchlist.includes(record.id) ? <StarFilled /> : <StarOutlined />}
          onClick={() => toggleWatchlist(record.id)}
          style={{ color: watchlist.includes(record.id) ? '#faad14' : undefined }}
        />
      ),
    },
  ];

  const allCoinsColumns = [
    ...columns.slice(0, -1),
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="text"
          icon={watchlist.includes(record.id) ? <StarFilled /> : <StarOutlined />}
          onClick={() => toggleWatchlist(record.id)}
          style={{ color: watchlist.includes(record.id) ? '#faad14' : undefined }}
        />
      ),
    },
  ];

  return (
    <div className="page-container">
      <Title level={3}>Watchlist</Title>
      
      <Card title="Your Watchlist" style={{ marginBottom: 16 }}>
        {watchlistCoins.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
            No coins in watchlist. Add coins from the list below.
          </p>
        ) : (
          <Table
            columns={columns}
            dataSource={watchlistCoins.map((coin) => ({ ...coin, key: coin.id }))}
            pagination={false}
            size="small"
          />
        )}
      </Card>

      <Card title="All Coins">
        <Input
          placeholder="Search coins..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        <Table
          columns={allCoinsColumns}
          dataSource={filteredCrypto.map((coin) => ({ ...coin, key: coin.id }))}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: [10, 25, 50],
            position: 'bottomCenter',
          }}
          scroll={{ x: 600, y: 400 }}
          size="small"
        />
      </Card>
    </div>
  );
}
