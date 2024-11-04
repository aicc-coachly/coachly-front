import { createAsyncThunk } from '@reduxjs/toolkit';
import RefundRepository from '../../repositories/RefundRepository';

// 모든 환불 사유 조회
export const fetchAllRefunds = createAsyncThunk(
  'refund/fetchAllRefunds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await RefundRepository.getAllRefunds();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 특정 환불 사유 조회
export const fetchRefund = createAsyncThunk(
  'refund/fetchRefund',
  async (refundNumber, { rejectWithValue }) => {
    try {
      const response = await RefundRepository.getRefund(refundNumber);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 환불 사유 생성
export const createRefund = createAsyncThunk(
  'refund/createRefund',
  async (refundData, { rejectWithValue }) => {
    try {
      const response = await RefundRepository.createRefund(refundData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 환불 사유 수정
export const updateRefund = createAsyncThunk(
  'refund/updateRefund',
  async ({ refundNumber, refundData }, { rejectWithValue }) => {
    try {
      const response = await RefundRepository.updateRefund(
        refundNumber,
        refundData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 환불 사유 삭제
export const deleteRefund = createAsyncThunk(
  'refund/deleteRefund',
  async (refundNumber, { rejectWithValue }) => {
    try {
      const response = await RefundRepository.deleteRefund(refundNumber);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
