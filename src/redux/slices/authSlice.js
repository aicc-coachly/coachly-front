// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userType: null,
  },
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    // 추가적인 리듀서가 있다면 여기에 정의합니다.
  },
});

// 액션과 리듀서를 내보냅니다.
export const { setUserType } = authSlice.actions;
export default authSlice.reducer;
