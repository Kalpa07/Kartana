import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

const initialState: User = {
  id: null,
  name: null,
  email: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    logout() {
      return initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
