import { Table, Typography } from 'antd';
import { useCrypto } from '../../../context/crypto-context';

const { Title } = Typography;

export default function History() {
  const { assets } = useCrypto();

  const dataSource = assets.map((asset, index) => ({
    key: asset.id || index,
    date: asset.date ? asset.date.toString().slice(0, 10) : 'N/A',
    coin: asset.name || asset.id,
    amount: asset.amount,
    price: asset.price,
    status: 'Buy',
  }));

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      responsive: ['md'],
    },
    {
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
      width: 120,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      responsive: ['sm'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      responsive: ['md'],
      render: (value) => `$${Number(value).toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      responsive: ['lg'],
    },
  ];

  return (
    <div className="page-container">
      <Title level={3}>History</Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 8,
          showSizeChanger: true,
          pageSizeOptions: ['8', '15', '30'],
          showTotal: (total) => `${total} transactions`,
        }}
        scroll={{ x: 600, y: 400 }}
        size="small"
      />
    </div>
  );
}
