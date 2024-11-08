// src/redux/slices/chatSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchChatMessages,
  sendMessage,
  deleteMessage,
  createChatRoom,
  aiChatRequest,
  readMessage,
  deleteChatRoom,
} from '../thunks/chatThunks';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    data: null,
    messages: [],
    error: null,
  },
  reducers: {
    clearChatData: (state) => {
      state.data = null;
      state.messages = []; // 상태 초기화
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // 새로운 메시지 추가
    },
    setMessages: (state, action) => {
      state.messages = action.payload; // 메시지 배열 설정
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(msg => msg.messageNumber !== action.payload);
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(aiChatRequest.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(aiChatRequest.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        // 메시지 읽음 상태를 처리
        const index = state.messages.findIndex(msg => msg.messageNumber === action.payload.messageNumber);
        if (index !== -1) state.messages[index].read = true;
        state.error = null;
      })
      .addCase(readMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteChatRoom.fulfilled, (state, action) => {
        state.data = null;
        state.messages = [];
        state.error = null;
      })
      .addCase(deleteChatRoom.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearChatData, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
