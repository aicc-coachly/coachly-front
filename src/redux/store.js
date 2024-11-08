import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import authReducer from "./slice/authSlice";
import chatReducer from "./slice/chatSlice";
import paymentReducer from "./slice/paymentSlice";
import refundReducer from "./slice/refundSlice";
import scheduleReducer from "./slice/scheduleSlice";
import trainerReducer from "./slice/trainerSlice";
import userReducer from "./slice/userSlice";

// persist 설정
const persistConfig = {
  key: "root",
  storage,
};

// 모든 리듀서를 합치고 persistConfig 적용
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  payment: paymentReducer,
  refund: refundReducer,
  schedule: scheduleReducer,
  trainer: trainerReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
