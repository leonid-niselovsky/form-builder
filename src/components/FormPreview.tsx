import { Empty, Form, Typography } from 'antd';
import { useAppSelector } from '../store/hooks';
import PreviewField from './PreviewField';

const { Title } = Typography;

function FormPreview() {
  const fields = useAppSelector((state) => state.form.fields);

  return (
    <section>
      <Title level={3}>Form Preview</Title>

      {fields.length === 0 ? (
        <Empty description="Preview will appear here." />
      ) : (
        <Form layout="vertical">
          {fields.map((field) => (
            <PreviewField key={field.id} field={field} />
          ))}
        </Form>
      )}
    </section>
  );
}

export default FormPreview;
