import { createSlice } from '@reduxjs/toolkit';
import {
  fetchInbodyData,
  addInbodyData,
  updateInbodyData,
  deleteInbodyData,
} from '../thunks/inbodyThunks';

const inbodySlice = createSlice({
  name: 'inbody',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInbodyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInbodyData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInbodyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addInbodyData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateInbodyData.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteInbodyData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export default inbodySlice.reducer;
