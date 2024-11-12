import { createSlice } from '@reduxjs/toolkit';
import {
  fetchChatMessages,
  sendMessage,
  deleteMessage,
  createChatRoom,
  aiChatRequest,
  readMessage,
  deleteChatRoom,
  fetchChatRooms, // 추가된 fetchChatRooms
} from '../thunks/chatThunks';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    data: null,
    messages: [],
    chatRooms: [], // 채팅방 리스트를 저장할 배열 추가
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
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.chatRooms = action.payload; // 채팅방 리스트 설정
        state.error = null;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Selector for chat rooms
export const selectChatRooms = (state) => state.chat.chatRooms;

export const { clearChatData, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
