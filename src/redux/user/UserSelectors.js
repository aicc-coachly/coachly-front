// 전체 사용자 목록 선택자
export const SelectAllUsers = (state) => state.users.userList;

// 특정 사용자 상세 정보 선택자
export const SelectUserDetail = (state) => state.users.userDetail;

// 사용자 인증 상태 선택자
export const SelectAuthStatus = (state) => state.users.authStatus;

// 인바디 저장 상태 선택자
export const SelectInbodyStatus = (state) => state.users.inbodyStatus;

// 주소 저장 상태 선택자
export const SelectAddressStatus = (state) => state.users.addressStatus;

// 사용자 상태 로딩 상태 선택자
export const SelectUserStatus = (state) => state.users.status;

// 사용자 관련 오류 선택자
export const SelectUserError = (state) => state.users.error;
