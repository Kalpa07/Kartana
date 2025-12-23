import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../lib/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    setCart(_, action: PayloadAction<CartItem[]>) {
      return action.payload;
    },

    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.find(
        item => item.title === action.payload.title
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ title: string; quantity: number }>
    ) {
      const item = state.find(i => i.title === action.payload.title);
      if (item) item.quantity = action.payload.quantity;
    },

    removeFromCart(state, action: PayloadAction<string>) {
      return state.filter(item => item.title !== action.payload);
    },

    clearCart() {
      return [];
    },
  },
});

export const {
  setCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
