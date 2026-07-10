import { Table, Tag, Typography, Button, Space, Popconfirm, Input, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, DollarOutlined } from '@ant-design/icons';
import { useCrypto } from '../../../context/crypto-context';
import { useSettings } from '../../../context/settings-context';
import { useState } from 'react';
import SellAssetsForm from '../../UI/SellAssetsForm';

const { Text } = Typography;

export default function Portfolio() {
  const { assets, removeAsset, updateAsset } = useCrypto();
  const { showMarketPrices } = useSettings();
  const [searchText, setSearchText] = useState('');
  const [editingAsset, setEditingAsset] = useState(null);
  const [sellingAsset, setSellingAsset] = useState(null);

  const handleDelete = (assetId) => {
    removeAsset(assetId);
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
  };

  const handleSaveEdit = () => {
    if (editingAsset) {
      updateAsset(editingAsset.id, {
        amount: editingAsset.amount,
        price: editingAsset.price,
        date: editingAsset.date,
      });
      setEditingAsset(null);
    }
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      asset.symbol?.toLowerCase().includes(searchText.toLowerCase()) ||
      asset.id?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => (a.name || '').localeCompare(b.name || ''),
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      render: (value, record) =>
        editingAsset?.id === record.id ? (
          <Input
            type="number"
            value={editingAsset.amount}
            onChange={(e) =>
              setEditingAsset({ ...editingAsset, amount: parseFloat(e.target.value) || 0 })
            }
            style={{ width: 100 }}
          />
        ) : (
          value
        ),
    },
    {
      title: 'Buy Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (value, record) =>
        editingAsset?.id === record.id ? (
          <Input
            type="number"
            value={editingAsset.price}
            onChange={(e) =>
              setEditingAsset({ ...editingAsset, price: parseFloat(e.target.value) || 0 })
            }
            style={{ width: 100 }}
          />
        ) : (
          `$${value.toFixed(2)}`
        ),
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
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Profit',
      dataIndex: 'totalProfit',
      key: 'totalProfit',
      sorter: (a, b) => a.totalProfit - b.totalProfit,
      render: (value) => (
        <Tag color={value >= 0 ? 'success' : 'error'}>
          {value >= 0 ? '+' : ''}${value.toFixed(2)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) =>
        editingAsset?.id === record.id ? (
          <Space>
            <Button size="small" type="primary" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button size="small" onClick={() => setEditingAsset(null)}>
              Cancel
            </Button>
          </Space>
        ) : (
          <Space>
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
            <Button
              size="small"
              icon={<DollarOutlined />}
              onClick={() => setSellingAsset(record)}
            />
            <Popconfirm
              title="Delete this asset?"
              description="This action cannot be undone."
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No">
              <Button size="small" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
    },
  ];

  const dataSource = filteredAssets.map((asset, index) => ({
    key: asset.id || index,
    ...asset,
  }));

  return (
    <div>
      <Input
        placeholder="Search assets..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, maxWidth: 300 }}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={
          dataSource.length > 10
            ? {
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: [10, 25, 50],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} assets`,
                position: 'bottomCenter',
              }
            : false
        }
        scroll={{ x: 800, y: 400 }}
        rowKey="key"
      />
      
      <Modal
        title={`Sell ${sellingAsset?.name || ''}`}
        open={!!sellingAsset}
        onCancel={() => setSellingAsset(null)}
        footer={null}
        width={500}>
        {sellingAsset && (
          <SellAssetsForm
            asset={sellingAsset}
            onClose={() => setSellingAsset(null)}
          />
        )}
      </Modal>
    </div>
  );
}
