import { Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

export default function Sidebar({ collapsed, setCollapsed }) {
  const items = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Videos',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Upload',
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
        }}
      />

      <div className="logo" />

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={items}
      />
    </>
  );
}
