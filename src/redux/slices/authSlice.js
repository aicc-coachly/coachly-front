// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userType: null, // 'trainer', 'user', 또는 null
    isLoggedIn: false, // 로그인 여부 상태
  },
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
      state.isLoggedIn = true; // 로그인 시 isLoggedIn을 true로 설정
    },
    clearUserType: (state) => {
      state.userType = null;
      state.isLoggedIn = false; // 로그아웃 시 isLoggedIn을 false로 설정
    },
  },
});

export const { setUserType, clearUserType } = authSlice.actions;
export default authSlice.reducer;
