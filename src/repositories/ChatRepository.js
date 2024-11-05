import axios from 'axios';

const ChatRepository = {
  // 채팅방 내 메시지 조회
  getMessages: (roomId) => axios.get(`/chat-room/${roomId}/messages`),

  // 메시지 전송
  sendMessage: (messageData) =>
    axios.post(`/chat-room/${messageData.room_id}/messages`, messageData),

  // 메시지 삭제
  deleteMessage: (messageNumber) => axios.delete(`/messages/${messageNumber}`),

  // 채팅방 생성
  createChatRoom: (chatRoomData) => axios.post(`/chat-room`, chatRoomData),

  // AI 챗 요청
  aiChatRequest: (requestData) => axios.post(`/aichat`, requestData),

  // 메시지 읽음 처리
  readMessage: (messageNumber) =>
    axios.patch(`/messages/${messageNumber}/read`),

  // 채팅방 비활성화
  deleteChatRoom: (roomId) => axios.delete(`/chat-room/${roomId}`),
};

export default ChatRepository;
