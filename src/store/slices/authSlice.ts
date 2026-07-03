import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getStoredUsername } from '../../utils/authStorage';

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const storedUsername = getStoredUsername();

const initialState: AuthState = {
  isAuthenticated: Boolean(storedUsername),
  username: storedUsername,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
