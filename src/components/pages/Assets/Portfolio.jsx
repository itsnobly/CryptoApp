import { Table, Tag, Typography } from 'antd';
import { useCrypto } from '../../../context/crypto-context';
import { useSettings } from '../../../context/settings-context';

const { Text } = Typography;

export default function Portfolio() {
  const { assets } = useCrypto();
  const { showMarketPrices } = useSettings();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Buy Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => `$${value.toFixed(2)}`,
    },
    ...(showMarketPrices
      ? [
          {
            title: 'Current Price',
            dataIndex: 'currentPrice',
            key: 'currentPrice',
            render: (value) => `$${value.toFixed(2)}`,
          },
        ]
      : []),
    {
      title: 'Total Value',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Profit',
      dataIndex: 'totalProfit',
      key: 'totalProfit',
      render: (value) => (
        <Tag color={value >= 0 ? 'success' : 'error'}>
          {value >= 0 ? '+' : ''}${value.toFixed(2)}
        </Tag>
      ),
    },
  ];

  const dataSource = assets.map((asset, index) => ({
    key: asset.id || index,
    ...asset,
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20'],
        showTotal: (total) => `${total} assets`,
      }}
      scroll={{ x: 800, y: 400 }}
      rowKey="key"
    />
  );
}
