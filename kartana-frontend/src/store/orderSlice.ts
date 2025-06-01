import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:3000/users';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderState {
  orderHistory: OrderItem[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderHistory: [],
  loading: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  'order/place',
  async ({ userId, orderHistory }: { userId: number; orderHistory: OrderItem[] }) => {
    const res = await axios.patch<{ orderHistory: OrderItem[] }>(`${API}/${userId}`, { orderHistory });
    return res.data.orderHistory;
  }
);


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(placeOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderHistory = action.payload;
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to place order';
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
