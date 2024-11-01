import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 채팅방 생성
export const CreateChatRoom = createAsyncThunk(
  'chatRoom/create',
  async (chatRoomData) => {
    const response = await axios.post('/chat-room', chatRoomData);
    return response.data;
  }
);

// AI 채팅방 생성
export const CreateAiChatRoom = createAsyncThunk(
  'chatRoom/createAi',
  async (userNumber) => {
    const response = await axios.post(`/chat-room/ai`, {
      user_number: userNumber,
    });
    return response.data;
  }
);

// 특정 채팅방 조회
export const FetchChatRoomById = createAsyncThunk(
  'chatRoom/fetchById',
  async (roomId) => {
    const response = await axios.get(`/chat-room/${roomId}`);
    return response.data;
  }
);

// 채팅방 삭제
export const DeleteChatRoom = createAsyncThunk(
  'chatRoom/delete',
  async (roomId) => {
    await axios.delete(`/chat-room/${roomId}`);
    return roomId;
  }
);
