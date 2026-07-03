import { Card, Empty, Form } from 'antd';
import { useAppSelector } from '../store/hooks';
import PreviewField from './PreviewField';

function FormPreview() {
  const fields = useAppSelector((state) => state.form.fields);

  return (
    <Card title="Form Preview">
      {fields.length === 0 ? (
        <Empty description="Preview will appear here." />
      ) : (
        <Form layout="vertical">
          {fields.map((field) => (
            <PreviewField key={field.id} field={field} />
          ))}
        </Form>
      )}
    </Card>
  );
}

export default FormPreview;
