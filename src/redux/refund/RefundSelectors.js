// 모든 환불 요청 목록 선택자
export const SelectAllRefundRequests = (state) => state.refund.refundList;

// 특정 환불 요청 상세 정보 선택자
export const SelectRefundDetail = (state) => state.refund.refundDetail;

// 환불 요청 로딩 상태 선택자
export const SelectRefundStatus = (state) => state.refund.status;

// 환불 관련 오류 선택자
export const SelectRefundError = (state) => state.refund.error;
