import type { FieldType } from '../types/form';
import type { TranslationKey } from './locales';

export const fieldTypeLabelKeys: Record<FieldType, TranslationKey> = {
  input: 'fieldType.input',
  textarea: 'fieldType.textarea',
  select: 'fieldType.select',
  checkbox: 'fieldType.checkbox',
  date: 'fieldType.date',
  number: 'fieldType.number',
};
