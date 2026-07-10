import { useContext, useState } from 'react';
import { Layout, theme, Spin } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import { CryptoContext } from '../../context/crypto-context';

const { Sider } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { loading } = useContext(CryptoContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (loading) {
    return (
      <div className="loader">
        <Spin fullscreen />
      </div>
    );
  }

  return (
    <Layout className="app-layout">
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>

      <Layout>
        <Header colorBgContainer={colorBgContainer} />

        <Content
          colorBgContainer={colorBgContainer}
          borderRadiusLG={borderRadiusLG}
        />
      </Layout>
    </Layout>
  );
}
