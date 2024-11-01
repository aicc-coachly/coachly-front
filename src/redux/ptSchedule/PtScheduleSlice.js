import { createSlice } from '@reduxjs/toolkit';
import {
  CreatePtSchedule,
  FetchPtSchedules,
  FetchUserPtSchedules,
  FetchTrainerPtSchedules,
  DeletePtSchedule,
} from './PtScheduleThunks';

const PtScheduleSlice = createSlice({
  name: 'ptSchedule',
  initialState: {
    ptScheduleList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // PT 수업 생성
      .addCase(CreatePtSchedule.fulfilled, (state, action) => {
        state.ptScheduleList.push(action.payload);
      })
      // 모든 PT 수업 조회
      .addCase(FetchPtSchedules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchPtSchedules.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ptScheduleList = action.payload;
      })
      .addCase(FetchPtSchedules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // PT 수업 삭제
      .addCase(DeletePtSchedule.fulfilled, (state, action) => {
        state.ptScheduleList = state.ptScheduleList.filter(
          (pt) => pt.pt_number !== action.payload
        );
      });
  },
});

export default PtScheduleSlice.reducer;
