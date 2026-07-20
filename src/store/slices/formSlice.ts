import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createField } from '../../utils/createField';
import type { Field, FieldType } from '../../types/form';

interface FormState {
  id: string | null;
  name: string;
  fields: Field[];
}

interface LoadFormPayload {
  id: string | null;
  name: string;
  fields: Field[];
}

interface UpdateFieldLabelPayload {
  id: string;
  label: string;
}

interface UpdateFieldPlaceholderPayload {
  id: string;
  placeholder: string;
}

interface UpdateFieldHelperTextPayload {
  id: string;
  helperText: string;
}

interface UpdateFieldOptionsPayload {
  id: string;
  options: string[];
}

interface UpdateFieldMinPayload {
  id: string;
  min: number | undefined;
}

interface UpdateFieldMaxPayload {
  id: string;
  max: number | undefined;
}

const initialState: FormState = {
  id: null,
  name: 'Untitled form',
  fields: [],
};

function findFieldById(fields: Field[], id: string): Field | undefined {
  return fields.find((field) => field.id === id);
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FieldType>) => {
      state.fields.push(createField(action.payload));
    },
    updateFieldLabel: (state, action: PayloadAction<UpdateFieldLabelPayload>) => {
      const field = findFieldById(state.fields, action.payload.id);

      if (field) {
        field.label = action.payload.label;
      }
    },
    updateFieldPlaceholder: (state, action: PayloadAction<UpdateFieldPlaceholderPayload>) => {
      const field = findFieldById(state.fields, action.payload.id);

      if (field) {
        field.placeholder = action.payload.placeholder;
      }
    },
    toggleFieldRequired: (state, action: PayloadAction<string>) => {
      const field = findFieldById(state.fields, action.payload);

      if (field) {
        field.required = !field.required;
      }
    },
    updateFieldHelperText: (state, action: PayloadAction<UpdateFieldHelperTextPayload>) => {
      const field = findFieldById(state.fields, action.payload.id);

      if (field) {
        field.helperText = action.payload.helperText;
      }
    },
    updateFieldOptions: (state, action: PayloadAction<UpdateFieldOptionsPayload>) => {
      const field = findFieldById(state.fields, action.payload.id);

      if (field) {
        field.options = action.payload.options;
      }
    },
    updateFieldMin: (state, action: PayloadAction<UpdateFieldMinPayload>) => {
      const field = findFieldById(state.fields, action.payload.id);

      if (field) {
        field.min = action.payload.min;
      }
    },
    updateFieldMax: (state, action: PayloadAction<UpdateFieldMaxPayload>) => {
      const field = findFieldById(state.fields, action.payload.id);

      if (field) {
        field.max = action.payload.max;
      }
    },
    toggleFieldShowTime: (state, action: PayloadAction<string>) => {
      const field = findFieldById(state.fields, action.payload);

      if (field) {
        field.showTime = !field.showTime;
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((el) => el.id !== action.payload);
    },
    duplicateField: (state, action: PayloadAction<string>) => {
      const index = state.fields.findIndex((el) => el.id === action.payload);
      const field = state.fields[index];

      if (field) {
        state.fields.splice(index + 1, 0, {
          ...field,
          id: crypto.randomUUID(),
          label: `${field.label} copy`,
          options: field.options ? [...field.options] : undefined,
        });
      }
    },
    reorderFields: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;
      const activeIndex = state.fields.findIndex((el) => el.id === activeId);
      const overIndex = state.fields.findIndex((el) => el.id === overId);

      if (activeIndex === -1 || overIndex === -1) {
        return;
      }

      const [movedField] = state.fields.splice(activeIndex, 1);
      state.fields.splice(overIndex, 0, movedField);
    },
    loadForm: (state, action: PayloadAction<LoadFormPayload>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.fields = action.payload.fields;
    },
    setFormId: (state, action: PayloadAction<string | null>) => {
      state.id = action.payload;
    },
    renameForm: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const {
  addField,
  removeField,
  updateFieldLabel,
  updateFieldPlaceholder,
  toggleFieldRequired,
  updateFieldHelperText,
  updateFieldOptions,
  updateFieldMin,
  updateFieldMax,
  toggleFieldShowTime,
  duplicateField,
  reorderFields,
  loadForm,
  setFormId,
  renameForm,
} = formSlice.actions;
export default formSlice.reducer;
