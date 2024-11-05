import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Axios 인스턴스 생성 (기본 URL 및 인터셉터 설정)
const apiClient = axios.create({
  baseURL: REACT_APP_API_URL, // 백엔드 서버 URL에 맞게 설정
});

// 요청 인터셉터를 통해 토큰을 자동으로 Authorization 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 사용자 회원가입
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/signup', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 로그인
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/user/login', loginData);
      const token = response.data.token; // 로그인 시 토큰 획득
      localStorage.setItem('authToken', token); // 토큰을 로컬 스토리지에 저장
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 회원가입
export const registerTrainer = createAsyncThunk(
  'auth/registerTrainer',
  async (trainerData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/trainer/signup', trainerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 트레이너 로그인
export const loginTrainer = createAsyncThunk(
  'auth/loginTrainer',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/trainer/login', loginData);
      const token = response.data.token; // 로그인 시 토큰 획득
      localStorage.setItem('authToken', token); // 토큰을 로컬 스토리지에 저장
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 보호된 라우트 접근 Thunk
export const fetchProtectedData = createAsyncThunk(
  'auth/fetchProtectedData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/protected'); // 보호된 라우트 접근
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
