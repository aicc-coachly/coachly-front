import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 메시지 전송
export const SendMessage = createAsyncThunk(
  'message/send',
  async ({ roomId, messageData }) => {
    const response = await axios.post(
      `/chat-rooms/${roomId}/chat-message`,
      messageData
    );
    return response.data;
  }
);

// AI 메시지 전송
export const SendAiMessage = createAsyncThunk(
  'message/sendAi',
  async ({ userNumber, messageData }) => {
    const response = await axios.post(
      `/users/${userNumber}/chat-rooms/ai/chat-message`,
      messageData
    );
    return response.data;
  }
);

// 모든 메시지 조회
export const FetchMessages = createAsyncThunk('message/fetchAll', async () => {
  const response = await axios.get('/chat-message');
  return response.data.messages;
});
