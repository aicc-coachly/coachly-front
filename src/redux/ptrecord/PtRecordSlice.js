import { createSlice } from '@reduxjs/toolkit';
import {
  CreatePtRecord,
  FetchPtRecords,
  UpdatePtRecord,
  DeletePtRecord,
} from './PtRecordThunks';

const PtRecordSlice = createSlice({
  name: 'ptRecord',
  initialState: {
    ptRecordList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // PT 일정 생성
      .addCase(CreatePtRecord.fulfilled, (state, action) => {
        state.ptRecordList.push(action.payload);
      })
      // PT 일정 조회
      .addCase(FetchPtRecords.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchPtRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ptRecordList = action.payload;
      })
      .addCase(FetchPtRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // PT 일정 수정
      .addCase(UpdatePtRecord.fulfilled, (state, action) => {
        const index = state.ptRecordList.findIndex(
          (record) => record.schedule_number === action.payload.schedule_number
        );
        if (index !== -1) {
          state.ptRecordList[index] = action.payload;
        }
      })
      // PT 일정 삭제
      .addCase(DeletePtRecord.fulfilled, (state, action) => {
        state.ptRecordList = state.ptRecordList.filter(
          (record) => record.schedule_number !== action.payload
        );
      });
  },
});

export default PtRecordSlice.reducer;
