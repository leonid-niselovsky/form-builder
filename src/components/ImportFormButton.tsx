import { useRef } from 'react';
import { App, Button } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { loadForm } from '../store/slices/formSlice';
import { validateFormSchema } from '../utils/schemaValidation';

function ImportFormButton() {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();
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
      message.success('Schema imported successfully.');
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown error.';
      message.error(`Invalid schema: ${reason}`);
    }
  };

  return (
    <>
      <Button onClick={() => fileInputRef.current?.click()}>Import Schema</Button>
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
