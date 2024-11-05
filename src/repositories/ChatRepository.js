import axios from "axios";

const url = process.env.REACT_APP_API_URL;

const ChatRepository = {
  getMessages: (chatId) =>
    axios.get(`${url}/chat-room/:room_id/messages`, chatId),
  sendMessage: (messageData) =>
    axios.post(`${url}/chat-room/:room_id/messages`, messageData),
  deleteMessage: (messageId) =>
    axios.delete(`${url}/messages/:mesasge_number`, messageId),
};

export default ChatRepository;
