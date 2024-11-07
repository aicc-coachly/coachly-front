import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import chatReducer from "./slice/chatSlice";
import paymentReducer from "./slice/paymentSlice";
import refundReducer from "./slice/refundSlice";
import scheduleReducer from "./slice/scheduleSlice";
import trainerReducer from "./slice/trainerSlice";
import userReducer from "./slice/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    payment: paymentReducer,
    refund: refundReducer,
    schedule: scheduleReducer,
    trainer: trainerReducer,
    user: userReducer,
  },
});

export default store;
