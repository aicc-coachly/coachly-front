const url = process.env.REACT_APP_API_URL; // 백엔드 서버 URL에 맞게 설정

// 모든 트레이너 조회
export const GET_ALL_TRAINERS_URL = () => `${url}/trainers`;

// 특정 트레이너 조회
export const GET_TRAINER_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}`;

// 특정 트레이너의 PT 가격 정보 조회
export const GET_TRAINER_PT_COST_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/pt-cost-option`;

// 특정 트레이너의 헬스장 주소 조회
export const GET_TRAINER_GYM_ADDRESS_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/gym-address`;

// 특정 트레이너의 계좌 정보 조회
export const GET_TRAINER_ACCOUNT_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/account`;

// 트레이너 비활성화 상태 변경
export const UPDATE_TRAINER_STATUS_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/status`;

// 트레이너 소프트 삭제
export const DELETE_TRAINER_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}`;

// 트레이너 PT 가격 정보 소프트 삭제
export const DELETE_TRAINER_PT_COST_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/pt-cost-option`;

// 트레이너 헬스장 주소 소프트 삭제
export const DELETE_TRAINER_GYM_ADDRESS_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/gym-address`;

// 트레이너 계좌 정보 소프트 삭제
export const DELETE_TRAINER_ACCOUNT_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/account`;

// 트레이너 정보 업데이트
export const PATCH_TRAINER_INFO_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/info`;

// 트레이너 주소 업데이트
export const PATCH_TRAINER_GYM_ADDRESS_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/gym-address`;

// 트레이너 PT 가격 정보 업데이트
export const PATCH_TRAINER_PT_COST_URL = (trainer_number, data) =>
  `${url}/trainer/${trainer_number}/pt-cost-option`;

// 트레이너 계좌 정보 업데이트
export const PATCH_TRAINER_ACCOUNT_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/account`;

// 트레이너 이미지 정보 업데이트
export const PATCH_TRAINER_IMAGE_URL = (trainer_number) =>
  `${url}/trainer/${trainer_number}/image`;
