import './App.css';
import { Button, Checkbox, Flex, Input, Layout, Select, Space, Tooltip, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from './store/hook.ts';
import { addField, removeField } from './store/slices/formSlice.ts';
const { Sider, Content } = Layout;
const { Title } = Typography;
import { DeleteOutlined } from '@ant-design/icons';

function App() {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.form.fields);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={220} style={{ padding: 16, background: '#fff' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex justify="space-between">
            <Button type="primary" block onClick={() => dispatch(addField('input'))}>
              Add Input
            </Button>
          </Flex>

          <Button block onClick={() => dispatch(addField('select'))}>
            Add Select
          </Button>
          <Button block onClick={() => dispatch(addField('checkbox'))}>
            Add Checkbox
          </Button>
        </Space>
      </Sider>

      <Content style={{ padding: 24 }}>
        <Title level={3}>Form Preview</Title>

        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {fields.map((field) => (
            <Flex key={field.id} gap={8} align="center" justify={"space-between"}>
              {field.type === 'input' && <Input placeholder={field.label} />}
              {field.type === 'select' && (
                <Select
                  placeholder={field.label}
                  options={[
                    { value: 'option-1', label: 'Option 1' },
                    { value: 'option-2', label: 'Option 2' },
                  ]}
                />
              )}
              {field.type === 'checkbox' && <Checkbox>{field.label}</Checkbox>}

              <Tooltip title="Remove field">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => dispatch(removeField(field.id))}
                />
              </Tooltip>

            </Flex>
          ))}
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
