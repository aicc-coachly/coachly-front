// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {loginUser, registerUser} from '../thunks/authThunks'
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    userType: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
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
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // 로컬스토리지에 user 저장
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "pending"; // 상태 업데이트
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.status = "success"; // 상태 업데이트
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "failed"; // 상태 업데이트
      });
  },
});

export const { setUserType } = authSlice.actions;
export default authSlice.reducer;