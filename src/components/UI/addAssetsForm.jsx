import {
  Form,
  Select,
  InputNumber,
  Button,
  Space,
  DatePicker,
  Typography,
  Grid,
} from 'antd';
import { useState } from 'react';
import { useCrypto } from '../../context/crypto-context';
import { useLanguage } from '../../context/useLanguage';
import AssetAddedResult from './AssetAddedResult';

const { Text } = Typography;
const { useBreakpoint } = Grid;

export default function AddAssetsForm({ onClose }) {
  const { crypto, addAsset } = useCrypto();
  const { t } = useLanguage();
  const screens = useBreakpoint();

  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [addedAsset, setAddedAsset] = useState(null);

  const [form] = Form.useForm();
  const amount = Form.useWatch('amount', form);
  const buyPrice = Form.useWatch('buyPrice', form);

  const currentPrice = coin?.price || 0;
  const total = amount ? amount * (buyPrice || currentPrice) : 0;

  // Responsive size based on screen width
  const inputSize = screens.xs ? 'small' : 'middle';
  const isMobile = screens.xs;

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

    const assetToAdd = {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      icon: coin.icon,
      amount: assetAmount,
      price: assetPrice,
      date: values.date,
      totalAmount: assetTotal,
      currentPrice,
      totalProfit: assetProfit,
      grow: assetGrow,
      growPercent: parseFloat(growPercent),
    };

    addAsset(assetToAdd);

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
      <Form.Item label={t('addAsset.selectCoin')}>
        {!coin ? (
          <Select
            placeholder={t('addAsset.selectCoin')}
            options={options}
            size={inputSize}
            onSelect={(value) => {
              const selected = crypto.find((item) => item.id === value);
              setCoin(selected);
            }}
            optionRender={(option) => (
              <Space size={isMobile ? 'small' : 'middle'}>
                <img
                  src={option.data.icon}
                  alt={option.data.label}
                  width={isMobile ? 16 : 20}
                  height={isMobile ? 16 : 20}
                />
                {option.data.label}
              </Space>
            )}
          />
        ) : (
          <Space
            align="center"
            size={isMobile ? 'small' : 'middle'}
            style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space size={isMobile ? 'small' : 'middle'}>
              <img
                src={coin.icon}
                alt={coin.name}
                width={isMobile ? 24 : 30}
                height={isMobile ? 24 : 30}
              />
              <span style={{ fontSize: isMobile ? '14px' : '16px' }}>
                {coin.name}
              </span>
            </Space>
            <Button type="link" size={inputSize} onClick={resetCoin}>
              {t('addAsset.changeCoin')}
            </Button>
          </Space>
        )}
      </Form.Item>

      {coin && (
        <>
          <Form.Item
            label={t('addAsset.amount')}
            name="amount"
            rules={[
              {
                required: true,
                message: t('addAsset.amountRequired'),
              },
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(t('addAsset.amountRequired'));
                  }
                  if (value <= 0) {
                    return Promise.reject(t('addAsset.amountPositive'));
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <InputNumber
              style={{ width: '100%' }}
              placeholder={t('addAsset.amount')}
              size={inputSize}
              controls={false}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </Form.Item>

          <Form.Item
            label={t('addAsset.buyPrice')}
            name="buyPrice"
            tooltip={t('addAsset.buyPriceTooltip')}
            rules={[
              {
                validator(_, value) {
                  if (value == null || value === '') {
                    return Promise.resolve();
                  }
                  if (value <= 0) {
                    return Promise.reject(t('addAsset.pricePositive'));
                  }
                  return Promise.resolve();
                },
              },
            ]}>
            <InputNumber
              style={{ width: '100%' }}
              placeholder={coin ? coin.price.toFixed(2) : 'Market price'}
              size={inputSize}
              controls={false}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </Form.Item>

          <Form.Item
            label={t('addAsset.date')}
            name="date"
            rules={[
              {
                required: true,
                message: t('addAsset.dateRequired'),
              },
            ]}>
            <DatePicker
              style={{ width: '100%' }}
              size={inputSize}
              placement="bottomLeft"
              getPopupContainer={(trigger) => trigger.parentElement}
              inputMode="none"
              onKeyDown={(e) => {
                if (e.key === '+' || e.key === '-') {
                  e.preventDefault();
                }
              }}
              placeholder={t('addAsset.selectDate')}
            />
          </Form.Item>

          <Form.Item label={t('addAsset.total')}>
            <InputNumber
              disabled
              style={{ width: '100%' }}
              value={Number(total.toFixed(2))}
              size={inputSize}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              size={inputSize}>
              {t('addAsset.submit')}
            </Button>
          </Form.Item>

          {amount ? (
            <Text type="secondary">
              {buyPrice == null
                ? `If price not entered, market price used: $${currentPrice.toFixed(2)}`
                : `Buy price: $${buyPrice?.toFixed(2) || currentPrice.toFixed(2)}`}
            </Text>
          ) : null}
        </>
      )}
    </Form>
  );
}
