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
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
    },
    logoutTrainer: (state) => {
      state.trainer = null;
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
      })
      .addCase(loginTrainer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutUser, logoutTrainer } = authSlice.actions;
export default authSlice.reducer;
