import './App.css';
import { Divider, Flex, Grid, Layout, Space, theme, Tooltip, Typography } from 'antd';
import ExportFormButton from './components/ExportFormButton';
import FieldPalette from './components/FieldPalette';
import FormBuilder from './components/FormBuilder';
import FormPreview from './components/FormPreview';
import ImportFormButton from './components/ImportFormButton';
import LanguageSwitcher from './components/LanguageSwitcher';
import LoadFormButton from './components/LoadFormButton';
import LogoutButton from './components/LogoutButton';
import ResetFormButton from './components/ResetFormButton';
import SaveFormButton from './components/SaveFormButton';
import ThemeToggle from './components/ThemeToggle';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { renameForm } from './store/slices/formSlice';
import { useTranslation } from './i18n/localeContext';

const { Sider, Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;
const { useToken } = theme;

function App() {
  const formName = useAppSelector((state) => state.form.name);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isCompact = !screens.lg;
  const { token } = useToken();

  const handleRename = (value: string) => {
    dispatch(renameForm(value.trim() || 'Untitled form'));
  };

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
        <Tooltip title={t('form.nameTooltip')}>
          <Title
            level={4}
            style={{ margin: 0 }}
            editable={{
              triggerType: ['text'],
              onChange: handleRename,
            }}
          >
            {formName}
          </Title>
        </Tooltip>

        <Space wrap size="middle">
          <Space wrap>
            <SaveFormButton />
            <LoadFormButton />
            <ResetFormButton />
          </Space>

          <Divider type="vertical" style={{ margin: 0, height: 24 }} />

          <Space wrap>
            <ExportFormButton />
            <ImportFormButton />
          </Space>

          <Divider type="vertical" style={{ margin: 0, height: 24 }} />

          <Space wrap>
            <LanguageSwitcher />
            <ThemeToggle />
            <LogoutButton />
          </Space>
        </Space>
      </Header>

      <Layout style={{ flexDirection: isCompact ? 'column' : 'row' }}>
        <Sider
          width={isCompact ? '100%' : 240}
          style={{
            padding: isCompact ? '24px 24px 12px' : '24px 12px 24px 24px',
            background: token.colorBgLayout,
          }}
        >
          <FieldPalette />
        </Sider>

        <Content
          style={{
            padding: isCompact ? '12px 24px 24px' : '24px 24px 24px 12px',
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
