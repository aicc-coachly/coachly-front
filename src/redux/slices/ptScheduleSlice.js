import { createSlice } from "@reduxjs/toolkit";
import { fetchPtSchedules, updatePtSchedule } from "../thunks/ptScheduleThunks";

const ptScheduleSlice = createSlice({
  name: "ptSchedule",
  initialState: {
    schedules: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPtSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPtSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchPtSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePtSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePtSchedule.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.schedules.findIndex(
          (schedule) => schedule.id === action.payload.id
        );
        if (index !== -1) {
          state.schedules[index] = action.payload;
        }
      })
      .addCase(updatePtSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ptScheduleSlice.reducer;
