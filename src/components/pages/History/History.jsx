import { Table, Typography, Tag, Input, Select, Empty, Card } from 'antd';
import { useCrypto } from '../../../context/crypto-context';
import { useLanguage } from '../../../context/LanguageContext';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import dayjs from 'dayjs';

const { Title } = Typography;

export default function History() {
  const { transactions } = useCrypto();
  const { t } = useLanguage();
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.coinName?.toLowerCase().includes(searchText.toLowerCase()) ||
      tx.symbol?.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  const dataSource = filteredTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((tx, index) => ({
      key: tx.id || index,
      date: tx.date ? dayjs(tx.date).format('DD.MM.YYYY HH:mm') : 'N/A',
      type: tx.type,
      coin: tx.coinName || tx.coinId,
      amount: tx.amount,
      price: tx.price,
      total: tx.total,
      profit: tx.profit,
    }));

  const columns = [
    {
      title: t('history.date'),
      dataIndex: 'date',
      key: 'date',
      width: 150,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: t('history.type'),
      dataIndex: 'type',
      key: 'type',
      width: 80,
      render: (type) => (
        <Tag color={type === 'BUY' ? 'green' : 'red'}>{type}</Tag>
      ),
    },
    {
      title: t('history.coin'),
      dataIndex: 'coin',
      key: 'coin',
      width: 120,
    },
    {
      title: t('history.amount'),
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (value, record) => `${value.toFixed(6)} ${record.coin}`,
    },
    {
      title: t('history.price'),
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: t('history.total'),
      dataIndex: 'total',
      key: 'total',
      width: 100,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: t('common.profit'),
      dataIndex: 'profit',
      key: 'profit',
      width: 100,
      render: (value) =>
        value !== undefined ? (
          <Tag color={value >= 0 ? 'success' : 'error'}>
            {value >= 0 ? '+' : ''}${value.toFixed(2)}
          </Tag>
        ) : (
          '-'
        ),
    },
  ];

  return (
    <div className="page-container">
      <Title level={3}>{t('history.title')}</Title>
      {transactions.length === 0 ? (
        <Card>
          <Empty
            description={t('history.noTransactions')}
            style={{ padding: '40px 0' }}
          />
        </Card>
      ) : (
        <>
          <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Input
              placeholder={t('history.search')}
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: 300 }}
            />
            <Select
              value={filterType}
              onChange={setFilterType}
              style={{ width: 120 }}
              options={[
                { label: t('history.all'), value: 'all' },
                { label: 'BUY', value: 'BUY' },
                { label: 'SELL', value: 'SELL' },
              ]}
            />
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={
              dataSource.length > 10
                ? {
                    pageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 25, 50],
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} transactions`,
                    position: 'bottomCenter',
                  }
                : false
            }
            scroll={{ x: 800, y: 400 }}
            size="small"
          />
        </>
      )}
    </div>
  );
}
