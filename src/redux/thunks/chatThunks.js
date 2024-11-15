import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CREATE_CHAT_ROOM_URL,
  SEND_MESSAGE_URL,
  GET_MESSAGES_URL,
  GET_CHAT_ROOM_URL,
  GET_CHAT_ROOMS_URL,
  LEAVE_CHAT_ROOM_URL,
  AI_CHAT_REQUEST_URL,
  CREATE_AI_CHAT_ROOM_URL
  // READ_MESSAGE_URL,
  // DELETE_MESSAGE_URL,
  // DEACTIVATE_CHAT_ROOM_URL,
} from '../../utils/chatApiUrl';

import { getRequest, postRequest } from '../../utils/requestMethod';
import { addMessage } from '../slice/chatSlice';

let aiChatSocket = null; // WebSocket 전역 변수로 관리

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
export const startAIChat = (dispatch) => {
  aiChatSocket = new WebSocket(AI_CHAT_REQUEST_URL);

  aiChatSocket.onopen = () => {
    console.log('AI 채팅 서버에 연결되었습니다.');
  };

  aiChatSocket.onmessage = (event) => {
    const response = JSON.parse(event.data);
    console.log('AI 응답:', response.response);
    dispatch(addMessage({ sender_name: 'AI', content: response.response })); // Redux 상태 업데이트
  };

  aiChatSocket.onerror = (error) => {
    console.error('WebSocket 오류:', error);
  };

  aiChatSocket.onclose = () => {
    console.log('AI 채팅 서버와의 연결이 종료되었습니다.');
    aiChatSocket = null; // WebSocket 연결 종료 후 초기화
  };
};

// AI 채팅방 생성
export const createOrGetChatRoom = createAsyncThunk(
  'chat/createOrGetChatRoom',
  async (userNumber, { dispatch, rejectWithValue }) => {
    try {
      const response = await postRequest(CREATE_AI_CHAT_ROOM_URL, {
        body: JSON.stringify({ user_number: userNumber }),
      });

      if (!aiChatSocket) startAIChat(dispatch); // WebSocket 연결이 없을 경우 시작

      return response; // chat_room_id 반환
    } catch (error) {
      return rejectWithValue(error.message || 'AI 채팅방 생성/조회 실패');
    }
  }
);

// AI 메시지 전송
export const aiSendMessage = createAsyncThunk(
  'chat/aiSendMessage',
  async ({ roomId, message }, { rejectWithValue }) => {
    try {
      if (!aiChatSocket) throw new Error('WebSocket is not connected');

      aiChatSocket.send(
        JSON.stringify({
          room_id: roomId,
          question: message,
        })
      );

      return { sender_name: 'User', content: message }; // 전송된 메시지 반환
    } catch (error) {
      return rejectWithValue(error.message || 'AI 메시지 전송 실패');
    }
  }
);