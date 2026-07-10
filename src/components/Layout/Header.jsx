import { Layout, Select, Space, Button } from 'antd';

const { Header: AntHeader } = Layout;
const options = [
  {
    label: 'Happy',
    value: 'happy',
    emoji: '😄',
    desc: 'Feeling Good',
  },
  {
    label: 'Sad',
    value: 'sad',
    emoji: '😢',
    desc: 'Feeling Blue',
  },
  {
    label: 'Angry',
    value: 'angry',
    emoji: '😡',
    desc: 'Furious',
  },
  {
    label: 'Cool',
    value: 'cool',
    emoji: '😎',
    desc: 'Chilling',
  },
  {
    label: 'Sleepy',
    value: 'sleepy',
    emoji: '😴',
    desc: 'Need Sleep',
  },
];
export default function Header({ colorBgContainer }) {
  return (
    <AntHeader
      className="header"
      style={{
        background: colorBgContainer,
      }}>
      <Select
        // mode="multiple"
        style={{ width: '250px' }}
        placeholder="Please select your current mood."
        defaultValue={['happy']}
        onChange={(value) => {
          console.log(`selected ${value}`);
        }}
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {`${option.data.label} (${option.data.desc})`}
          </Space>
        )}
      />
      <Button type="primary">Add Assets</Button>
    </AntHeader>
  );
}
