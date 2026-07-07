import './App.css';
import { Flex, Grid, Layout, Space, theme, Typography } from 'antd';
import ExportFormButton from './components/ExportFormButton';
import FieldPalette from './components/FieldPalette';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import ImportFormButton from './components/ImportFormButton';
import LoadFormButton from './components/LoadFormButton';
import LogoutButton from './components/LogoutButton';
import ResetFormButton from './components/ResetFormButton';
import SaveFormButton from './components/SaveFormButton';
import ThemeToggle from './components/ThemeToggle';
import { useAppSelector } from './store/hooks';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;
const { useToken } = theme;

function App() {
  const formName = useAppSelector((state) => state.form.name);
  const screens = useBreakpoint();
  const isCompact = !screens.lg;
  const { token } = useToken();

  return (
    <Layout style={{ height: isCompact ? 'auto' : '100vh', minHeight: '100vh' }}>
      <Header
        style={{
          background: token.colorBgContainer,
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
          <ThemeToggle />
          <LogoutButton />
        </Space>
      </Header>

      <Layout style={{ flexDirection: isCompact ? 'column' : 'row' }}>
        <Sider
          width={isCompact ? '100%' : 240}
          style={{ padding: 24, background: token.colorBgLayout }}
        >
          <FieldPalette />
        </Sider>

        <Content
          style={{
            padding: 24,
            overflowY: isCompact ? 'visible' : 'auto',
            background: token.colorBgLayout,
            width: isCompact ? '100%' : undefined,
          }}
        >
          <Flex gap={24} align="flex-start" vertical={isCompact}>
            <div
              style={{
                flex: isCompact ? 'unset' : 1,
                width: isCompact ? '100%' : undefined,
                minWidth: 0,
              }}
            >
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
