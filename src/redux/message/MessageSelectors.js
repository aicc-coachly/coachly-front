// 모든 메시지 목록 선택자
export const SelectAllMessages = (state) => state.message.messageList;

// 메시지 로딩 상태 선택자
export const SelectMessageStatus = (state) => state.message.status;

// 메시지 관련 오류 선택자
export const SelectMessageError = (state) => state.message;
