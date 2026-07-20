import { useRef } from 'react';
import { App, Button, Tooltip } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { loadForm } from '../store/slices/formSlice';
import { validateFormSchema } from '../utils/schemaValidation';
import { useTranslation } from '../i18n/localeContext';

function ImportFormButton() {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const schema = validateFormSchema(JSON.parse(text));
      dispatch(loadForm({ id: null, name: schema.name, fields: schema.fields }));
      message.success(t('import.success'));
    } catch (error) {
      const reason = error instanceof Error ? error.message : t('import.unknownError');
      message.error(t('import.invalid', { reason }));
    }
  };

  return (
    <>
      <Tooltip title={t('import.tooltip')}>
        <Button onClick={() => fileInputRef.current?.click()}>{t('import.button')}</Button>
      </Tooltip>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}

export default ImportFormButton;
