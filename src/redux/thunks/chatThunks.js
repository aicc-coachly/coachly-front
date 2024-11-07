// src/redux/thunks/chatThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AI_CHAT_REQUEST_URL,
  CREATE_CHAT_ROOM_URL,
  SEND_MESSAGE_URL,
  READ_MESSAGE_URL,
  DELETE_MESSAGE_URL,
  DEACTIVATE_CHAT_ROOM_URL,
  GET_MESSAGES_URL,
} from '../../utils/chatApiUrl';
import { deleteRequest, getRequest, patchRequest, postRequest } from '../../utils/requestMethod';
import { addMessage, setMessages, clearChatData } from '../silce/chatSlice';

// 채팅방 내 메시지 조회
export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async (roomId, { dispatch, rejectWithValue }) => {
    try {
      const response = await getRequest(GET_MESSAGES_URL(roomId));
      dispatch(setMessages(response)); // 메시지 배열을 상태에 저장
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '메시지 조회 실패');
    }
  }
);

// 메시지 전송
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ room_id, messageData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await postRequest(SEND_MESSAGE_URL(room_id), {
        body: JSON.stringify(messageData),
      });
      dispatch(addMessage(response)); // 새 메시지를 상태에 추가
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '메시지 전송 실패');
    }
  }
);

// 메시지 삭제
export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageNumber, { rejectWithValue }) => {
    try {
      await deleteRequest(DELETE_MESSAGE_URL(messageNumber), {});
      return messageNumber;
    } catch (error) {
      return rejectWithValue(error.message || '메시지 삭제 실패');
    }
  }
);

// 채팅방 생성
export const createChatRoom = createAsyncThunk(
  'chat/createChatRoom',
  async (chatRoomData, { rejectWithValue }) => {
    try {
      const response = await postRequest(CREATE_CHAT_ROOM_URL, {
        body: JSON.stringify(chatRoomData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '채팅방 생성 실패');
    }
  }
);

// AI 챗 요청
export const aiChatRequest = createAsyncThunk(
  'chat/aiChatRequest',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await postRequest(AI_CHAT_REQUEST_URL, {
        body: JSON.stringify(requestData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'AI 채팅 요청 실패');
    }
  }
);

// 메시지 읽음 처리
export const readMessage = createAsyncThunk(
  'chat/readMessage',
  async (messageNumber, { rejectWithValue }) => {
    try {
      const response = await patchRequest(READ_MESSAGE_URL(messageNumber), {});
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '메시지 읽음 처리 실패');
    }
  }
);

// 채팅방 비활성화
export const deleteChatRoom = createAsyncThunk(
  'chat/deleteChatRoom',
  async (roomId, { dispatch, rejectWithValue }) => {
    try {
      await deleteRequest(DEACTIVATE_CHAT_ROOM_URL(roomId), {});
      dispatch(clearChatData()); // 채팅방 비활성화 후 상태 초기화
      return roomId;
    } catch (error) {
      return rejectWithValue(error.message || '채팅방 비활성화 실패');
    }
  }
);
