const url = process.env.REACT_APP_API_URL; // 백엔드 서버 URL에 맞게 설정

// 채팅방 생성
export const CREATE_CHAT_ROOM_URL = `${url}/chat-room`;

// 채팅방 조회
export const GET_CHAT_ROOM_URL = (userNumber, trainerNumber) =>
  `${url}/chat-room?userNumber=${userNumber}&trainerNumber=${trainerNumber}`;

// 채팅방 리스트 조회 
export const GET_CHAT_ROOMS_URL = (userNumber, trainerNumber) => {
  if (userNumber) {
    return `${url}/chat-rooms?userNumber=${userNumber}`;
  } else if (trainerNumber) {
    return `${url}/chat-rooms?trainerNumber=${trainerNumber}`;
  } else {
    throw new Error('userNumber 또는 trainerNumber 중 하나는 제공되어야 합니다.');
  }
}

// 메시지 전송
export const SEND_MESSAGE_URL = (room_id) =>
  `${url}/chat-room/${room_id}/messages`;

// 메시지 조회
export const GET_MESSAGES_URL = (room_id) =>
  `${url}/chat-room/${room_id}/messages`;

// 채팅방 화면에서 나가기 
export const LEAVE_CHAT_ROOM_URL = (room_id) =>
  `${url}/chat-room/${room_id}/leave`;

// // AI 채팅 요청
// export const AI_CHAT_REQUEST_URL = `${url}/aichat`;

// // 메시지 읽음 처리
// export const READ_MESSAGE_URL = (message_number) =>
//   `${url}/messages/${message_number}/read`;

// // 메시지 삭제
// export const DELETE_MESSAGE_URL = (message_number) =>
//   `${url}/messages/${message_number}`;

// // 채팅방 비활성화
// export const DEACTIVATE_CHAT_ROOM_URL = (room_id) =>
//   `${url}/chat-room/${room_id}`;
