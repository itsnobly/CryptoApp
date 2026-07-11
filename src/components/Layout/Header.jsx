import { Layout, Select, Space, Button, Drawer } from 'antd';
import { useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { useCrypto } from '../../context/crypto-context';
import { useLanguage } from '../../context/useLanguage';

import CoinInfoModal from '../UI/CoinInfoModal';
import AddAssetsForm from '../UI/addAssetsForm';

const { Header: AntHeader } = Layout;

export default function Header({
  colorBgContainer,
  collapsed,
  setCollapsed,
  isMobile,
  openMobileMenu,
}) {
  const { crypto } = useCrypto();
  const { t } = useLanguage();

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);

  const options = crypto.map((c) => ({
    label: c.name,
    value: c.id,
    icon: c.icon,
  }));

  const selected = crypto.find((c) => c.id === selectedCoin);

  return (
    <AntHeader
      style={{
        background: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 8px' : '0 16px',
        height: 64,
        gap: isMobile ? 6 : 8,
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 6 : 15,
          flex: '1 1 auto',
          minWidth: 0,
        }}>
        <Button
          type="text"
          icon={
            isMobile ? (
              <MenuUnfoldOutlined />
            ) : collapsed ? (
              <MenuUnfoldOutlined />
            ) : (
              <MenuFoldOutlined />
            )
          }
          onClick={() => {
            if (isMobile) {
              openMobileMenu();
            } else {
              setCollapsed(!collapsed);
            }
          }}
          style={{
            width: isMobile ? 36 : 60,
            height: isMobile ? 36 : 60,
            fontSize: isMobile ? 18 : 24,
            flexShrink: 0,
          }}
        />

        <Select
          style={{
            width: isMobile ? '100%' : 220,
            minWidth: 0,
          }}
          placeholder={t('header.selectCoin')}
          options={options}
          onChange={(value) => {
            setSelectedCoin(value);
            setModal(true);
          }}
          optionRender={(option) => (
            <Space>
              <img src={option.data.icon} width={20} height={20} />
              {option.data.label}
            </Space>
          )}
        />
      </div>

      <Button
        type="primary"
        onClick={() => setDrawer(true)}
        style={{
          height: isMobile ? 36 : 40,
          padding: isMobile ? '0 10px' : '0 16px',
          fontSize: isMobile ? 13 : 14,
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
        {isMobile ? t('header.add') : t('header.addAssets')}
      </Button>

      <CoinInfoModal
        coin={selected}
        open={modal}
        onCancel={() => setModal(false)}
        onOk={() => setModal(false)}
      />

      <Drawer
        title={t('addAsset.title')}
        open={drawer}
        onClose={() => setDrawer(false)}>
        <AddAssetsForm onClose={() => setDrawer(false)} />
      </Drawer>
    </AntHeader>
  );
}
