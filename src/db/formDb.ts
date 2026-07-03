import Dexie, { type EntityTable } from 'dexie';
import type { FormTemplate } from '../types/form';

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
