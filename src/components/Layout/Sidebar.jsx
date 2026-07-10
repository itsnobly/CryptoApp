import { Menu, Button } from 'antd';
import {
  DashboardOutlined,
  WalletOutlined,
  HistoryOutlined,
  SettingOutlined,
  LineChartOutlined,
  StarOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useLanguage } from '../../context/LanguageContext';

export default function Sidebar({
  collapsed,
  selectedPage,
  onSelect,
  isMobile,
  onClose,
}) {
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
        className="logo"
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : (collapsed ? 'center' : 'center'),
          color: 'white',
          fontSize: 18,
          fontWeight: 700,
          padding: isMobile ? '0 16px' : 0,
        }}>
        {collapsed ? '₿' : 'Crypto Tracker'}
        {isMobile && (
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{ color: 'white', fontSize: 16 }}
          />
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[selectedPage]}
        onSelect={({ key }) => onSelect?.(key)}
        items={items}
        style={{ borderRight: 0 }}
      />
    </>
  );
}
