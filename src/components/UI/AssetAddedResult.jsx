import { Result, Button } from 'antd';
import { useLanguage } from '../../context/useLanguage';

export default function AssetAddedResult({
  coin,
  amount,
  price,
  onClose,
  onAgain,
}) {
  const { t } = useLanguage();

  return (
    <Result
      status="success"
      title={t('assetResult.title')}
      subTitle={`${t('assetResult.added')} ${amount} ${coin.name} ${t(
        'assetResult.price',
      )} ${price}$`}
      extra={[
        <Button type="primary" key="close" onClick={onClose}>
          {t('common.close')}
        </Button>,

        <Button key="again" onClick={onAgain}>
          {t('assetResult.again')}
        </Button>,
      ]}
    />
  );
}
