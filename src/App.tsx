import './App.css';
import { Flex, Layout, Space } from 'antd';
import FieldPalette from './components/FieldPalette';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import ExportFormButton from './components/ExportFormButton';
import ImportFormButton from './components/ImportFormButton';
import LoadFormButton from './components/LoadFormButton';
import ResetFormButton from './components/ResetFormButton';
import SaveFormButton from './components/SaveFormButton';

const { Sider, Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={220} style={{ padding: 16, background: '#fff' }}>
        <FieldPalette />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Space>
            <LoadFormButton />
            <SaveFormButton />
            <ExportFormButton />
            <ImportFormButton />
            <ResetFormButton />
          </Space>
        </Header>

        <Content style={{ padding: 24, overflowY: 'auto', background: '#f5f5f5' }}>
          <Flex gap={24} align="flex-start">
            <div style={{ flex: 1, minWidth: 0 }}>
              <FormBuilder />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <FormPreview />
            </div>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
