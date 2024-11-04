import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPaymentHistory,
  initiatePayment,
  completePayment,
} from '../thunks/paymentThunks';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 결제 내역 조회
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

      // 결제 생성
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.history.push(action.payload);
      })

      // 결제 완료 처리
      .addCase(completePayment.fulfilled, (state, action) => {
        const updatedPayment = action.payload;
        const index = state.history.findIndex(
          (payment) => payment.id === updatedPayment.id
        );
        if (index !== -1) {
          state.history[index] = updatedPayment;
        }
      });
  },
});

export default paymentSlice.reducer;
