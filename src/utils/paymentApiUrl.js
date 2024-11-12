const url = process.env.REACT_APP_API_URL; // 백엔드 서버 URL에 맞게 설정

// PT 결제 생성
export const CREATE_PT_PAYMENT_URL = () => `${url}/pt-payments`;

// PT 결제 완료 처리
export const COMPLETE_PT_PAYMENT_URL = (payment_number) =>
  `${url}/pt-payments/${payment_number}/completed`;

export const GET_PT_SCHEDULE_URL = ({ user_number, trainer_number }) => {
  const query = new URLSearchParams();

  if (user_number) {
    query.append("user_number", user_number);
  }
  if (trainer_number) {
    query.append("trainer_number", trainer_number);
  }

  return `${url}/pt-schedules?${query.toString()}`; // 쿼리 파라미터로 유저 또는 트레이너 넘버 추가
};
