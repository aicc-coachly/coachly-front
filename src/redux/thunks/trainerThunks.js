import { createAsyncThunk } from '@reduxjs/toolkit';
import TrainerRepository from '../../repositories/TrainerRepository';

export const fetchTrainerProfile = createAsyncThunk(
  'trainer/fetchTrainerProfile',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.getProfile(trainerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTrainerProfile = createAsyncThunk(
  'trainer/updateTrainerProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.updateProfile(profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
