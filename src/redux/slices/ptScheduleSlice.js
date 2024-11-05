import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPtSchedules,
  createPtSchedule,
  completePtSchedule,
  completePaycheck,
  updatePtSchedule,
  deletePtSchedule,
} from '../thunks/ptScheduleThunks';

const ptScheduleSlice = createSlice({
  name: 'ptSchedule',
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // PT 일정 조회
      .addCase(fetchPtSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPtSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchPtSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // PT 일정 생성
      .addCase(createPtSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPtSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules.push(action.payload);
      })
      .addCase(createPtSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // PT 일정 완료 처리
      .addCase(completePtSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completePtSchedule.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.schedules.findIndex(
          (schedule) => schedule.id === action.payload.id
        );
        if (index !== -1) {
          state.schedules[index] = action.payload;
        }
      })
      .addCase(completePtSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 페이 체크 완료 처리
      .addCase(completePaycheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completePaycheck.fulfilled, (state, action) => {
        state.loading = false;
        // 완료된 페이 체크 처리 로직이 필요한 경우 추가
      })
      .addCase(completePaycheck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // PT 일정 수정
      .addCase(updatePtSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePtSchedule.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.schedules.findIndex(
          (schedule) => schedule.id === action.payload.id
        );
        if (index !== -1) {
          state.schedules[index] = action.payload;
        }
      })
      .addCase(updatePtSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // PT 일정 삭제
      .addCase(deletePtSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePtSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = state.schedules.filter(
          (schedule) => schedule.id !== action.payload.id
        );
      })
      .addCase(deletePtSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ptScheduleSlice.reducer;
