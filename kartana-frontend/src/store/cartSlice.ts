import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../lib/types';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as Product[],
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart() {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
