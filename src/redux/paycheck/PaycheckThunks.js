import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 정산 등록
export const RegisterPaycheck = createAsyncThunk(
  'paycheck/register',
  async (paycheckData) => {
    const response = await axios.post('/paycheck', paycheckData);
    return response.data;
  }
);

// 정산 대기 내역 조회
export const FetchPendingPaychecks = createAsyncThunk(
  'paycheck/fetchPending',
  async () => {
    const response = await axios.get('/paycheck');
    return response.data.paycheck;
  }
);

// 정산 완료 내역 조회
export const FetchCompletedPaychecks = createAsyncThunk(
  'paycheck/fetchCompleted',
  async () => {
    const response = await axios.get('/paycheck-record');
    return response.data.paycheck_records;
  }
);

// 정산 상태 변경
export const UpdatePaycheckStatus = createAsyncThunk(
  'paycheck/updateStatus',
  async (statusData) => {
    const response = await axios.patch('/paycheck/status', statusData);
    return response.data;
  }
);

// 정산 삭제
export const DeletePaycheck = createAsyncThunk(
  'paycheck/delete',
  async (paycheckNumber) => {
    await axios.delete(`/paycheck/${paycheckNumber}`);
    return paycheckNumber;
  }
);
