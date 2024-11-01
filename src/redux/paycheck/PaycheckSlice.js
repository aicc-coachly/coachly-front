import { createSlice } from '@reduxjs/toolkit';
import {
  RegisterPaycheck,
  FetchPendingPaychecks,
  FetchCompletedPaychecks,
  UpdatePaycheckStatus,
  DeletePaycheck,
} from './PaycheckThunks';

const PaycheckSlice = createSlice({
  name: 'paycheck',
  initialState: {
    pendingPaychecks: [],
    completedPaychecks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 정산 등록
      .addCase(RegisterPaycheck.fulfilled, (state, action) => {
        state.pendingPaychecks.push(action.payload);
      })
      // 정산 대기 내역 조회
      .addCase(FetchPendingPaychecks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchPendingPaychecks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pendingPaychecks = action.payload;
      })
      .addCase(FetchPendingPaychecks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // 정산 완료 내역 조회
      .addCase(FetchCompletedPaychecks.fulfilled, (state, action) => {
        state.completedPaychecks = action.payload;
      })
      // 정산 상태 변경
      .addCase(UpdatePaycheckStatus.fulfilled, (state, action) => {
        // 필터링 또는 상태 변경 로직
      })
      // 정산 삭제
      .addCase(DeletePaycheck.fulfilled, (state, action) => {
        state.pendingPaychecks = state.pendingPaychecks.filter(
          (paycheck) => paycheck.paycheck_number !== action.payload
        );
      });
  },
});

export default PaycheckSlice.reducer;
