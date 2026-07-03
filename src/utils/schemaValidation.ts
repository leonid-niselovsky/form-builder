import type { Field, FieldType } from '../types/form';

const VALID_FIELD_TYPES: FieldType[] = ['input', 'textarea', 'select', 'checkbox', 'date', 'number'];

export interface FormSchema {
  name: string;
  fields: Field[];
}

export function validateFormSchema(data: unknown): FormSchema {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Schema must be a JSON object.');
  }

  const { name, fields } = data as Record<string, unknown>;

  if (typeof name !== 'string' || !name.trim()) {
    throw new Error('Schema is missing a valid "name".');
  }

  if (!Array.isArray(fields)) {
    throw new Error('Schema "fields" must be an array.');
  }

  fields.forEach(validateField);

  return { name, fields: fields as Field[] };
}

function validateField(field: unknown, index: number): void {
  if (typeof field !== 'object' || field === null) {
    throw new Error(`Field at index ${index} must be an object.`);
  }

  const { id, type, label, required, options } = field as Record<string, unknown>;

  if (typeof id !== 'string') {
    throw new Error(`Field at index ${index} is missing a valid "id".`);
  }

  if (typeof type !== 'string' || !VALID_FIELD_TYPES.includes(type as FieldType)) {
    throw new Error(`Field at index ${index} has an invalid "type".`);
  }

  if (typeof label !== 'string') {
    throw new Error(`Field at index ${index} is missing a valid "label".`);
  }

  if (typeof required !== 'boolean') {
    throw new Error(`Field at index ${index} is missing a valid "required" flag.`);
  }

  if (options !== undefined && !Array.isArray(options)) {
    throw new Error(`Field at index ${index} has an invalid "options" list.`);
  }
}
