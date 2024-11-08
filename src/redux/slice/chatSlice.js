import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AI_CHAT_REQUEST_URL,
  CREATE_CHAT_ROOM_URL,
  SEND_MESSAGE_URL,
  READ_MESSAGE_URL,
  DELETE_MESSAGE_URL,
  DEACTIVATE_CHAT_ROOM_URL,
  GET_MESSAGES_URL,
} from "../../utils/chatApiUrl";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../utils/requestMethod";

// AI 채팅 요청
export const aiChatRequest = createAsyncThunk(
  "chat/aiChatRequest",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequest(AI_CHAT_REQUEST_URL, {
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "AI 채팅 요청 실패");
    }
  }
);

// 채팅방 생성
export const createChatRoom = createAsyncThunk(
  "chat/createChatRoom",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequest(CREATE_CHAT_ROOM_URL, {
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "채팅방 생성 실패");
    }
  }
);

// 메시지 전송
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ room_id, messageData }, { rejectWithValue }) => {
    try {
      const response = await postRequest(SEND_MESSAGE_URL(room_id), {
        body: JSON.stringify(messageData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "메시지 전송 실패");
    }
  }
);

// 메시지 읽음 처리
export const readMessage = createAsyncThunk(
  "chat/readMessage",
  async (message_number, { rejectWithValue }) => {
    try {
      const response = await patchRequest(READ_MESSAGE_URL(message_number), {});
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "메시지 읽음 처리 실패");
    }
  }
);

// 메시지 삭제
export const deleteMessage = createAsyncThunk(
  "chat/deleteMessage",
  async (message_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(
        DELETE_MESSAGE_URL(message_number),
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "메시지 삭제 실패");
    }
  }
);

// 채팅방 비활성화
export const deactivateChatRoom = createAsyncThunk(
  "chat/deactivateChatRoom",
  async (room_id, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(
        DEACTIVATE_CHAT_ROOM_URL(room_id),
        {}
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "채팅방 비활성화 실패");
    }
  }
);

// 메시지 조회
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (room_id, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_MESSAGES_URL(room_id));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "메시지 조회 실패");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {
    clearChatData: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(aiChatRequest.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(aiChatRequest.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(readMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deactivateChatRoom.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(deactivateChatRoom.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearChatData } = chatSlice.actions;
export default chatSlice.reducer;
