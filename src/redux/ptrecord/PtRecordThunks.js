import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// PT 일정 생성
export const CreatePtRecord = createAsyncThunk(
  'ptRecord/create',
  async ({ trainerNumber, scheduleData }) => {
    const response = await axios.post(
      `/trainers/${trainerNumber}/schedule-records`,
      scheduleData
    );
    return response.data;
  }
);

// PT 일정 조회
export const FetchPtRecords = createAsyncThunk(
  'ptRecord/fetchAll',
  async (ptNumber) => {
    const response = await axios.get(
      `/pt-schedule/${ptNumber}/schedule-records`
    );
    return response.data.schedules;
  }
);

// PT 일정 수정 (트레이너만)
export const UpdatePtRecord = createAsyncThunk(
  'ptRecord/update',
  async ({ trainerNumber, ptNumber, scheduleNumber, updatedData }) => {
    const response = await axios.patch(
      `/trainers/${trainerNumber}/pt-schedule/${ptNumber}/schedule-records/${scheduleNumber}`,
      updatedData
    );
    return response.data;
  }
);

// PT 일정 삭제
export const DeletePtRecord = createAsyncThunk(
  'ptRecord/delete',
  async ({ trainerNumber, ptNumber, scheduleNumber }) => {
    const response = await axios.delete(
      `/trainers/${trainerNumber}/pt-schedule/${ptNumber}/schedule-records/${scheduleNumber}`
    );
    return scheduleNumber;
  }
);
