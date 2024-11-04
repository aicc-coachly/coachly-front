import { combineReducers } from 'redux';
import authSlice from './slices/authSlice';
import trainerSlice from './slices/trainerSlice';
import ptScheduleSlice from './slices/ptScheduleSlice';
import chatSlice from './slices/chatSlice';
import refundSlice from './slices/refundSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  trainer: trainerSlice,
  ptSchedule: ptScheduleSlice,
  chat: chatSlice,
  refund: refundSlice,
});

export default rootReducer;
