import { Button, Card, Space } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { addField } from '../store/slices/formSlice';
import type { FieldType } from '../types/form';

const paletteItems: { type: FieldType; label: string }[] = [
  { type: 'input', label: 'Text Input' },
  { type: 'textarea', label: 'Textarea' },
  { type: 'select', label: 'Select' },
  { type: 'checkbox', label: 'Checkbox' },
  { type: 'date', label: 'Date Picker' },
  { type: 'number', label: 'Number Input' },
];

function FieldPalette() {
  const dispatch = useAppDispatch();

  return (
    <Card title="Field Palette">
      <Space direction="vertical" style={{ width: '100%' }}>
        {paletteItems.map((item) => (
          <Button key={item.type} block onClick={() => dispatch(addField(item.type))}>
            {item.label}
          </Button>
        ))}
      </Space>
    </Card>
  );
}

export default FieldPalette;
