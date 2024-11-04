import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthRepository from "../../repositories/AuthRepository";

// 회원용 로그인/가입
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthRepository.loginUser(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AuthRepository.registerUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 트레이너용 로그인/가입
export const loginTrainer = createAsyncThunk(
  "auth/loginTrainer",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthRepository.loginTrainer(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerTrainer = createAsyncThunk(
  "auth/registerTrainer",
  async (trainerData, { rejectWithValue }) => {
    try {
      const response = await AuthRepository.registerTrainer(trainerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
