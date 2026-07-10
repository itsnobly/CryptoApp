import { Layout } from 'antd';
import Dashboard from '../pages/Dashboard/Dashboard';
import Assets from '../pages/Assets/Assets';
import History from '../pages/History/History';
import Analytics from '../pages/Analytics/Analytics';
import Watchlist from '../pages/Watchlist/Watchlist';
import Settings from '../pages/Settings/Settings';

const { Content: AntContent } = Layout;

export default function Content({
  selectedPage,
  colorBgContainer,
  borderRadiusLG,
}) {
  return (
    <AntContent
      className="content"
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
      {selectedPage === 'dashboard' && <Dashboard />}
      {selectedPage === 'assets' && <Assets />}
      {selectedPage === 'history' && <History />}
      {selectedPage === 'analytics' && <Analytics />}
      {selectedPage === 'watchlist' && <Watchlist />}
      {selectedPage === 'settings' && <Settings />}
    </AntContent>
  );
}
