import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunks/authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
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
        localStorage.removeItem("user"); // 로그아웃 시 로컬 스토리지에서 제거
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
        // 로컬 스토리지에 사용자 정보 저장
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = "failed"; // 상태 업데이트
      });
  },
});

export const selectAuthStatus = (state) => state.auth.status;
export const selectUserError = (state) => state.auth.error;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
