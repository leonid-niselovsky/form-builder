import { Space, Typography } from 'antd';
import { useAppSelector } from '../store/hooks';
import FieldSettingsCard from './FieldSettingsCard';

const { Title } = Typography;

function FormBuilder() {
  const fields = useAppSelector((state) => state.form.fields);

  return (
    <section>
      <Title level={3}>Form Builder</Title>

      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {fields.map((field) => (
          <FieldSettingsCard key={field.id} field={field} />
        ))}
      </Space>
    </section>
  );
}

export default FormBuilder;
