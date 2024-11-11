import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CREATE_PT_PAYMENT_URL,
  COMPLETE_PT_PAYMENT_URL,
  GET_PT_SCHEDULE_URL,
} from "../../utils/paymentApiUrl";
import {
  getRequest,
  postRequest,
  postRequestTwo,
} from "../../utils/requestMethod";

const url = "http://localhost:8000";
// PT 결제 생성
// PT 결제 생성
export const createPtPayment = createAsyncThunk(
  "payment/createPtPayment",
  async (
    { user_number, trainer_number, payment_option, amount_number },
    { rejectWithValue }
  ) => {
    try {
      const response = await postRequestTwo(CREATE_PT_PAYMENT_URL(), {
        body: {
          user_number,
          trainer_number,
          payment_option,
          amount_number,
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "결제 생성 실패");
    }
  }
);

// PT 결제 완료 처리
export const completePtPayment = createAsyncThunk(
  "payment/completePtPayment",
  async (
    { payment_number, paymentKey, orderId, amount, ptNumber },
    { rejectWithValue }
  ) => {
    try {
      const response = await postRequest(
        COMPLETE_PT_PAYMENT_URL(payment_number), // URL 파라미터로 payment_number 전달
        {
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount,
            ptNumber,
          }),
          headers: {
            "Content-Type": "application/json", // 헤더 설정
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "결제 완료 처리 실패");
    }
  }
);

export const getPtschedule = createAsyncThunk(
  "payment/getPtschedule",
  async ({ user_number, trainer_number }, { rejectWithValue }) => {
    try {
      // 로그인 상태에 따라 user_number 또는 trainer_number를 쿼리 파라미터로 전달
      const query = user_number
        ? `?user_number=${user_number}`
        : `?trainer_number=${trainer_number}`;
      const response = await getRequest(`${url}/pt-schedules${query}`, {});
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "PT 스케줄 조회 실패");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    clearPaymentData: (state) => {
      state.data = null;
    },
    logout: (state) => {
      state.data = null;
      state.error = null;
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
      })
      .addCase(getPtschedule.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getPtschedule.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearPaymentData, logout } = paymentSlice.actions;
export default paymentSlice.reducer;
