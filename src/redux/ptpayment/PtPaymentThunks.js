import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// PT 결제 요청
export const CreatePtPayment = createAsyncThunk(
  'ptPayment/create',
  async (paymentData) => {
    const response = await axios.post('/pt-payment', paymentData);
    return response.data;
  }
);
// 결제 승인
export const ApprovePtPayment = createAsyncThunk(
  'ptPayment/approve',
  async (approvalData) => {
    const response = await axios.post(
      '/pt-schedule/payments/approval',
      approvalData
    );
    return response.data;
  }
);
// PT 결제 내역 조회
export const FetchPtPaymentHistory = createAsyncThunk(
  'ptPayment/fetchHistory',
  async (userNumber) => {
    const response = await axios.get(`/users/${userNumber}/pt-payment/history`);
    return response.data;
  }
);
