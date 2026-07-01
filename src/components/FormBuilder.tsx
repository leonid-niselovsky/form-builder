import { Space, Typography } from 'antd';
import { useAppSelector } from '../store/hooks';
import FormFieldItem from './FormFieldItem';

const { Title } = Typography;

function FormBuilder() {
  const fields = useAppSelector((state) => state.form.fields);

  return (
    <section>
      <Title level={3}>Form Builder</Title>

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {fields.map((field) => (
          <FormFieldItem key={field.id} field={field} />
        ))}
      </Space>
    </section>
  );
}

export default FormBuilder;
