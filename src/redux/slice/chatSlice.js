import { createSlice } from '@reduxjs/toolkit';
import {
  sendMessage,
  createChatRoom,
  fetchChatMessages,
  fetchChatRooms,
  fetchChatRoom, // 특정 채팅방 조회 액션 추가
  leaveChatRoom,
} from '../thunks/chatThunks';

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    data: null,
    messages: [],
    chatRooms: [],
    error: null,
    loading: false, // 로딩 상태 추가
    aiLoading: false, // AI 채팅 로딩 상태
    aiMessages: [], // AI 채팅 메시지
  },
  reducers: {
    clearChatData: (state) => {
      state.data = null;
      state.messages = [];
      state.chatRooms = []; // 전체 초기화
      state.error = null;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    logout: (state) => {
      state.data = null;
      state.messages = [];
      state.chatRooms = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(createChatRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.chatRooms = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchChatRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatRoom.fulfilled, (state, action) => {
        state.data = action.payload; // 특정 채팅방 정보 저장
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchChatRoom.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(leaveChatRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveChatRoom.fulfilled, (state) => {
        state.loading = false;
        state.messages = []; // 메시지 초기화 또는 다른 처리
      })
      .addCase(leaveChatRoom.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

// Selectors
export const selectChatRooms = (state) => state.chat.chatRooms;
export const selectMessages = (state) => state.chat.messages;
export const selectLoading = (state) => state.chat.loading;

export const { clearChatData, addMessage, setMessages, logout } = chatSlice.actions;
export default chatSlice.reducer;
