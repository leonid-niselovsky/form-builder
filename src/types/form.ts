export type FieldType = 'input' | 'textarea' | 'select' | 'checkbox' | 'date' | 'number';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  helperText?: string;
  options?: string[];
  min?: number;
  max?: number;
  showTime?: boolean;
}

export interface FormTemplate {
  id: string;
  name: string;
  fields: Field[];
  createdAt: string;
  updatedAt: string;
}
