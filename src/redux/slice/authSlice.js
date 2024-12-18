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
export const userSignup = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await postRequest(USER_SIGNUP_URL, {
        body: JSON.stringify(userData),
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '회원가입 실패');
    }
  }
);

// 사용자 로그인
export const userLogin = createAsyncThunk(
  'user/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await postRequest(USER_LOGIN_URL, {
        body: JSON.stringify(loginData), // loginData를 JSON으로 변환
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || '로그인 실패');
    }
  }
);

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
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    trainer: JSON.parse(localStorage.getItem('trainer')) || null,
    userType: localStorage.getItem('userType') || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.userType = 'user';
    },
    setTrainer: (state, action) => {
      state.trainer = action.payload;
      state.userType = 'trainer';
    },
    logout: (state) => {
      state.user = null;
      state.trainer = null;
      state.userType = null;
      localStorage.removeItem('user');
      localStorage.removeItem('trainer');
      localStorage.removeItem('userType');
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
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('userType', 'user'); // userType을 localStorage에 저장
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
        state.trainer = action.payload;
        localStorage.setItem('trainer', JSON.stringify(action.payload));
        localStorage.setItem('userType', 'trainer'); // userType을 localStorage에 저장
      })
      .addCase(trainerLogin.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, setTrainer, setUser } = authSlice.actions;
export default authSlice.reducer;
