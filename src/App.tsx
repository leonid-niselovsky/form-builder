import './App.css';
import { Flex, Layout, Space, Typography } from 'antd';
import FieldPalette from './components/FieldPalette';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import ExportFormButton from './components/ExportFormButton';
import ImportFormButton from './components/ImportFormButton';
import LoadFormButton from './components/LoadFormButton';
import ResetFormButton from './components/ResetFormButton';
import SaveFormButton from './components/SaveFormButton';
import { useAppSelector } from './store/hooks';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const formName = useAppSelector((state) => state.form.name);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {formName}
        </Title>

        <Space>
          <LoadFormButton />
          <SaveFormButton />
          <ExportFormButton />
          <ImportFormButton />
          <ResetFormButton />
        </Space>
      </Header>

      <Layout>
        <Sider width={240} style={{ padding: 16, background: '#f5f5f5' }}>
          <FieldPalette />
        </Sider>

        <Content style={{ padding: 24, overflowY: 'auto', background: '#f5f5f5' }}>
          <Flex gap={24} align="flex-start">
            <div style={{ flex: 1, minWidth: 0 }}>
              <FormBuilder />
            </div>
            <div style={{ width: 480, flexShrink: 0 }}>
              <FormPreview />
            </div>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
