import { createAsyncThunk } from '@reduxjs/toolkit';
import PaymentRepository from '../../repositories/PaymentRepository';

export const fetchPaymentHistory = createAsyncThunk(
  'payment/fetchPaymentHistory',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await PaymentRepository.getPaymentHistory(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const initiatePayment = createAsyncThunk(
  'payment/initiatePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await PaymentRepository.initiatePayment(paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelPayment = createAsyncThunk(
  'payment/cancelPayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      await PaymentRepository.cancelPayment(paymentId);
      return paymentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
