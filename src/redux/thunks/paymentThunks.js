import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// PT 결제 생성 Thunk
export const initiatePayment = createAsyncThunk(
  'payment/initiatePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/pt-payments', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// PT 결제 완료 처리 Thunk
export const completePayment = createAsyncThunk(
  'payment/completePayment',
  async (paymentNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/pt-payments/${paymentNumber}/completed`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 결제 내역 조회 Thunk
export const fetchPaymentHistory = createAsyncThunk(
  'payment/fetchPaymentHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/pt-payments');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
