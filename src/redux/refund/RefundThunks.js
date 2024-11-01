import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 환불 요청 생성
export const CreateRefundRequest = createAsyncThunk(
  'refund/create',
  async (refundData) => {
    const response = await axios.post('/refound-reasons', refundData);
    return response.data;
  }
);

// 모든 환불 요청 조회
export const FetchAllRefundRequests = createAsyncThunk(
  'refund/fetchAll',
  async () => {
    const response = await axios.get('/refound-reasons');
    return response.data;
  }
);

// 특정 환불 요청 조회
export const FetchRefundRequestById = createAsyncThunk(
  'refund/fetchById',
  async (refundNumber) => {
    const response = await axios.get(`/refound-reasons/${refundNumber}`);
    return response.data;
  }
);

// 환불 요청 수정
export const UpdateRefundRequest = createAsyncThunk(
  'refund/update',
  async ({ refundNumber, updatedData }) => {
    const response = await axios.patch(
      `/refund-reasons/${refundNumber}`,
      updatedData
    );
    return response.data;
  }
);

// 환불 요청 삭제
export const DeleteRefundRequest = createAsyncThunk(
  'refund/delete',
  async (refundNumber) => {
    await axios.delete(`/refund-reasons/${refundNumber}`);
    return refundNumber;
  }
);
