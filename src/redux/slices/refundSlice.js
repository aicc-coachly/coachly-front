import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllRefunds,
  fetchRefund,
  createRefund,
  updateRefund,
  deleteRefund,
} from '../thunks/refundThunks';

const refundSlice = createSlice({
  name: 'refund',
  initialState: {
    refunds: [],
    selectedRefund: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 모든 환불 사유 조회
      .addCase(fetchAllRefunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds = action.payload;
      })
      .addCase(fetchAllRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 특정 환불 사유 조회
      .addCase(fetchRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRefund = action.payload;
      })
      .addCase(fetchRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 환불 사유 생성
      .addCase(createRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds.push(action.payload);
      })
      .addCase(createRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 환불 사유 수정
      .addCase(updateRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRefund.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRefund = action.payload;
        const index = state.refunds.findIndex(
          (refund) => refund.id === updatedRefund.id
        );
        if (index !== -1) {
          state.refunds[index] = updatedRefund;
        }
      })
      .addCase(updateRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 환불 사유 삭제
      .addCase(deleteRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds = state.refunds.filter(
          (refund) => refund.id !== action.payload.id
        );
      })
      .addCase(deleteRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default refundSlice.reducer;
