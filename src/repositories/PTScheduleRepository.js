import axios from 'axios';

const PTScheduleRepository = {
  // PT 일정 생성
  createSchedule: (scheduleData) => axios.post('/pt-schedules', scheduleData),

  // PT 일정 완료 처리
  completeSchedule: (scheduleNumber) =>
    axios.post(`/pt-schedules/${scheduleNumber}/completed`),

  // 페이 체크 완료 처리
  completePaycheck: (paycheckNumber) =>
    axios.post(`/paychecks/${paycheckNumber}/completed`),

  // PT 일정 수정
  updateSchedule: (scheduleNumber, scheduleData) =>
    axios.patch(`/pt-schedules/${scheduleNumber}`, scheduleData),

  // PT 일정 삭제
  deleteSchedule: (scheduleNumber) =>
    axios.delete(`/pt-schedules/${scheduleNumber}`),
};

export default PTScheduleRepository;
