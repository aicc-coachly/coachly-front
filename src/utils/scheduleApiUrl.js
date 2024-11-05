const url = process.env.REACT_APP_API_URL; // 백엔드 서버 URL에 맞게 설정

// PT 일정 등록
export const POST_PT_SCHEDULE_URL = () => `${url}/pt-schedules`;

// PT 일정 완료
export const COMPLETE_PT_SCHEDULE_URL = (schedule_number) =>
  `${url}/pt-schedules/${schedule_number}/completed`;

// 페이 체크 완료
export const COMPLETE_PAYCHECK_URL = (paycheck_number) =>
  `${url}/paychecks/${paycheck_number}/completed`;

// PT 일정 수정
export const PATCH_PT_SCHEDULE_URL = (schedule_number) =>
  `${url}/pt-schedules/${schedule_number}`;

// PT 일정 삭제
export const DELETE_PT_SCHEDULE_URL = (schedule_number) =>
  `${url}/pt-schedules/${schedule_number}`;
