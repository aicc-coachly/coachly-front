import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CREATE_CHAT_ROOM_URL,
  SEND_MESSAGE_URL,
  GET_MESSAGES_URL,
  GET_CHAT_ROOM_URL,
  GET_CHAT_ROOMS_URL,
  LEAVE_CHAT_ROOM_URL,
  AI_CHAT_REQUEST_URL,
  // READ_MESSAGE_URL,
  // DELETE_MESSAGE_URL,
  // DEACTIVATE_CHAT_ROOM_URL,
} from '../../utils/chatApiUrl';

import { getRequest, postRequest } from '../../utils/requestMethod';
import { addMessage } from '../slice/chatSlice';

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

// 특정 채팅방 조회
export const fetchChatRoom = createAsyncThunk(
  'chat/fetchChatRoom',
  async ({ roomId, userNumber = null, trainerNumber = null }, { rejectWithValue }) => {
    try {
      // URL을 생성할 때 적절한 쿼리 파라미터가 포함되도록 GET_CHAT_ROOM_URL 함수 사용
      const url = GET_CHAT_ROOM_URL(roomId, userNumber, trainerNumber);
      
      console.log("Fetching specific chat room with URL:", url); // URL 확인용
      const response = await getRequest(url);
      
      if (response) {
        return response; 
      } else {
        console.warn('조회된 특정 채팅방이 없습니다.');
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.message || '특정 채팅방 조회 실패');
    }
  }
);



// 채팅방 리스트 조회
export const fetchChatRooms = createAsyncThunk(
  'chat/fetchChatRooms',
  async ({ userNumber, trainerNumber }, { rejectWithValue }) => {
    console.log("fetchChatRooms called with:", { userNumber, trainerNumber }); // 추가된 로그

    try {
      const url = GET_CHAT_ROOMS_URL(userNumber, trainerNumber);
      console.log("Fetching chat rooms with URL:", url); // URL 확인용
      const response = await getRequest(url);
      
      if (response) {
        return response; // 빈 리스트라도 반환
      } else {
        console.warn('조회된 채팅방이 없습니다.');
        return []; // 빈 리스트를 반환
      }
    } catch (error) {
      return rejectWithValue(error.message || '채팅방 리스트 조회 실패');
    }
  }
);

// 채팅방 메시지 조회
export const fetchChatMessages = createAsyncThunk(
  'chat/fetchChatMessages',
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_MESSAGES_URL(roomId));
      return response; // 리듀서에서 직접 상태를 업데이트
    } catch (error) {
      return rejectWithValue(error.message || "채팅 메시지 조회 실패");
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


// AI 채팅을 위한 WebSocket 연결 설정
export const startAIChat = () => {
  const socket = new WebSocket(AI_CHAT_REQUEST_URL);

  socket.onopen = () => {
    console.log('AI 채팅 서버에 연결되었습니다.');
  };

  socket.onmessage = (event) => {
    const response = JSON.parse(event.data);
    console.log('AI 응답:', response.response);
    // 메시지 상태를 업데이트하도록 액션을 dispatch할 수 있습니다.
  };

  socket.onerror = (error) => {
    console.error('WebSocket 오류:', error);
  };

  socket.onclose = () => {
    console.log('AI 채팅 서버와의 연결이 종료되었습니다.');
  };

  return socket;
};

// AI 메시지 전송
export const aiSendMessage = createAsyncThunk(
  'chat/aiSendMessage',
  async ({ roomId, message }, { rejectWithValue }) => {
    try {
      const socket = startAIChat();
      
      socket.send(
        JSON.stringify({
          room_id: roomId,
          question: message,
        })
      );

      socket.onmessage = (event) => {
        const response = JSON.parse(event.data);
        // AI 응답 처리
        console.log('AI 응답:', response.response);
        return response;
      };

      socket.onclose = () => {
        console.log('WebSocket 연결이 종료되었습니다.');
      };
      
    } catch (error) {
      return rejectWithValue(error.message || 'AI 메시지 전송 실패');
    }
  }
);