import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../lib/types";

interface OrderState {
  orderHistory: CartItem[][];
}

const initialState: OrderState = {
  orderHistory: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrder(state, action: PayloadAction<CartItem[]>) {
      state.orderHistory.push(action.payload);
    },

    clearOrders() {
      return initialState;
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
