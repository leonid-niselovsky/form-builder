import { Button, Card, Flex, Form, Input, theme, Typography } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/slices/authSlice';
import { storeUsername } from '../utils/authStorage';

const { Title, Text } = Typography;
const { useToken } = theme;

interface LoginFormValues {
  username: string;
  password: string;
}

function LoginPage() {
  const dispatch = useAppDispatch();
  const { token } = useToken();

  const handleFinish = (values: LoginFormValues) => {
    storeUsername(values.username);
    dispatch(login(values.username));
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ minHeight: '100vh', padding: 24, background: token.colorBgLayout }}
    >
      <Card style={{ width: 360 }}>
        <Title level={3} style={{ marginTop: 0 }}>
          Business Form Studio
        </Title>
        <Text type="secondary">
          Demo login — any username and password will work, this is a local, portfolio-only
          project with no real backend.
        </Text>

        <Form layout="vertical" onFinish={handleFinish} style={{ marginTop: 24 }}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter a username' }]}
          >
            <Input placeholder="e.g. admin" autoFocus />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Input.Password placeholder="Any password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form>
      </Card>
    </Flex>
  );
}

export default LoginPage;
