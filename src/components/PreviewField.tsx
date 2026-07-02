import { Checkbox, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import type { Field } from '../store/slices/formSlice';

interface PreviewFieldProps {
  field: Field;
}

function PreviewField({ field }: PreviewFieldProps) {
  switch (field.type) {
    case 'input':
      return (
        <Form.Item label={field.label} required={field.required} extra={field.helperText}>
          <Input placeholder={field.placeholder} />
        </Form.Item>
      );

    case 'textarea':
      return (
        <Form.Item label={field.label} required={field.required} extra={field.helperText}>
          <Input.TextArea placeholder={field.placeholder} />
        </Form.Item>
      );

    case 'select':
      return (
        <Form.Item label={field.label} required={field.required} extra={field.helperText}>
          <Select
            placeholder={field.placeholder}
            options={(field.options ?? [])
              .filter((option) => option.trim().length > 0)
              .map((option) => ({ value: option, label: option }))}
          />
        </Form.Item>
      );

    case 'date':
      return (
        <Form.Item label={field.label} required={field.required} extra={field.helperText}>
          <DatePicker style={{ width: '100%' }} placeholder={field.placeholder} />
        </Form.Item>
      );

    case 'number':
      return (
        <Form.Item label={field.label} required={field.required} extra={field.helperText}>
          <InputNumber
            style={{ width: '100%' }}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
          />
        </Form.Item>
      );

    case 'checkbox':
      return (
        <Form.Item required={field.required} extra={field.helperText} valuePropName="checked">
          <Checkbox>{field.label}</Checkbox>
        </Form.Item>
      );
  }
}

export default PreviewField;
