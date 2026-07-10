import { Form, Input, InputNumber, Button, Select, DatePicker, message } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useState } from 'react';
import dayjs from 'dayjs';

const { Option } = Select;

export default function SellAssetsForm({ asset, onClose }) {
  const { sellAsset, crypto } = useCrypto();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const coin = crypto.find((c) => c.id === asset.id);
  const currentPrice = coin?.price || asset.currentPrice || asset.price;

  const handleFinish = async (values) => {
    const sellAmount = values.amount;
    const sellPrice = values.price || currentPrice;

    if (sellAmount > asset.amount) {
      message.error(`Cannot sell more than available amount (${asset.amount.toFixed(6)})`);
      return;
    }

    if (sellAmount <= 0) {
      message.error('Amount must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      sellAsset(asset.id, sellAmount, sellPrice);
      message.success(`Sold ${sellAmount} ${asset.symbol} at $${sellPrice.toFixed(2)}`);
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('Failed to sell asset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
        <div><strong>Coin:</strong> {asset.name} ({asset.symbol})</div>
        <div><strong>Available:</strong> {asset.amount.toFixed(6)} {asset.symbol}</div>
        <div><strong>Current Price:</strong> ${currentPrice.toFixed(2)}</div>
        <div><strong>Current Value:</strong> ${(asset.amount * currentPrice).toFixed(2)}</div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          amount: asset.amount,
          price: currentPrice,
          date: dayjs(),
        }}>
        <Form.Item
          label="Sell Amount"
          name="amount"
          rules={[
            { required: true, message: 'Please enter amount' },
            {
              type: 'number',
              min: 0.000001,
              max: asset.amount,
              message: `Amount must be between 0.000001 and ${asset.amount.toFixed(6)}`,
            },
          ]}>
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Amount to sell"
            step={0.000001}
            precision={6}
            max={asset.amount}
          />
        </Form.Item>

        <Form.Item
          label="Sell Price ($)"
          name="price"
          rules={[
            { required: true, message: 'Please enter price' },
            { type: 'number', min: 0.01, message: 'Price must be at least $0.01' },
          ]}>
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Sell price"
            step={0.01}
            precision={2}
            min={0.01}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select date' }]}>
          <DatePicker style={{ width: '100%' }} showTime />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Sell {asset.symbol}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
