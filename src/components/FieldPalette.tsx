import { Button, Space, Typography } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { addField, type FieldType } from '../store/slices/formSlice';

const { Title } = Typography;

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
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={4}>Field Palette</Title>

      {paletteItems.map((item) => (
        <Button key={item.type} block onClick={() => dispatch(addField(item.type))}>
          {item.label}
        </Button>
      ))}
    </Space>
  );
}

export default FieldPalette;
