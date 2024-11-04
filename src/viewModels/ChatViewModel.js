import {
  fetchChatMessages,
  sendMessage,
  deleteMessage,
} from '../redux/thunks/chatThunks';
import store from '../redux/store';

class ChatViewModel {
  static async fetchMessages(chatId) {
    try {
      const result = await store.dispatch(fetchChatMessages(chatId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async sendMessage(messageData) {
    try {
      const result = await store.dispatch(sendMessage(messageData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteMessage(messageId) {
    try {
      const result = await store.dispatch(deleteMessage(messageId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default ChatViewModel;
