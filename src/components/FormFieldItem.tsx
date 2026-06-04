import { DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Input, Select, Space, Tooltip } from 'antd';
import { useAppDispatch } from '../store/hooks';
import { removeField, updateFieldLabel, type Field } from '../store/slices/formSlice';

interface FormFieldItemProps {
  field: Field;
}

function FormFieldItem({ field }: FormFieldItemProps) {
  const dispatch = useAppDispatch();

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex gap={8} align="center">
        <Input
          style={{ flex: 1 }}
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

        <Tooltip title="Remove field">
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => dispatch(removeField(field.id))}
          />
        </Tooltip>
      </Flex>

      {field.type === 'input' && (
        <Input style={{ width: '100%' }} placeholder={field.label} />
      )}
      {field.type === 'select' && (
        <Select
          style={{ width: '100%' }}
          placeholder={field.label}
          options={[
            { value: 'option-1', label: 'Option 1' },
            { value: 'option-2', label: 'Option 2' },
          ]}
        />
      )}
      {field.type === 'checkbox' && <Checkbox>{field.label}</Checkbox>}
    </Space>
  );
}

export default FormFieldItem;
