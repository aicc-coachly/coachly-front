import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatRepository from '../../repositories/ChatRepository';

// 채팅방 내 메시지 조회
export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await ChatRepository.getMessages(roomId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 메시지 전송
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await ChatRepository.sendMessage(messageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 메시지 삭제
export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageNumber, { rejectWithValue }) => {
    try {
      await ChatRepository.deleteMessage(messageNumber);
      return messageNumber;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 채팅방 생성
export const createChatRoom = createAsyncThunk(
  'chat/createChatRoom',
  async (chatRoomData, { rejectWithValue }) => {
    try {
      const response = await ChatRepository.createChatRoom(chatRoomData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// AI 챗 요청
export const aiChatRequest = createAsyncThunk(
  'chat/aiChatRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await ChatRepository.aiChatRequest(requestData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 메시지 읽음 처리
export const readMessage = createAsyncThunk(
  'chat/readMessage',
  async (messageNumber, { rejectWithValue }) => {
    try {
      const response = await ChatRepository.readMessage(messageNumber);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 채팅방 비활성화
export const deleteChatRoom = createAsyncThunk(
  'chat/deleteChatRoom',
  async (roomId, { rejectWithValue }) => {
    try {
      await ChatRepository.deleteChatRoom(roomId);
      return roomId;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
