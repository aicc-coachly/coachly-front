import { createSlice } from '@reduxjs/toolkit';
import { SendMessage, SendAiMessage, FetchMessages } from './MessageThunks';

const MessageSlice = createSlice({
  name: 'message',
  initialState: {
    messageList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 메시지 전송
      .addCase(SendMessage.fulfilled, (state, action) => {
        state.messageList.push(action.payload);
      })
      // AI 메시지 전송
      .addCase(SendAiMessage.fulfilled, (state, action) => {
        state.messageList.push(
          action.payload.message,
          action.payload.ai_response
        );
      })
      // 모든 메시지 조회
      .addCase(FetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messageList = action.payload;
      })
      .addCase(FetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default MessageSlice.reducer;
