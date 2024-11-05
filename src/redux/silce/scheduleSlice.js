import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  POST_PT_SCHEDULE_URL,
  COMPLETE_PT_SCHEDULE_URL,
  COMPLETE_PAYCHECK_URL,
  PATCH_PT_SCHEDULE_URL,
  DELETE_PT_SCHEDULE_URL,
} from "../../utils/scheduleApiUrl";
import {
  deleteRequest,
  patchRequest,
  postRequest,
} from "../../utils/requestMethod";

// PT 일정 등록
export const postPtSchedule = createAsyncThunk(
  "schedule/postPtSchedule",
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await postRequest(POST_PT_SCHEDULE_URL, {
        body: JSON.stringify(scheduleData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "PT 일정 등록 실패");
    }
  }
);

// PT 일정 완료
export const completePtSchedule = createAsyncThunk(
  "schedule/completePtSchedule",
  async (schedule_number, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        COMPLETE_PT_SCHEDULE_URL(schedule_number),
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "PT 일정 완료 처리 실패");
    }
  }
);

// 페이 체크 완료
export const completePaycheck = createAsyncThunk(
  "schedule/completePaycheck",
  async (paycheck_number, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        COMPLETE_PAYCHECK_URL(paycheck_number),
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "페이 체크 완료 처리 실패");
    }
  }
);

// PT 일정 수정
export const patchPtSchedule = createAsyncThunk(
  "schedule/patchPtSchedule",
  async ({ schedule_number, updateData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(
        PATCH_PT_SCHEDULE_URL(schedule_number),
        {
          body: JSON.stringify(updateData),
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "PT 일정 수정 실패");
    }
  }
);

// PT 일정 삭제
export const deletePtSchedule = createAsyncThunk(
  "schedule/deletePtSchedule",
  async (schedule_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(
        DELETE_PT_SCHEDULE_URL(schedule_number),
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "PT 일정 삭제 실패");
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    clearScheduleData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postPtSchedule.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(postPtSchedule.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(completePtSchedule.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(completePtSchedule.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(completePaycheck.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(completePaycheck.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(patchPtSchedule.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(patchPtSchedule.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deletePtSchedule.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deletePtSchedule.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearScheduleData } = scheduleSlice.actions;
export default scheduleSlice.reducer;
