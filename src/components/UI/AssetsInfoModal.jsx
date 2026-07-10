import { Flex, Modal, Tag, Typography } from 'antd';

export default function CoinInfoModal({ coin, open, onOk, onCancel }) {
  return (
    <Modal
      title={`Add ${coin?.name}`}
      open={open}
      onOk={onOk}
      onCancel={onCancel}>
      <h2>{coin?.name}</h2>
      <img src={coin?.icon} alt={coin?.name} width={40} />
      <Typography.Title level={2} style={{ margin: 0 }}>
        ({coin?.symbol}) {coin?.price} USD
      </Typography.Title>
      <Typography.Paragraph
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
        }}>
        <Flex vertical gap="8px">
          <Flex gap="9px">
            <Typography.Text strong>1 hour:</Typography.Text>

            <Tag color={coin?.priceChange1h > 0 ? 'green' : 'red'}>
              {coin?.priceChange1h}%
            </Tag>

            <Typography.Text strong>1 day:</Typography.Text>

            <Tag color={coin?.priceChange1d > 0 ? 'green' : 'red'}>
              {coin?.priceChange1d}%
            </Tag>

            <Typography.Text strong>1 week:</Typography.Text>

            <Tag color={coin?.priceChange1w > 0 ? 'green' : 'red'}>
              {coin?.priceChange1w}%
            </Tag>
          </Flex>

          <Typography.Text strong>Price USD:</Typography.Text>
          <Typography.Text>{coin?.price?.toFixed(2)}$</Typography.Text>

          <Typography.Text strong>Price BTC:</Typography.Text>
          <Tag>{coin?.priceBtc}</Tag>

          <Typography.Text strong>Market Cap:</Typography.Text>
          <Tag>{coin?.marketCap}</Tag>

          {coin?.contractAddress && (
            <>
              <Typography.Text strong>Contract Address:</Typography.Text>

              <Tag>{coin.contractAddress}</Tag>
            </>
          )}
        </Flex>
      </Typography.Paragraph>
    </Modal>
  );
}
