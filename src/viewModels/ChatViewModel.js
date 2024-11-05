import {
  fetchChatMessages,
  sendMessage,
  deleteMessage,
  createChatRoom,
  aiChatRequest,
  readMessage,
  deleteChatRoom,
} from '../redux/thunks/chatThunks';
import store from '../redux/store';

class ChatViewModel {
  // 채팅방 내 메시지 조회
  static async fetchMessages(roomId) {
    try {
      const result = await store.dispatch(fetchChatMessages(roomId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 메시지 전송
  static async sendMessage(messageData) {
    try {
      const result = await store.dispatch(sendMessage(messageData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 메시지 삭제
  static async deleteMessage(messageNumber) {
    try {
      const result = await store.dispatch(deleteMessage(messageNumber));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 채팅방 생성
  static async createChatRoom(chatRoomData) {
    try {
      const result = await store.dispatch(createChatRoom(chatRoomData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // AI 챗 요청
  static async aiChatRequest(requestData) {
    try {
      const result = await store.dispatch(aiChatRequest(requestData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 메시지 읽음 처리
  static async readMessage(messageNumber) {
    try {
      const result = await store.dispatch(readMessage(messageNumber));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 채팅방 비활성화
  static async deleteChatRoom(roomId) {
    try {
      const result = await store.dispatch(deleteChatRoom(roomId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ChatViewModel;

