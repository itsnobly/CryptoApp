import { Form, Input, InputNumber, Button, Select, DatePicker, message, Grid } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';
import dayjs from 'dayjs';

const { Option } = Select;
const { useBreakpoint } = Grid;

export default function SellAssetsForm({ asset, onClose }) {
  const { sellAsset, crypto } = useCrypto();
  const { t } = useLanguage();
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const coin = crypto.find((c) => c.id === asset.id);
  const currentPrice = coin?.price || asset.currentPrice || asset.price;

  // Responsive size based on screen width
  const inputSize = screens.xs ? 'small' : 'middle';
  const isMobile = screens.xs;

  const handleFinish = async (values) => {
    const sellAmount = values.amount;
    const sellPrice = values.price || currentPrice;

    if (sellAmount > asset.amount) {
      message.error(`Cannot sell more than available amount (${asset.amount.toFixed(6)})`);
      return;
    }

    if (sellAmount <= 0) {
      message.error(t('addAsset.amountPositive'));
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
      <div style={{ marginBottom: 16, padding: isMobile ? 8 : 12, background: '#f5f5f5', borderRadius: 8 }}>
        <div style={{ fontSize: isMobile ? '13px' : '14px' }}><strong>{t('common.coin')}:</strong> {asset.name} ({asset.symbol})</div>
        <div style={{ fontSize: isMobile ? '13px' : '14px' }}><strong>{t('common.available')}:</strong> {asset.amount.toFixed(6)} {asset.symbol}</div>
        <div style={{ fontSize: isMobile ? '13px' : '14px' }}><strong>{t('common.currentPrice')}:</strong> ${currentPrice.toFixed(2)}</div>
        <div style={{ fontSize: isMobile ? '13px' : '14px' }}><strong>{t('common.currentValue')}:</strong> ${(asset.amount * currentPrice).toFixed(2)}</div>
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
          label={t('sellAsset.sellAmount')}
          name="amount"
          rules={[
            { required: true, message: t('sellAsset.amountRequired') },
            {
              type: 'number',
              min: 0.000001,
              max: asset.amount,
              message: `${t('sellAsset.amountRange')} 0.000001 and ${asset.amount.toFixed(6)}`,
            },
          ]}>
          <InputNumber
            style={{ width: '100%' }}
            placeholder={t('sellAsset.sellAmount')}
            step={0.000001}
            precision={6}
            max={asset.amount}
            size={inputSize}
            controls={false}
          />
        </Form.Item>

        <Form.Item
          label={t('sellAsset.sellPrice')}
          name="price"
          rules={[
            { required: true, message: t('sellAsset.priceRequired') },
            { type: 'number', min: 0.01, message: t('sellAsset.priceMin') },
          ]}>
          <InputNumber
            style={{ width: '100%' }}
            placeholder={t('sellAsset.sellPrice')}
            step={0.01}
            precision={2}
            min={0.01}
            size={inputSize}
            controls={false}
          />
        </Form.Item>

        <Form.Item
          label={t('addAsset.date')}
          name="date"
          rules={[{ required: true, message: t('sellAsset.dateRequired') }]}>
          <DatePicker 
            style={{ width: '100%' }} 
            size={inputSize}
            placement="bottomLeft"
            getPopupContainer={(trigger) => trigger.parentElement}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block size={inputSize}>
            {t('sellAsset.submit')} {asset.symbol}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
