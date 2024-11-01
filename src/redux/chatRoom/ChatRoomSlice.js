import { createSlice } from '@reduxjs/toolkit';
import {
  CreateChatRoom,
  CreateAiChatRoom,
  FetchChatRoomById,
  DeleteChatRoom,
} from './ChatRoomThunks';

const ChatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: {
    chatRoomList: [],
    selectedChatRoom: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 채팅방 생성
      .addCase(CreateChatRoom.fulfilled, (state, action) => {
        state.chatRoomList.push(action.payload);
      })
      // AI 채팅방 생성
      .addCase(CreateAiChatRoom.fulfilled, (state, action) => {
        state.chatRoomList.push(action.payload);
      })
      // 특정 채팅방 조회
      .addCase(FetchChatRoomById.fulfilled, (state, action) => {
        state.selectedChatRoom = action.payload;
      })
      // 채팅방 삭제
      .addCase(DeleteChatRoom.fulfilled, (state, action) => {
        state.chatRoomList = state.chatRoomList.filter(
          (room) => room.room_id !== action.payload
        );
      });
  },
});

export default ChatRoomSlice.reducer;
