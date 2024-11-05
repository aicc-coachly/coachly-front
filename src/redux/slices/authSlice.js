// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {loginUser} from '../thunks/authThunks'
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userType: null,
    error: null,
    loading: false,
  },
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // 서버에서 반환된 유저 정보
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '로그인에 실패했습니다.';
      });
  },
});

export const { setUserType } = authSlice.actions;
export default authSlice.reducer;