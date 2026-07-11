import { Menu, Typography, Button } from 'antd';

import {
  DashboardOutlined,
  WalletOutlined,
  HistoryOutlined,
  SettingOutlined,
  LineChartOutlined,
  StarOutlined,
  ThunderboltFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import { useLanguage } from '../../context/useLanguage';

const { Text } = Typography;

export default function Sidebar({
  collapsed,
  selectedPage,
  onSelect,
  onToggleCollapse,
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
      type: 'divider',
      style: { margin: '12px 8px', borderColor: 'rgba(255,255,255,0.08)' },
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 10,
          padding: collapsed ? 0 : '0 12px 0 20px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            overflow: 'hidden',
          }}>
          <div
            style={{
              width: 32,
              height: 32,
              flexShrink: 0,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1677ff, #69b1ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(22,119,255,0.4)',
            }}>
            <ThunderboltFilled style={{ fontSize: 16, color: '#fff' }} />
          </div>
          {!collapsed && (
            <span
              style={{
                color: '#fff',
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: 0.2,
              }}>
              Crypto Tracker
            </span>
          )}
        </div>

        {!collapsed && isMobile && onClose && (
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />}
            onClick={onClose}
            style={{ flexShrink: 0 }}
          />
        )}

        {!collapsed && !isMobile && onToggleCollapse && (
          <Button
            type="text"
            size="small"
            icon={
              <MenuFoldOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />
            }
            onClick={onToggleCollapse}
            style={{ flexShrink: 0 }}
          />
        )}
      </div>

      <div
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.08)',
          margin: '0 0 12px',
        }}
      />

      <div
        className="sidebar-menu-wrapper"
        style={{ flex: 1, padding: '0 8px' }}>
        <Menu
          theme="dark"
          mode="inline"
          inlineCollapsed={collapsed}
          selectedKeys={[selectedPage]}
          items={items}
          onSelect={({ key }) => onSelect(key)}
          style={{ background: 'transparent', border: 'none' }}
        />
      </div>

      {collapsed && !isMobile && onToggleCollapse && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 0',
          }}>
          <Button
            type="text"
            size="small"
            icon={
              <MenuUnfoldOutlined style={{ color: 'rgba(255,255,255,0.65)' }} />
            }
            onClick={onToggleCollapse}
          />
        </div>
      )}

      {!collapsed && (
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
          <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
            v1.0.0
          </Text>
        </div>
      )}
    </div>
  );
}
