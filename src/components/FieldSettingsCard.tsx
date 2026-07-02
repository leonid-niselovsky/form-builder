import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Input, Tag, Tooltip } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { removeField, updateFieldLabel, type Field, type FieldType } from '../store/slices/formSlice';

interface FieldSettingsCardProps {
  field: Field;
}

const fieldTypeLabels: Record<FieldType, string> = {
  input: 'Text Input',
  textarea: 'Textarea',
  select: 'Select',
  checkbox: 'Checkbox',
  date: 'Date Picker',
  number: 'Number Input',
};

function FieldSettingsCard({ field }: FieldSettingsCardProps) {
  const dispatch = useAppDispatch();

  return (
    <Card
      size="small"
      title={<Tag>{fieldTypeLabels[field.type]}</Tag>}
      extra={
        <Tooltip title="Remove field">
          <Button
            danger
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => dispatch(removeField(field.id))}
          />
        </Tooltip>
      }
    >
      <Input
        value={field.label}
        placeholder="Field label"
        onChange={(e) => {
          dispatch(
            updateFieldLabel({
              id: field.id,
              label: e.target.value,
            })
          );
        }}
      />
    </Card>
  );
}

export default FieldSettingsCard;
