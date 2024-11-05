import { createAsyncThunk } from '@reduxjs/toolkit';
import PTScheduleRepository from '../../repositories/PTScheduleRepository';

// 모든 PT 일정 조회
export const fetchPtSchedules = createAsyncThunk(
  'ptSchedule/fetchPtSchedules',
  async (_, { rejectWithValue }) => {
    try {
      const response = await PTScheduleRepository.getSchedules();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// PT 일정 생성
export const createPtSchedule = createAsyncThunk(
  'ptSchedule/createPtSchedule',
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await PTScheduleRepository.createSchedule(scheduleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// PT 일정 완료 처리
export const completePtSchedule = createAsyncThunk(
  'ptSchedule/completePtSchedule',
  async (scheduleNumber, { rejectWithValue }) => {
    try {
      const response = await PTScheduleRepository.completeSchedule(
        scheduleNumber
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 페이 체크 완료 처리
export const completePaycheck = createAsyncThunk(
  'ptSchedule/completePaycheck',
  async (paycheckNumber, { rejectWithValue }) => {
    try {
      const response = await PTScheduleRepository.completePaycheck(
        paycheckNumber
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// PT 일정 수정
export const updatePtSchedule = createAsyncThunk(
  'ptSchedule/updatePtSchedule',
  async ({ scheduleNumber, scheduleData }, { rejectWithValue }) => {
    try {
      const response = await PTScheduleRepository.updateSchedule(
        scheduleNumber,
        scheduleData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// PT 일정 삭제
export const deletePtSchedule = createAsyncThunk(
  'ptSchedule/deletePtSchedule',
  async (scheduleNumber, { rejectWithValue }) => {
    try {
      const response = await PTScheduleRepository.deleteSchedule(
        scheduleNumber
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
