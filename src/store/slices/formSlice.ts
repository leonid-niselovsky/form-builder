import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
}

interface FormState {
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
  fields: [],
};

function createField(type: FieldType): Field {
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

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FieldType>) => {
      state.fields.push(createField(action.payload));
    },
    updateFieldLabel: (state, action: PayloadAction<UpdateFieldLabelPayload>) => {
      const field = state.fields.find((el) => el.id === action.payload.id);

      if (field) {
        field.label = action.payload.label;
      }
    },
    updateFieldPlaceholder: (state, action: PayloadAction<UpdateFieldPlaceholderPayload>) => {
      const field = state.fields.find((el) => el.id === action.payload.id);

      if (field) {
        field.placeholder = action.payload.placeholder;
      }
    },
    toggleFieldRequired: (state, action: PayloadAction<string>) => {
      const field = state.fields.find((el) => el.id === action.payload);

      if (field) {
        field.required = !field.required;
      }
    },
    updateFieldHelperText: (state, action: PayloadAction<UpdateFieldHelperTextPayload>) => {
      const field = state.fields.find((el) => el.id === action.payload.id);

      if (field) {
        field.helperText = action.payload.helperText;
      }
    },
    updateFieldOptions: (state, action: PayloadAction<UpdateFieldOptionsPayload>) => {
      const field = state.fields.find((el) => el.id === action.payload.id);

      if (field) {
        field.options = action.payload.options;
      }
    },
    updateFieldMin: (state, action: PayloadAction<UpdateFieldMinPayload>) => {
      const field = state.fields.find((el) => el.id === action.payload.id);

      if (field) {
        field.min = action.payload.min;
      }
    },
    updateFieldMax: (state, action: PayloadAction<UpdateFieldMaxPayload>) => {
      const field = state.fields.find((el) => el.id === action.payload.id);

      if (field) {
        field.max = action.payload.max;
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((el) => el.id !== action.payload);
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
} = formSlice.actions;
export default formSlice.reducer;
