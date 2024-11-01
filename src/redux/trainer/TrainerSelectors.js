// 전체 트레이너 목록 선택자
export const SelectAllTrainers = (state) => state.trainers.trainerList;

// 특정 트레이너 상세 정보 선택자
export const SelectTrainerDetail = (state) => state.trainers.trainerDetail;

// PT 옵션 선택자
export const SelectPtOptions = (state) => state.trainers.ptOptions;

// 트레이너 주소 선택자
export const SelectTrainerAddress = (state) => state.trainers.address;

// 트레이너 계좌 선택자
export const SelectTrainerBankAccount = (state) => state.trainers.bankAccount;

// 트레이너 인증 상태 선택자
export const SelectAuthStatus = (state) => state.trainers.authStatus;

// 트레이너 상태 로딩 상태 선택자
export const SelectTrainerStatus = (state) => state.trainers.status;

// 트레이너 관련 오류 선택자
export const SelectTrainerError = (state) => state.trainers.error;
