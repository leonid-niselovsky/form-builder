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
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { useAppDispatch } from '../store/hooks';
import {
  duplicateField,
  removeField,
  toggleFieldRequired,
  toggleFieldShowTime,
  updateFieldHelperText,
  updateFieldLabel,
  updateFieldMax,
  updateFieldMin,
  updateFieldOptions,
  updateFieldPlaceholder,
} from '../store/slices/formSlice';
import { useTranslation } from '../i18n/localeContext';
import { fieldTypeLabelKeys } from '../i18n/fieldTypes';
import type { Field } from '../types/form';

const { TextArea } = Input;
const { Text } = Typography;

interface FieldSettingsCardProps {
  field: Field;
  dragHandleAttributes?: DraggableAttributes;
  dragHandleListeners?: DraggableSyntheticListeners;
}

function FieldSettingsCard({
  field,
  dragHandleAttributes,
  dragHandleListeners,
}: FieldSettingsCardProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { token } = theme.useToken();

  return (
    <Card
      size="small"
      style={{ borderColor: token.colorBorder }}
      title={
        <Space size={8}>
          <span
            {...dragHandleAttributes}
            {...dragHandleListeners}
            style={{ cursor: 'grab', display: 'inline-flex', touchAction: 'none' }}
          >
            <HolderOutlined />
          </span>
          <Tag>{t(fieldTypeLabelKeys[field.type])}</Tag>
        </Space>
      }
      extra={
        <Space size={4}>
          <Tooltip title={t('settings.duplicate')}>
            <Button
              type="text"
              icon={<CopyOutlined />}
              onClick={() => dispatch(duplicateField(field.id))}
            />
          </Tooltip>
          <Tooltip title={t('settings.remove')}>
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
      <Space orientation="vertical" style={{ width: '100%' }}>
        <Input
          value={field.label}
          placeholder={t('settings.label')}
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
            placeholder={t('settings.placeholder')}
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
            placeholder={t('settings.options')}
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
              placeholder={t('settings.min')}
              onChange={(value) =>
                dispatch(updateFieldMin({ id: field.id, min: value ?? undefined }))
              }
            />
            <InputNumber
              style={{ width: '100%' }}
              value={field.max}
              placeholder={t('settings.max')}
              onChange={(value) =>
                dispatch(updateFieldMax({ id: field.id, max: value ?? undefined }))
              }
            />
          </Flex>
        )}

        <Input
          value={field.helperText}
          placeholder={t('settings.helper')}
          onChange={(e) => {
            dispatch(
              updateFieldHelperText({
                id: field.id,
                helperText: e.target.value,
              })
            );
          }}
        />

        {field.type === 'date' && (
          <Flex align="center" gap={8}>
            <Switch
              checked={field.showTime ?? false}
              onChange={() => dispatch(toggleFieldShowTime(field.id))}
            />
            <Text>{t('settings.showTime')}</Text>
          </Flex>
        )}

        <Flex align="center" gap={8}>
          <Switch
            checked={field.required}
            onChange={() => dispatch(toggleFieldRequired(field.id))}
          />
          <Text>{t('settings.required')}</Text>
        </Flex>
      </Space>
    </Card>
  );
}

export default FieldSettingsCard;
