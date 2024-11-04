import { createSlice } from '@reduxjs/toolkit';
import { fetchTrainerProfile, updateTrainerProfile } from '../thunks/trainerThunks';

const trainerSlice = createSlice({
  name: 'trainer',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchTrainerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateTrainerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrainerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateTrainerProfile.rejected, (state, action) => {
        state.loading = false;
        st
