// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  registerUser,
  loginTrainer,
  registerTrainer,
} from '../thunks/authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    trainer: null,
    userType: null, // 'user' 또는 'trainer'로 로그인된 타입을 저장
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.userType = null;
      state.error = null;
    },
    logoutTrainer: (state) => {
      state.trainer = null;
      state.userType = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 사용자 회원가입
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 사용자 로그인
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userType = 'user'; // 로그인 성공 시 userType을 'user'로 설정
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 회원가입
      .addCase(registerTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.trainer = action.payload;
      })
      .addCase(registerTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 트레이너 로그인
      .addCase(loginTrainer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTrainer.fulfilled, (state, action) => {
        state.loading = false;
        state.trainer = action.payload;
        state.userType = 'trainer'; // 로그인 성공 시 userType을 'trainer'로 설정
      })
      .addCase(loginTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutUser, logoutTrainer } = authSlice.actions;
export default authSlice.reducer;
