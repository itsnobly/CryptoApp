import { Layout, Select, Space, Button, Drawer } from 'antd';
import { useState, useEffect } from 'react';
import { useCrypto } from '../../context/crypto-context';

import CoinInfoModal from '../UI/CoinInfoModal';
import AddAssetsForm from '../UI/addAssetsForm';

const { Header: AntHeader } = Layout;

export default function Header({ colorBgContainer }) {
  const { crypto } = useCrypto();

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectOpen, setSelectOpen] = useState(false);

  const [drawer, setDrawer] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const keydown = (event) => {
      if (event.key === '`') {
        event.preventDefault();
        setSelectOpen(true);
      }
    };

    document.addEventListener('keydown', keydown);

    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, []);

  const options = crypto.map((coin) => ({
    label: coin.name,
    value: coin.id,
    icon: coin.icon,
  }));

  const selected = crypto.find((coin) => coin.id === selectedCoin);

  return (
    <AntHeader
      className="header"
      style={{
        background: colorBgContainer,
      }}>
      <Select
        style={{
          width: 250,
        }}
        value={selectedCoin}
        placeholder="Select coin"
        open={selectOpen}
        onOpenChange={setSelectOpen}
        options={options}
        onChange={(value) => {
          setSelectedCoin(value);
          setSelectOpen(false);
          showModal();
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
        labelRender={() =>
          selected && (
            <Space>
              <img
                src={selected.icon}
                alt={selected.name}
                width={20}
                height={20}
              />

              {selected.name}
            </Space>
          )
        }
      />

      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Assets
      </Button>

      <CoinInfoModal
        coin={selected}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <Drawer
        size={500}
        title="Add Assets"
        open={drawer}
        destroyOnClose
        onClose={() => {
          setDrawer(false);
        }}>
        <AddAssetsForm onClose={() => setDrawer(false)} />
      </Drawer>
    </AntHeader>
  );
}
