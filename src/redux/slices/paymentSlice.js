import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPaymentHistory,
  initiatePayment,
  cancelPayment,
} from "../thunks/paymentThunks";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.history.push(action.payload);
      })
      .addCase(cancelPayment.fulfilled, (state, action) => {
        state.history = state.history.filter(
          (payment) => payment.id !== action.payload
        );
      });
  },
});

export default paymentSlice.reducer;
