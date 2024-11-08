const url = process.env.REACT_APP_API_URL; // 백엔드 서버 URL에 맞게 설정

// PT 결제 생성
export const CREATE_PT_PAYMENT_URL = () => `${url}/pt-payments`;

// PT 결제 완료 처리
export const COMPLETE_PT_PAYMENT_URL = (payment_number) =>
  `${url}/pt-payments/${payment_number}/completed`;

export const GET_PT_SCHEDULE_URL = (pt_number) =>
  `${url}/pt-payments/${pt_number}`;
