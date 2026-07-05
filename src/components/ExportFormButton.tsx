import { Button } from 'antd';
import { useAppSelector } from '../store/hooks';

function slugify(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'form'
  );
}

function ExportFormButton() {
  const { name, fields } = useAppSelector((state) => state.form);

  const handleExport = () => {
    const schema = {
      name,
      fields,
      exportedAt: new Date().toISOString(),
      version: 1,
    };

    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${slugify(name)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExport}>Export Schema</Button>;
}

export default ExportFormButton;
