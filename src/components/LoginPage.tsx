import { Button, Card, Flex, Form, Input, Space, theme, Typography } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/slices/authSlice';
import { storeUsername } from '../utils/authStorage';
import { useTranslation } from '../i18n/localeContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const { Title } = Typography;
const { useToken } = theme;

interface LoginFormValues {
  username: string;
  password: string;
}

function LoginPage() {
  const dispatch = useAppDispatch();
  const { token } = useToken();
  const { t } = useTranslation();

  const handleFinish = (values: LoginFormValues) => {
    storeUsername(values.username);
    dispatch(login(values.username));
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: 24,
        background: token.colorBgLayout,
      }}
    >
      <Space style={{ position: 'absolute', top: 24, right: 24 }}>
        <LanguageSwitcher />
        <ThemeToggle />
      </Space>

      <Card style={{ width: 360 }}>
        <Title level={3} style={{ marginTop: 0 }}>
          Business Form Studio
        </Title>

        <Form layout="vertical" onFinish={handleFinish} style={{ marginTop: 24 }}>
          <Form.Item
            label={t('login.username')}
            name="username"
            rules={[{ required: true, message: t('login.usernameRequired') }]}
          >
            <Input placeholder={t('login.usernamePlaceholder')} autoFocus />
          </Form.Item>

          <Form.Item
            label={t('login.password')}
            name="password"
            rules={[{ required: true, message: t('login.passwordRequired') }]}
          >
            <Input.Password placeholder={t('login.passwordPlaceholder')} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {t('login.submit')}
          </Button>
        </Form>
      </Card>
    </Flex>
  );
}

export default LoginPage;
