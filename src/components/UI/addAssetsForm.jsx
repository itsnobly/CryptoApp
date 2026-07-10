import {
  Form,
  Select,
  InputNumber,
  Button,
  Space,
  DatePicker,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useCrypto } from '../../context/crypto-context';
import AssetAddedResult from './AssetAddedResult';

const { Text } = Typography;

export default function AddAssetsForm({ onClose }) {
  const { crypto, addAsset } = useCrypto();

  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [addedAsset, setAddedAsset] = useState(null);

  const [form] = Form.useForm();
  const amount = Form.useWatch('amount', form);
  const buyPrice = Form.useWatch('buyPrice', form);

  const currentPrice = coin?.price || 0;
  const total = amount ? amount * (buyPrice || currentPrice) : 0;

  const options = crypto.map((coinItem) => ({
    value: coinItem.id,
    label: coinItem.name,
    icon: coinItem.icon,
  }));

  const handleFinish = (values) => {
    const assetPrice = values.buyPrice || currentPrice;
    const assetAmount = values.amount;
    const assetTotal = assetAmount * assetPrice;
    const assetProfit = assetAmount * (currentPrice - assetPrice);
    const assetGrow = assetPrice < currentPrice;
    const growPercent =
      assetPrice > 0
        ? Number(((currentPrice - assetPrice) / assetPrice) * 100).toFixed(2)
        : 0;

    const asset = {
      coin,
      amount: assetAmount,
      price: assetPrice,
      date: values.date,
      total: assetTotal,
    };

    addAsset({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      amount: assetAmount,
      price: assetPrice,
      date: values.date,
      totalAmount: assetTotal,
      currentPrice,
      totalProfit: assetProfit,
      grow: assetGrow,
      growPercent,
    });

    setAddedAsset(asset);
    setSubmitted(true);
  };

  const resetCoin = () => {
    setCoin(null);
    form.resetFields();
  };

  if (submitted) {
    return (
      <AssetAddedResult
        coin={addedAsset.coin}
        amount={addedAsset.amount}
        price={addedAsset.price}
        onClose={onClose}
        onAgain={() => {
          setSubmitted(false);
          setCoin(null);
          setAddedAsset(null);
          form.resetFields();
        }}
      />
    );
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item label="Coin">
        {!coin ? (
          <Select
            placeholder="Select coin"
            options={options}
            onSelect={(value) => {
              const selected = crypto.find((item) => item.id === value);
              setCoin(selected);
            }}
            optionRender={(option) => (
              <Space>
                <img
                  src={option.data.icon}
                  alt={option.data.label}
                  width={20}
                  height={20}
                />
                {option.data.label}
              </Space>
            )}
          />
        ) : (
          <Space
            align="center"
            style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <img src={coin.icon} alt={coin.name} width={30} height={30} />
              <span>{coin.name}</span>
            </Space>
            <Button type="link" onClick={resetCoin}>
              Change coin
            </Button>
          </Space>
        )}
      </Form.Item>

      {coin && (
        <>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: 'Amount is required',
              },
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('Enter amount');
                  }
                  if (value <= 0) {
                    return Promise.reject('Amount must be greater than 0');
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <InputNumber style={{ width: '100%' }} placeholder="Amount" />
          </Form.Item>

          <Form.Item
            label="Buy price (optional)"
            name="buyPrice"
            tooltip="Если оставить пустым, будет использована текущая цена рынка"
            rules={[
              {
                validator(_, value) {
                  if (value == null || value === '') {
                    return Promise.resolve();
                  }
                  if (value <= 0) {
                    return Promise.reject('Price must be greater than 0');
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <InputNumber
              style={{ width: '100%' }}
              placeholder={coin ? coin.price.toFixed(2) : 'Market price'}
            />
          </Form.Item>

          <Form.Item
            label="Date & Time"
            name="date"
            rules={[
              {
                required: true,
                message: 'Date required',
              },
            ]}>
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Total">
            <InputNumber
              disabled
              style={{ width: '100%' }}
              value={Number(total.toFixed(2))}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Add
            </Button>
          </Form.Item>

          {amount ? (
            <Text type="secondary">
              {buyPrice == null
                ? `Если цена не введена, используется рынок: ${currentPrice.toFixed(2)}$`
                : `Цена покупки: ${buyPrice?.toFixed(2) || currentPrice.toFixed(2)}$`}
            </Text>
          ) : null}
        </>
      )}
    </Form>
  );
}
