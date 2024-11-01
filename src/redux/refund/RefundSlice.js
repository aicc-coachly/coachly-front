import { createSlice } from '@reduxjs/toolkit';
import {
  CreateRefundRequest,
  FetchAllRefundRequests,
  FetchRefundRequestById,
  UpdateRefundRequest,
  DeleteRefundRequest,
} from './RefundThunks';

const RefundSlice = createSlice({
  name: 'refund',
  initialState: {
    refundList: [],
    refundDetail: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 환불 요청 생성
      .addCase(CreateRefundRequest.fulfilled, (state, action) => {
        state.refundList.push(action.payload);
      })
      // 모든 환불 요청 조회
      .addCase(FetchAllRefundRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchAllRefundRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.refundList = action.payload;
      })
      .addCase(FetchAllRefundRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // 특정 환불 요청 조회
      .addCase(FetchRefundRequestById.fulfilled, (state, action) => {
        state.refundDetail = action.payload;
      })
      // 환불 요청 수정
      .addCase(UpdateRefundRequest.fulfilled, (state, action) => {
        const index = state.refundList.findIndex(
          (refund) => refund.refund_number === action.payload.refund_number
        );
        if (index !== -1) {
          state.refundList[index] = action.payload;
        }
      })
      // 환불 요청 삭제
      .addCase(DeleteRefundRequest.fulfilled, (state, action) => {
        state.refundList = state.refundList.filter(
          (refund) => refund.refund_number !== action.payload
        );
      });
  },
});

export default RefundSlice.reducer;
