// src/slices/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
// import otherReducer from './otherSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // 다른 슬라이스 추가
    // other: otherReducer,
  },
});

export default store;
