// 모든 PT 일정 선택자
export const SelectAllPtRecords = (state) => state.ptRecord.ptRecordList;

// PT 일정 로딩 상태 선택자
export const SelectPtRecordStatus = (state) => state.ptRecord.status;

// PT 일정 관련 오류 선택자
export const SelectPtRecordError = (state) => state.ptRecord.error;
