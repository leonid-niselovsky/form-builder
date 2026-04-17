import './App.css';
import { Button, Checkbox, Input, Layout, Select, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from './store/hook.ts';
import { addField } from './store/slices/formSlice.ts';
const { Sider, Content } = Layout;
const { Title } = Typography;

function App() {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.form.fields);
  console.log(fields);
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={220} style={{ padding: 16, background: '#fff' }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="primary" block onClick={() => dispatch(addField('input'))}>
            Add Input
          </Button>
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
        <pre>{JSON.stringify(fields, null, 2)}</pre>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {fields.map((field) => {
            if (field.type === 'input') {
              return <Input key={field.id} placeholder={field.label} />;
            }

            if (field.type === 'select') {
              return (
                <Select
                  key={field.id}
                  placeholder={field.label}
                  options={[
                    { value: 'option-1', label: 'Option 1' },
                    { value: 'option-2', label: 'Option 2' },
                  ]}
                />
              );
            }

            if (field.type === 'checkbox') {
              return <Checkbox key={field.id}>{field.label}</Checkbox>;
            }

            return null;
          })}
        </Space>
      </Content>
    </Layout>
  );
}

export default App;
