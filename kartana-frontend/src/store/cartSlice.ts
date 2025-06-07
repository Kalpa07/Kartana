import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../lib/types';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as Product[],
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
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
