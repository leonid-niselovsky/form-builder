import { DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Flex, Input, Select, Tooltip } from 'antd';
import { useAppDispatch } from '../store/hook';
import { removeField, type Field } from '../store/slices/formSlice';

interface FormFieldItemProps {
  field: Field;
}

function FormFieldItem({ field }: FormFieldItemProps) {
  const dispatch = useAppDispatch();

  return (
    <Flex gap={8} align="center">
      {field.type === 'input' && <Input style={{ flex: 1 }} placeholder={field.label} />}
      {field.type === 'select' && (
        <Select
          style={{ flex: 1 }}
          placeholder={field.label}
          options={[
            { value: 'option-1', label: 'Option 1' },
            { value: 'option-2', label: 'Option 2' },
          ]}
        />
      )}
      {field.type === 'checkbox' && <Checkbox style={{ flex: 1 }}>{field.label}</Checkbox>}

      <Tooltip title="Remove field">
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => dispatch(removeField(field.id))}
        />
      </Tooltip>
    </Flex>
  );
}

export default FormFieldItem;
