import { Form, Select, InputNumber, Button, Space, DatePicker } from 'antd';

import { useState } from 'react';
import { useCrypto } from '../../context/crypto-context';
import AssetAddedResult from './AssetAddedResult';

export default function AddAssetsForm({ onClose }) {
  const { crypto } = useCrypto();

  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [addedAsset, setAddedAsset] = useState(null);

  const [form] = Form.useForm();

  const amount = Form.useWatch('amount', form);
  const buyPrice = Form.useWatch('buyPrice', form);

  const total = amount && buyPrice ? amount * buyPrice : 0;

  const options = crypto.map((coin) => ({
    value: coin.id,
    label: coin.name,
    icon: coin.icon,
  }));

  const handleFinish = (values) => {
    const asset = {
      coin,
      amount: values.amount,
      price: values.buyPrice || coin.price,
      date: values.date,
      total,
    };

    console.log('NEW ASSET:', asset);

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
              const selected = crypto.find((c) => c.id === value);

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
          <Space>
            <img src={coin.icon} alt={coin.name} width={30} height={30} />

            {coin.name}

            <Button onClick={resetCoin}>Change coin</Button>
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
            <InputNumber
              style={{
                width: '100%',
              }}
              placeholder="Amount"
            />
          </Form.Item>

          <Form.Item
            label="Buy price"
            name="buyPrice"
            rules={[
              {
                required: true,
                message: 'Buy price required',
              },

              {
                validator(_, value) {
                  if (value <= 0) {
                    return Promise.reject('Price must be greater than 0');
                  }

                  return Promise.resolve();
                },
              },
            ]}>
            <InputNumber
              style={{
                width: '100%',
              }}
              placeholder={coin.price.toFixed(2)}
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
            <DatePicker showTime />
          </Form.Item>

          <Form.Item label="Total">
            <InputNumber
              disabled
              style={{
                width: '100%',
              }}
              value={Number(total.toFixed(2))}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </>
      )}
    </Form>
  );
}
