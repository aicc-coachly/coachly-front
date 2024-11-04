import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from './user/UserSlice';
import TrainerSlice from './trainer/TrainerSlice';
import PtScheduleSlice from './ptSchedule/PtScheduleSlice';
import PtPaymentSlice from './ptpayment/PtPaymentSlice';
import PaycheckSlice from './paycheck/PaycheckSlice';
import ChatRoomSlice from './chatRoom/ChatRoomSlice';
import RefundSlice from './refund/RefundSlice';
import PtRecordSlice from './ptrecord/PtRecordSlice';

const RootReducer = combineReducers({
  users: UserSlice,
  trainers: TrainerSlice,
  ptSchedule: PtScheduleSlice,
  ptPayment: PtPaymentSlice,
  paycheck: PaycheckSlice,
  chatRoom: ChatRoomSlice,
  refund: RefundSlice,
  ptrecord: PtRecordSlice,
});

export default RootReducer;
