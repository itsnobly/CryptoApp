import { Menu } from 'antd';

import {
  DashboardOutlined,
  WalletOutlined,
  HistoryOutlined,
  SettingOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';

import { useLanguage } from '../../context/useLanguage';

export default function Sidebar({ collapsed, selectedPage, onSelect }) {
  const { t } = useLanguage();

  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: t('sidebar.dashboard'),
    },
    {
      key: 'assets',
      icon: <WalletOutlined />,
      label: t('sidebar.assets'),
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: t('sidebar.history'),
    },
    {
      key: 'analytics',
      icon: <LineChartOutlined />,
      label: t('sidebar.analytics'),
    },
    {
      key: 'watchlist',
      icon: <StarOutlined />,
      label: t('sidebar.watchlist'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('sidebar.settings'),
    },
  ];

  return (
    <>
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: collapsed ? 28 : 20,
          fontWeight: 700,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}>
        {collapsed ? '₿' : 'Crypto Tracker'}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[selectedPage]}
        items={items}
        onSelect={({ key }) => onSelect(key)}
      />
    </>
  );
}
