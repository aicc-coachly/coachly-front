// 대기 중인 정산 내역 선택자
export const SelectPendingPaychecks = (state) =>
  state.paycheck.pendingPaychecks;

// 완료된 정산 내역 선택자
export const SelectCompletedPaychecks = (state) =>
  state.paycheck.completedPaychecks;

// 정산 로딩 상태 선택자
export const SelectPaycheckStatus = (state) => state.paycheck.status;

// 정산 관련 오류 선택자
export const SelectPaycheckError = (state) => state.paycheck.error;
