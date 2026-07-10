import { Layout } from 'antd';
import CardContent from './CardContent';

const { Content: AntContent } = Layout;

export default function Content({ colorBgContainer, borderRadiusLG }) {
  return (
    <AntContent
      className="content"
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
      <CardContent />
    </AntContent>
  );
}
