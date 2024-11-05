const url = process.env.REACT_APP_API_URL; // 백엔드 서버 URL에 맞게 설정

// 모든 사용자 조회
export const GET_ALL_USER_URL = () => `${url}/users`;

// 인바디 정보 저장
export const POST_INBODY_URL = (user_id) => `${url}/inbody/${user_id}`;

// 특정 사용자 페이지 정보 조회
export const GET_USER_URL = (user_id) => `${url}/page/${user_id}`;

// 특정 사용자의 인바디 정보 조회
export const GET_USER_INBODY_URL = (user_id) => `${url}/inbody/${user_id}`;

// 사용자 소프트 삭제
export const DELETE_USER_URL = (user_number) => `${url}/${user_number}`;

// 사용자 인바디 정보 소프트 삭제
export const DELETE_USER_INBODY_URL = (user_number) =>
  `${url}/inbody/${user_number}`;

// 사용자 주소 소프트 삭제
export const DELETE_USER_ADDRESS_URL = (user_number) =>
  `${url}/address/${user_number}`;

// 사용자 기본 정보 업데이트
export const PATCH_USER_INFO_URL = (user_number) =>
  `${url}/user/${user_number}/info`;

// 사용자 주소 정보 업데이트
export const PATCH_USER_ADDRESS_URL = (user_number) =>
  `${url}/user/${user_number}/address`;

// 사용자 인바디 정보 업데이트
export const PATCH_USER_INBODY_URL = (user_number) =>
  `${url}/user/${user_number}/inbody`;
