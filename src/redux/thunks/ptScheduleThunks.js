import { createAsyncThunk } from '@reduxjs/toolkit';
import PTScheduleRepository from '../../repositories/PTScheduleRepository';

export const fetchPtSchedules = createAsyncThunk(
  'ptSchedule/fetchPtSchedules',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await PTScheduleRepository.getSchedules(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePtSchedule = createAsyncThunk(
  'ptSchedule/updatePtSchedule',
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await PTScheduleRepository.updateSchedule(scheduleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
