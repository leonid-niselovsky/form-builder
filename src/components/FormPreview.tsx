import { Card, Empty, Form } from 'antd';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from '../i18n/localeContext';
import PreviewField from './PreviewField';

function FormPreview() {
  const fields = useAppSelector((state) => state.form.fields);
  const { t } = useTranslation();

  return (
    <Card title={t('preview.title')}>
      {fields.length === 0 ? (
        <Empty description={t('preview.empty')} />
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
