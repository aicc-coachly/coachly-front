import { createSlice } from '@reduxjs/toolkit';
import {
  sendMessage,
  createChatRoom,
  fetchChatMessages,
  fetchChatRooms,
  // deleteMessage,
  // deleteChatRoom,
  // aiChatRequest,
  // readMessage,
} from '../thunks/chatThunks';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    data: null,
    messages: [],
    chatRooms: [],
    error: null,
    loading: false, // 로딩 상태 추가
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
      // .addCase(deleteMessage.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(deleteMessage.fulfilled, (state, action) => {
      //   state.messages = state.messages.filter(msg => msg.messageNumber !== action.payload);
      //   state.error = null;
      //   state.loading = false;
      // })
      // .addCase(deleteMessage.rejected, (state, action) => {
      //   state.error = action.error.message;
      //   state.loading = false;
      // })
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
      // .addCase(aiChatRequest.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(aiChatRequest.fulfilled, (state, action) => {
      //   state.data = action.payload;
      //   state.error = null;
      //   state.loading = false;
      // })
      // .addCase(aiChatRequest.rejected, (state, action) => {
      //   state.error = action.error.message;
      //   state.loading = false;
      // })
      // .addCase(readMessage.fulfilled, (state, action) => {
      //   const index = state.messages.findIndex(msg => msg.messageNumber === action.payload.messageNumber);
      //   if (index !== -1) state.messages[index].read = true;
      //   state.error = null;
      // })
      // .addCase(readMessage.rejected, (state, action) => {
      //   state.error = action.error.message;
      // })
      // .addCase(deleteChatRoom.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(deleteChatRoom.fulfilled, (state, action) => {
      //   state.data = null;
      //   state.messages = [];
      //   state.error = null;
      //   state.loading = false;
      // })
      // .addCase(deleteChatRoom.rejected, (state, action) => {
      //   state.error = action.error.message;
      //   state.loading = false;
      // })
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
      });
  },
});

// Selectors
export const selectChatRooms = (state) => state.chat.chatRooms;
export const selectMessages = (state) => state.chat.messages;
export const selectLoading = (state) => state.chat.loading;

export const { clearChatData, addMessage, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
