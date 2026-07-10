import { useContext, useState } from 'react';
import { Layout, theme, Spin, Drawer, Grid } from 'antd';

import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';

import { CryptoContext } from '../../context/crypto-context';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const { loading } = useContext(CryptoContext);

  const screens = useBreakpoint();

  const isMobile = !screens.md;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}>
      {!isMobile && (
        <Sider
          width={240}
          collapsedWidth={70}
          collapsed={collapsed}
          trigger={null}
          style={{
            position: 'fixed',
            height: '100vh',
            left: 0,
            top: 0,
            overflow: 'hidden',
          }}>
          <Sidebar
            collapsed={collapsed}
            selectedPage={selectedPage}
            onSelect={setSelectedPage}
          />
        </Sider>
      )}

      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 70 : 240,
          minHeight: '100vh',
          transition: 'margin-left .25s ease',
        }}>
        <Header
          colorBgContainer={colorBgContainer}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobile={isMobile}
          openMobileMenu={() => {
            setMobileOpen(true);
          }}
        />

        <Content
          selectedPage={selectedPage}
          colorBgContainer={colorBgContainer}
          borderRadiusLG={borderRadiusLG}
        />
      </Layout>

      {isMobile && (
        <Drawer
          placement="left"
          open={mobileOpen}
          onClose={() => {
            setMobileOpen(false);
          }}
          closable={false}
          width={260}
          styles={{
            body: {
              padding: 0,
              background: '#001529',
            },
          }}>
          <Sidebar
            collapsed={false}
            selectedPage={selectedPage}
            isMobile
            onClose={() => setMobileOpen(false)}
            onSelect={(page) => {
              setSelectedPage(page);

              setMobileOpen(false);
            }}
          />
        </Drawer>
      )}
    </Layout>
  );
}
