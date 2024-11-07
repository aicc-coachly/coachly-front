import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  CREATE_PT_PAYMENT_URL,
  COMPLETE_PT_PAYMENT_URL,
} from '../../utils/paymentApiUrl';
import { postRequest } from '../../utils/requestMethod';

// PT 결제 생성
export const createPtPayment = createAsyncThunk(
  'payment/createPtPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      // 함수 호출로 URL 생성
      const response = await postRequest(CREATE_PT_PAYMENT_URL(), {
        body: JSON.stringify(paymentData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '결제 생성 실패');
    }
  }
);

// completePtPayment 함수 수정
export const completePtPayment = createAsyncThunk(
  'payment/completePtPayment',
  async (
    { payment_number, paymentKey, orderId, amount, ptNumber },
    { rejectWithValue }
  ) => {
    try {
      const response = await postRequest(
        COMPLETE_PT_PAYMENT_URL(payment_number), // URL 파라미터로 payment_number 전달
        { paymentKey, orderId, amount, ptNumber } // 요청 본문에 필요한 데이터 전달
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '결제 완료 처리 실패');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    clearPaymentData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPtPayment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createPtPayment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(completePtPayment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(completePtPayment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
