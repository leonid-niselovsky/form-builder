import type { Field, FieldType } from '../types/form';

export function createField(type: FieldType): Field {
  const base: Field = {
    id: crypto.randomUUID(),
    type,
    label: `${type} field`,
    required: false,
  };

  switch (type) {
    case 'input':
      return { ...base, placeholder: 'Enter value' };
    case 'textarea':
      return { ...base, placeholder: 'Enter value' };
    case 'select':
      return { ...base, placeholder: 'Select an option', options: ['Option 1', 'Option 2'] };
    case 'date':
      return { ...base, placeholder: 'Select date' };
    case 'number':
      return { ...base, placeholder: 'Enter number' };
    case 'checkbox':
      return base;
  }
}
