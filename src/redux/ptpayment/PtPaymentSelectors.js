// 모든 PT 결제 내역 선택자
export const SelectAllPtPayments = (state) => state.ptPayment.paymentList;

// PT 결제 로딩 상태 선택자
export const SelectPtPaymentStatus = (state) => state.ptPayment.status;

// PT 결제 관련 오류 선택자
export const SelectPtPaymentError = (state) => state.ptPayment.error;
