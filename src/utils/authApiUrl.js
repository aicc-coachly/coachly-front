const url = process.env.REACT_APP_API_URL; // 백엔드 서버 URL에 맞게 설정

// 트레이너 회원가입
export const TRAINER_SIGNUP_URL = `${url}/trainer/signup`;

// 트레이너 로그인
export const TRAINER_LOGIN_URL = `${url}/trainer/login`;

// 사용자 회원가입
export const USER_SIGNUP_URL = `${url}/user/signup`;
// 사용자 로그인
export const USER_LOGIN_URL = `${url}/user/login`;
