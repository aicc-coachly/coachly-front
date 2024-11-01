import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 트레이너 회원가입
export const RegisterTrainer = createAsyncThunk(
  'trainers/register',
  async (trainerData) => {
    const response = await axios.post('/trainers', trainerData);
    return response.data;
  }
);

// 트레이너 로그인
export const LoginTrainer = createAsyncThunk(
  'trainers/login',
  async (loginData) => {
    const response = await axios.post('/trainers/login', loginData);
    return response.data;
  }
);

// PT 옵션 추가
export const AddPtOption = createAsyncThunk(
  'trainers/addPtOption',
  async (optionData) => {
    const response = await axios.post('/pt-cost-option', optionData);
    return response.data;
  }
);

// 트레이너 주소 추가
export const AddTrainerAddress = createAsyncThunk(
  'trainers/addAddress',
  async (addressData) => {
    const response = await axios.post('/gym-address', addressData);
    return response.data;
  }
);

// 트레이너 계좌 추가
export const AddTrainerBankAccount = createAsyncThunk(
  'trainers/addBankAccount',
  async (bankData) => {
    const response = await axios.post('/trainer-bank-account', bankData);
    return response.data;
  }
);

// 트레이너 목록 조회
export const FetchTrainers = createAsyncThunk('trainers/fetchAll', async () => {
  const response = await axios.get('/trainers');
  return response.data.trainers;
});

// 특정 트레이너 조회
export const FetchTrainerById = createAsyncThunk(
  'trainers/fetchById',
  async (trainerNumber) => {
    const response = await axios.get(`/trainers/${trainerNumber}`);
    return response.data;
  }
);

// PT 옵션 조회
export const FetchPtOptions = createAsyncThunk(
  'trainers/fetchPtOptions',
  async () => {
    const response = await axios.get('/pt-cost-option');
    return response.data.options;
  }
);

// 트레이너 주소 조회
export const FetchTrainerAddress = createAsyncThunk(
  'trainers/fetchAddress',
  async () => {
    const response = await axios.get('/gym-address');
    return response.data;
  }
);

// 트레이너 계좌 조회
export const FetchTrainerBankAccount = createAsyncThunk(
  'trainers/fetchBankAccount',
  async () => {
    const response = await axios.get('/trainer-bank-account');
    return response.data;
  }
);

// 트레이너 정보 수정
export const UpdateTrainerInfo = createAsyncThunk(
  'trainers/updateInfo',
  async ({ trainerNumber, updatedData }) => {
    const response = await axios.patch(
      `/trainers/${trainerNumber}`,
      updatedData
    );
    return response.data;
  }
);

// PT 옵션 수정
export const UpdatePtOption = createAsyncThunk(
  'trainers/updatePtOption',
  async ({ amountNumber, updatedData }) => {
    const response = await axios.patch(
      `/pt-cost-option/${amountNumber}`,
      updatedData
    );
    return response.data;
  }
);

// 트레이너 주소 수정
export const UpdateTrainerAddress = createAsyncThunk(
  'trainers/updateAddress',
  async ({ gymNumber, updatedData }) => {
    const response = await axios.patch(
      `/gym-address/${gymNumber}`,
      updatedData
    );
    return response.data;
  }
);

// 트레이너 계좌 수정
export const UpdateTrainerBankAccount = createAsyncThunk(
  'trainers/updateBankAccount',
  async ({ accountNumber, updatedData }) => {
    const response = await axios.patch(
      `/trainer-bank-account/${accountNumber}`,
      updatedData
    );
    return response.data;
  }
);

// 트레이너 삭제
export const DeleteTrainer = createAsyncThunk(
  'trainers/delete',
  async (trainerNumber) => {
    await axios.delete(`/trainers/${trainerNumber}`);
    return trainerNumber;
  }
);
