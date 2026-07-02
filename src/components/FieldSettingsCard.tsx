import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Input, Space, Switch, Tag, Tooltip, Typography } from 'antd';
import { useAppDispatch } from '../store/hooks';
import {
  removeField,
  toggleFieldRequired,
  updateFieldLabel,
  updateFieldPlaceholder,
  type Field,
  type FieldType,
} from '../store/slices/formSlice';

const { Text } = Typography;

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
      <Space direction="vertical" style={{ width: '100%' }}>
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

        {field.type !== 'checkbox' && (
          <Input
            value={field.placeholder}
            placeholder="Field placeholder"
            onChange={(e) => {
              dispatch(
                updateFieldPlaceholder({
                  id: field.id,
                  placeholder: e.target.value,
                })
              );
            }}
          />
        )}

        <Flex align="center" gap={8}>
          <Switch
            checked={field.required}
            onChange={() => dispatch(toggleFieldRequired(field.id))}
          />
          <Text>Required</Text>
        </Flex>
      </Space>
    </Card>
  );
}

export default FieldSettingsCard;
