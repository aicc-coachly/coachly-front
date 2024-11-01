// 모든 PT 수업 목록 선택자
export const SelectAllPtSchedules = (state) => state.ptSchedule.ptScheduleList;

// PT 수업 상태 로딩 상태 선택자
export const SelectPtScheduleStatus = (state) => state.ptSchedule.status;

// PT 수업 관련 오류 선택자
export const SelectPtScheduleError = (state) => state.ptSchedule.error;
