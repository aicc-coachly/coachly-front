// src/redux/slices/chatSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChatMessages,
  sendMessage,
  deleteMessage,
  createChatRoom,
  aiChatRequest,
  readMessage,
  deleteChatRoom,
} from "../thunks/chatThunks";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    clearChatData: (state) => {
      state.data = null;
    },
    logout: (state) => {
      state.data = null;
      state.error = null;
    },
    logout: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(aiChatRequest.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (msg) => msg.messageNumber !== action.payload
        );
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
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        // 메시지 읽음 상태를 처리
        const index = state.messages.findIndex(
          (msg) => msg.messageNumber === action.payload.messageNumber
        );
        if (index !== -1) state.messages[index].read = true;
        state.error = null;
      })
      .addCase(readMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deactivateChatRoom.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deactivateChatRoom.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearChatData, logout, addMessage, setMessages } =
  chatSlice.actions;

export default chatSlice.reducer;
