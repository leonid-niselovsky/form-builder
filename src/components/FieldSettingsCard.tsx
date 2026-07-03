import { CopyOutlined, DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import type { DraggableAttributes, DraggableSyntheticListeners } from '@dnd-kit/core';
import {
  Button,
  Card,
  Flex,
  Input,
  InputNumber,
  Space,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { useAppDispatch } from '../store/hooks';
import {
  duplicateField,
  removeField,
  toggleFieldRequired,
  updateFieldHelperText,
  updateFieldLabel,
  updateFieldMax,
  updateFieldMin,
  updateFieldOptions,
  updateFieldPlaceholder,
} from '../store/slices/formSlice';
import type { Field, FieldType } from '../types/form';

const { TextArea } = Input;
const { Text } = Typography;

interface FieldSettingsCardProps {
  field: Field;
  dragHandleAttributes?: DraggableAttributes;
  dragHandleListeners?: DraggableSyntheticListeners;
}

const fieldTypeLabels: Record<FieldType, string> = {
  input: 'Text Input',
  textarea: 'Textarea',
  select: 'Select',
  checkbox: 'Checkbox',
  date: 'Date Picker',
  number: 'Number Input',
};

function FieldSettingsCard({
  field,
  dragHandleAttributes,
  dragHandleListeners,
}: FieldSettingsCardProps) {
  const dispatch = useAppDispatch();

  return (
    <Card
      size="small"
      title={
        <Space size={8}>
          <span
            {...dragHandleAttributes}
            {...dragHandleListeners}
            style={{ cursor: 'grab', display: 'inline-flex', touchAction: 'none' }}
          >
            <HolderOutlined />
          </span>
          <Tag>{fieldTypeLabels[field.type]}</Tag>
        </Space>
      }
      extra={
        <Space size={4}>
          <Tooltip title="Duplicate field">
            <Button
              type="text"
              icon={<CopyOutlined />}
              onClick={() => dispatch(duplicateField(field.id))}
            />
          </Tooltip>
          <Tooltip title="Remove field">
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => dispatch(removeField(field.id))}
            />
          </Tooltip>
        </Space>
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

        {field.type === 'select' && (
          <TextArea
            value={(field.options ?? []).join('\n')}
            placeholder={'One option per line, e.g.\nKazakhstan\nGermany\nCanada'}
            autoSize={{ minRows: 3 }}
            onChange={(e) => {
              dispatch(
                updateFieldOptions({
                  id: field.id,
                  options: e.target.value.split('\n'),
                })
              );
            }}
          />
        )}

        {field.type === 'number' && (
          <Flex gap={8}>
            <InputNumber
              style={{ width: '100%' }}
              value={field.min}
              placeholder="Min"
              onChange={(value) =>
                dispatch(updateFieldMin({ id: field.id, min: value ?? undefined }))
              }
            />
            <InputNumber
              style={{ width: '100%' }}
              value={field.max}
              placeholder="Max"
              onChange={(value) =>
                dispatch(updateFieldMax({ id: field.id, max: value ?? undefined }))
              }
            />
          </Flex>
        )}

        <Input
          value={field.helperText}
          placeholder="Helper text"
          onChange={(e) => {
            dispatch(
              updateFieldHelperText({
                id: field.id,
                helperText: e.target.value,
              })
            );
          }}
        />

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
