import { Menu, Button } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  WalletOutlined,
  HistoryOutlined,
  SettingOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';

export default function Sidebar({
  collapsed,
  setCollapsed,
  selectedPage,
  onSelect,
}) {
  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'assets',
      icon: <WalletOutlined />,
      label: 'Assets',
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: 'History',
    },
    {
      key: 'analytics',
      icon: <LineChartOutlined />,
      label: 'Analytics',
    },
    {
      key: 'watchlist',
      icon: <StarOutlined />,
      label: 'Watchlist',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="menu-button"
        style={{
          color: 'white',
          width: '100%',
          height: 50,
        }}
      />

      <div
        className="logo"
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 18,
          fontWeight: 700,
        }}>
        {collapsed ? '₿' : 'Crypto Tracker'}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedPage]}
        onSelect={({ key }) => onSelect?.(key)}
        items={items}
      />
    </>
  );
}
