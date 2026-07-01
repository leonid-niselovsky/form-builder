import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type FieldType = 'input' | 'select' | 'checkbox';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormState {
  fields: Field[];
}

interface UpdateFieldLabelPayload {
  id: string;
  label: string;
}

const initialState: FormState = {
  fields: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<FieldType>) => {
      const fieldType = action.payload;

      state.fields.push({
        id: crypto.randomUUID(),
        type: fieldType,
        label: `${fieldType} field`,
        placeholder:
          fieldType === 'input'
            ? 'Enter value'
            : fieldType === 'select'
              ? 'Select an option'
              : undefined,
        required: false,
        options: fieldType === 'select' ? ['Option 1', 'Option 2'] : undefined,
      });
    },
    updateFieldLabel: (state, action: PayloadAction<UpdateFieldLabelPayload>) => {
      const field = state.fields.find((el) => el.id === action.payload.id);

      if (field) {
        field.label = action.payload.label;
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addField, removeField, updateFieldLabel } = formSlice.actions;
export default formSlice.reducer;
