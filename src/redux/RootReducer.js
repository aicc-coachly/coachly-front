import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from './user/UserSlice';
import TrainerSlice from './trainer/TrainerSlice';
import PtScheduleSlice from './ptSchedule/PtScheduleSlice';
import PtPaymentSlice from './ptpayment/PtPaymentSlice';
import PaycheckSlice from './paycheck/PaycheckSlice';
import ChatRoomSlice from './chatRoom/ChatRoomSlice';
import RefundSlice from './refund/RefundSlice';

const RootReducer = combineReducers({
  users: UserSlice,
  trainers: TrainerSlice,
  ptSchedule: PtScheduleSlice,
  ptPayment: PtPaymentSlice,
  paycheck: PaycheckSlice,
  chatRoom: ChatRoomSlice,
  refund: RefundSlice,
});

export default RootReducer;
