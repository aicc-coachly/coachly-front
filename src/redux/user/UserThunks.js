import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios 인스턴스를 생성하고 baseURL에 환경 변수 사용
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // 환경 변수에서 가져온 백엔드 주소 사용
});

// 회원가입
export const RegisterUser = createAsyncThunk(
  'users/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/signup', userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// export const RegisterUser = createAsyncThunk(
//   'users/register',
//   async (userData) => {
//     const response = await api.post('/user/signup', userData);
//     return response.data;
//   }
// );

// 로그인
export const LoginUser = createAsyncThunk('/users/login', async (loginData) => {
  const response = await axios.post('/users/signin', loginData);
  return response.data;
});

// 인바디 정보 저장
export const SaveUserInbody = createAsyncThunk(
  'users/saveInbody',
  async (inbodyData) => {
    const response = await axios.post('/user-inbody', inbodyData);
    return response.data;
  }
);

// 주소 정보 저장
export const SaveUserAddress = createAsyncThunk(
  'users/saveAddress',
  async (addressData) => {
    const response = await axios.post('/user-address', addressData);
    return response.data;
  }
);

// 모든 회원 정보 조회
export const FetchAllUsers = createAsyncThunk('/users/fetchAll', async () => {
  const response = await axios.get('/users');
  return response.data.messages.users;
});

// 특정 회원 정보 조회
export const FetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userNumber) => {
    const response = await axios.get(`/users/${userNumber}`);
    return response.data;
  }
);

// 회원 인바디 정보 조회
export const FetchUserInbody = createAsyncThunk(
  'users/fetchInbody',
  async () => {
    const response = await axios.get('/user-inbody');
    return response.data.user_inbody;
  }
);

// 회원 인바디 삭제
export const DeleteUserInbody = createAsyncThunk(
  'users/deleteInbody',
  async (inbodyNumber) => {
    await axios.delete(`/user-inbody/${inbodyNumber}`);
    return inbodyNumber;
  }
);

// 회원 주소 삭제
export const DeleteUserAddress = createAsyncThunk(
  'users/deleteAddress',
  async (addressNumber) => {
    await axios.delete(`/user-address/${addressNumber}`);
    return addressNumber;
  }
);

// 회원 정보 수정
export const UpdateUserInfo = createAsyncThunk(
  'users/updateInfo',
  async ({ userNumber, updatedData }) => {
    const response = await axios.patch(`/users/${userNumber}`, updatedData);
    return response.data;
  }
);

// 회원 주소 수정
export const UpdateUserAddress = createAsyncThunk(
  'users/updateAddress',
  async ({ addressNumber, updatedData }) => {
    const response = await axios.patch(
      `/user-address/${addressNumber}`,
      updatedData
    );
    return response.data;
  }
);
