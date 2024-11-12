import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CREATE_REFUND_URL,
  GET_ALL_REFUNDS_URL,
  GET_REFUND_URL,
  UPDATE_REFUND_URL,
  DELETE_REFUND_URL,
} from "../../utils/refundApiUrl";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../utils/requestMethod";

// 환불 사유 생성
export const createRefund = createAsyncThunk(
  "refund/createRefund",
  async (refundData, { rejectWithValue }) => {
    try {
      const response = await postRequest(CREATE_REFUND_URL, {
        body: JSON.stringify(refundData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "환불 사유 생성 실패");
    }
  }
);

// 모든 환불 사유 조회
export const getAllRefunds = createAsyncThunk(
  "refund/getAllRefunds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_ALL_REFUNDS_URL);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "환불 사유 조회 실패");
    }
  }
);

// 특정 환불 사유 조회
export const getRefund = createAsyncThunk(
  "refund/getRefund",
  async (refund_number, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_REFUND_URL(refund_number));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "환불 사유 조회 실패");
    }
  }
);

// 환불 사유 수정
export const updateRefund = createAsyncThunk(
  "refund/updateRefund",
  async ({ refund_number, updateData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(UPDATE_REFUND_URL(refund_number), {
        body: JSON.stringify(updateData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "환불 사유 수정 실패");
    }
  }
);

// 환불 사유 삭제
export const deleteRefund = createAsyncThunk(
  "refund/deleteRefund",
  async (refund_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(DELETE_REFUND_URL(refund_number));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "환불 사유 삭제 실패");
    }
  }
);

const refundSlice = createSlice({
  name: "refund",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    clearRefundData: (state) => {
      state.data = null;
    },
    logout: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRefund.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createRefund.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getAllRefunds.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllRefunds.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getRefund.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getRefund.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateRefund.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateRefund.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteRefund.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteRefund.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearRefundData, logout } = refundSlice.actions;
export default refundSlice.reducer;
