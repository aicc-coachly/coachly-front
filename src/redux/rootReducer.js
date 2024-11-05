import { combineReducers } from 'redux';
import authSlice from './slices/authSlice';
import trainerSlice from './slices/trainerSlice';
import ptScheduleSlice from './slices/ptScheduleSlice';
import chatSlice from './slices/chatSlice';
import refundSlice from './slices/refundSlice';
import paymentSlice from './slices/paymentSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  trainer: trainerSlice,
  ptSchedule: ptScheduleSlice,
  chat: chatSlice,
  refund: refundSlice,
  payment: paymentSlice,
  user: userSlice,
});

export default rootReducer;
