import { createAsyncThunk } from '@reduxjs/toolkit';
import TrainerRepository from '../../repositories/TrainerRepository';

// 특정 트레이너 프로필 조회
export const fetchTrainerProfile = createAsyncThunk(
  'trainer/fetchTrainerProfile',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.getTrainer(trainerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 특정 트레이너 PT 가격 정보 조회
export const fetchTrainerPtAmount = createAsyncThunk(
  'trainer/fetchTrainerPtAmount',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.getTrainerPtAmount(trainerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 특정 트레이너 헬스장 주소 조회
export const fetchTrainerGymAddress = createAsyncThunk(
  'trainer/fetchTrainerGymAddress',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.getTrainerGymAddress(trainerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 특정 트레이너 계좌 정보 조회
export const fetchTrainerAccount = createAsyncThunk(
  'trainer/fetchTrainerAccount',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.getTrainerAccount(trainerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 프로필 업데이트
export const updateTrainerProfile = createAsyncThunk(
  'trainer/updateTrainerProfile',
  async ({ trainerId, profileData }, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.updateTrainerInfo(
        trainerId,
        profileData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 헬스장 주소 업데이트
export const updateTrainerAddress = createAsyncThunk(
  'trainer/updateTrainerAddress',
  async ({ trainerId, addressData }, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.updateTrainerAddress(
        trainerId,
        addressData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 PT 가격 정보 업데이트
export const updateTrainerPtAmount = createAsyncThunk(
  'trainer/updateTrainerPtAmount',
  async ({ trainerId, ptAmountData }, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.updateTrainerPtAmount(
        trainerId,
        ptAmountData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 계좌 정보 업데이트
export const updateTrainerAccount = createAsyncThunk(
  'trainer/updateTrainerAccount',
  async ({ trainerId, accountData }, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.updateTrainerAccount(
        trainerId,
        accountData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 소프트 삭제
export const deleteTrainer = createAsyncThunk(
  'trainer/deleteTrainer',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.deleteTrainer(trainerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 PT 가격 정보 소프트 삭제
export const deleteTrainerPtAmount = createAsyncThunk(
  'trainer/deleteTrainerPtAmount',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.deleteTrainerPtAmount(trainerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 헬스장 주소 소프트 삭제
export const deleteTrainerGymAddress = createAsyncThunk(
  'trainer/deleteTrainerGymAddress',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.deleteTrainerGymAddress(
        trainerId
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 계좌 정보 소프트 삭제
export const deleteTrainerAccount = createAsyncThunk(
  'trainer/deleteTrainerAccount',
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await TrainerRepository.deleteTrainerAccount(trainerId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
