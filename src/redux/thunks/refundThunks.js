import { createAsyncThunk } from '@reduxjs/toolkit';
import RefundRepository from '../../repositories/RefundRepository';

export const fetchRefunds = createAsyncThunk(
  'refund/fetchRefunds',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await RefundRepository.getRefunds(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const requestRefund = createAsyncThunk(
  'refund/requestRefund',
  async (refundData, { rejectWithValue }) => {
    try {
      const response = await RefundRepository.requestRefund(refundData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
