import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_ALL_TRAINERS_URL,
  GET_TRAINER_URL,
  GET_TRAINER_PT_COST_URL,
  GET_TRAINER_GYM_ADDRESS_URL,
  GET_TRAINER_ACCOUNT_URL,
  DELETE_TRAINER_URL,
  DELETE_TRAINER_PT_COST_URL,
  DELETE_TRAINER_GYM_ADDRESS_URL,
  DELETE_TRAINER_ACCOUNT_URL,
  PATCH_TRAINER_INFO_URL,
  PATCH_TRAINER_GYM_ADDRESS_URL,
  PATCH_TRAINER_PT_COST_URL,
  PATCH_TRAINER_ACCOUNT_URL,
} from "../../utils/trainerApiUrl";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../utils/requestMethod";

// 모든 트레이너 조회
export const getAllTrainers = createAsyncThunk(
  "trainer/getAllTrainers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_ALL_TRAINERS_URL);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "트레이너 조회 실패");
    }
  }
);

// 특정 트레이너 조회
export const getTrainer = createAsyncThunk(
  "trainer/getTrainer",
  async (trainer_number, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_TRAINER_URL(trainer_number));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "트레이너 조회 실패");
    }
  }
);

// 특정 트레이너의 PT 가격 정보 조회
export const getTrainerPtCost = createAsyncThunk(
  "trainer/getTrainerPtCost",
  async (trainer_number, { rejectWithValue }) => {
    try {
      const response = await getRequest(
        GET_TRAINER_PT_COST_URL(trainer_number)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "PT 가격 정보 조회 실패");
    }
  }
);

// 특정 트레이너의 헬스장 주소 조회
export const getTrainerGymAddress = createAsyncThunk(
  "trainer/getTrainerGymAddress",
  async (trainer_number, { rejectWithValue }) => {
    try {
      const response = await getRequest(
        GET_TRAINER_GYM_ADDRESS_URL(trainer_number)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "헬스장 주소 조회 실패");
    }
  }
);

// 특정 트레이너의 계좌 정보 조회
export const getTrainerAccount = createAsyncThunk(
  "trainer/getTrainerAccount",
  async (trainer_number, { rejectWithValue }) => {
    try {
      const response = await getRequest(
        GET_TRAINER_ACCOUNT_URL(trainer_number)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "계좌 정보 조회 실패");
    }
  }
);

// 트레이너 소프트 삭제
export const deleteTrainer = createAsyncThunk(
  "trainer/deleteTrainer",
  async (trainer_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(DELETE_TRAINER_URL(trainer_number));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "트레이너 삭제 실패");
    }
  }
);

// 트레이너 PT 가격 정보 소프트 삭제
export const deleteTrainerPtCost = createAsyncThunk(
  "trainer/deleteTrainerPtCost",
  async (trainer_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(
        DELETE_TRAINER_PT_COST_URL(trainer_number)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "PT 가격 정보 삭제 실패");
    }
  }
);

// 트레이너 헬스장 주소 소프트 삭제
export const deleteTrainerGymAddress = createAsyncThunk(
  "trainer/deleteTrainerGymAddress",
  async (trainer_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(
        DELETE_TRAINER_GYM_ADDRESS_URL(trainer_number)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "헬스장 주소 삭제 실패");
    }
  }
);

// 트레이너 계좌 정보 소프트 삭제
export const deleteTrainerAccount = createAsyncThunk(
  "trainer/deleteTrainerAccount",
  async (trainer_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(
        DELETE_TRAINER_ACCOUNT_URL(trainer_number)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "계좌 정보 삭제 실패");
    }
  }
);

// 트레이너 정보 업데이트
export const updateTrainerInfo = createAsyncThunk(
  "trainer/updateTrainerInfo",
  async ({ trainer_number, updateData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(
        PATCH_TRAINER_INFO_URL(trainer_number),
        {
          body: JSON.stringify(updateData),
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "트레이너 정보 업데이트 실패");
    }
  }
);

// 트레이너 헬스장 주소 업데이트
export const updateTrainerGymAddress = createAsyncThunk(
  "trainer/updateTrainerGymAddress",
  async ({ trainer_number, updateData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(
        PATCH_TRAINER_GYM_ADDRESS_URL(trainer_number),
        {
          body: JSON.stringify(updateData),
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "헬스장 주소 업데이트 실패");
    }
  }
);

// 트레이너 PT 가격 정보 업데이트
export const updateTrainerPtCost = createAsyncThunk(
  "trainer/updateTrainerPtCost",
  async ({ trainer_number, updateData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(
        PATCH_TRAINER_PT_COST_URL(trainer_number),
        {
          body: JSON.stringify(updateData),
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "PT 가격 정보 업데이트 실패");
    }
  }
);

// 트레이너 계좌 정보 업데이트
export const updateTrainerAccount = createAsyncThunk(
  "trainer/updateTrainerAccount",
  async ({ trainer_number, updateData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(
        PATCH_TRAINER_ACCOUNT_URL(trainer_number),
        {
          body: JSON.stringify(updateData),
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "계좌 정보 업데이트 실패");
    }
  }
);

const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    clearTrainerData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrainers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getAllTrainers.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getTrainer.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getTrainer.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getTrainerPtCost.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getTrainerPtCost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getTrainerGymAddress.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getTrainerGymAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getTrainerAccount.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getTrainerAccount.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteTrainer.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTrainerPtCost.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteTrainerPtCost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTrainerGymAddress.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteTrainerGymAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTrainerAccount.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteTrainerAccount.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTrainerInfo.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateTrainerInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTrainerGymAddress.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateTrainerGymAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTrainerPtCost.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateTrainerPtCost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTrainerAccount.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateTrainerAccount.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearTrainerData } = trainerSlice.actions;
export default trainerSlice.reducer;
