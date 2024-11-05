import { createAsyncThunk } from '@reduxjs/toolkit';
import UserRepository from '../../repositories/UserRepository';

// 사용자 프로필 조회
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserRepository.getUserProfile(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 페이지 정보 조회
export const fetchUserPage = createAsyncThunk(
  'user/fetchUserPage',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserRepository.getUserPage(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 인바디 정보 조회
export const fetchUserInbody = createAsyncThunk(
  'user/fetchUserInbody',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserRepository.getUserInbody(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 인바디 정보 저장
export const postUserInbody = createAsyncThunk(
  'user/postUserInbody',
  async (inbodyData, { rejectWithValue }) => {
    try {
      const response = await UserRepository.postUserInbody(inbodyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 기본 정보 업데이트
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await UserRepository.updateUserInfo(userId, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 주소 정보 업데이트
export const updateUserAddress = createAsyncThunk(
  'user/updateUserAddress',
  async ({ userId, addressData }, { rejectWithValue }) => {
    try {
      const response = await UserRepository.updateUserAddress(
        userId,
        addressData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 인바디 정보 업데이트
export const updateUserInbody = createAsyncThunk(
  'user/updateUserInbody',
  async ({ userId, inbodyData }, { rejectWithValue }) => {
    try {
      const response = await UserRepository.updateUserInbody(
        userId,
        inbodyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 소프트 삭제
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserRepository.deleteUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 인바디 정보 소프트 삭제
export const deleteUserInbody = createAsyncThunk(
  'user/deleteUserInbody',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserRepository.deleteUserInbody(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// 사용자 주소 소프트 삭제
export const deleteUserAddress = createAsyncThunk(
  'user/deleteUserAddress',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await UserRepository.deleteUserAddress(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
