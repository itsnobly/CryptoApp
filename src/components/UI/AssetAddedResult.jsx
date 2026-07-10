import { Result, Button } from 'antd';

export default function AssetAddedResult({
  coin,
  amount,
  price,
  onClose,
  onAgain,
}) {
  return (
    <Result
      status="success"
      title="Asset Added"
      subTitle={`Added ${amount} ${coin.name} by price ${price}$`}
      extra={[
        <Button type="primary" key="close" onClick={onClose}>
          Close
        </Button>,

        <Button key="again" onClick={onAgain}>
          Add Again
        </Button>,
      ]}
    />
  );
}
