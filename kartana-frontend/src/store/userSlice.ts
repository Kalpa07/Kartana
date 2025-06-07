import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "../lib/types";

const initialState: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  cart: [],
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
