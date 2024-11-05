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
    messages: [],
    loading: false,
    error: null,
    roomId: null,
    aiChatResponse: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 채팅방 내 메시지 조회
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 메시지 전송
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })

      // 메시지 삭제
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (msg) => msg.id !== action.payload
        );
      })

      // 채팅방 생성
      .addCase(createChatRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.roomId = action.payload.roomId; // 새로 생성된 채팅방 ID
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // AI 챗 요청
      .addCase(aiChatRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(aiChatRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.aiChatResponse = action.payload.response; // AI 챗 응답 저장
      })
      .addCase(aiChatRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 메시지 읽음 처리
      .addCase(readMessage.fulfilled, (state, action) => {
        const message = state.messages.find(
          (msg) => msg.id === action.payload.messageNumber
        );
        if (message) {
          message.read = true; // 메시지를 읽음으로 표시
        }
      })

      // 채팅방 비활성화
      .addCase(deleteChatRoom.fulfilled, (state) => {
        state.roomId = null;
        state.messages = []; // 채팅방 삭제 시 메시지 초기화
      });
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
