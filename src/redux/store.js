import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./silce/authSlice";
import chatReducer from "./silce/chatSlice";
import paymentReducer from "./silce/paymentSlice";
import refundReducer from "./silce/refundSlice";
import scheduleReducer from "./silce/scheduleSlice";
import trainerReducer from "./silce/trainerSlice";
import userReducer from "./silce/userSlice";

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
