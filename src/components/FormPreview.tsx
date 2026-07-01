import { Checkbox, Input, Select, Space, Typography } from 'antd';
import { useAppSelector } from '../store/hooks';

const { Title } = Typography;

function FormPreview() {
  const fields = useAppSelector((state) => state.form.fields);

  return (
    <section>
      <Title level={3}>Form Preview</Title>

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {fields.map((field) => {
          if (field.type === 'input') {
            return <Input key={field.id} placeholder={field.label} />;
          }

          if (field.type === 'select') {
            return (
              <Select
                key={field.id}
                style={{ width: '100%' }}
                placeholder={field.label}
                options={[
                  { value: 'option-1', label: 'Option 1' },
                  { value: 'option-2', label: 'Option 2' },
                ]}
              />
            );
          }

          return <Checkbox key={field.id}>{field.label}</Checkbox>;
        })}
      </Space>
    </section>
  );
}

export default FormPreview;
