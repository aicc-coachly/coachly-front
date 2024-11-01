import { createSlice } from '@reduxjs/toolkit';
import { CreatePtPayment, FetchPtPaymentHistory } from './PtPaymentThunks';

const PtPaymentSlice = createSlice({
  name: 'ptPayment',
  initialState: {
    paymentList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // PT 결제 요청
      .addCase(CreatePtPayment.fulfilled, (state, action) => {
        state.paymentList.push(action.payload);
      })
      // PT 결제 내역 조회
      .addCase(FetchPtPaymentHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchPtPaymentHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.paymentList = action.payload;
      })
      .addCase(FetchPtPaymentHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default PtPaymentSlice.reducer;
