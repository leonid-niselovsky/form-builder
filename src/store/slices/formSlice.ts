import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FieldType = 'input' | 'select' | 'checkbox';

interface Field {
  id: string;
  type: FieldType;
  label: string;
}

interface FormState {
  fields: Field[];
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
      });
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((el) => el.id !== action.payload);
    }
  },
});

export const { addField, removeField } = formSlice.actions;
export default formSlice.reducer;
