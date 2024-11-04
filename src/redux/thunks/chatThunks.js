import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatRepository from '../../repositories/ChatRepository';

export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async (chatId, { rejectWithValue }) => {
    try {
      const response = await ChatRepository.getMessages(chatId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await ChatRepository.sendMessage(messageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageId, { rejectWithValue }) => {
    try {
      await ChatRepository.deleteMessage(messageId);
      return messageId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
