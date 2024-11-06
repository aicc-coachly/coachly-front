import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CREATE_PT_PAYMENT_URL,
  COMPLETE_PT_PAYMENT_URL,
  GET_PT_SCHEDULE_URL,
} from "../../utils/paymentApiUrl";
import { getRequest, postRequest } from "../../utils/requestMethod";

// PT 결제 생성
export const createPtPayment = createAsyncThunk(
  "payment/createPtPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await postRequest(CREATE_PT_PAYMENT_URL, {
        body: JSON.stringify(paymentData),
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
  async (payment_number, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        COMPLETE_PT_PAYMENT_URL(payment_number),
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "결제 완료 처리 실패");
    }
  }
);

export const getPtschedule = createAsyncThunk(
  "payment/getPayment",
  async (pt_number, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_PT_SCHEDULE_URL(pt_number), {});
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "피티 스케쥴 조회 실패");
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

export const { clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
