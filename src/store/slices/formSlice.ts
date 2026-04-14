import { createSlice } from '@reduxjs/toolkit';

type FieldType = 'input' | 'select' | 'checkbox';

interface Field {
  id: string;
  type: FieldType;
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
    addField: (state, action) => {
      state.fields.push({
        id: Date.now().toString(),
        type: action.payload,
      });
    },
  },
});

export const { addField } = formSlice.actions;
export default formSlice.reducer;
