import './App.css';
import { Flex, Grid, Layout, Space, Typography } from 'antd';
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
const { useBreakpoint } = Grid;

function App() {
  const formName = useAppSelector((state) => state.form.name);
  const screens = useBreakpoint();
  const isCompact = !screens.lg;

  return (
    <Layout style={{ height: isCompact ? 'auto' : '100vh', minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '12px 24px',
          height: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          {formName}
        </Title>

        <Space wrap>
          <LoadFormButton />
          <SaveFormButton />
          <ExportFormButton />
          <ImportFormButton />
          <ResetFormButton />
        </Space>
      </Header>

      <Layout style={{ flexDirection: isCompact ? 'column' : 'row' }}>
        <Sider width={isCompact ? '100%' : 240} style={{ padding: 16, background: '#f5f5f5' }}>
          <FieldPalette />
        </Sider>

        <Content
          style={{
            padding: 24,
            overflowY: isCompact ? 'visible' : 'auto',
            background: '#f5f5f5',
            width: isCompact ? '100%' : undefined,
          }}
        >
          <Flex gap={24} align="flex-start" vertical={isCompact}>
            <div style={{ flex: isCompact ? 'unset' : 1, width: isCompact ? '100%' : undefined, minWidth: 0 }}>
              <FormBuilder />
            </div>
            <div style={{ width: isCompact ? '100%' : 480, flexShrink: 0 }}>
              <FormPreview />
            </div>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
