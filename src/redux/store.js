// redux/store.js
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
import createTransform from "redux-persist/es/createTransform";

// persistTransform 설정
const persistTransform = createTransform(
  // 각 슬라이스의 특정 필드만 유지
  (inboundState, key) => {
    switch (key) {
      case "auth":
        return {
          user_number: inboundState?.user?.user_number,
          trainer_number: inboundState?.trainer?.trainer_number,
          userType: inboundState?.userType, // 유저 타입 유지
        };
      case "payment":
        return {
          data: Array.isArray(inboundState?.data)
            ? inboundState.data.map((payment) => ({
                pt_number: payment.pt_number,
                trainer_number: payment.trainer_number,
                user_number: payment.user_number,
                amount_number: payment.amount_number,
                status: payment.status,
              }))
            : [], // data가 배열이 아니면 빈 배열로 설정
        };
      case "schedule":
        return {
          pt_number: inboundState?.data?.pt_schedule?.pt_number,
          schedule_records: inboundState?.data?.schedule_records?.map(
            (record) => ({
              schedule_number: record.schedule_number,
              status: record.status,
            })
          ),
        };
      case "user":
        return {
          user_number: inboundState?.userInfo?.user_number,
          name: inboundState?.userInfo?.name,
        };
      case "trainer":
        return {
          trainer_number: inboundState?.data?.trainer_number,
          name: inboundState?.data?.name,
        };
      default:
        return inboundState;
    }
  },
  (outboundState) => outboundState,
  { whitelist: ["auth", "payment", "schedule", "user", "trainer"] }
);

// persist 설정
const persistConfig = {
  key: "root",
  storage,
  transforms: [persistTransform],
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
