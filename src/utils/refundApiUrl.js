const url = process.env.REACT_APP_API_URL; // 백엔드 서버 URL에 맞게 설정

// 환불 사유 생성
export const CREATE_REFUND_URL = () => `${url}/refund-reasons`;

// 모든 환불 사유 조회
export const GET_ALL_REFUNDS_URL = () => `${url}/refund-reasons`;

// 특정 환불 사유 조회
export const GET_REFUND_URL = (refund_number) =>
  `${url}/refund-reasons/${refund_number}`;

// 환불 사유 수정
export const UPDATE_REFUND_URL = (refund_number) =>
  `${url}/refund-reasons/${refund_number}`;

// 환불 사유 상태 변경 (삭제)
export const DELETE_REFUND_URL = (refund_number) =>
  `${url}/refund-reasons/${refund_number}`;
