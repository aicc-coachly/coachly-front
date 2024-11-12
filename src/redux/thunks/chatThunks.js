import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CREATE_CHAT_ROOM_URL,
  SEND_MESSAGE_URL,
  GET_MESSAGES_URL,
  GET_CHAT_ROOM_URL,
  GET_CHAT_ROOMS_URL,
  LEAVE_CHAT_ROOM_URL,
  // AI_CHAT_REQUEST_URL,
  // READ_MESSAGE_URL,
  // DELETE_MESSAGE_URL,
  // DEACTIVATE_CHAT_ROOM_URL,
} from '../../utils/chatApiUrl';

import { deleteRequest, getRequest, patchRequest, postRequest } from '../../utils/requestMethod';
import { addMessage, setMessages, clearChatData } from '../slice/chatSlice';

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

// 채팅방 조회
export const fetchChatRoom = createAsyncThunk(
  'chat/fetchChatRoom',
  async ({ userNumber, trainerNumber }, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_CHAT_ROOM_URL(userNumber, trainerNumber));
      
      if (response && response.roomId) {
        return response.roomId;
      } else {
        throw new Error('해당 유저와 트레이너에 대한 채팅방이 존재하지 않습니다.');
      }
    } catch (error) {
      return rejectWithValue(error.message || '채팅방 조회 실패');
    }
  }
);

// 채팅방 리스트 조회
export const fetchChatRooms = createAsyncThunk(
  'chat/fetchChatRooms',
  async ({ userNumber, trainerNumber }, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_CHAT_ROOMS_URL(userNumber, trainerNumber));
      
      if (response && response.length > 0) {
        return response;
      } else {
        throw new Error('조회된 채팅방이 없습니다.');
      }
    } catch (error) {
      return rejectWithValue(error.message || '채팅방 리스트 조회 실패');
    }
  }
);

// 채팅방 메시지 조회
export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async (roomId, { dispatch, rejectWithValue }) => {
    try {
      const response = await getRequest(GET_MESSAGES_URL(roomId));
      dispatch(setMessages(response));
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
      dispatch(addMessage(response));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '메시지 전송 실패');
    }
  }
);

// 채팅방 화면에서 나가기 
export const leaveChatRoom = createAsyncThunk(
  'chat/leaveChatRoom',
  async (room_id, { rejectWithValue }) => {
    try {
      const response = await postRequest(LEAVE_CHAT_ROOM_URL(room_id), {});
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '채팅방 나가기 실패');
    }
  }
);

// // 메시지 삭제
// export const deleteMessage = createAsyncThunk(
//   'chat/deleteMessage',
//   async (messageNumber, { rejectWithValue }) => {
//     try {
//       await deleteRequest(DELETE_MESSAGE_URL(messageNumber), {});
//       return messageNumber;
//     } catch (error) {
//       return rejectWithValue(error.message || '메시지 삭제 실패');
//     }
//   }
// );

// // 메시지 읽음 처리
// export const readMessage = createAsyncThunk(
//   'chat/readMessage',
//   async (messageNumber, { rejectWithValue }) => {
//     try {
//       const response = await patchRequest(READ_MESSAGE_URL(messageNumber), {});
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message || '메시지 읽음 처리 실패');
//     }
//   }
// );

// // 채팅방 비활성화
// export const deleteChatRoom = createAsyncThunk(
//   'chat/deleteChatRoom',
//   async (roomId, { dispatch, rejectWithValue }) => {
//     try {
//       await deleteRequest(DEACTIVATE_CHAT_ROOM_URL(roomId), {});
//       dispatch(clearChatData());
//       return roomId;
//     } catch (error) {
//       return rejectWithValue(error.message || '채팅방 비활성화 실패');
//     }
//   }
// );

// // AI 챗 요청
// export const aiChatRequest = createAsyncThunk(
//   'chat/aiChatRequest',
//   async (requestData, { rejectWithValue }) => {
//     try {
//       const response = await postRequest(AI_CHAT_REQUEST_URL, {
//         body: JSON.stringify(requestData),
//       });
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message || 'AI 채팅 요청 실패');
//     }
//   }
// );
