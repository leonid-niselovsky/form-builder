import { formDb } from './formDb';
import type { Field, FormTemplate } from '../types/form';

export function listFormTemplates(): Promise<FormTemplate[]> {
  return formDb.formTemplates.orderBy('updatedAt').reverse().toArray();
}

export function getFormTemplate(id: string): Promise<FormTemplate | undefined> {
  return formDb.formTemplates.get(id);
}

export async function createFormTemplate(name: string, fields: Field[]): Promise<FormTemplate> {
  const now = new Date().toISOString();
  const template: FormTemplate = {
    id: crypto.randomUUID(),
    name,
    fields,
    createdAt: now,
    updatedAt: now,
  };

  await formDb.formTemplates.add(template);
  return template;
}

export function updateFormTemplateFields(id: string, fields: Field[]): Promise<number> {
  return formDb.formTemplates.update(id, { fields, updatedAt: new Date().toISOString() });
}

export function renameFormTemplate(id: string, name: string): Promise<number> {
  return formDb.formTemplates.update(id, { name, updatedAt: new Date().toISOString() });
}

export function deleteFormTemplate(id: string): Promise<void> {
  return formDb.formTemplates.delete(id);
}
