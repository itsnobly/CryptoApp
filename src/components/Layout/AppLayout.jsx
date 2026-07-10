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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { loading } = useContext(CryptoContext);
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handlePageSelect = (page) => {
    setSelectedPage(page);
    if (isMobile) setMobileDrawerOpen(false);
  };

  if (loading) {
    return (
      <div className="loader">
        <Spin fullscreen />
      </div>
    );
  }

  const sidebarContent = (
    <Sidebar
      collapsed={isMobile ? false : collapsed}
      selectedPage={selectedPage}
      onSelect={handlePageSelect}
      setCollapsed={setCollapsed}
    />
  );

  return (
    <Layout className="app-layout">
      {!isMobile && (
        <Sider
          breakpoint="lg"
          collapsible
          collapsed={collapsed}
          onBreakpoint={(broken) => setCollapsed(broken)}
          trigger={null}
          collapsedWidth={80}>
          {sidebarContent}
        </Sider>
      )}

      <Layout>
        <Header
          colorBgContainer={colorBgContainer}
          isMobile={isMobile}
          onMenuClick={() => setMobileDrawerOpen(true)}
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
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          styles={{ body: { padding: 0, background: '#001529' } }}
          size={260}
          closable={false}>
          {sidebarContent}
        </Drawer>
      )}
    </Layout>
  );
}
