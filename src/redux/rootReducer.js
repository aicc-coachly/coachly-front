import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import chatSlice from "./slices/chatSlice";
import inbodySlice from "./slices/inbodySlice";
import paymentSlice from "./slices/paymentSlice";
import ptScheduleSlice from "./slices/ptScheduleSlice";
import refundSlice from "./slices/refundSlice";
import trainerSlice from "./slices/trainerSlice";
import userSlice from "./slices/userSlice";

const RootReducer = combineReducers({
  auth: authSlice,
  chat: chatSlice,
  inbody: inbodySlice,
  ptPayment: paymentSlice,
  ptSchedule: ptScheduleSlice,
  refund: refundSlice,
  trainers: trainerSlice,
  users: userSlice,
});

export default RootReducer;
