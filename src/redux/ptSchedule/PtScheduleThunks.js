import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// PT 수업 생성
export const CreatePtSchedule = createAsyncThunk(
  'ptSchedule/create',
  async (ptData) => {
    const response = await axios.post('/pt-schedule', ptData);
    return response.data;
  }
);

// 모든 PT 수업 조회
export const FetchPtSchedules = createAsyncThunk(
  'ptSchedule/fetchAll',
  async () => {
    const response = await axios.get('/pt-schedule');
    return response.data.pt_schedules;
  }
);

// 회원 PT 수업 조회
export const FetchUserPtSchedules = createAsyncThunk(
  'ptSchedule/fetchUser',
  async (userNumber) => {
    const response = await axios.get(`/users/${userNumber}/pt-schedule`);
    return response.data.pt_schedules;
  }
);

// 트레이너 PT 수업 조회
export const FetchTrainerPtSchedules = createAsyncThunk(
  'ptSchedule/fetchTrainer',
  async (trainerNumber) => {
    const response = await axios.get(`/trainers/${trainerNumber}/pt-schedule`);
    return response.data.pt_schedules;
  }
);

// PT 수업 삭제
export const DeletePtSchedule = createAsyncThunk(
  'ptSchedule/delete',
  async (ptNumber) => {
    await axios.delete(`/pt-schedule/${ptNumber}`);
    return ptNumber;
  }
);
