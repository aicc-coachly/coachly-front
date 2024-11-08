import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  USER_SIGNUP_URL,
  USER_LOGIN_URL,
  TRAINER_LOGIN_URL,
  TRAINER_SIGNUP_URL,
} from '../../utils/authApiUrl';
import { postRequest } from '../../utils/requestMethod';

// 초기 상태 설정
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  trainer: JSON.parse(localStorage.getItem('trainer')) || null,
  error: null,
  userType: null,
};

// 사용자 회원가입
export const userSignup = createAsyncThunk("user/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await postRequest(USER_SIGNUP_URL, {
      body: JSON.stringify(userData),
    });
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "회원가입 실패");
  }
});

// 사용자 로그인
export const userLogin = createAsyncThunk("user/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await postRequest(USER_LOGIN_URL, {
      body: JSON.stringify(loginData), // loginData를 JSON으로 변환
    });
    return response;
  } catch (error) {
    return rejectWithValue(error.message || "로그인 실패");
  }
});

// 트레이너 회원가입
export const trainerSignup = createAsyncThunk(
  'trainer/signup',
  async (trainerData, { rejectWithValue }) => {
    try {
      const response = await postRequest(TRAINER_SIGNUP_URL, {
        body: trainerData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '회원가입 실패');
    }
  }
);

// 트레이너 로그인
export const trainerLogin = createAsyncThunk(
  'trainer/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await postRequest(TRAINER_LOGIN_URL, {
        body: JSON.stringify(loginData), // loginData를 JSON으로 변환
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '로그인 실패');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userType = "user";
      localStorage.setItem("userType", "user"); // 로컬 스토리지에 유저 타입 저장
    },
    setTrainer: (state, action) => {
      state.trainer = action.payload;
      state.userType = "trainer";
      localStorage.setItem("userType", "trainer"); // 로컬 스토리지에 트레이너 타입 저장
    },
    logout: (state) => {
      state.user = null;
      state.trainer = null;
      state.userType = null;
      localStorage.removeItem("user");
      localStorage.removeItem("trainer");
      localStorage.removeItem("userType"); // 로그아웃 시 유저 타입 제거
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.userType = 'user';
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(trainerSignup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(trainerSignup.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(trainerLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.userType = 'trainer';
        localStorage.setItem('trainer', JSON.stringify(action.payload));
      })
      .addCase(trainerLogin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, setTrainer, setUser } = authSlice.actions;
export default authSlice.reducer;
