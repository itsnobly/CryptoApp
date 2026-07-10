import { Layout, Select, Space, Button, Drawer } from 'antd';
import { MenuOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useCrypto } from '../../context/crypto-context';
import { useLanguage } from '../../context/LanguageContext';

import CoinInfoModal from '../UI/CoinInfoModal';
import AddAssetsForm from '../UI/addAssetsForm';

const { Header: AntHeader } = Layout;

export default function Header({ colorBgContainer, isMobile, onMenuClick, onCollapseToggle, collapsed }) {
  const { crypto } = useCrypto();
  const { t } = useLanguage();

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const keydown = (event) => {
      if (event.key === '`') {
        event.preventDefault();
        setSelectOpen(true);
      }
    };

    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
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
      style={{ background: colorBgContainer }}>
      <div className="header-left">
        {!isMobile && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onCollapseToggle}
            style={{ marginRight: 16 }}
          />
        )}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onMenuClick}
            className="mobile-menu-btn"
          />
        )}
        <Select
          className="coin-select"
          value={selectedCoin}
          placeholder={t('header.selectCoin')}
          open={selectOpen}
          onOpenChange={setSelectOpen}
          options={options}
          showSearch
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
          onChange={(value) => {
            setSelectedCoin(value);
            setSelectOpen(false);
            setIsModalOpen(true);
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
      </div>

      <Button
        type="primary"
        onClick={() => setDrawer(true)}
        style={{
          borderRadius: '8px',
          fontWeight: 500,
          height: '40px',
          padding: '0 20px',
        }}>
        {isMobile ? t('header.add') : t('header.addAssets')}
      </Button>

      <CoinInfoModal
        coin={selected}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      />

      <Drawer
        size={isMobile ? 'default' : 500}
        title={t('addAsset.title')}
        open={drawer}
        destroyOnClose
        closable={true}
        onClose={() => setDrawer(false)}>
        <AddAssetsForm onClose={() => setDrawer(false)} />
      </Drawer>
    </AntHeader>
  );
}
