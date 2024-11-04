import axios from 'axios';

const ChatRepository = {
  getMessages: (chatId) => axios.get(`/api/chats/${chatId}/messages`),
  sendMessage: (messageData) =>
    axios.post(`/api/chats/${messageData.chatId}/messages`, messageData),
  deleteMessage: (messageId) =>
    axios.delete(`/api/chats/messages/${messageId}`),
};

export default ChatRepository;
