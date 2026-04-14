import './App.css';
import { Button, Layout, Space } from 'antd';
const { Sider, Content } = Layout;

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={200} style={{ padding: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" block>
            Add Input
          </Button>
          <Button block>Add Select</Button>
          <Button block>Add Checkbox</Button>
        </Space>
      </Sider>

      <Content style={{ padding: 20 }}>
        <h2>Form Preview</h2>
      </Content>
    </Layout>
  );
}

export default App;
