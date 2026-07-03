import Dexie, { type EntityTable } from 'dexie';
import type { Field } from '../store/slices/formSlice';

export interface FormTemplate {
  id: string;
  name: string;
  fields: Field[];
  createdAt: string;
  updatedAt: string;
}

class FormDatabase extends Dexie {
  formTemplates!: EntityTable<FormTemplate, 'id'>;

  constructor() {
    super('BusinessFormStudio');

    this.version(1).stores({
      formTemplates: 'id, name, updatedAt',
    });
  }
}

export const formDb = new FormDatabase();
