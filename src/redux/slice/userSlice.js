import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_ALL_USER_URL,
  POST_INBODY_URL,
  GET_USER_URL,
  GET_USER_INBODY_URL,
  DELETE_USER_URL,
  DELETE_USER_INBODY_URL,
  DELETE_USER_ADDRESS_URL,
  PATCH_USER_INFO_URL,
  PATCH_USER_ADDRESS_URL,
  PATCH_USER_INBODY_URL,
} from "../../utils/userApiUrl";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../utils/requestMethod";

// 모든 사용자 조회
export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_ALL_USER_URL);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "모든 사용자 조회 실패");
    }
  }
);

// 인바디 정보 저장
export const postUserInbody = createAsyncThunk(
  "user/postUserInbody",
  async ({ user_number, inbodyData }, { rejectWithValue }) => {
    try {
      const response = await postRequest(
        POST_INBODY_URL(user_number), // user_id를 URL에 포함
        {
          body: JSON.stringify(inbodyData),
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "인바디 정보 저장 실패");
    }
  }
);

// 특정 사용자 페이지 정보 조회
export const getUser = createAsyncThunk(
  "user/getUser",
  async (user_number, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_USER_URL(user_number));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "사용자 조회 실패");
    }
  }
);

// 특정 사용자의 인바디 정보 조회
export const getUserInbody = createAsyncThunk(
  "user/getUserInbody",
  async (user_number, { rejectWithValue }) => {
    try {
      const response = await getRequest(GET_USER_INBODY_URL(user_number));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "인바디 정보 조회 실패");
    }
  }
);

// 사용자 소프트 삭제
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (user_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(DELETE_USER_URL(user_number));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "사용자 삭제 실패");
    }
  }
);

// 사용자 인바디 정보 소프트 삭제
export const deleteUserInbody = createAsyncThunk(
  "user/deleteUserInbody",
  async (user_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(DELETE_USER_INBODY_URL(user_number));
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "인바디 정보 삭제 실패");
    }
  }
);

// 사용자 주소 소프트 삭제
export const deleteUserAddress = createAsyncThunk(
  "user/deleteUserAddress",
  async (user_number, { rejectWithValue }) => {
    try {
      const response = await deleteRequest(
        DELETE_USER_ADDRESS_URL(user_number)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "주소 삭제 실패");
    }
  }
);

// 사용자 기본 정보 업데이트
export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async ({ user_number, updateData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(PATCH_USER_INFO_URL(user_number), {
        body: JSON.stringify(updateData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "사용자 정보 업데이트 실패");
    }
  }
);

// 사용자 주소 정보 업데이트
export const updateUserAddress = createAsyncThunk(
  "user/updateUserAddress",
  async ({ user_number, updateData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(PATCH_USER_ADDRESS_URL(user_number), {
        body: JSON.stringify(updateData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "주소 정보 업데이트 실패");
    }
  }
);

// 사용자 인바디 정보 업데이트
export const updateUserInbody = createAsyncThunk(
  "user/updateUserInbody",
  async ({ user_inbody_number, inbodyData }, { rejectWithValue }) => {
    try {
      const response = await patchRequest(
        PATCH_USER_INBODY_URL(user_inbody_number),
        {
          body: JSON.stringify(inbodyData),
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(
        error.message || "사용자 인바디 정보 업데이트 실패"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    inbodyData: null,
    addressData: null,
    allUsers: null,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
      state.userInfo = null;
      state.inbodyData = null;
      state.addressData = null;
    },
    logout: (state) => {
      state.userInfo = null;
      state.inbodyData = null;
      state.addressData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 모든 사용자 조회
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 인바디 정보 저장
      .addCase(postUserInbody.fulfilled, (state, action) => {
        state.inbodyData = action.payload;
        state.error = null;
      })
      .addCase(postUserInbody.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 특정 사용자 정보 조회
      .addCase(getUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 특정 사용자의 인바디 정보 조회
      .addCase(getUserInbody.fulfilled, (state, action) => {
        state.inbodyData = action.payload;
        state.error = null;
      })
      .addCase(getUserInbody.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 사용자 삭제
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userInfo = null;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 사용자 주소 삭제
      .addCase(deleteUserAddress.fulfilled, (state) => {
        state.addressData = null;
        state.error = null;
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 사용자 정보 업데이트
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
        state.error = null;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 사용자 주소 정보 업데이트
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.userInfo = {
          ...state.userInfo,
          user_zipcode: action.payload.user_zipcode,
          user_address: action.payload.user_address,
          user_detail_address: action.payload.user_detail_address,
        };

        state.error = null;
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 사용자 인바디 정보 업데이트
      .addCase(updateUserInbody.fulfilled, (state, action) => {
        const updatedInbody = action.payload; // 서버에서 반환된 수정된 인바디 데이터
        state.inbodyData = state.inbodyData.map((inbody) =>
          inbody.id === updatedInbody.id ? updatedInbody : inbody
        );
        state.error = null;
      })
      .addCase(updateUserInbody.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearUserData, logout } = userSlice.actions;
export default userSlice.reducer;
