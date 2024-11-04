import { createSlice } from '@reduxjs/toolkit';
import { fetchRefunds, requestRefund } from '../thunks/refundThunks';

const refundSlice = createSlice({
  name: 'refund',
  initialState: {
    refunds: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRefunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds = action.payload;
      })
      .addCase(fetchRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(requestRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.refunds.push(action.payload);
      })
      .addCase(requestRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default refundSlice.reducer;
